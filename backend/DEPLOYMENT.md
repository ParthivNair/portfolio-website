# Backend Deployment Guide

## Vercel Deployment

### Prerequisites

- GitHub repository with the backend code
- Vercel account connected to GitHub

### Step-by-Step Deployment

1. **Create New Project in Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project Settings**

   - **Framework Preset**: Other
   - **Root Directory**: `backend/`
   - **Build Command**: Leave empty (not needed for Python)
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

3. **Environment Variables** (Required for email)

   ```
   SENDGRID_API_KEY=SG.your-sendgrid-api-key-here
   RECIPIENT_EMAIL=parthivnair1@gmail.com
   SENDER_EMAIL=noreply@parthivnair.com
   ```

   **📋 See `SETUP_SENDGRID.md` for detailed SendGrid configuration**

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically detect the `vercel.json` configuration
   - The API will be available at your assigned Vercel URL

### Custom Domain Setup

1. **Add Domain in Vercel**

   - Go to Project Settings > Domains
   - Add `api.parthivnair.com`

2. **DNS Configuration**

   - Add CNAME record: `api.parthivnair.com` → `your-project.vercel.app`

3. **Update CORS Origins**
   - The FastAPI app is already configured for `https://parthivnair.com`
   - No changes needed if using the expected domain

### Verification

After deployment, test these endpoints:

- `https://api.parthivnair.com/` - Root endpoint
- `https://api.parthivnair.com/health` - Health check
- `https://api.parthivnair.com/docs` - API documentation
- `https://api.parthivnair.com/api/contact` - Contact form endpoint

### Monitoring

- **Vercel Dashboard**: View deployment logs and analytics
- **Function Logs**: Check for any runtime errors
- **Performance**: Monitor response times and usage

### Troubleshooting

**Common Issues:**

1. **CORS Errors**

   - Verify frontend domain is in `allow_origins` list
   - Check browser console for specific CORS errors

2. **Import Errors**

   - Ensure all dependencies are in `requirements.txt`
   - Check Python version compatibility

3. **Function Timeout**

   - Vercel functions have a 10-second timeout limit
   - Optimize email sending for production use

4. **Environment Variables**
   - Set in Vercel dashboard under Project Settings
   - Redeploy after adding new environment variables

### Email Integration Status

✅ **SendGrid Integration Complete**

- Real email sending is now implemented
- Falls back to console logging if SendGrid not configured
- Beautiful HTML email templates included
- Reply-to functionality for direct responses

**Next Steps:**

1. Follow `SETUP_SENDGRID.md` to configure SendGrid
2. Add environment variables to Vercel
3. Deploy and test email functionality
