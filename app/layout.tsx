import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "Lucidify | Web Development to Boost Your Business",
  description: "Affordable, custom websites designed to boost your business. Expert web solutions tailored to your needs. Located in Charlotte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const header = (
    <Navbar />
  )

  const footer = (
    <Footer />
  )

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white`}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
