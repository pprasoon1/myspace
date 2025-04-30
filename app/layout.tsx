import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Portfolio Blog App",
  description: "Personal portfolio and blog with chat",
};

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="pt-14">        
          {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
