# Portfolio Backend API

FastAPI backend for the portfolio website contact form.

## Features

- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic Validation**: Automatic request validation with detailed error messages
- **CORS Support**: Configured for frontend integration
- **Email Integration**: Mock email function (ready for production email service)
- **Vercel Deployment**: Configured for serverless deployment

## Local Development

1. **Install Dependencies**:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run Development Server**:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **API Documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Contact Form

- **POST** `/api/contact`
  - Submit contact form data
  - Validates: name (2+ chars), email, subject (5+ chars), message (10+ chars)
  - Returns success/error response

### Health Checks

- **GET** `/` - Root endpoint
- **GET** `/health` - General health check
- **GET** `/api/contact/health` - Contact API health check

## Deployment to Vercel

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Configure Root Directory**: Set root directory to `backend/`
3. **Deploy**: Vercel will automatically use the `vercel.json` configuration

The API will be available at: `https://api.parthivnair.com`

## Environment Variables

**Required for production email (add these to Vercel):**

- `SENDGRID_API_KEY` - Your SendGrid API key
- `RECIPIENT_EMAIL` - Email to receive contact form submissions (default: parthivnair1@gmail.com)
- `SENDER_EMAIL` - From email address (default: noreply@parthivnair.com)

**Note:** Without `SENDGRID_API_KEY`, the backend will fall back to console logging.

## Frontend Integration

The frontend contact form sends POST requests to `/api/contact` with:

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

## Security Features

- CORS configured for specific origins
- Input validation with Pydantic
- Error handling and logging
- Rate limiting ready (can be added with slowapi)
