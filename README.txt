วิธีขึ้นเว็บ "ลอยกระทงออนไลน์"

ไฟล์ index.html เป็นไฟล์เดียวจบ (รวมรูป QR ไว้ข้างในแล้ว) ไม่ต้องติดตั้งอะไรเพิ่ม

ทางที่ง่ายที่สุด (ฟรี ไม่ต้องสมัคร):
1. เข้า https://app.netlify.com/drop
2. ลากโฟลเดอร์นี้ (หรือไฟล์ index.html) ไปวาง
3. ได้ลิงก์เว็บทันที เปลี่ยนชื่อลิงก์ได้ในเมนู Site settings

ทางเลือกอื่น:
- Cloudflare Pages: Upload assets แล้วลากไฟล์ index.html
- GitHub Pages: สร้าง repo อัปโหลด index.html แล้วเปิด Settings > Pages
- โฮสติ้งทั่วไป: อัปโหลด index.html ไปที่โฟลเดอร์ public_html

หมายเหตุ:
- ปุ่มแชร์ Facebook จะใช้ที่อยู่เว็บจริงโดยอัตโนมัติ
- ต้องเปิดผ่านลิงก์ https เพื่อให้ปุ่มคัดลอกและฟอนต์ไทยทำงานครบ


เปิดสถิติการใช้งาน (Google Analytics 4)
1. เข้า https://analytics.google.com สร้าง Property แล้วเลือก Web เพื่อรับ Measurement ID (ขึ้นต้นด้วย G-)
2. เปิด index.html ด้วย Notepad หา var GA_ID='G-XXXXXXXXXX' แล้วแทนด้วย ID ของคุณ
3. อัปโหลดขึ้นเว็บใหม่ ข้อมูลจะขึ้นในรายงาน Realtime ภายในไม่กี่นาที

ชื่อกิจกรรมที่เก็บ (ดูได้ที่ Reports > Engagement > Events):
- page_view = เข้าชมเว็บ (อัตโนมัติ)
- start_krathong = กดปุ่มลอยกระทง
- release_krathong = ลอยกระทงสำเร็จ
- share_image_click = กดปุ่มแชร์กระทงไป Facebook
- share_native = แชร์ผ่านหน้าต่างแชร์ของมือถือสำเร็จ
- save_image = กดบันทึกภาพ
- open_facebook = กดเปิด Facebook
- open_donate = กดดู QR ทำบุญ
- copy_share_text = กดคัดลอกข้อความแชร์
- copy_image = คัดลอกภาพกระทงเข้าคลิปบอร์ด (คอมพิวเตอร์)


ทำให้โพสต์ Facebook มีพรีวิวรูปกระทงอัตโนมัติ (ไม่ต้องกดวางภาพ) บนคอมพิวเตอร์ ด้วย Netlify
ส่วนนี้ต้องมีฟังก์ชันหลังบ้าน (โฟลเดอร์ netlify/functions) จึงต้องดีพลอยทั้งโปรเจกต์ ไม่ใช่ลากแค่ index.html
วิธี A: ผ่าน GitHub (แนะนำ)
1. อัปโหลดทุกไฟล์ในโฟลเดอร์นี้ขึ้น GitHub repo (index.html, netlify.toml, package.json, netlify/)
2. ที่ https://app.netlify.com เลือก Add new site > Import an existing project แล้วเลือก repo
3. ค่า Build ปล่อยว่างได้ แล้วกด Deploy (Netlify จะติดตั้ง @netlify/blobs เองจาก package.json)
วิธี B: ผ่านเครื่อง
1. ติดตั้ง Node.js แล้วเปิด Terminal ในโฟลเดอร์นี้
2. npm install
3. npx netlify login
4. npx netlify deploy --prod  (ครั้งแรกให้เลือก Create & configure a new project)
ตรวจสอบ: เปิดเว็บบนคอม กดแชร์ไป Facebook ต้องเห็นพรีวิวรูปกระทง ถ้าไม่ขึ้นให้ดูที่ Netlify > Logs > Functions
ถ้าพรีวิวไม่ขึ้นที่ Facebook ลองวางลิงก์ที่ https://developers.facebook.com/tools/debug/
ภาพที่แชร์ถูกเก็บใน Netlify Blobs และลบอัตโนมัติหลัง 30 วัน
เหตุการณ์สถิติเพิ่ม: share_link = แชร์ลิงก์พรีวิวไป Facebook สำเร็จ (คอมพิวเตอร์)
