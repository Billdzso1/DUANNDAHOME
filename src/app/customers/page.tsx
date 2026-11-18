
"use client";

import { useMemo, useState } from "react";
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
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("vi-VN");
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const [modalOpen, setModalOpen] = useState(false);
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = customers.filter(
    (customer) => customer.status === "Đang thuê"
  ).length;

  const returnedCount = customers.filter(
    (customer) => customer.status === "Đã trả phòng"
  ).length;

  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch = [
        customer.name,
        customer.phone,
        customer.email,
        customer.identity,
        customer.property,
        customer.room,
      ].some((value) => value.toLowerCase().includes(keyword));

      const matchesStatus =
        statusFilter === "Tất cả" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

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
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.property.trim() ||
      !form.room.trim()
    ) {
      setError("Vui lòng nhập họ tên, số điện thoại, nhà và phòng.");
      return;
    }

    if (!/^[0-9+\s]{9,15}$/.test(form.phone.trim())) {
      setError("Số điện thoại không hợp lệ.");
      return;
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      setError("Địa chỉ email không hợp lệ.");
      return;
    }

    const duplicatePhone = customers.some(
      (customer) =>
        customer.phone === form.phone.trim() && customer.id !== editingId
    );

    if (duplicatePhone) {
      setError("Số điện thoại này đã được sử dụng.");
      return;
    }

    const customerData: Customer = {
      id: editingId ?? Date.now(),
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      identity: form.identity.trim(),
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
      `Bạn có chắc muốn xóa khách hàng "${customer.name}"?`
    );

    if (!confirmed) return;

    setCustomers((current) =>
      current.filter((item) => item.id !== customer.id)
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  return (
    <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 md:p-7">
      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 text-sm text-slate-400">
            Quản lý / Khách hàng
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý khách hàng
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý thông tin và lịch sử thuê phòng của khách hàng.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
        >
          <Plus size={19} />
          Thêm khách hàng
        </button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Users size={22} />
            </div>
            <span className="text-xs text-slate-400">Tất cả</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Tổng khách hàng</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {customers.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <UserCheck size={22} />
            </div>
            <span className="text-xs text-emerald-600">Đang hoạt động</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Đang thuê phòng</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
              <UserX size={22} />
            </div>
            <span className="text-xs text-slate-400">Đã kết thúc</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Đã trả phòng</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {returnedCount}
          </p>
        </div>
      </div>

      {/* Tìm kiếm và bộ lọc */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm tên, số điện thoại, email, nhà hoặc phòng..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="relative md:w-56">
          <Filter
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-amber-400"
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Đang thuê">Đang thuê</option>
            <option value="Đã trả phòng">Đã trả phòng</option>
          </select>
        </div>
      </div>

      {/* Bảng khách hàng */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-bold text-slate-800">Danh sách khách hàng</h2>
            <p className="mt-1 text-xs text-slate-400">
              Hiển thị {filteredCustomers.length} / {customers.length} khách hàng
            </p>
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="py-14 text-center">
            <Users className="mx-auto text-slate-300" size={40} />
            <p className="mt-3 font-medium text-slate-600">
              Không tìm thấy khách hàng
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Thử thay đổi từ khóa hoặc bộ lọc.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Khách hàng</th>
                  <th className="px-5 py-4 font-semibold">Liên hệ</th>
                  <th className="px-5 py-4 font-semibold">Nhà / Phòng</th>
                  <th className="px-5 py-4 font-semibold">Ngày bắt đầu</th>
                  <th className="px-5 py-4 font-semibold">Trạng thái</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            CCCD: {customer.identity || "Chưa cập nhật"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {customer.phone}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={14} />
                        {customer.email || "Chưa có email"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">
                        {customer.property}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Phòng {customer.room}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-slate-400" />
                        {formatDate(customer.startDate)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          customer.status === "Đang thuê"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setDetailCustomer(customer)}
                          title="Xem chi tiết"
                          className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => openEditModal(customer)}
                          title="Sửa khách hàng"
                          className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer)}
                          title="Xóa khách hàng"
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {editingId !== null ? "Cập nhật khách hàng" : "Thêm khách hàng"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Thông tin có dấu * là bắt buộc.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Họ và tên *
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Số điện thoại *
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  CCCD / CMND
                </label>
                <input
                  value={form.identity}
                  onChange={(event) =>
                    setForm({ ...form, identity: event.target.value })
                  }
                  placeholder="Nhập số giấy tờ"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Địa chỉ thường trú
                </label>
                <input
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                  placeholder="Nhập địa chỉ"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tên nhà *
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phòng *
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Trạng thái
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
                <p className="text-sm text-red-500 sm:col-span-2">{error}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={saveCustomer}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Lưu khách hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {detailCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="text-lg font-bold text-slate-800">
                Chi tiết khách hàng
              </h3>
              <button
                onClick={() => setDetailCustomer(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-xl font-bold text-amber-700">
                  {detailCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    {detailCustomer.name}
                  </h4>
                  <span className="text-sm text-slate-500">
                    {detailCustomer.status}
                  </span>
                </div>
              </div>

              {[
                ["Số điện thoại", detailCustomer.phone],
                ["Email", detailCustomer.email || "Chưa cập nhật"],
                ["CCCD / CMND", detailCustomer.identity || "Chưa cập nhật"],
                ["Địa chỉ", detailCustomer.address || "Chưa cập nhật"],
                ["Nhà", detailCustomer.property],
                ["Phòng", detailCustomer.room],
                ["Ngày bắt đầu thuê", formatDate(detailCustomer.startDate)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col justify-between gap-1 border-b border-slate-100 pb-3 sm:flex-row"
                >
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-medium text-slate-800 sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-slate-100 p-5">
              <button
                onClick={() => setDetailCustomer(null)}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
