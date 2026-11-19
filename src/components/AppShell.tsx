"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Building2,
  FolderKanban,
  ReceiptText,
  Home,
  UserCheck,
  Settings,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/", label: "Tổng quan", icon: Home },
  { href: "/transactions", label: "Quản lý thu chi", icon: ReceiptText },
  { href: "/categories", label: "Danh mục thu chi", icon: FolderKanban },
  { href: "/properties", label: "Nhà / Phòng", icon: Building2 },
  { href: "/customers", label: "Khách hàng", icon: Users },
  { href: "/employees", label: "Nhân viên", icon: UserCheck },
  { href: "/departments", label: "Phòng ban", icon: Building2 },
  { href: "/settings", label: "Cài đặt", icon: Settings },
];

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-between">
      <div>
        {/* THANH MENU NGANG PHÍA TRÊN */}
        <header className="bg-white border-b border-[#eeeeee] sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#d9a526] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                N
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-[#252525] tracking-wide">NDAHOME</h1>
                <p className="text-[9px] text-gray-400 tracking-wider">MANAGEMENT SYSTEM</p>
              </div>
            </div>

            {/* Menu Links Ngang (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#fff6df] text-[#bd8c16] font-bold border-b-2 border-[#d9a526]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#bd8c16]"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right profile & Mobile menu button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#fff6df] px-3 py-1.5 rounded-full border border-[#d9a526]/30">
                <div className="w-7 h-7 rounded-full bg-[#d9a526] text-white flex items-center justify-center font-bold text-xs">
                  AD
                </div>
                <span className="text-xs font-bold text-[#bd8c16] hidden sm:inline">Admin</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Menu thu gọn trên Mobile */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-[#eeeeee] px-4 py-3 space-y-1 shadow-md">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                      isActive
                        ? "bg-[#fff6df] text-[#bd8c16] font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </header>

        {/* NỘI DUNG CHÍNH CỦA TRANG */}
        <main className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* PHẦN FOOTER THÔNG TIN CÔNG TY (HIỂN THỊ Ở MỌI TRANG) */}
      <footer className="bg-[#0A192F] text-white pt-12 pb-6 px-6 lg:px-12 mt-16 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Cột 1 & 2: Logo và giới thiệu */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif font-bold tracking-[0.25em] text-[#D4AF37]">NDA HOME</span>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Cầu nối uy tín giữa người cho thuê và người cần thuê.
            </p>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Liên kết nhanh</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Trang chủ</Link></li>
              <li><Link href="/properties" className="hover:text-[#D4AF37] transition-colors">Tìm nhà cho thuê</Link></li>
              <li><Link href="/settings" className="hover:text-[#D4AF37] transition-colors">Về chúng tôi</Link></li>
            </ul>
          </div>

          {/* Cột 4: Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Hỗ trợ</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>

          {/* Cột 5: Thông tin liên hệ chuẩn theo ảnh */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Liên hệ</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Tòa nhà More Building, Số 36 Mạc Đĩnh Chi, Phường Tân Định, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37] shrink-0" />
                <span>098.48.43.052</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37] shrink-0" />
                <span>contact@ndahome.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-gray-800 text-center text-xs text-gray-400">
          © 2026 NDA Home. All rights reserved.
        </div>
      </footer>
    </div>
  );
}