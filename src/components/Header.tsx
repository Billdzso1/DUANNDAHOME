
"use client";

import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      {/* Khu vực bên trái */}
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu"
          onClick={onMenuClick}
          aria-label="Mở menu"
        >
          <Menu size={23} />
        </button>

        <div className="breadcrumb">
          <span>Trang chủ</span>
          <span className="breadcrumb-separator">/</span>
          <strong>Tổng quan</strong>
        </div>
      </div>

      {/* Khu vực bên phải */}
      <div className="header-right">
        {/* Ô tìm kiếm */}
        <div className="header-search">
          <Search size={18} />

          <input
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm"
          />
        </div>

        {/* Thông báo */}
        <button
          type="button"
          className="notification-button"
          aria-label="Thông báo"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        {/* Thông tin tài khoản */}
        <button
          type="button"
          className="user-profile"
          aria-label="Thông tin tài khoản"
        >
          <div className="user-avatar">AD</div>

          <div className="user-info">
            <strong>Administrator</strong>
            <span>Quản trị viên</span>
          </div>

          <ChevronDown size={17} />
        </button>
      </div>
    </header>
  );
}
