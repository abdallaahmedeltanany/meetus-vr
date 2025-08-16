import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meetus-ar",
  description:
    "Enhancing e-commerce with AI-driven chat services and immersive VR events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abeezee.className} antialiased `}
        style={{
          backgroundColor: "#E9ECF2",
          margin: 0,
          padding: 0,
          overflowY: "hidden",
        }}
      >
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </body>
    </html>
  );
}
