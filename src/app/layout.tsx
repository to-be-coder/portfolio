import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: "Jessica Cheng's UX Portfolio",
  description:
    'UX designer portfolio showcasing thoughtful, privacy-first product design, scalable systems, and ethical AI experiences. Highlights include design for iteration, technical collaboration, and user-centered problem solving.',
  openGraph: {
    title: "Jessica Cheng's UX Portfolio",
    description:
      'UX designer portfolio showcasing thoughtful, privacy-first product design, scalable systems, and ethical AI experiences. Highlights include design for iteration, technical collaboration, and user-centered problem solving.',
    url: 'https://jessicacheng.studio',
    siteName: "Jessica Cheng's UX Portfolio",
    images: [
      {
        url: '/cover.png',
        width: 1200,
        height: 630,
        alt: "Jessica Cheng's UX Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jessica Cheng's UX Portfolio",
    description:
      'UX designer portfolio showcasing thoughtful, privacy-first product design, scalable systems, and ethical AI experiences. Highlights include design for iteration, technical collaboration, and user-centered problem solving.',
    images: ['/cover.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6412780,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
