import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TravelAI",
  description: "Your AI language companion. Powered by OpenAI, it enhances your travelling, conversations, and more!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider frontendApi={process.env.CLERK_SECRET_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>

  );
}
