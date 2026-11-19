
"use client";

<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
=======
import { useState } from "react";
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
import {
  Settings,
  Building2,
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  Camera,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
<<<<<<< HEAD
  Upload,
  Mail,
  Phone,
  MapPin,
  Globe,
  CalendarDays,
  Languages,
  Rows3,
  RotateCcw,
  AlertCircle,
  BriefcaseBusiness,
  CircleCheck,
  Info,
  X,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

type Tab =
  | "business"
  | "account"
  | "general"
  | "notifications"
  | "security";

type SettingsData = {
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    taxCode: string;
    website: string;
  };
  account: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  general: {
    currency: string;
    dateFormat: string;
    language: string;
    pageSize: string;
  };
  notifications: {
    rent: boolean;
    expense: boolean;
    contract: boolean;
    system: boolean;
  };
};

const STORAGE_KEY = "ndahome_system_settings";
const LOGO_STORAGE_KEY = "ndahome_business_logo";
const MAX_LOGO_SIZE = 2 * 1024 * 1024;

const defaultSettings: SettingsData = {
  business: {
=======
} from "lucide-react";

type Tab = "business" | "account" | "general" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("business");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    rent: true,
    expense: true,
    contract: true,
    system: false,
  });

  const [business, setBusiness] = useState({
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    name: "NDAHOME",
    phone: "0901234567",
    email: "contact@ndahome.vn",
    address: "Thành phố Hồ Chí Minh",
    taxCode: "",
    website: "",
<<<<<<< HEAD
  },
  account: {
=======
  });

  const [account, setAccount] = useState({
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    name: "Administrator",
    email: "admin@ndahome.vn",
    phone: "0901234567",
    position: "Quản trị viên",
<<<<<<< HEAD
  },
  general: {
=======
  });

  const [general, setGeneral] = useState({
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    currency: "VND",
    dateFormat: "DD/MM/YYYY",
    language: "vi",
    pageSize: "10",
<<<<<<< HEAD
  },
  notifications: {
    rent: true,
    expense: true,
    contract: true,
    system: false,
  },
};

const tabs = [
  { id: "business", label: "Doanh nghiệp", icon: Building2 },
  { id: "account", label: "Tài khoản", icon: UserRound },
  { id: "general", label: "Cài đặt chung", icon: Settings },
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "security", label: "Bảo mật", icon: ShieldCheck },
] as const;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("business");

  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );

  const [logo, setLogo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogoLoading, setIsLogoLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
=======
  });
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251

  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });

<<<<<<< HEAD
  // Đọc dữ liệu đã lưu
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedLogo = localStorage.getItem(LOGO_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setSettings({
          business: {
            ...defaultSettings.business,
            ...(parsed.business || {}),
          },
          account: {
            ...defaultSettings.account,
            ...(parsed.account || {}),
          },
          general: {
            ...defaultSettings.general,
            ...(parsed.general || {}),
          },
          notifications: {
            ...defaultSettings.notifications,
            ...(parsed.notifications || {}),
          },
        });
      }

      if (storedLogo) {
        setLogo(storedLogo);
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu cài đặt:", error);
      setToastType("error");
      setToast("Dữ liệu cài đặt bị lỗi hoặc không thể đọc.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Tự ẩn thông báo
  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function notify(
    message: string,
    type: "success" | "error" | "info" = "success"
  ) {
    setToastType(type);
    setToast(message);
  }

  // Cập nhật dữ liệu từng nhóm
  function updateSection<K extends keyof SettingsData>(
    section: K,
    field: keyof SettingsData[K],
    value: string | boolean
  ) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setSaved(false);
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone: string) {
    return !phone || /^[0-9+\s().-]{8,15}$/.test(phone);
  }

  // Chọn và đọc logo
  function handleLogoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    // Cho phép chọn lại cùng một ảnh
    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ];

    const isSvg = file.name.toLowerCase().endsWith(".svg");

    if (!allowedTypes.includes(file.type) && !isSvg) {
      notify("Chỉ hỗ trợ ảnh PNG, JPG, JPEG, WEBP hoặc SVG.", "error");
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      notify("Logo vượt quá 2 MB. Vui lòng chọn ảnh nhỏ hơn.", "error");
      return;
    }

    if (file.size === 0) {
      notify("Tệp ảnh không hợp lệ hoặc đang trống.", "error");
      return;
    }

    setIsLogoLoading(true);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        setIsLogoLoading(false);
        notify("Không thể đọc tệp logo.", "error");
        return;
      }

      setLogo(result);
      setSaved(false);
      setIsLogoLoading(false);
      notify("Đã tải logo lên. Nhấn Lưu cài đặt để hoàn tất.", "info");
    };

    reader.onerror = () => {
      setIsLogoLoading(false);
      notify("Có lỗi khi đọc ảnh. Vui lòng thử lại.", "error");
    };

    reader.readAsDataURL(file);
  }

  // Lưu cài đặt và logo
  function handleSave() {
    if (activeTab === "security") {
      if (!password.current || !password.next || !password.confirm) {
        notify("Vui lòng nhập đầy đủ thông tin mật khẩu.", "error");
=======
  const tabs = [
    { id: "business", label: "Doanh nghiệp", icon: Building2 },
    { id: "account", label: "Tài khoản", icon: UserRound },
    { id: "general", label: "Cài đặt chung", icon: Settings },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "security", label: "Bảo mật", icon: ShieldCheck },
  ] as const;

  function handleSave() {
    if (activeTab === "security") {
      if (!password.current || !password.next || !password.confirm) {
        alert("Vui lòng nhập đầy đủ thông tin mật khẩu.");
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
        return;
      }

      if (password.next.length < 8) {
<<<<<<< HEAD
        notify("Mật khẩu mới phải có ít nhất 8 ký tự.", "error");
=======
        alert("Mật khẩu mới phải có ít nhất 8 ký tự.");
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
        return;
      }

      if (password.next !== password.confirm) {
<<<<<<< HEAD
        notify("Mật khẩu xác nhận không khớp.", "error");
        return;
      }

      notify(
        "Thông tin hợp lệ. Cần kết nối API xác thực để đổi mật khẩu thật.",
        "info"
      );
      return;
    }

    if (activeTab === "business") {
      if (!settings.business.name.trim()) {
        notify("Vui lòng nhập tên doanh nghiệp.", "error");
        return;
      }

      if (
        settings.business.email &&
        !validateEmail(settings.business.email)
      ) {
        notify("Email doanh nghiệp không hợp lệ.", "error");
        return;
      }

      if (!validatePhone(settings.business.phone)) {
        notify("Số điện thoại doanh nghiệp không hợp lệ.", "error");
        return;
      }

      if (
        settings.business.website &&
        !/^https?:\/\/.+/i.test(settings.business.website)
      ) {
        notify("Website cần bắt đầu bằng http:// hoặc https://.", "error");
        return;
      }
    }

    if (activeTab === "account") {
      if (!settings.account.name.trim()) {
        notify("Vui lòng nhập họ và tên tài khoản.", "error");
        return;
      }

      if (
        settings.account.email &&
        !validateEmail(settings.account.email)
      ) {
        notify("Email tài khoản không hợp lệ.", "error");
        return;
      }

      if (!validatePhone(settings.account.phone)) {
        notify("Số điện thoại tài khoản không hợp lệ.", "error");
        return;
      }
    }

    try {
      // Lưu dữ liệu cài đặt
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

      // Lưu hoặc xóa logo
      if (logo) {
        localStorage.setItem(LOGO_STORAGE_KEY, logo);
      } else {
        localStorage.removeItem(LOGO_STORAGE_KEY);
      }

      setSaved(true);
      notify("Lưu cài đặt thành công!");
    } catch (error) {
      console.error("Lỗi lưu cài đặt:", error);

      notify(
        "Không thể lưu dữ liệu. Có thể bộ nhớ trình duyệt đã đầy. Hãy thử ảnh logo nhỏ hơn.",
        "error"
      );
    }
  }

  // Xóa logo
  function handleRemoveLogo() {
    if (!logo) return;

    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa logo doanh nghiệp không?"
    );

    if (!confirmed) return;

    setLogo("");
    setSaved(false);

    try {
      localStorage.removeItem(LOGO_STORAGE_KEY);
      notify("Đã xóa logo doanh nghiệp.");
    } catch {
      notify("Không thể xóa logo.", "error");
    }
  }

  // Khôi phục mặc định
  function handleReset() {
    const confirmed = window.confirm(
      "Bạn có chắc muốn khôi phục toàn bộ cài đặt về mặc định không? Logo hiện tại cũng sẽ bị xóa."
    );

    if (!confirmed) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
      localStorage.removeItem(LOGO_STORAGE_KEY);

      setSettings(defaultSettings);
      setLogo("");
      setPassword({
        current: "",
        next: "",
        confirm: "",
      });
      setSaved(true);

      notify("Đã khôi phục cài đặt mặc định.");
    } catch {
      notify("Không thể khôi phục cài đặt.", "error");
    }
  }

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab);
  const ActiveIcon = activeTabInfo?.icon || Settings;

  if (!isLoaded) {
    return (
      <div className="settings-page flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          Đang tải cài đặt...
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page min-h-screen bg-[#F7F8FA] p-4 text-slate-800 md:p-7">
      <style jsx global>{`
        html,
        body {
          font-family: "Times New Roman", Times, serif !important;
        }

        .settings-page,
        .settings-page *,
        .settings-page *::before,
        .settings-page *::after {
          font-family: "Times New Roman", Times, serif !important;
        }

        .settings-page input,
        .settings-page textarea,
        .settings-page select,
        .settings-page button,
        .settings-page option {
          font-family: "Times New Roman", Times, serif !important;
        }

        .settings-page input::placeholder,
        .settings-page textarea::placeholder {
          font-family: "Times New Roman", Times, serif !important;
        }

        .settings-tab {
          position: relative;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 12px;
          border-radius: 12px;
          padding: 13px 14px;
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          transition: all 0.2s ease;
        }

        .settings-tab:hover {
          background: #fffbeb;
          color: #b45309;
        }

        .settings-tab.active {
          background: #fef3c7;
          color: #92400e;
        }

        .settings-tab.active::before {
          position: absolute;
          left: 0;
          top: 10px;
          bottom: 10px;
          width: 4px;
          border-radius: 0 5px 5px 0;
          background: #f59e0b;
          content: "";
        }

        .settings-card {
          animation: settingsFade 0.22s ease-out;
        }

        @keyframes settingsFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .settings-save-button {
          transition: all 0.2s ease;
        }

        .settings-save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(245, 158, 11, 0.2);
        }

        .settings-switch {
          position: relative;
          display: inline-block;
          height: 24px;
          width: 44px;
          flex-shrink: 0;
        }

        .settings-switch input {
          height: 0;
          width: 0;
          opacity: 0;
        }

        .settings-switch-slider {
          position: absolute;
          inset: 0;
          cursor: pointer;
          border-radius: 999px;
          background: #cbd5e1;
          transition: 0.25s;
        }

        .settings-switch-slider::before {
          position: absolute;
          bottom: 3px;
          left: 3px;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          content: "";
          transition: 0.25s;
        }

        .settings-switch input:checked + .settings-switch-slider {
          background: #f59e0b;
        }

        .settings-switch input:checked + .settings-switch-slider::before {
          transform: translateX(20px);
        }

        .settings-switch input:focus-visible + .settings-switch-slider {
          outline: 3px solid #fde68a;
          outline-offset: 2px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: 700;
        }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
              <Settings size={15} />
              NDAHOME / HỆ THỐNG
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Cài đặt hệ thống
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Quản lý thông tin và tùy chỉnh hệ thống NDAHOME.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className={`${buttonBase} border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-amber-300 hover:bg-amber-50`}
            >
              <RotateCcw size={16} />
              Khôi phục mặc định
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`${buttonBase} settings-save-button bg-amber-400 text-slate-900 shadow-sm hover:bg-amber-300`}
            >
=======
        alert("Mật khẩu xác nhận không khớp.");
        return;
      }

      alert("Giao diện đã kiểm tra thông tin. Chức năng đổi mật khẩu sẽ hoạt động khi kết nối hệ thống xác thực.");
      setPassword({ current: "", next: "", confirm: "" });
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>Cài đặt hệ thống</h1>
          <p>Quản lý thông tin và tùy chỉnh hệ thống NDAHOME.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <div className="settings-sidebar-title">CÀI ĐẶT</div>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`settings-tab ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={19} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-main">
          {activeTab === "business" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Thông tin doanh nghiệp</h2>
                  <p>Thông tin đơn vị quản lý và vận hành hệ thống.</p>
                </div>
              </div>

              <div className="company-logo-area">
                <div className="company-logo">N</div>
                <div>
                  <strong>Logo doanh nghiệp</strong>
                  <p>Logo hiển thị trên hệ thống NDAHOME.</p>
                  <button type="button" className="btn-secondary">
                    <Camera size={16} />
                    Tải ảnh lên
                  </button>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="form-group">
                  <label>Tên doanh nghiệp *</label>
                  <input
                    value={business.name}
                    onChange={(e) =>
                      setBusiness({ ...business, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Mã số thuế</label>
                  <input
                    value={business.taxCode}
                    onChange={(e) =>
                      setBusiness({ ...business, taxCode: e.target.value })
                    }
                    placeholder="Nhập mã số thuế"
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={business.phone}
                    onChange={(e) =>
                      setBusiness({ ...business, phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={business.email}
                    onChange={(e) =>
                      setBusiness({ ...business, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Địa chỉ</label>
                  <input
                    value={business.address}
                    onChange={(e) =>
                      setBusiness({ ...business, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Website</label>
                  <input
                    value={business.website}
                    onChange={(e) =>
                      setBusiness({ ...business, website: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </section>
          )}

          {activeTab === "account" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Thông tin tài khoản</h2>
                  <p>Thông tin người đang quản trị hệ thống.</p>
                </div>
              </div>

              <div className="account-profile">
                <div className="account-avatar">AD</div>
                <div>
                  <strong>{account.name}</strong>
                  <p>{account.position}</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="form-group">
                  <label>Họ và tên *</label>
                  <input
                    value={account.name}
                    onChange={(e) =>
                      setAccount({ ...account, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Chức vụ</label>
                  <input
                    value={account.position}
                    onChange={(e) =>
                      setAccount({ ...account, position: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={account.phone}
                    onChange={(e) =>
                      setAccount({ ...account, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>
          )}

          {activeTab === "general" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Cài đặt chung</h2>
                  <p>Tùy chỉnh cách hiển thị dữ liệu trên hệ thống.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="form-group">
                  <label>Đơn vị tiền tệ</label>
                  <select
                    value={general.currency}
                    onChange={(e) =>
                      setGeneral({ ...general, currency: e.target.value })
                    }
                  >
                    <option value="VND">Việt Nam đồng (VND)</option>
                    <option value="USD">Đô la Mỹ (USD)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Định dạng ngày tháng</label>
                  <select
                    value={general.dateFormat}
                    onChange={(e) =>
                      setGeneral({ ...general, dateFormat: e.target.value })
                    }
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ngôn ngữ</label>
                  <select
                    value={general.language}
                    onChange={(e) =>
                      setGeneral({ ...general, language: e.target.value })
                    }
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Số dòng mỗi trang</label>
                  <select
                    value={general.pageSize}
                    onChange={(e) =>
                      setGeneral({ ...general, pageSize: e.target.value })
                    }
                  >
                    <option value="10">10 dòng</option>
                    <option value="20">20 dòng</option>
                    <option value="50">50 dòng</option>
                    <option value="100">100 dòng</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {activeTab === "notifications" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Cài đặt thông báo</h2>
                  <p>Chọn những loại thông báo bạn muốn nhận.</p>
                </div>
              </div>

              <div className="notification-settings">
                {[
                  {
                    key: "rent",
                    title: "Thông báo tiền thuê phòng",
                    description: "Nhắc nhở các khoản tiền thuê sắp đến hạn.",
                  },
                  {
                    key: "expense",
                    title: "Thông báo thu chi",
                    description: "Thông báo khi có giao dịch thu hoặc chi mới.",
                  },
                  {
                    key: "contract",
                    title: "Thông báo hợp đồng",
                    description: "Nhắc hợp đồng sắp hết hạn.",
                  },
                  {
                    key: "system",
                    title: "Thông báo hệ thống",
                    description: "Thông báo cập nhật và bảo trì hệ thống.",
                  },
                ].map((item) => (
                  <div className="notification-row" key={item.key}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={
                          notifications[item.key as keyof typeof notifications]
                        }
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked,
                          })
                        }
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <section className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Bảo mật tài khoản</h2>
                  <p>Thiết lập mật khẩu để bảo vệ tài khoản của bạn.</p>
                </div>
              </div>

              <div className="security-notice">
                <ShieldCheck size={22} />
                <div>
                  <strong>Bảo vệ tài khoản</strong>
                  <p>
                    Không chia sẻ mật khẩu với người khác. Hãy sử dụng mật khẩu
                    có ít nhất 8 ký tự.
                  </p>
                </div>
              </div>

              <div className="settings-form-grid one-column">
                <div className="form-group">
                  <label>Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    value={password.current}
                    onChange={(e) =>
                      setPassword({ ...password, current: e.target.value })
                    }
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>

                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password.next}
                      onChange={(e) =>
                        setPassword({ ...password, next: e.target.value })
                      }
                      placeholder="Nhập mật khẩu mới"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
              </div>

              <div className="security-note">
                <LockKeyhole size={17} />
                Chức năng đổi mật khẩu thật cần kết nối hệ thống đăng nhập.
              </div>
            </section>
          )}

          <div className="settings-save-bar">
            {saved && (
              <span className="save-success">
                <Check size={17} />
                Đã lưu thay đổi trên giao diện
              </span>
            )}

            <button className="btn-primary" onClick={handleSave}>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
              <Save size={17} />
              Lưu cài đặt
            </button>
          </div>
        </div>
<<<<<<< HEAD

        {/* SUMMARY */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-[#FFF7DF] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-amber-800">
                  Doanh nghiệp
                </p>
                <p className="mt-2 truncate text-lg font-bold text-slate-900">
                  {settings.business.name || "Chưa thiết lập"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Thông tin đơn vị quản lý
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-amber-100 text-amber-700">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo doanh nghiệp"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Building2 size={24} />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-[#EDF2FF] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-blue-800">
                  Tài khoản quản trị
                </p>
                <p className="mt-2 truncate text-lg font-bold text-slate-900">
                  {settings.account.name || "Chưa thiết lập"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {settings.account.position}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <UserRound size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-[#E8F8EF] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Thông báo đang bật
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {
                    Object.values(settings.notifications).filter(Boolean)
                      .length
                  }
                  /4
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Nhóm thông báo được kích hoạt
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Bell size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* SETTINGS LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 px-3 py-2 text-xs font-bold tracking-[0.16em] text-slate-400">
              DANH MỤC CÀI ĐẶT
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                    className={`settings-tab min-w-fit ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                  >
                    <Icon size={19} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                <Info size={17} />
                Lưu ý
              </div>

              <p className="mt-2 text-xs leading-5 text-amber-800/80">
                Hãy nhấn nút Lưu cài đặt sau khi chỉnh sửa để lưu thay đổi.
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="min-w-0 space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <ActiveIcon size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {activeTabInfo?.label}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {activeTab === "business" &&
                        "Thông tin đơn vị quản lý và vận hành hệ thống."}
                      {activeTab === "account" &&
                        "Thông tin người đang quản trị hệ thống."}
                      {activeTab === "general" &&
                        "Tùy chỉnh cách hiển thị dữ liệu trên hệ thống."}
                      {activeTab === "notifications" &&
                        "Quản lý các loại thông báo của hệ thống."}
                      {activeTab === "security" &&
                        "Thiết lập bảo mật cho tài khoản của bạn."}
                    </p>
                  </div>
                </div>

                {saved && activeTab !== "security" && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <CircleCheck size={14} />
                    Đã lưu
                  </span>
                )}
              </div>

              {/* BUSINESS */}
              {activeTab === "business" && (
                <div className="settings-card space-y-6">
                  {/* LOGO */}
                  <div className="flex flex-col gap-4 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-white p-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-200 bg-white text-amber-600 shadow-sm">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Logo NDAHOME"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <ImageIcon size={30} />
                          <span className="text-[10px] font-bold">LOGO</span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-800">
                        Logo doanh nghiệp
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Chọn logo để hiển thị trên hệ thống NDAHOME.
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG, WEBP hoặc SVG · Tối đa 2 MB
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
                          onChange={handleLogoChange}
                          className="hidden"
                        />

                        <button
                          type="button"
                          disabled={isLogoLoading}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Camera size={15} />
                          <Upload size={14} />
                          {isLogoLoading
                            ? "Đang xử lý..."
                            : logo
                              ? "Thay đổi logo"
                              : "Tải ảnh lên"}
                        </button>

                        {logo && (
                          <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                          >
                            <Trash2 size={14} />
                            Xóa logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="form-label">
                        Tên doanh nghiệp *
                      </label>
                      <input
                        value={settings.business.name}
                        onChange={(e) =>
                          updateSection("business", "name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập tên doanh nghiệp"
                      />
                    </div>

                    <div>
                      <label className="form-label">Mã số thuế</label>
                      <input
                        value={settings.business.taxCode}
                        onChange={(e) =>
                          updateSection("business", "taxCode", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập mã số thuế"
                      />
                    </div>

                    <div>
                      <label className="form-label">Số điện thoại</label>
                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          value={settings.business.phone}
                          onChange={(e) =>
                            updateSection("business", "phone", e.target.value)
                          }
                          className={`${inputClass} pl-10`}
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Email</label>
                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="email"
                          value={settings.business.email}
                          onChange={(e) =>
                            updateSection("business", "email", e.target.value)
                          }
                          className={`${inputClass} pl-10`}
                          placeholder="example@ndahome.vn"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label">Địa chỉ</label>
                      <div className="relative">
                        <MapPin
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          value={settings.business.address}
                          onChange={(e) =>
                            updateSection("business", "address", e.target.value)
                          }
                          className={`${inputClass} pl-10`}
                          placeholder="Nhập địa chỉ doanh nghiệp"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label">Website</label>
                      <div className="relative">
                        <Globe
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          value={settings.business.website}
                          onChange={(e) =>
                            updateSection("business", "website", e.target.value)
                          }
                          className={`${inputClass} pl-10`}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACCOUNT */}
              {activeTab === "account" && (
                <div className="settings-card space-y-6">
                  <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-sm">
                      {settings.account.name
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase())
                        .join("") || "AD"}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {settings.account.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {settings.account.position}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        <ShieldCheck size={13} />
                        Tài khoản quản trị
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="form-label">Họ và tên *</label>
                      <input
                        value={settings.account.name}
                        onChange={(e) =>
                          updateSection("account", "name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div>
                      <label className="form-label">Chức vụ</label>
                      <input
                        value={settings.account.position}
                        onChange={(e) =>
                          updateSection("account", "position", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập chức vụ"
                      />
                    </div>

                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={settings.account.email}
                        onChange={(e) =>
                          updateSection("account", "email", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập email"
                      />
                    </div>

                    <div>
                      <label className="form-label">Số điện thoại</label>
                      <input
                        value={settings.account.phone}
                        onChange={(e) =>
                          updateSection("account", "phone", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* GENERAL */}
              {activeTab === "general" && (
                <div className="settings-card space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="form-label">Đơn vị tiền tệ</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                          ₫
                        </span>
                        <select
                          value={settings.general.currency}
                          onChange={(e) =>
                            updateSection("general", "currency", e.target.value)
                          }
                          className={`${inputClass} appearance-none pl-10`}
                        >
                          <option value="VND">Việt Nam đồng (VND)</option>
                          <option value="USD">Đô la Mỹ (USD)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">
                        Định dạng ngày tháng
                      </label>
                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          value={settings.general.dateFormat}
                          onChange={(e) =>
                            updateSection(
                              "general",
                              "dateFormat",
                              e.target.value
                            )
                          }
                          className={`${inputClass} appearance-none pl-10`}
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Ngôn ngữ</label>
                      <div className="relative">
                        <Languages
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          value={settings.general.language}
                          onChange={(e) =>
                            updateSection("general", "language", e.target.value)
                          }
                          className={`${inputClass} appearance-none pl-10`}
                        >
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Số dòng mỗi trang</label>
                      <div className="relative">
                        <Rows3
                          size={17}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <select
                          value={settings.general.pageSize}
                          onChange={(e) =>
                            updateSection("general", "pageSize", e.target.value)
                          }
                          className={`${inputClass} appearance-none pl-10`}
                        >
                          <option value="10">10 dòng</option>
                          <option value="20">20 dòng</option>
                          <option value="50">50 dòng</option>
                          <option value="100">100 dòng</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-2 text-blue-700">
                      <Info size={18} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">
                          Thông tin về cài đặt chung
                        </p>
                        <p className="mt-1 text-xs leading-5 text-blue-700/80">
                          Các tùy chọn được lưu trong trình duyệt. Muốn áp dụng
                          đồng bộ cho toàn hệ thống, cần kết nối cơ sở dữ liệu
                          và các trang sử dụng cấu hình tương ứng.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="settings-card space-y-4">
                  {(
                    [
                      {
                        key: "rent",
                        title: "Thông báo tiền thuê phòng",
                        description:
                          "Nhắc nhở các khoản tiền thuê sắp đến hạn.",
                        icon: Building2,
                        color: "text-amber-700",
                        bg: "bg-amber-100",
                      },
                      {
                        key: "expense",
                        title: "Thông báo thu chi",
                        description:
                          "Thông báo khi có giao dịch thu hoặc chi mới.",
                        icon: BriefcaseBusiness,
                        color: "text-blue-700",
                        bg: "bg-blue-100",
                      },
                      {
                        key: "contract",
                        title: "Thông báo hợp đồng",
                        description: "Nhắc hợp đồng sắp hết hạn.",
                        icon: CalendarDays,
                        color: "text-purple-700",
                        bg: "bg-purple-100",
                      },
                      {
                        key: "system",
                        title: "Thông báo hệ thống",
                        description:
                          "Thông báo cập nhật và bảo trì hệ thống.",
                        icon: Settings,
                        color: "text-emerald-700",
                        bg: "bg-emerald-100",
                      },
                    ] as const
                  ).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.key}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-amber-200 hover:bg-amber-50/30 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                          >
                            <Icon size={21} />
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-800">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <span
                            className={`text-xs font-semibold ${
                              settings.notifications[item.key]
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          >
                            {settings.notifications[item.key]
                              ? "Đang bật"
                              : "Đang tắt"}
                          </span>

                          <label className="settings-switch">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key]}
                              onChange={(e) =>
                                updateSection(
                                  "notifications",
                                  item.key,
                                  e.target.checked
                                )
                              }
                            />
                            <span className="settings-switch-slider" />
                          </label>
                        </div>
                      </div>
                    );
                  })}

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-amber-800">
                      <Bell size={17} />
                      Lưu ý về thông báo
                    </p>
                    <p className="mt-1 text-xs leading-5 text-amber-800/80">
                      Các lựa chọn trên lưu trạng thái bật/tắt. Việc gửi thông
                      báo thực tế cần tích hợp thêm hệ thống thông báo.
                    </p>
                  </div>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="settings-card space-y-6">
                  <div className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <ShieldCheck size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-emerald-800">
                        Bảo vệ tài khoản
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-emerald-700">
                        Không chia sẻ mật khẩu với người khác. Nên sử dụng mật
                        khẩu có ít nhất 8 ký tự, kết hợp chữ và số.
                      </p>
                    </div>
                  </div>

                  <div className="max-w-xl space-y-5">
                    <div>
                      <label className="form-label">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        autoComplete="current-password"
                        value={password.current}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            current: e.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>

                    <div>
                      <label className="form-label">Mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={password.next}
                          onChange={(e) =>
                            setPassword((prev) => ({
                              ...prev,
                              next: e.target.value,
                            }))
                          }
                          className={`${inputClass} pr-12`}
                          placeholder="Nhập mật khẩu mới"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          aria-label={
                            showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>

                      <p className="mt-1.5 text-xs text-slate-400">
                        Mật khẩu phải có ít nhất 8 ký tự.
                      </p>
                    </div>

                    <div>
                      <label className="form-label">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        autoComplete="new-password"
                        value={password.confirm}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            confirm: e.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-amber-800">
                    <LockKeyhole size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">
                        Chức năng đổi mật khẩu cần kết nối xác thực
                      </p>
                      <p className="mt-1 text-xs leading-5">
                        Giao diện hiện kiểm tra dữ liệu nhập. Chưa có API xác
                        thực nên không thực hiện thay đổi mật khẩu thật và
                        không lưu mật khẩu vào trình duyệt.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* SAVE BAR */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div>
                {saved ? (
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <Check size={17} />
                    Đã lưu cài đặt thành công
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Nhớ lưu lại sau khi hoàn tất chỉnh sửa.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSave}
                className={`${buttonBase} settings-save-button bg-amber-400 text-slate-900 shadow-sm hover:bg-amber-300`}
              >
                <Save size={17} />
                {activeTab === "security"
                  ? "Kiểm tra thông tin"
                  : "Lưu cài đặt"}
              </button>
            </div>
          </main>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row">
          <span>© NDAHOME - Hệ thống quản lý thu chi</span>
          <span>Danh mục cài đặt hệ thống</span>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-40px)] items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              toastType === "error"
                ? "bg-rose-100 text-rose-600"
                : toastType === "info"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-emerald-100 text-emerald-600"
            }`}
          >
            {toastType === "error" ? (
              <AlertCircle size={19} />
            ) : toastType === "info" ? (
              <Info size={19} />
            ) : (
              <Check size={19} />
            )}
          </div>

          <p className="flex-1 pt-1 text-sm font-semibold text-slate-700">
            {toast}
          </p>

          <button
            type="button"
            onClick={() => setToast("")}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Đóng thông báo"
          >
            <X size={16} />
          </button>
        </div>
      )}
=======
      </div>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    </div>
  );
}
