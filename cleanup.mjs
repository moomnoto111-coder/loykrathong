// ลบภาพที่เก่ากว่า 30 วัน ทำงานวันละครั้ง
import { getStore } from '@netlify/blobs';

export default async () => {
  const store = getStore('krathong');
  const limit = Date.now() - 30 * 24 * 3600 * 1000;
  const { blobs } = await store.list();
  for (const { key } of blobs) {
    const m = await store.getMetadata(key);
    const t = m && m.metadata && m.metadata.createdAt;
    if (!t || t < limit) await store.delete(key);
  }
};

export const config = { schedule: '@daily' };
