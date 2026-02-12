interface Env {
  CONTACT_EMAIL?: string;
}

const rateMap = new Map<string, { count: number; ts: number }>();

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const existing = rateMap.get(ip);
  if (existing && now - existing.ts < 60_000 && existing.count >= 5) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  rateMap.set(ip, { count: (existing?.count || 0) + 1, ts: now });

  let data: any;
  try {
    data = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { name, email, company = '', message, website = '', submittedAt } = data || {};
  if (website) return new Response('Spam detected', { status: 400 });
  if (!name || !email || !message) return new Response('Missing fields', { status: 400 });
  if (submittedAt && now - Number(submittedAt) < 3000) return new Response('Submitted too quickly', { status: 400 });

  const to = env.CONTACT_EMAIL || 'vaigunth@jpginfotech.com';
  const text = `New contact request\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`;

  await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@jpginfotech.com', name: 'JPG Infotech Website' },
      subject: `New Contact Request from ${name}`,
      content: [{ type: 'text/plain', value: text }]
    })
  }).catch(() => null);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
    status: 200
  });
};
