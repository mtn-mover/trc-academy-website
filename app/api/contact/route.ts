import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key (you'll need to add this to your .env file)
// Use a placeholder key if not set to avoid build errors
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export async function POST(request: Request) {
  // Check if API key is properly configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_YOUR_RESEND_API_KEY') {
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact us directly at karen@tabularasacoaching.com' },
      { status: 503 }
    );
  }

  try {
    const { name, email, phone, interest, message } = await request.json();

    // Validate required fields
    if (!name || !email || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email to Karen
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
      <hr>
      <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
    `;

    // Send email to Karen
    // Note: Using onboarding@resend.dev as sender until tabularasacoaching.com is verified
    const adminEmail = await resend.emails.send({
      from: 'TRC Contact Form <onboarding@resend.dev>',
      to: 'karen@tabularasacoaching.com',
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailHtml,
      replyTo: email,
    });

    // Check if admin email was sent successfully
    if (adminEmail.error) {
      console.error('Email send error:', JSON.stringify(adminEmail.error, null, 2));
      console.error('Admin email result:', adminEmail);
      return NextResponse.json(
        { error: 'Failed to send email notification', details: adminEmail.error?.message || 'Unknown error' },
        { status: 500 }
      );
    }

    // Note: Customer confirmation email is temporarily disabled until domain verification
    // Once domain is verified in Resend, we can re-enable sending confirmation emails to customers
    console.log(`Contact form submission from ${name} (${email}) - Admin notified successfully`);

    /* Temporarily disabled - uncomment after domain verification
    const customerEmail = await resend.emails.send({
      from: 'TRC Training Academy <onboarding@resend.dev>',
      to: email,
      subject: 'Thank You for Contacting TRC Training Academy',
      html: customerEmailHtml,
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. Karen will respond within 24 hours.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}