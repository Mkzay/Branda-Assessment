import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/bricolage-grotesque';
import './globals.css';
import './refinements.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'),
  ),
  title: { default: 'Branda | Every brand, built better', template: '%s' },
  description:
    'Discover and order creative, digital, gifting, studio, and print services in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
