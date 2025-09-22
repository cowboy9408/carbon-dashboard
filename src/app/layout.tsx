import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Dashboard",
  description: "Carbon Emissions Dashboard Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <div className="flex">
          {/* 왼쪽 사이드바 */}
          <aside className="w-72 p-4 border-r bg-white hidden md:block">
            <h2 className="text-lg font-semibold mb-4">Carbon Dashboard</h2>
            <div className="text-xs text-gray-500">Navigation Drawer</div>
          </aside>
          {/* 메인 영역 */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
