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

    // Confirmation email to customer
    const customerEmailHtml = `
      <h2>Thank You for Contacting TRC Training Academy</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry and appreciate your interest in our coaching certification program.</p>
      <p>Karen will personally review your message and respond within 24 hours.</p>
      <br>
      <h3>Your Submission Details:</h3>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      <br>
      <p>In the meantime, feel free to explore our <a href="https://trc-academy-website.vercel.app/coaching-training">coaching training program</a> for more information.</p>
      <br>
      <p>Warm regards,</p>
      <p><strong>Karen Walker</strong><br>
      Founder, TRC Training Academy<br>
      Email: karen@tabularasacoaching.com<br>
      Phone: +1 610 228 4145</p>
    `;

    // Send email to Karen
    const adminEmail = await resend.emails.send({
      from: 'TRC Contact Form <noreply@tabularasacoaching.com>',
      to: 'karen@tabularasacoaching.com',
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailHtml,
      replyTo: email,
    });

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: 'TRC Training Academy <noreply@tabularasacoaching.com>',
      to: email,
      subject: 'Thank You for Contacting TRC Training Academy',
      html: customerEmailHtml,
    });

    // Check if emails were sent successfully
    if (adminEmail.error || customerEmail.error) {
      console.error('Email send error:', adminEmail.error || customerEmail.error);
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. You will receive a confirmation email shortly.'
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