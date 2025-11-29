# 🔑 Cách lấy Gemini API Key

## Vấn đề hiện tại

File `.env.local` của bạn đang có:
```
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

Đây không phải là API key thật, nên tính năng Magic Rephrase không hoạt động.

## Hướng dẫn lấy API Key thật

### Bước 1: Truy cập Google AI Studio

Mở trình duyệt và vào:
**https://aistudio.google.com/app/apikey**

### Bước 2: Đăng nhập

- Sử dụng tài khoản Google của bạn
- Nếu chưa có, tạo tài khoản Google mới

### Bước 3: Tạo API Key

1. Click nút **"Create API Key"** hoặc **"Get API Key"**
2. Chọn Google Cloud Project (hoặc tạo project mới)
3. Copy API key được tạo ra
   - API key thường có dạng: `AIzaSyAbc123...` (khoảng 39 ký tự)

### Bước 4: Cập nhật `.env.local`

Mở file `.env.local` trong thư mục gốc dự án và thay thế:

```
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

Thành:

```
GEMINI_API_KEY=AIzaSyAbc123...your_actual_key_here
```

### Bước 5: Restart Server

1. Dừng server hiện tại (Ctrl+C trong terminal)
2. Chạy lại: `npm run dev`
3. Refresh browser (Ctrl+Shift+R)

### Bước 6: Test lại

1. Mở chat bất kỳ
2. Nhập text
3. Click icon Wand2 ✨
4. Magic Rephrase sẽ hoạt động!

## ⚠️ Lưu ý quan trọng

- **Không chia sẻ API key** công khai
- API key miễn phí có giới hạn request
- Nếu hết quota, đợi một chút hoặc nâng cấp tài khoản

## 🆘 Vẫn không hoạt động?

1. Kiểm tra API key đã copy đúng chưa (không có khoảng trắng thừa)
2. Kiểm tra server đã restart chưa
3. Mở Browser Console (F12) để xem lỗi chi tiết
4. Đảm bảo API key vẫn còn hiệu lực

