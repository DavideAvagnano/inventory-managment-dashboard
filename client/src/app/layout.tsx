import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { DashboardWrapper } from "@/components/dashboard-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}

/*
- app/layout.tsx → Global Root Layout of the app.
    - Wraps every page in the DashboardWrapper component.
    - Its `children` is app/page.tsx, which also serves as the children of the wrapper.

- app/dashboard-wrapper.tsx → Secondary layout.
    - Includes Sidebar and Navbar.
    - Receives `children` from the Root Layout (i.e., app/page.tsx) and renders it.

- app/page.tsx → Main page (route "/").
    - It is the `children` of the Layout which is passed also to the wrapper.
    - Imports and renders the content of app/dashboard/page.tsx.

- app/dashboard/page.tsx → Final content of the dashboard.
*/
