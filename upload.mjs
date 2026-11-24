// รับภาพกระทง (PNG) เก็บลง Netlify Blobs แล้วคืนลิงก์หน้าแชร์
import { getStore } from '@netlify/blobs';

const MAX_BYTES = 3 * 1024 * 1024;
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  const url = new URL(req.url);
  const origin = req.headers.get('Origin');
  if (origin && origin !== url.origin) return json({ error: 'forbidden' }, 403);
  if ((req.headers.get('Content-Type') || '') !== 'image/png') return json({ error: 'png only' }, 415);

  const buf = await req.arrayBuffer();
  if (buf.byteLength < 100 || buf.byteLength > MAX_BYTES) return json({ error: 'bad size' }, 413);
  const b = new Uint8Array(buf);
  if (![0x89, 0x50, 0x4e, 0x47].every((v, i) => b[i] === v)) return json({ error: 'not png' }, 415);

  const id = [...crypto.getRandomValues(new Uint8Array(9))].map((x) => x.toString(16).padStart(2, '0')).join('');
  const title = (url.searchParams.get('t') || 'ลอยกระทงออนไลน์').slice(0, 120);
  await getStore('krathong').set(id, buf, { metadata: { title, createdAt: Date.now() } });
  return json({ url: url.origin + '/s/' + id });
};

export const config = { path: '/api/upload' };
