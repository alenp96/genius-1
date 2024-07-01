import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'
import { CrispProvider } from '@/components/crisp-provider'
import { Providers } from "./providers";
import './globals.css'
import "regenerator-runtime/runtime";
import "core-js/stable";


const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIBreakupAdvisor',
  description: 'Get personalized AI breakup support 24/7. Expert advice, emotional guidance, and practical tips to help you heal and move forward.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <CrispProvider /> */}
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
