import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Read farcaster config at build time
const getFarcasterConfig = () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(process.cwd(), 'public/.well-known/farcaster.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configContent);
  } catch (error) {
    // Fallback config if file read fails
    return {
      miniapp: {
        name: 'Create Invoice Easy',
        buttonTitle: 'Launch Create Invoice Easy',
        homeUrl: process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://example.com',
        imageUrl: process.env.NEXT_PUBLIC_APP_DOMAIN 
          ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}/og-image.png`
          : 'https://example.com/og-image.png',
        splashImageUrl: process.env.NEXT_PUBLIC_APP_DOMAIN 
          ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}/splash.png`
          : 'https://example.com/splash.png',
        splashBackgroundColor: '#0ea5e9'
      }
    };
  }
};

const farcasterConfig = getFarcasterConfig();

export const metadata: Metadata = {
  title: {
    default: 'Create Invoice Easy',
    template: '%s | Create Invoice Easy',
  },
  description: 'Create Invoice Easy helps you craft professional invoices for your clients in seconds.',
  keywords: ['Create Invoice Easy', 'invoice generator', 'billing', 'finance', 'small business'],
  authors: [{ name: 'Create Invoice Easy Team' }],
  creator: 'Create Invoice Easy',
  publisher: 'Create Invoice Easy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Create Invoice Easy',
    description: 'Generate polished invoices instantly with Create Invoice Easy.',
    url: '/',
    siteName: 'Create Invoice Easy',
    locale: 'en_US',
    type: 'website',
    images: farcasterConfig.miniapp.imageUrl ? [
      {
        url: farcasterConfig.miniapp.imageUrl,
        alt: 'Preview of Create Invoice Easy',
      },
    ] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Invoice Easy',
    description: 'Generate polished invoices instantly with Create Invoice Easy.',
    images: farcasterConfig.miniapp.imageUrl ? [farcasterConfig.miniapp.imageUrl] : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
  },
  other: {
    // Farcaster Mini App metadata for sharing
    'fc:miniapp': JSON.stringify({
      version: '1',
      imageUrl: farcasterConfig.miniapp.imageUrl,
      button: {
        title: farcasterConfig.miniapp.buttonTitle,
        action: {
          type: 'launch_miniapp',
          name: farcasterConfig.miniapp.name,
          url: farcasterConfig.miniapp.homeUrl,
          splashImageUrl: farcasterConfig.miniapp.splashImageUrl,
          splashBackgroundColor: farcasterConfig.miniapp.splashBackgroundColor
        }
      }
    }),
    // Backward compatibility with Frames v2
    'fc:frame': JSON.stringify({
      version: '1',
      imageUrl: farcasterConfig.miniapp.imageUrl,
      button: {
        title: farcasterConfig.miniapp.buttonTitle,
        action: {
          type: 'launch_frame',
          name: farcasterConfig.miniapp.name,
          url: farcasterConfig.miniapp.homeUrl,
          splashImageUrl: farcasterConfig.miniapp.splashImageUrl,
          splashBackgroundColor: farcasterConfig.miniapp.splashBackgroundColor
        }
      }
    })
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
