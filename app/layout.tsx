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

export const metadata: Metadata = {
  title: "Vitanoid",
  description: "Филтър за пречистване на вода",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative mx-auto min-h-screen max-w-7xl bg-slate-900 px-6 py-12 pt-0 font-sans leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 max-md:p-0 md:px-12 md:py-16 lg:py-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fixed inset-0 z-0 bg-black/80"></div>
        {children}
        <h1 className="lg fixed -bottom-20 -left-8 -z-10 hidden bg-transparent opacity-10 select-none lg:block">
          {/* <Image
            src="/images/vn..svg"
            alt="VN."
            width={700}
            height={700}
            sizes="100vw"
          /> */}
        </h1>
      </body>
    </html>
  );
}
