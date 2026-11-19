
"use client";

import { useEffect, useMemo, useState } from "react";
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
  Download,
  Filter,
  BriefcaseBusiness,
  CheckCircle2,
  PauseCircle,
  ArrowUpDown,
  RefreshCw,
  LayoutGrid,
  AlertCircle,
  FileSpreadsheet,
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

type DepartmentForm = Omit<Department, "id">;

const STORAGE_KEY = "ndahome_departments";

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

const emptyForm: DepartmentForm = {
  code: "",
  name: "",
  manager: "",
  phone: "",
  email: "",
  location: "",
  description: "",
  employeeCount: 0,
  status: "Hoạt động",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200";

function getNextCode(departments: Department[]) {
  const maxNumber = departments.reduce((max, item) => {
    const match = item.code.match(/^PB(\d+)$/i);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `PB${String(maxNumber + 1).padStart(3, "0")}`;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [locationFilter, setLocationFilter] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("name");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewing, setViewing] = useState<Department | null>(null);

  const [form, setForm] = useState<DepartmentForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");

  // Đọc dữ liệu từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setDepartments(parsed);
        }
      }
    } catch {
      console.error("Không thể đọc dữ liệu phòng ban.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Lưu dữ liệu
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(departments));
    }
  }, [departments, isLoaded]);

  // Tự động ẩn thông báo
  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Thống kê
  const stats = useMemo(() => {
    const active = departments.filter(
      (item) => item.status === "Hoạt động"
    ).length;

    const paused = departments.filter(
      (item) => item.status === "Tạm ngưng"
    ).length;

    const totalEmployees = departments.reduce(
      (sum, item) => sum + (Number(item.employeeCount) || 0),
      0
    );

    return {
      total: departments.length,
      active,
      paused,
      totalEmployees,
    };
  }, [departments]);

  // Danh sách địa điểm
  const locations = useMemo(() => {
    return Array.from(
      new Set(
        departments
          .map((item) => item.location.trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "vi"));
  }, [departments]);

  // Tìm kiếm, lọc và sắp xếp
  const filteredDepartments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = departments.filter((item) => {
      const matchSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword) ||
        item.manager.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.phone.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "Tất cả" || item.status === statusFilter;

      const matchLocation =
        locationFilter === "Tất cả" || item.location === locationFilter;

      return matchSearch && matchStatus && matchLocation;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "employees") {
        return b.employeeCount - a.employeeCount;
      }

      if (sortBy === "code") {
        return a.code.localeCompare(b.code, "vi");
      }

      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name, "vi");
      }

      return a.name.localeCompare(b.name, "vi");
    });
  }, [departments, search, statusFilter, locationFilter, sortBy]);

  // Mở form thêm
  function openAddForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      code: getNextCode(departments),
    });
    setFormError("");
    setShowForm(true);
  }

  // Mở form chỉnh sửa
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

    setFormError("");
    setShowForm(true);
  }

  // Kiểm tra và lưu
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const code = form.code.trim();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!code || !name) {
      setFormError("Vui lòng nhập mã và tên phòng ban.");
      return;
    }

    if (!form.manager.trim()) {
      setFormError("Vui lòng nhập tên trưởng phòng.");
      return;
    }

    if (
      !Number.isInteger(Number(form.employeeCount)) ||
      Number(form.employeeCount) < 0
    ) {
      setFormError("Số nhân viên phải là số nguyên không âm.");
      return;
    }

    const duplicateCode = departments.some(
      (item) =>
        item.code.trim().toLowerCase() === code.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicateCode) {
      setFormError("Mã phòng ban đã tồn tại. Vui lòng nhập mã khác.");
      return;
    }

    if (email) {
      const duplicateEmail = departments.some(
        (item) =>
          item.email.trim().toLowerCase() === email.toLowerCase() &&
          item.id !== editingId
      );

      if (duplicateEmail) {
        setFormError("Email này đã được sử dụng ở phòng ban khác.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFormError("Địa chỉ email không hợp lệ.");
        return;
      }
    }

    if (phone && !/^[0-9+\s().-]{8,15}$/.test(phone)) {
      setFormError("Số điện thoại không hợp lệ.");
      return;
    }

    const normalizedForm = {
      ...form,
      code,
      name,
      manager: form.manager.trim(),
      phone,
      email,
      location: form.location.trim(),
      description: form.description.trim(),
      employeeCount: Number(form.employeeCount),
    };

    if (editingId !== null) {
      setDepartments((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...normalizedForm }
            : item
        )
      );

      setToast("Cập nhật phòng ban thành công!");
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          ...normalizedForm,
          id: Date.now(),
        },
      ]);

      setToast("Thêm phòng ban mới thành công!");
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
  }

  // Xóa phòng ban
  function handleDelete(item: Department) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa phòng ban "${item.name}" (${item.code}) không?`
    );

    if (!confirmed) return;

    setDepartments((prev) =>
      prev.filter((department) => department.id !== item.id)
    );

    setToast("Đã xóa phòng ban thành công!");
  }

  // Xuất CSV
  function exportCSV() {
    if (filteredDepartments.length === 0) {
      setToast("Không có dữ liệu để xuất.");
      return;
    }

    const headers = [
      "Mã phòng ban",
      "Tên phòng ban",
      "Trưởng phòng",
      "Số điện thoại",
      "Email",
      "Địa điểm",
      "Số nhân viên",
      "Trạng thái",
      "Mô tả",
    ];

    const rows = filteredDepartments.map((item) => [
      item.code,
      item.name,
      item.manager,
      item.phone,
      item.email,
      item.location,
      item.employeeCount,
      item.status,
      item.description,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "danh-sach-phong-ban-ndahome.csv";
    link.click();

    URL.revokeObjectURL(url);
    setToast("Xuất danh sách phòng ban thành công!");
  }

  // Đặt lại bộ lọc
  function resetFilters() {
    setSearch("");
    setStatusFilter("Tất cả");
    setLocationFilter("Tất cả");
    setSortBy("name");
  }

  const statCards = [
    {
      label: "Tổng phòng ban",
      value: stats.total,
      note: "Tổng số phòng ban hiện có",
      icon: Building2,
      bg: "bg-[#FFF7DF]",
      border: "border-amber-200",
      accent: "bg-amber-400",
      color: "text-amber-700",
      iconBg: "bg-amber-100",
    },
    {
      label: "Tổng nhân viên",
      value: stats.totalEmployees,
      note: "Nhân sự thuộc các phòng ban",
      icon: Users,
      bg: "bg-[#EDF2FF]",
      border: "border-blue-200",
      accent: "bg-blue-500",
      color: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Đang hoạt động",
      value: stats.active,
      note: "Phòng ban đang vận hành",
      icon: CheckCircle2,
      bg: "bg-[#E8F8EF]",
      border: "border-emerald-200",
      accent: "bg-emerald-500",
      color: "text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Tạm ngưng",
      value: stats.paused,
      note: "Phòng ban đang tạm dừng",
      icon: PauseCircle,
      bg: "bg-[#FFF0E5]",
      border: "border-orange-200",
      accent: "bg-orange-500",
      color: "text-orange-700",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="department-page min-h-screen bg-[#F7F8FA] p-4 text-slate-800 md:p-7">
      <style jsx global>{`
        /* ÉP TOÀN BỘ TRANG SỬ DỤNG TIMES NEW ROMAN */
        html,
        body {
          font-family: "Times New Roman", Times, serif !important;
        }

        .department-page,
        .department-page *,
        .department-page *::before,
        .department-page *::after {
          font-family: "Times New Roman", Times, serif !important;
        }

        .department-page input,
        .department-page textarea,
        .department-page select,
        .department-page button,
        .department-page option {
          font-family: "Times New Roman", Times, serif !important;
        }

        .department-page input::placeholder,
        .department-page textarea::placeholder {
          font-family: "Times New Roman", Times, serif !important;
        }

        .department-stat {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .department-stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.1);
        }

        .department-row {
          transition: background 0.2s ease;
        }

        .department-row:hover {
          background: #fffbeb;
        }

        .department-modal {
          animation: departmentModalIn 0.2s ease-out;
        }

        @keyframes departmentModalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
              <Building2 size={15} />
              NDAHOME / QUẢN LÝ NHÂN SỰ
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Danh mục phòng ban
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Quản lý cơ cấu tổ chức, thông tin liên hệ và nhân sự của từng phòng ban.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className={`${buttonBase} border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-amber-300 hover:bg-amber-50`}
            >
              <Download size={17} />
              Xuất CSV
            </button>

            <button
              type="button"
              onClick={openAddForm}
              className={`${buttonBase} bg-amber-400 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md`}
            >
              <Plus size={18} />
              Thêm phòng ban
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className={`department-stat relative overflow-hidden rounded-2xl border ${card.border} ${card.bg} p-5 shadow-sm`}
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 ${card.accent}`}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600">
                      {card.label}
                    </p>

                    <h3 className={`mt-3 text-3xl font-bold ${card.color}`}>
                      {card.value}
                    </h3>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} ${card.color}`}
                  >
                    <Icon size={24} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">{card.note}</p>
              </div>
            );
          })}
        </div>

        {/* OVERVIEW */}
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-[#FFF7DF] via-white to-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
                <BriefcaseBusiness size={18} />
                TỔNG QUAN CƠ CẤU TỔ CHỨC
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Hệ thống hiện có {stats.total} phòng ban
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Đang quản lý {stats.totalEmployees} nhân viên thuộc các phòng ban.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">
              <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={15} />
                  Hoạt động
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-700">
                  {stats.active}
                </p>
              </div>

              <div className="rounded-xl border border-orange-100 bg-white/80 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-600">
                  <PauseCircle size={15} />
                  Tạm ngưng
                </div>
                <p className="mt-2 text-2xl font-bold text-orange-700">
                  {stats.paused}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DANH SÁCH PHÒNG BAN */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 md:p-6">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <LayoutGrid size={19} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Danh sách phòng ban
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Quản lý và cập nhật thông tin các phòng ban trong hệ thống.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1.5">
                  Tổng:{" "}
                  <strong className="text-slate-800">
                    {departments.length}
                  </strong>
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
                  Đang hiển thị: <strong>{filteredDepartments.length}</strong>
                </span>
              </div>
            </div>

            {/* FILTERS */}
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm mã, tên, trưởng phòng..."
                  className={`${inputClass} pl-10`}
                />
              </div>

              <div className="relative">
                <Filter
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="Tất cả">Tất cả trạng thái</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm ngưng">Tạm ngưng</option>
                </select>
              </div>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="Tất cả">Tất cả địa điểm</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <ArrowUpDown
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="name">Tên phòng ban A-Z</option>
                  <option value="name-desc">Tên phòng ban Z-A</option>
                  <option value="code">Mã phòng ban</option>
                  <option value="employees">Nhiều nhân viên nhất</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-amber-700"
              >
                <RefreshCw size={13} />
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Mã phòng ban</th>
                  <th className="px-5 py-4">Thông tin phòng ban</th>
                  <th className="px-5 py-4">Trưởng phòng</th>
                  <th className="px-5 py-4">Thông tin liên hệ</th>
                  <th className="px-5 py-4 text-center">Nhân viên</th>
                  <th className="px-5 py-4">Trạng thái</th>
                  <th className="px-5 py-4 text-center">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredDepartments.map((item) => (
                  <tr key={item.id} className="department-row">
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 font-bold text-amber-700">
                        {item.code}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Building2 size={19} />
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">
                            {item.name}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin size={12} />
                            {item.location || "Chưa cập nhật địa điểm"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <UserRound size={15} />
                        </div>
                        <span className="font-medium text-slate-700">
                          {item.manager || "Chưa cập nhật"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 text-slate-700">
                        <Phone size={13} className="text-slate-400" />
                        {item.phone || "—"}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail size={13} />
                        {item.email || "Chưa có email"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 font-bold text-blue-700">
                        <Users size={14} />
                        {item.employeeCount}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          item.status === "Hoạt động"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Hoạt động"
                              ? "bg-emerald-500"
                              : "bg-orange-500"
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1.5">
                        <button
                          type="button"
                          title="Xem chi tiết"
                          onClick={() => setViewing(item)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          title="Chỉnh sửa"
                          onClick={() => openEditForm(item)}
                          className="rounded-lg bg-amber-50 p-2 text-amber-700 transition hover:bg-amber-100"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(item)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredDepartments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={25} />
                      </div>

                      <p className="mt-3 font-semibold text-slate-600">
                        Không tìm thấy phòng ban
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Thử thay đổi từ khóa hoặc điều kiện lọc.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm font-semibold text-amber-700 hover:underline"
                      >
                        Xóa bộ lọc
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <span>
              Đang hiển thị{" "}
              <strong className="text-slate-800">
                {filteredDepartments.length}
              </strong>{" "}
              trên tổng số{" "}
              <strong className="text-slate-800">
                {departments.length}
              </strong>{" "}
              phòng ban
            </span>
          </div>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setShowForm(false);
            }}
          >
            <div className="department-modal max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                    <Building2 size={15} />
                    NDAHOME / PHÒNG BAN
                  </div>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {editingId !== null
                      ? "Cập nhật phòng ban"
                      : "Thêm phòng ban mới"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Vui lòng nhập đầy đủ thông tin phòng ban.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={21} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 md:p-6">
                <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-amber-800">
                    <BriefcaseBusiness size={17} />
                    Thông tin chung
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Mã phòng ban và tên phòng ban là những thông tin bắt buộc.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Mã phòng ban *
                    <input
                      required
                      value={form.code}
                      onChange={(e) =>
                        setForm({ ...form, code: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Ví dụ: PB005"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Tên phòng ban *
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Nhập tên phòng ban"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Trưởng phòng *
                    <input
                      required
                      value={form.manager}
                      onChange={(e) =>
                        setForm({ ...form, manager: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Nhập họ tên trưởng phòng"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Số điện thoại
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Nhập số điện thoại"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Email phòng ban
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className={inputClass}
                      placeholder="example@ndahome.vn"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Địa điểm làm việc
                    <input
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Ví dụ: Văn phòng chính"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Số lượng nhân viên
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.employeeCount}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          employeeCount:
                            e.target.value === ""
                              ? 0
                              : Number(e.target.value),
                        })
                      }
                      className={inputClass}
                      placeholder="Nhập số nhân viên"
                    />
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Trạng thái hoạt động
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as Department["status"],
                        })
                      }
                      className={inputClass}
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Tạm ngưng">Tạm ngưng</option>
                    </select>
                  </label>

                  <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Mô tả chức năng phòng ban
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Nhập chức năng, nhiệm vụ và thông tin mô tả..."
                    />
                  </label>
                </div>

                {formError && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    {formError}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`${buttonBase} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50`}
                  >
                    Hủy bỏ
                  </button>

                  <button
                    type="submit"
                    className={`${buttonBase} bg-amber-400 text-slate-900 shadow-sm hover:bg-amber-300`}
                  >
                    <CheckCircle2 size={17} />
                    {editingId !== null ? "Lưu thay đổi" : "Thêm phòng ban"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DETAIL MODAL */}
        {viewing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setViewing(null);
            }}
          >
            <div className="department-modal max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                    <Eye size={15} />
                    THÔNG TIN CHI TIẾT
                  </div>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {viewing.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Mã phòng ban: {viewing.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setViewing(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="space-y-5 p-5 md:p-6">
                <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-amber-50 to-white p-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <Building2 size={32} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {viewing.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {viewing.location || "Chưa cập nhật địa điểm"}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                      viewing.status === "Hoạt động"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {viewing.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: "Trưởng phòng",
                      value: viewing.manager,
                      icon: UserRound,
                    },
                    {
                      label: "Số điện thoại",
                      value: viewing.phone,
                      icon: Phone,
                    },
                    {
                      label: "Email",
                      value: viewing.email,
                      icon: Mail,
                    },
                    {
                      label: "Địa điểm",
                      value: viewing.location,
                      icon: MapPin,
                    },
                    {
                      label: "Số nhân viên",
                      value: `${viewing.employeeCount} người`,
                      icon: Users,
                    },
                    {
                      label: "Mã phòng ban",
                      value: viewing.code,
                      icon: Building2,
                    },
                  ].map((detail) => {
                    const Icon = detail.icon;

                    return (
                      <div
                        key={detail.label}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <Icon size={15} />
                          {detail.label}
                        </div>

                        <p className="mt-2 break-words font-bold text-slate-800">
                          {detail.value || "Chưa cập nhật"}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Mô tả phòng ban
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {viewing.description || "Chưa có mô tả."}
                  </p>
                </div>

                <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setViewing(null)}
                    className={`${buttonBase} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50`}
                  >
                    Đóng
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const item = viewing;
                      setViewing(null);
                      openEditForm(item);
                    }}
                    className={`${buttonBase} bg-amber-400 text-slate-900 hover:bg-amber-300`}
                  >
                    <Pencil size={16} />
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={19} />
            </div>

            <p className="text-sm font-semibold text-slate-700">{toast}</p>

            <button
              type="button"
              onClick={() => setToast("")}
              className="ml-2 text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
