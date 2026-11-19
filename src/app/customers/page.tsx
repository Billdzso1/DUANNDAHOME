
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Pencil,
  Trash2,
  X,
  Phone,
  Mail,
  CalendarDays,
  Eye,
  Filter,
  Download,
  MapPin,
  CreditCard,
  Building2,
  BedDouble,
  ArrowUpDown,
  RotateCcw,
  UserRound,
  FileSpreadsheet,
} from "lucide-react";

type CustomerStatus = "Đang thuê" | "Đã trả phòng";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  identity: string;
  address: string;
  property: string;
  room: string;
  startDate: string;
  status: CustomerStatus;
};

const STORAGE_KEY = "ndahome_customers";

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@gmail.com",
    identity: "079201001234",
    address: "Thủ Đức, TP. Hồ Chí Minh",
    property: "Nhà trọ Bình An",
    room: "P101",
    startDate: "2026-01-15",
    status: "Đang thuê",
  },
  {
    id: 2,
    name: "Trần Thị Hoa",
    phone: "0912345678",
    email: "tranthihoa@gmail.com",
    identity: "079201002345",
    address: "Dĩ An, Bình Dương",
    property: "Nhà trọ Bình An",
    room: "P103",
    startDate: "2026-03-01",
    status: "Đang thuê",
  },
  {
    id: 3,
    name: "Lê Minh Tuấn",
    phone: "0987654321",
    email: "leminhtuan@gmail.com",
    identity: "079201003456",
    address: "Biên Hòa, Đồng Nai",
    property: "Nhà trọ Phú Thịnh",
    room: "A101",
    startDate: "2025-09-10",
    status: "Đang thuê",
  },
  {
    id: 4,
    name: "Phạm Thị Mai",
    phone: "0934567890",
    email: "phamthimai@gmail.com",
    identity: "079201004567",
    address: "Quận 12, TP. Hồ Chí Minh",
    property: "Nhà trọ Bình An",
    room: "P102",
    startDate: "2025-05-20",
    status: "Đã trả phòng",
  },
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  identity: "",
  address: "",
  property: "",
  room: "",
  startDate: "",
  status: "Đang thuê" as CustomerStatus,
};

const formatDate = (date: string) => {
  if (!date) return "Chưa cập nhật";

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Chưa cập nhật";

  return parsed.toLocaleDateString("vi-VN");
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [storageReady, setStorageReady] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("newest");

  const [modalOpen, setModalOpen] = useState(false);
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // Đọc dữ liệu đã lưu trên trình duyệt
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCustomers(parsed);
        }
      }
    } catch (err) {
      console.error("Không thể đọc dữ liệu khách hàng:", err);
    } finally {
      setStorageReady(true);
    }
  }, []);

  // Lưu dữ liệu mỗi khi danh sách thay đổi
  useEffect(() => {
    if (!storageReady) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch (err) {
      console.error("Không thể lưu dữ liệu khách hàng:", err);
    }
  }, [customers, storageReady]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Đang thuê"
  ).length;

  const returnedCount = customers.filter(
    (customer) => customer.status === "Đã trả phòng"
  ).length;

  const filteredCustomers = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");

    const result = customers.filter((customer) => {
      const searchable = [
        customer.name,
        customer.phone,
        customer.email,
        customer.identity,
        customer.address,
        customer.property,
        customer.room,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("vi");

      const matchesSearch = searchable.includes(keyword);
      const matchesStatus =
        statusFilter === "Tất cả" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name, "vi");
      }

      if (sortOrder === "oldest") {
        return a.startDate.localeCompare(b.startDate);
      }

      if (sortOrder === "newest") {
        return b.startDate.localeCompare(a.startDate);
      }

      return b.id - a.id;
    });
  }, [customers, search, statusFilter, sortOrder]);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEditModal(customer: Customer) {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      identity: customer.identity,
      address: customer.address,
      property: customer.property,
      room: customer.room,
      startDate: customer.startDate,
      status: customer.status,
    });
    setError("");
    setModalOpen(true);
  }

  function saveCustomer() {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const identity = form.identity.trim();

    if (!name || !phone || !form.property.trim() || !form.room.trim()) {
      setError("Vui lòng nhập đầy đủ họ tên, số điện thoại, nhà và phòng.");
      return;
    }

    if (!/^[0-9+\s().-]{9,18}$/.test(phone)) {
      setError("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Địa chỉ email không hợp lệ.");
      return;
    }

    if (identity && !/^[0-9]{9,12}$/.test(identity)) {
      setError("Số CCCD/CMND cần có từ 9 đến 12 chữ số.");
      return;
    }

    const duplicatePhone = customers.some(
      (customer) =>
        customer.phone.replace(/\s/g, "") === phone.replace(/\s/g, "") &&
        customer.id !== editingId
    );

    if (duplicatePhone) {
      setError("Số điện thoại này đã được sử dụng bởi khách hàng khác.");
      return;
    }

    const duplicateIdentity =
      identity &&
      customers.some(
        (customer) =>
          customer.identity === identity && customer.id !== editingId
      );

    if (duplicateIdentity) {
      setError("Số CCCD/CMND này đã tồn tại trong danh sách.");
      return;
    }

    const customerData: Customer = {
      id: editingId ?? Date.now(),
      ...form,
      name,
      phone,
      email,
      identity,
      address: form.address.trim(),
      property: form.property.trim(),
      room: form.room.trim(),
    };

    if (editingId !== null) {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === editingId ? customerData : customer
        )
      );
    } else {
      setCustomers((current) => [customerData, ...current]);
    }

    setModalOpen(false);
    setError("");
  }

  function deleteCustomer(customer: Customer) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa khách hàng "${customer.name}" khỏi danh sách?`
    );

    if (!confirmed) return;

    setCustomers((current) =>
      current.filter((item) => item.id !== customer.id)
    );

    if (detailCustomer?.id === customer.id) {
      setDetailCustomer(null);
    }
  }

  function exportCSV() {
    if (customers.length === 0) {
      alert("Chưa có dữ liệu khách hàng để xuất.");
      return;
    }

    const headers = [
      "Họ và tên",
      "Số điện thoại",
      "Email",
      "CCCD/CMND",
      "Địa chỉ",
      "Nhà",
      "Phòng",
      "Ngày bắt đầu thuê",
      "Trạng thái",
    ];

    const rows = customers.map((customer) => [
      customer.name,
      customer.phone,
      customer.email,
      customer.identity,
      customer.address,
      customer.property,
      customer.room,
      customer.startDate,
      customer.status,
    ]);

    const escapeCSV = (value: string) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `danh-sach-khach-hang-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    link.click();
    URL.revokeObjectURL(url);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("Tất cả");
    setSortOrder("newest");
  }

  const statCards = [
    {
      title: "Tổng khách hàng",
      value: customers.length,
      note: "Tổng số hồ sơ khách hàng",
      icon: Users,
      color: "amber",
      iconClass: "bg-amber-100 text-amber-700",
      cardClass:
        "border-amber-100 bg-amber-50/70 hover:bg-amber-100/80 hover:border-amber-200",
      valueClass: "text-amber-800",
    },
    {
      title: "Đang thuê phòng",
      value: activeCount,
      note: "Khách hàng đang hoạt động",
      icon: UserCheck,
      color: "emerald",
      iconClass: "bg-emerald-100 text-emerald-700",
      cardClass:
        "border-emerald-100 bg-emerald-50/70 hover:bg-emerald-100/80 hover:border-emerald-200",
      valueClass: "text-emerald-800",
    },
    {
      title: "Đã trả phòng",
      value: returnedCount,
      note: "Khách hàng đã kết thúc thuê",
      icon: UserX,
      color: "blue",
      iconClass: "bg-blue-100 text-blue-700",
      cardClass:
        "border-blue-100 bg-blue-50/70 hover:bg-blue-100/80 hover:border-blue-200",
      valueClass: "text-blue-800",
    },
  ];

  return (
    <div
      className="min-h-screen space-y-6 bg-slate-50/70 p-4 md:p-7"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* Tiêu đề trang */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Quản lý</span>
            <span>/</span>
            <span className="font-medium text-amber-600">Khách hàng</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý khách hàng
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Theo dõi thông tin, tình trạng thuê và hồ sơ khách hàng tại NDAHOME.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
          >
            <Download size={18} />
            Xuất Excel/CSV
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg"
          >
            <Plus size={19} />
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`group rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${stat.cardClass}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${stat.iconClass}`}
                >
                  <Icon size={23} />
                </div>

                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500">
                  NDAHOME
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-600">
                {stat.title}
              </p>

              <div className="mt-1 flex items-end justify-between">
                <p className={`text-3xl font-bold ${stat.valueClass}`}>
                  {stat.value}
                </p>
                <span className="pb-1 text-xs text-slate-500">
                  Khách hàng
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
            </div>
          );
        })}
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Danh sách khách hàng
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Tìm kiếm, lọc và quản lý hồ sơ khách hàng.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Users size={15} />
            {filteredCustomers.length} kết quả
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, số điện thoại, email, CCCD, nhà hoặc phòng..."
              className={`${inputClass} pl-11`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                title="Xóa từ khóa"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative lg:w-52">
            <Filter
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={`${inputClass} appearance-none pl-10`}
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Đang thuê">Đang thuê</option>
              <option value="Đã trả phòng">Đã trả phòng</option>
            </select>
          </div>

          <div className="relative lg:w-52">
            <ArrowUpDown
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className={`${inputClass} appearance-none pl-10`}
            >
              <option value="newest">Ngày thuê mới nhất</option>
              <option value="oldest">Ngày thuê cũ nhất</option>
              <option value="name">Sắp xếp theo tên</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            title="Đặt lại bộ lọc"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <RotateCcw size={17} />
            Đặt lại
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-800">Thông tin khách hàng</h2>
            <p className="mt-1 text-sm text-slate-400">
              Đang hiển thị {filteredCustomers.length} / {customers.length} khách
              hàng
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            Tổng hồ sơ: {customers.length}
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Users size={30} />
            </div>

            <p className="mt-4 font-bold text-slate-700">
              Không tìm thấy khách hàng
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.
            </p>

            <button
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-bold">Khách hàng</th>
                  <th className="px-5 py-4 font-bold">Thông tin liên hệ</th>
                  <th className="px-5 py-4 font-bold">Nhà / Phòng</th>
                  <th className="px-5 py-4 font-bold">Ngày bắt đầu</th>
                  <th className="px-5 py-4 font-bold">Trạng thái</th>
                  <th className="px-5 py-4 text-right font-bold">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="group transition-colors duration-200 hover:bg-amber-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-base font-bold text-amber-700 transition group-hover:bg-amber-200">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            CCCD: {customer.identity || "Chưa cập nhật"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone size={14} className="shrink-0 text-slate-400" />
                        <span>{customer.phone}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={14} className="shrink-0" />
                        <span>{customer.email || "Chưa có email"}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <Building2 size={15} className="text-slate-400" />
                        {customer.property}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <BedDouble size={14} />
                        Phòng {customer.room}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-slate-400" />
                        {formatDate(customer.startDate)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                          customer.status === "Đang thuê"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            customer.status === "Đang thuê"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {customer.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setDetailCustomer(customer)}
                          title="Xem chi tiết"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openEditModal(customer)}
                          title="Sửa khách hàng"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => deleteCustomer(customer)}
                          title="Xóa khách hàng"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal thêm / sửa khách hàng */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                  <UserRound size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {editingId !== null
                      ? "Cập nhật khách hàng"
                      : "Thêm khách hàng mới"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Nhập thông tin hồ sơ khách hàng
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Nhập họ và tên"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="Nhập số điện thoại"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="example@gmail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  CCCD / CMND
                </label>
                <input
                  value={form.identity}
                  onChange={(event) =>
                    setForm({ ...form, identity: event.target.value })
                  }
                  placeholder="Nhập số giấy tờ"
                  maxLength={12}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Địa chỉ thường trú
                </label>
                <input
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                  placeholder="Nhập địa chỉ thường trú"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tên nhà <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.property}
                  onChange={(event) =>
                    setForm({ ...form, property: event.target.value })
                  }
                  placeholder="Ví dụ: Nhà trọ Bình An"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phòng <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.room}
                  onChange={(event) =>
                    setForm({ ...form, room: event.target.value })
                  }
                  placeholder="Ví dụ: P101"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ngày bắt đầu thuê
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(event) =>
                    setForm({ ...form, startDate: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Trạng thái khách hàng
                </label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as CustomerStatus,
                    })
                  }
                  className={inputClass}
                >
                  <option value="Đang thuê">Đang thuê</option>
                  <option value="Đã trả phòng">Đã trả phòng</option>
                </select>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 md:col-span-2">
                  {error}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row md:px-6">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Hủy bỏ
              </button>

              <button
                onClick={saveCustomer}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600 hover:shadow-md"
              >
                <Plus size={17} />
                {editingId !== null ? "Lưu thay đổi" : "Thêm khách hàng"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {detailCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDetailCustomer(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white p-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Chi tiết khách hàng
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Thông tin hồ sơ và tình trạng thuê
                </p>
              </div>

              <button
                onClick={() => setDetailCustomer(null)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5 md:p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-bold text-amber-700">
                  {detailCustomer.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xl font-bold text-slate-800">
                    {detailCustomer.name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {detailCustomer.phone}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      detailCustomer.status === "Đang thuê"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {detailCustomer.status}
                  </span>
                </div>
              </div>

              <div className="mb-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                  <Building2 size={17} />
                  Thông tin thuê phòng
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Nhà</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {detailCustomer.property}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Phòng</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {detailCustomer.room}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-slate-500">Ngày bắt đầu thuê</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formatDate(detailCustomer.startDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Số điện thoại",
                    value: detailCustomer.phone,
                    icon: Phone,
                  },
                  {
                    label: "Email",
                    value: detailCustomer.email || "Chưa cập nhật",
                    icon: Mail,
                  },
                  {
                    label: "CCCD / CMND",
                    value: detailCustomer.identity || "Chưa cập nhật",
                    icon: CreditCard,
                  },
                  {
                    label: "Địa chỉ thường trú",
                    value: detailCustomer.address || "Chưa cập nhật",
                    icon: MapPin,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0"
                    >
                      <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-400">{item.label}</p>
                        <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row">
              <button
                onClick={() => deleteCustomer(detailCustomer)}
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Xóa khách hàng
              </button>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDetailCustomer(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Đóng
                </button>

                <button
                  onClick={() => {
                    openEditModal(detailCustomer);
                    setDetailCustomer(null);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600"
                >
                  <Pencil size={16} />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
