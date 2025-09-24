# Contact Form Setup Instructions

## Overview
The contact form on the TRC Training Academy website uses Resend for email delivery. When a visitor submits the form:
1. An email is sent to Karen at karen@tabularasacoaching.com
2. The visitor receives a confirmation email
3. A success message is displayed on the page

## Setup Requirements

### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Add and Verify Your Domain
1. In Resend dashboard, go to "Domains"
2. Add domain: `tabularasacoaching.com`
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)

### 3. Get Your API Key
1. Go to "API Keys" in Resend dashboard
2. Create a new API key with "Send emails" permission
3. Copy the API key (starts with `re_`)

### 4. Configure Environment Variables

#### For Local Development
Add to your `.env` or `.env.local` file:
```
RESEND_API_KEY="re_YOUR_ACTUAL_API_KEY_HERE"
```

#### For Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add variable:
   - Name: `RESEND_API_KEY`
   - Value: Your actual Resend API key
   - Environment: Production

## Testing the Contact Form

### Local Testing
1. Make sure your `.env` file has the correct API key
2. Run `npm run dev`
3. Navigate to http://localhost:3000/contact
4. Fill out and submit the form

### Production Testing
After deploying with the environment variable set:
1. Visit your live site's contact page
2. Submit a test form
3. Check that both emails are received

## Email Configuration Details

### Email to Karen (Admin)
- **To:** karen@tabularasacoaching.com
- **From:** noreply@tabularasacoaching.com
- **Reply-To:** The visitor's email address
- **Subject:** New Contact Form Submission from [Name]
- **Content:** All form fields formatted in HTML

### Confirmation Email to Visitor
- **To:** Visitor's email address
- **From:** noreply@tabularasacoaching.com
- **Subject:** Thank You for Contacting TRC Training Academy
- **Content:** Confirmation message with submission details

## Troubleshooting

### Form Shows "Unable to send your message"
1. Check that RESEND_API_KEY is set correctly
2. Verify your domain is verified in Resend
3. Check browser console for errors
4. Check Vercel Functions logs for detailed error messages

### Emails Not Being Received
1. Check spam/junk folders
2. Verify domain is properly configured in Resend
3. Check Resend dashboard for email logs
4. Ensure the from address domain is verified

### Domain Verification Issues
1. Ensure all DNS records are added exactly as provided
2. Wait at least 30 minutes for DNS propagation
3. Use Resend's verification checker in the dashboard

## Support

For Resend-specific issues:
- Documentation: https://resend.com/docs
- Support: support@resend.com

For website issues:
- Contact the development team