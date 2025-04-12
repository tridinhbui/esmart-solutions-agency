# Esmart AI Image Generator Service

Service FastAPI để tạo hình ảnh bằng Kandinsky 2.2 cho ứng dụng Esmart AI Content Creator.

## Cài đặt

1. Đảm bảo bạn đã cài đặt Python 3.8+ và pip.

2. Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

3. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

4. Cập nhật các biến môi trường trong file `.env`, bao gồm API key cho OpenRouter (để sử dụng DeepSeek API).

## Cài đặt tối ưu cho Apple Silicon (Mac M1/M2)

Để tăng tốc độ xử lý trên chip Apple Silicon, chúng tôi đã tối ưu hóa service để sử dụng MPS (Metal Performance Shaders):

1. Sử dụng script cài đặt tự động:

```bash
./setup_m1.sh
```

Script này sẽ:

- Tạo môi trường ảo (venv) nếu chưa tồn tại
- Cài đặt PyTorch phiên bản tối ưu cho Apple Silicon
- Cài đặt các thư viện cần thiết với cấu hình đúng

2. Các tối ưu hóa đã được áp dụng:
   - Sử dụng MPS backend của PyTorch
   - Float16 quantization giảm bộ nhớ
   - Giảm số inference steps xuống 20
   - Sử dụng safetensors để tăng tốc độ tải model

### Benchmark dự kiến

| Thiết lập    | Thời gian/ảnh |
| ------------ | ------------- |
| M1 CPU       | ~3-5 phút     |
| M1 GPU (mps) | 45-90 giây    |
| Đã tối ưu    | 20-40 giây    |

## Chạy service

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Sau khi chạy, FastAPI service sẽ khả dụng tại: http://localhost:8000

## API Endpoints

- **GET /**: Kiểm tra trạng thái service
- **GET /status**: Kiểm tra trạng thái chi tiết của service và các models
- **POST /generate-image**: Tạo ảnh từ prompt
- **POST /topic-to-image**: Tạo ảnh từ chủ đề
- **GET /images/{filename}**: Lấy ảnh đã tạo theo filename

## Lưu ý

- Service sử dụng Kandinsky 2.2 cho việc tạo ảnh từ văn bản
- Mô hình sẽ được tải khi cần thiết để tiết kiệm bộ nhớ
- Nếu OpenRouter API key được cung cấp, service sẽ sử dụng DeepSeek để cải thiện prompt trước khi tạo ảnh
- Khi sử dụng trên Mac M1/M2, dịch vụ sẽ tự động sử dụng MPS để tăng tốc
