import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import Providers from "./providers";
import Loading from "./loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RouteAI",
  description: "Your AI language companion. Powered by OpenAI, it enhances your travelling, conversations, and more!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
