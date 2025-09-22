import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Dashboard",
  description: "Carbon Emissions Dashboard Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <div className="flex min-h-screen">
          {/* 왼쪽 Drawer */}
          <aside className="hidden md:block w-72 border-r bg-white shadow-sm">
            <div className="p-6 border-b">
              <h1 className="text-lg font-bold text-green-600">🌱 Carbon Dashboard</h1>
              <p className="text-xs text-gray-500 mt-1">Company emissions monitor</p>
            </div>
            {children}
          </aside>
          {/* 메인 영역 */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
