// /s/<id> = หน้าแชร์ที่มี og:image ให้ Facebook ดึงพรีวิว คนทั่วไปจะถูกพาไปหน้าเว็บหลัก
// /i/<id> = ตัวรูปภาพ
import { getStore } from '@netlify/blobs';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async (req) => {
  const url = new URL(req.url);
  const m = url.pathname.match(/^\/([si])\/([0-9a-f]{18})$/);
  if (!m) return new Response('not found', { status: 404 });
  const [, kind, id] = m;
  const store = getStore('krathong');

  if (kind === 'i') {
    const data = await store.get(id, { type: 'arrayBuffer' });
    if (!data) return new Response('not found', { status: 404 });
    return new Response(data, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=2592000' } });
  }

  const meta = await store.getMetadata(id);
  if (!meta) return new Response('not found', { status: 404 });
  const title = esc((meta.metadata && meta.metadata.title) || 'ลอยกระทงออนไลน์');
  const img = url.origin + '/i/' + id;
  const html = `<!doctype html><html lang="th"><head><meta charset="utf-8">
<title>${title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="มาลอยกระทงออนไลน์ด้วยกัน">
<meta property="og:image" content="${img}">
<meta property="og:url" content="${url.origin}/s/${id}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0;url=/">
</head><body><a href="/">ไปลอยกระทงที่เว็บหลัก</a></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};

export const config = { path: ['/s/*', '/i/*'] };
