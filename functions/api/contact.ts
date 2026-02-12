import { z } from 'zod';

type Env = {
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_RATE_LIMIT?: string;
};

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional().or(z.literal('')),
  formStartedAt: z.string()
});

const ipHits = new Map<string, number[]>();

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const ip = context.request.headers.get('cf-connecting-ip') || 'unknown';
  const now = Date.now();
  const maxInWindow = Number(context.env.CONTACT_RATE_LIMIT || 5);
  const windowMs = 10 * 60 * 1000;

  const timestamps = (ipHits.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxInWindow) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Validation error' }), { status: 400 });
  }

  const elapsed = now - Number(parsed.data.formStartedAt || now);
  if (elapsed < 2500) {
    return new Response(JSON.stringify({ error: 'Submission too fast' }), { status: 400 });
  }

  timestamps.push(now);
  ipHits.set(ip, timestamps);

  const to = context.env.CONTACT_TO_EMAIL || 'vaigunth@jpginfotech.com';
  const from = context.env.CONTACT_FROM_EMAIL || 'noreply@jpginfotech.com';

  const mail = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from, name: 'JPG Contact Form' },
    subject: `New contact form submission from ${parsed.data.name}`,
    content: [
      {
        type: 'text/plain',
        value: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nCompany: ${parsed.data.company || '-'}\n\nMessage:\n${parsed.data.message}`
      }
    ],
    reply_to: { email: parsed.data.email }
  };

  const mailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(mail)
  });

  if (!mailResponse.ok) {
    return new Response(JSON.stringify({ error: 'Email delivery failed' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
