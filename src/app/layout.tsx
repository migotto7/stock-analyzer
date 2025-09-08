import { Outfit } from "next/font/google";
import "./globals.css";
import HomeButton from "@/components/HomeButton";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
})

export const metadata = {
  title: "Ibovespa Stock Analyzer",
  description: "Analise ações brasileiras em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <HomeButton />
        {children}
      </body>
    </html>
  );
}
