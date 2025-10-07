# Google reCAPTCHA v3 Setup Instructions

This document provides step-by-step instructions for setting up Google reCAPTCHA v3 on the TRC Academy website contact form.

## Overview

Google reCAPTCHA v3 has been implemented to protect the contact form from spam and abuse. It runs invisibly in the background and scores user interactions from 0.0 (likely a bot) to 1.0 (likely a human).

## Features

- ✅ Invisible reCAPTCHA (no user interaction required)
- ✅ Client-side token generation
- ✅ Server-side verification
- ✅ Score-based spam detection (threshold: 0.5)
- ✅ Privacy Policy updated with reCAPTCHA disclosure
- ✅ Mobile-friendly implementation

## Setup Steps

### 1. Get reCAPTCHA Keys from Google

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click "Create" or "+" to register a new site
4. Fill in the form:
   - **Label**: TRC Academy Website
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `trc-academy-website.vercel.app` (or your Vercel URL)
     - `tabularasacoaching.com` (if you have a custom domain)
     - `localhost` (for local development)
   - Accept the reCAPTCHA Terms of Service
5. Click "Submit"
6. You'll receive two keys:
   - **Site Key** (starts with `6L...`) - Used on the frontend
   - **Secret Key** (starts with `6L...`) - Used on the backend

### 2. Add Keys to Environment Variables

#### Local Development (.env.local)

The keys have already been added to `.env.local` with placeholder values. Replace them with your actual keys:

```env
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-site-key-here"
RECAPTCHA_SECRET_KEY="your-secret-key-here"
```

Replace:
- `your-site-key-here` with your actual **Site Key**
- `your-secret-key-here` with your actual **Secret Key**

#### Production (Vercel)

Add the environment variables to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project (trc-academy-website)
3. Go to **Settings** → **Environment Variables**
4. Add two new variables:
   - Name: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
     - Value: Your Site Key
     - Environment: Production, Preview, Development
   - Name: `RECAPTCHA_SECRET_KEY`
     - Value: Your Secret Key
     - Environment: Production, Preview, Development
5. Click "Save"
6. Redeploy your application for changes to take effect

### 3. Test the Implementation

#### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page: `http://localhost:3000/contact`

3. Fill out and submit the contact form

4. Check the browser console for reCAPTCHA messages

5. Check the server terminal for verification messages:
   - Success: `reCAPTCHA verified successfully (score: 0.9)`
   - Failure: `reCAPTCHA verification failed: ...`

#### Production Testing

1. Deploy your changes to Vercel (push to GitHub)

2. Visit your production contact page

3. Submit a test form

4. Verify that:
   - The form submits successfully
   - You receive the confirmation email
   - No console errors appear

### 4. Monitor reCAPTCHA Analytics

1. Go back to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on your site
3. View analytics dashboard to monitor:
   - Request volume
   - Score distribution
   - Suspicious activity

## Configuration Options

### Adjust Score Threshold

The default score threshold is `0.5`. You can adjust this in `src/lib/recaptcha.ts`:

```typescript
// Check score threshold (0.0 = very likely a bot, 1.0 = very likely a good interaction)
const threshold = 0.5; // Adjust this value (recommended: 0.3 - 0.7)
```

Lower values (e.g., 0.3) = More lenient, fewer false positives, more spam may get through
Higher values (e.g., 0.7) = More strict, fewer spam, more false positives

### Action Names

The current action name is `submit_contact_form`. This helps you track different forms separately in reCAPTCHA analytics.

## Troubleshooting

### Issue: reCAPTCHA badge not showing

**Solution**: This is intentional for v3. The badge is hidden by default. If you want to show it, remove the CSS that hides it.

### Issue: "Security verification failed"

**Possible causes**:
1. Site key or secret key is incorrect
2. Domain not registered in reCAPTCHA console
3. Score below threshold (likely a bot)

**Solution**:
- Double-check your keys in environment variables
- Ensure your domain is registered in Google reCAPTCHA console
- Check server logs for specific error messages

### Issue: Form works without reCAPTCHA

**Expected behavior**: If reCAPTCHA keys are not configured or set to placeholder values, the form will still work (fail-open design). This prevents the form from breaking if reCAPTCHA is unavailable.

### Issue: Low scores for legitimate users

**Solution**:
- Lower the threshold in `src/lib/recaptcha.ts`
- Check if the user's browser has cookies/JavaScript enabled
- Test from different browsers/devices

## Files Modified

The following files were created or modified for this implementation:

1. **Created**: `src/lib/recaptcha.ts` - reCAPTCHA utility functions
2. **Modified**: `app/contact/page.tsx` - Contact form with reCAPTCHA integration
3. **Modified**: `app/api/contact/route.ts` - API endpoint with server-side verification
4. **Modified**: `app/privacy-policy/page.tsx` - Added reCAPTCHA disclosure
5. **Modified**: `.env.local` - Added environment variable placeholders

## Privacy & Compliance

### Privacy Policy

The Privacy Policy has been updated to include information about reCAPTCHA data collection. Users are informed that:
- Google reCAPTCHA v3 is used on the contact form
- Hardware and software information is collected
- Data is processed according to Google's Privacy Policy

### User Notice

A small notice appears below the contact form submit button:
> "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."

### GDPR Compliance

reCAPTCHA v3 is designed to be GDPR-compliant. However, you should:
- Include reCAPTCHA in your Privacy Policy ✅ (Done)
- Inform users about data collection ✅ (Done)
- Provide links to Google's policies ✅ (Done)

## Support

For issues with Google reCAPTCHA:
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Support](https://support.google.com/recaptcha)

For implementation questions:
- Review this documentation
- Check the code comments in the modified files
- Test locally before deploying to production

## Summary

Once you've completed the setup steps above, your contact form will be protected by invisible spam protection that doesn't impact the user experience. Users won't see any CAPTCHA challenges, but bots and spam will be automatically blocked.

**Remember to**:
1. ✅ Get your reCAPTCHA keys from Google
2. ✅ Add them to .env.local (local) and Vercel (production)
3. ✅ Test the contact form
4. ✅ Monitor reCAPTCHA analytics

Good luck! 🚀
