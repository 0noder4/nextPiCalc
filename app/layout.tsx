import type { Metadata } from "next";
import "@/styles/css/index.css";

export const metadata: Metadata = {
  title: "Next Pi Calculator",
  description: "Calculate pi with just one click",
  creator: "Bartosz Kuklewski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
