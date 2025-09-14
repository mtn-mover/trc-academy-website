# TRC Training Academy Website

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

## 🎯 Overview

The official website for TRC Training Academy - a transformative coaching certification program designed specifically for mature professionals (45+) seeking to make their mark in the coaching world. Built with modern web technologies to ensure accessibility, performance, and a premium user experience.

### 🌟 Key Features

- **Professional Design**: Clean, modern interface optimized for mature professionals
- **Accessible Typography**: Large, readable fonts with high contrast for 45+ demographic
- **Responsive Layout**: Seamless experience across all devices
- **Student Portal**: Secure login system for enrolled students
- **Course Information**: Comprehensive details about the Professional Coach Certification Program
- **Soul-Centered Messaging**: Content that resonates with professionals seeking meaningful second careers

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/trc-academy-website.git
   cd trc-academy-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables (optional)**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
trc-academy-website/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── coaching-training/ # Coach training program details
│   ├── contact/           # Contact form page
│   ├── login/            # Student login portal
│   ├── student/          # Student dashboard (protected)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── src/
│   └── components/       # Reusable React components
│       ├── Header.tsx    # Navigation header
│       └── Footer.tsx    # Site footer
├── public/
│   └── images/          # Static images
├── package.json         # Dependencies and scripts
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠 Technology Stack

- **Framework**: [Next.js 15.5.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com)
- **Package Manager**: npm/yarn
- **Font**: Inter (optimized for readability)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Deploy to Vercel (after setup)
```

## 🌐 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (if needed)
   - Deploy!

3. **Automatic Deployments**
   - Every push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests

### Environment Variables

Create a `.env.local` file with these variables (optional):

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact Form (optional)
CONTACT_EMAIL_TO=info@trcacademy.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

## 🎨 Design System

### Colors
- **Primary Blue**: TRC Blue (#4f46e5)
- **Accent Gold**: TRC Gold (#d97706)
- **Neutral Gray**: TRC Gray scale
- **Alert Orange**: (#ea580c)

### Typography
- **Font Family**: Inter (sans-serif)
- **Base Size**: 18px for optimal readability
- **Heading Scale**: Responsive sizing for different screens

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing component structure
- Maintain accessibility standards (WCAG 2.1 AA)
- Test on multiple devices and browsers

## 📄 License

This project is proprietary software for TRC Training Academy. All rights reserved.

## 📞 Contact

TRC Training Academy
- Website: [trctrainingacademy.com](https://trctrainingacademy.com)
- Email: info@trcacademy.com
- Phone: +1 (555) 123-4567
- Location: Denver, CO

## 🙏 Acknowledgments

- Built with ❤️ for mature professionals seeking their soul's calling
- Special thanks to Karen Florence, TRC Founder
- Powered by modern web technologies for the best user experience

---

© 2025 TRC Training Academy. All rights reserved.