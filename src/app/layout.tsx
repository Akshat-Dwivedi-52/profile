import "./styles/globals.css";
import "./styles/new.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Libre_Baskerville, Newsreader } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"]});
const libreBaskerville = Libre_Baskerville({variable: "--font-libre-baskerville", subsets: ["latin"], style: ["normal", "italic"]});

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"] });

// Runs before the page paints, so the saved (or system) theme is applied with no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export const metadata: Metadata = {
  title: "Akshat Dwivedi",
  description: "Founder & CEO at Sashvat Bharat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${newsreader.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}