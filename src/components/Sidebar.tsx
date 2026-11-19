
"use client";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Building2,
  Users,
  UserRound,
  Building,
  Settings,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard },
  { name: "Quản lý thu chi", href: "/transactions", icon: ArrowLeftRight },
  { name: "Danh mục thu chi", href: "/categories", icon: Tags },
  { name: "Nhà / Phòng", href: "/properties", icon: Building2 },
  { name: "Khách hàng", href: "/customers", icon: Users },
  { name: "Nhân viên", href: "/employees", icon: UserRound },
  { name: "Phòng ban", href: "/departments", icon: Building },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Lớp phủ khi mở menu trên điện thoại */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>

        {/* LOGO VÀ TÊN CÔNG TY */}
        <div className="sidebar-brand">

          <div className="brand-logo">
            <img
              src="/ndahome.png"
              alt="Logo NDAHOME"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div className="brand-text">
            <h2>NDAHOME</h2>
            <span>MANAGEMENT SYSTEM</span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU CHÍNH */}
        <div className="sidebar-label">
          MENU CHÍNH
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`sidebar-link ${active ? "active" : ""}`}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* KHU VỰC HỆ THỐNG */}
        <div className="sidebar-bottom">

          <div className="sidebar-label">
            HỆ THỐNG
          </div>

          <Link
            href="/settings"
            onClick={onClose}
            className={`sidebar-link ${
              pathname === "/settings" ? "active" : ""
            }`}
          >
            <Settings size={19} strokeWidth={1.8} />
            <span>Cài đặt</span>
          </Link>

          {/* THÔNG TIN PHIÊN BẢN */}
          <div className="sidebar-version">
            <span>© 2026 NDAHOME</span>
            <span>Version 1.0.0</span>
          </div>

        </div>
      </aside>
    </>
  );
}
