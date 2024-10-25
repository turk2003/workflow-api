# ใช้ node เวอร์ชันที่เหมาะสม
FROM node:18

# ตั้ง directory สำหรับโปรเจกต์ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมดไปยัง container
COPY . .
# คัดลอกไฟล์ .env
COPY .env .env
# build โปรเจกต์ NestJS
RUN npm run build

# กำหนดพอร์ตที่ application จะทำงาน
EXPOSE 3000

# คำสั่งที่จะรันเมื่อ container เริ่มทำงาน
CMD ["npm", "run", "start:prod"]
