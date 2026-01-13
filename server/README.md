# Esmart AI Content Generator API

Backend API server đơn giản để tạo nội dung sử dụng Deepseek API.

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env` với nội dung:

```
PORT=3001
DEEPSEEK_API_KEY=your_api_key_here

# Cloud Database Configuration (Neon/Supabase/Railway)
DB_HOST=your-project.neon.tech
DB_PORT=5432
DB_NAME=esmart_agency
DB_USER=your_username
DB_PASSWORD=your_password
DB_SSL=true

# Optional: MongoDB for TrendData
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/esmart_agency
```

3. **Set up Cloud Database** (see [DATABASE_SETUP.md](../DATABASE_SETUP.md) for detailed guide):
   - Recommended: [Neon](https://neon.tech) (serverless PostgreSQL)
   - Alternative: [Supabase](https://supabase.com) or [Railway](https://railway.app)

## Chạy server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

## API Endpoints

### Tạo nội dung

**POST** `/api/generate-content`

Body:

```json
{
  "topic": "Chủ đề của bạn",
  "keywords": "từ khóa1, từ khóa2",
  "tone": "professional",
  "type": "blog"
}
```

Response:

```json
{
  "success": true,
  "content": "Nội dung được tạo..."
}
```

### Kiểm tra trạng thái

**GET** `/api/health`

Response:

```json
{
  "status": "ok",
  "message": "Esmart AI Content Generator API is running"
}
```
