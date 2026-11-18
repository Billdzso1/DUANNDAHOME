"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Building2,
  Users,
  Pencil,
  Trash2,
  X,
  Eye,
  Phone,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

type Department = {
  id: number;
  code: string;
  name: string;
  manager: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  employeeCount: number;
  status: "Hoạt động" | "Tạm ngưng";
};

const initialDepartments: Department[] = [
  {
    id: 1,
    code: "PB001",
    name: "Ban quản lý",
    manager: "Nguyễn Văn An",
    phone: "0901234567",
    email: "quanly@ndahome.vn",
    location: "Văn phòng chính",
    description: "Quản lý và điều hành hoạt động hệ thống.",
    employeeCount: 3,
    status: "Hoạt động",
  },
  {
    id: 2,
    code: "PB002",
    name: "Kế toán",
    manager: "Trần Thị Hoa",
    phone: "0912345678",
    email: "ketoan@ndahome.vn",
    location: "Văn phòng chính",
    description: "Quản lý thu chi và báo cáo tài chính.",
    employeeCount: 2,
    status: "Hoạt động",
  },
  {
    id: 3,
    code: "PB003",
    name: "Kinh doanh",
    manager: "Lê Văn Minh",
    phone: "0987654321",
    email: "kinhdoanh@ndahome.vn",
    location: "Văn phòng chính",
    description: "Tìm kiếm khách hàng và quản lý hợp đồng.",
    employeeCount: 4,
    status: "Hoạt động",
  },
  {
    id: 4,
    code: "PB004",
    name: "Kỹ thuật",
    manager: "Phạm Quốc Huy",
    phone: "0934567890",
    email: "kythuat@ndahome.vn",
    location: "Khu vực quản lý",
    description: "Bảo trì và sửa chữa cơ sở vật chất.",
    employeeCount: 2,
    status: "Tạm ngưng",
  },
];

const emptyForm = {
  code: "",
  name: "",
  manager: "",
  phone: "",
  email: "",
  location: "",
  description: "",
  employeeCount: 0,
  status: "Hoạt động" as Department["status"],
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewing, setViewing] = useState<Department | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Nạp dữ liệu từ localStorage nếu có
  useEffect(() => {
    const saved = localStorage.getItem("ndahome_departments");
    if (saved) {
      try {
        setDepartments(JSON.parse(saved));
      } catch {
        setDepartments(initialDepartments);
      }
    }
    setIsLoaded(true);
  }, []);

  // Lưu thay đổi vào localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ndahome_departments", JSON.stringify(departments));
    }
  }, [departments, isLoaded]);

  const activeCount = departments.filter(
    (item) => item.status === "Hoạt động"
  ).length;

  const totalEmployees = departments.reduce(
    (sum, item) => sum + item.employeeCount,
    0
  );

  const filteredDepartments = departments.filter((item) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.code.toLowerCase().includes(keyword) ||
      item.manager.toLowerCase().includes(keyword);

    const matchStatus =
      statusFilter === "Tất cả" || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  function openAddForm() {
    setEditingId(null);
    const nextNumber = String(departments.length + 1).padStart(3, "0");
    setForm({
      ...emptyForm,
      code: `PB${nextNumber}`,
    });
    setShowForm(true);
  }

  function openEditForm(item: Department) {
    setEditingId(item.id);
    setForm({
      code: item.code,
      name: item.name,
      manager: item.manager,
      phone: item.phone,
      email: item.email,
      location: item.location,
      description: item.description,
      employeeCount: item.employeeCount,
      status: item.status,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.code.trim() || !form.name.trim()) {
      alert("Vui lòng nhập đầy đủ Mã và Tên phòng ban!");
      return;
    }

    const duplicateCode = departments.some(
      (item) =>
        item.code.toLowerCase() === form.code.trim().toLowerCase() &&
        item.id !== editingId
    );

    if (duplicateCode) {
      alert("Mã phòng ban đã tồn tại! Vui lòng nhập mã khác.");
      return;
    }

    if (editingId !== null) {
      setDepartments((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...form, code: form.code.trim(), name: form.name.trim() }
            : item
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          code: form.code.trim(),
          name: form.name.trim(),
        },
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleDelete(item: Department) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa phòng ban "${item.name}" (${item.code})?`
    );

    if (!confirmed) return;

    setDepartments((prev) =>
      prev.filter((department) => department.id !== item.id)
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>Quản lý phòng ban</h1>
          <p>Quản lý các phòng ban và cơ cấu tổ chức của doanh nghiệp.</p>
        </div>

        <button type="button" className="btn-primary" onClick={openAddForm}>
          <Plus size={18} />
          Thêm phòng ban
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Building2 size={22} />
          </div>
          <div>
            <span>Tổng phòng ban</span>
            <h3>{departments.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={22} />
          </div>
          <div>
            <span>Tổng nhân viên</span>
            <h3>{totalEmployees}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Building2 size={22} />
          </div>
          <div>
            <span>Đang hoạt động</span>
            <h3>{activeCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <UserRound size={22} />
          </div>
          <div>
            <span>Tạm ngưng</span>
            <h3>{departments.length - activeCount}</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm mã, tên hoặc trưởng phòng..."
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Tạm ngưng">Tạm ngưng</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã phòng ban</th>
                <th>Tên phòng ban</th>
                <th>Trưởng phòng</th>
                <th>Liên hệ</th>
                <th>Nhân viên</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.code}</strong>
                  </td>
                  <td>
                    <div className="table-main-text">{item.name}</div>
                    <div className="table-sub-text">{item.location}</div>
                  </td>
                  <td>{item.manager}</td>
                  <td>
                    <div>{item.phone}</div>
                    <div className="table-sub-text">{item.email}</div>
                  </td>
                  <td>{item.employeeCount} người</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Hoạt động"
                          ? "status-success"
                          : "status-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="action-btn"
                        title="Xem chi tiết"
                        onClick={() => setViewing(item)}
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        type="button"
                        className="action-btn"
                        title="Chỉnh sửa"
                        onClick={() => openEditForm(item)}
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        type="button"
                        className="action-btn danger"
                        title="Xóa"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDepartments.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-state">
                    Không tìm thấy phòng ban phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Hiển thị {filteredDepartments.length} / {departments.length} phòng ban
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{editingId ? "Cập nhật phòng ban" : "Thêm phòng ban"}</h2>
                <p>Nhập thông tin phòng ban bên dưới.</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Mã phòng ban *</label>
                  <input
                    required
                    value={form.code}
                    onChange={(e) =>
                      setForm({ ...form, code: e.target.value })
                    }
                    placeholder="Ví dụ: PB005"
                  />
                </div>

                <div className="form-group">
                  <label>Tên phòng ban *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Nhập tên phòng ban"
                  />
                </div>

                <div className="form-group">
                  <label>Trưởng phòng</label>
                  <input
                    value={form.manager}
                    onChange={(e) =>
                      setForm({ ...form, manager: e.target.value })
                    }
                    placeholder="Nhập tên trưởng phòng"
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="example@ndahome.vn"
                  />
                </div>

                <div className="form-group">
                  <label>Địa điểm</label>
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Nhập địa điểm"
                  />
                </div>

                <div className="form-group">
                  <label>Số nhân viên</label>
                  <input
                    type="number"
                    min="0"
                    value={form.employeeCount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        employeeCount: Math.max(0, Number(e.target.value)),
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as Department["status"],
                      })
                    }
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Mô tả</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Nhập mô tả phòng ban..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? "Lưu thay đổi" : "Thêm phòng ban"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Chi tiết phòng ban</h2>
                <p>{viewing.code}</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setViewing(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="detail-list">
              <div>
                <Building2 size={18} />
                <span>Tên phòng ban</span>
                <strong>{viewing.name}</strong>
              </div>
              <div>
                <UserRound size={18} />
                <span>Trưởng phòng</span>
                <strong>{viewing.manager || "Chưa cập nhật"}</strong>
              </div>
              <div>
                <Phone size={18} />
                <span>Số điện thoại</span>
                <strong>{viewing.phone || "Chưa cập nhật"}</strong>
              </div>
              <div>
                <Mail size={18} />
                <span>Email</span>
                <strong>{viewing.email || "Chưa cập nhật"}</strong>
              </div>
              <div>
                <MapPin size={18} />
                <span>Địa điểm</span>
                <strong>{viewing.location || "Chưa cập nhật"}</strong>
              </div>
              <div>
                <Users size={18} />
                <span>Số nhân viên</span>
                <strong>{viewing.employeeCount} người</strong>
              </div>
              <div>
                <span>Mô tả</span>
                <strong>{viewing.description || "Chưa có mô tả"}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setViewing(null)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setViewing(null);
                  openEditForm(viewing);
                }}
              >
                <Pencil size={16} />
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}