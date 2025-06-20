# SendGrid Setup Guide

## 1. Create SendGrid Account

1. Go to [SendGrid.com](https://sendgrid.com/)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

## 2. Create API Key

1. **Login to SendGrid Dashboard**
2. **Go to Settings → API Keys**
3. **Click "Create API Key"**
4. **Choose "Restricted Access"** (recommended)
5. **Set permissions:**
   - Mail Send: Full Access
   - All other permissions: No Access
6. **Name it**: `Portfolio Contact Form`
7. **Copy the API key** (you won't see it again!)

## 3. Verify Sender Identity

### Option A: Single Sender Verification (Easiest)

1. **Go to Settings → Sender Authentication**
2. **Click "Verify a Single Sender"**
3. **Enter your email** (e.g., `noreply@parthivnair.com`)
4. **Fill out the form** and verify via email

### Option B: Domain Authentication (Professional)

1. **Go to Settings → Sender Authentication**
2. **Click "Authenticate Your Domain"**
3. **Enter your domain** (`parthivnair.com`)
4. **Add DNS records** as instructed by SendGrid

## 4. Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**
2. **Select your backend project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

```
SENDGRID_API_KEY=SG.your-actual-api-key-here
RECIPIENT_EMAIL=parthivnair1@gmail.com
SENDER_EMAIL=noreply@parthivnair.com
```

**Important Notes:**

- Use the **exact** email you verified in Step 3 for `SENDER_EMAIL`
- `RECIPIENT_EMAIL` is where contact form messages will be sent
- Keep your API key secure and never commit it to code

## 5. Test the Integration

After deployment, test by:

1. Submitting the contact form on your website
2. Check your email for the contact form submission
3. Check Vercel function logs for any errors

## 6. Monitor Usage

- **SendGrid Dashboard**: View email delivery stats
- **Free Tier Limit**: 100 emails/day
- **Upgrade**: Available if you need more emails

## Troubleshooting

**Common Issues:**

1. **"Forbidden" Error**

   - Check API key permissions
   - Ensure Mail Send is set to "Full Access"

2. **"Sender Not Verified"**

   - Verify your sender email in SendGrid
   - Use exact same email in `SENDER_EMAIL`

3. **Emails Not Received**

   - Check spam folder
   - Verify recipient email is correct
   - Check SendGrid activity logs

4. **Domain Authentication Issues**
   - DNS records can take up to 48 hours to propagate
   - Use Single Sender Verification as backup
