/**
 * Google reCAPTCHA v3 Verification Utility
 * https://developers.google.com/recaptcha/docs/v3
 */

export interface RecaptchaVerificationResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token on the server side
 * @param token - The reCAPTCHA token from the client
 * @param expectedAction - The expected action name (e.g., 'submit_contact_form')
 * @returns Promise with verification result
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string = 'submit'
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey || secretKey === 'your-secret-key-here') {
    console.warn('reCAPTCHA secret key not configured');
    return { success: true }; // Allow submission if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: RecaptchaVerificationResponse = await response.json();

    // Check if verification was successful
    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
      };
    }

    // Verify action matches
    if (data.action !== expectedAction) {
      console.error(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
      return {
        success: false,
        error: 'reCAPTCHA action mismatch',
      };
    }

    // Check score threshold (0.0 = very likely a bot, 1.0 = very likely a good interaction)
    const threshold = 0.5;
    if (data.score < threshold) {
      console.warn(`reCAPTCHA score too low: ${data.score}`);
      return {
        success: false,
        score: data.score,
        error: 'Suspicious activity detected. Please try again.',
      };
    }

    return {
      success: true,
      score: data.score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error: 'Failed to verify reCAPTCHA',
    };
  }
}

/**
 * Client-side function to execute reCAPTCHA and get token
 * @param action - Action name for this request
 * @returns Promise with reCAPTCHA token
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey || siteKey === 'your-site-key-here') {
    console.warn('reCAPTCHA site key not configured');
    return null;
  }

  try {
    // Wait for grecaptcha to be ready
    await new Promise<void>((resolve) => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve());
      } else {
        // If grecaptcha is not loaded, resolve anyway
        console.warn('grecaptcha not loaded');
        resolve();
      }
    });

    // Execute reCAPTCHA
    const token = await window.grecaptcha.execute(siteKey, { action });
    return token;
  } catch (error) {
    console.error('reCAPTCHA execution error:', error);
    return null;
  }
}

// Extend Window interface to include grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
