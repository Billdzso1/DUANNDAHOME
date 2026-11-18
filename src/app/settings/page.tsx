
"use client";

import { useState } from "react";
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
    name: "NDAHOME",
    phone: "0901234567",
    email: "contact@ndahome.vn",
    address: "Thành phố Hồ Chí Minh",
    taxCode: "",
    website: "",
  });

  const [account, setAccount] = useState({
    name: "Administrator",
    email: "admin@ndahome.vn",
    phone: "0901234567",
    position: "Quản trị viên",
  });

  const [general, setGeneral] = useState({
    currency: "VND",
    dateFormat: "DD/MM/YYYY",
    language: "vi",
    pageSize: "10",
  });

  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });

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
        return;
      }

      if (password.next.length < 8) {
        alert("Mật khẩu mới phải có ít nhất 8 ký tự.");
        return;
      }

      if (password.next !== password.confirm) {
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
              <Save size={17} />
              Lưu cài đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
