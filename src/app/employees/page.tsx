
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
  Eye,
  Phone,
  Mail,
  CalendarDays,
  Filter,
  BriefcaseBusiness,
  Wallet,
} from "lucide-react";

type EmployeeStatus = "Đang làm việc" | "Tạm nghỉ" | "Đã nghỉ việc";

type Employee = {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  salary: number;
  status: EmployeeStatus;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    code: "NV001",
    name: "Nguyễn Hoàng Nam",
    phone: "0901234567",
    email: "nam@gmail.com",
    department: "Quản lý",
    position: "Quản lý vận hành",
    startDate: "2025-01-10",
    salary: 12000000,
    status: "Đang làm việc",
  },
  {
    id: 2,
    code: "NV002",
    name: "Trần Thị Lan",
    phone: "0912345678",
    email: "lan@gmail.com",
    department: "Kế toán",
    position: "Kế toán viên",
    startDate: "2025-03-15",
    salary: 9000000,
    status: "Đang làm việc",
  },
  {
    id: 3,
    code: "NV003",
    name: "Lê Văn Hùng",
    phone: "0987654321",
    email: "hung@gmail.com",
    department: "Kỹ thuật",
    position: "Nhân viên kỹ thuật",
    startDate: "2025-06-01",
    salary: 8500000,
    status: "Tạm nghỉ",
  },
  {
    id: 4,
    code: "NV004",
    name: "Phạm Thị Mai",
    phone: "0934567890",
    email: "mai@gmail.com",
    department: "Chăm sóc khách hàng",
    position: "Nhân viên CSKH",
    startDate: "2024-08-20",
    salary: 8000000,
    status: "Đã nghỉ việc",
  },
];

const emptyForm = {
  code: "",
  name: "",
  phone: "",
  email: "",
  department: "",
  position: "",
  startDate: "",
  salary: "",
  status: "Đang làm việc" as EmployeeStatus,
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + "đ";

const formatDate = (date: string) => {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("vi-VN");
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const [modalOpen, setModalOpen] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = employees.filter(
    (employee) => employee.status === "Đang làm việc"
  ).length;

  const pausedCount = employees.filter(
    (employee) => employee.status === "Tạm nghỉ"
  ).length;

  const retiredCount = employees.filter(
    (employee) => employee.status === "Đã nghỉ việc"
  ).length;

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesSearch = [
        employee.code,
        employee.name,
        employee.phone,
        employee.email,
        employee.department,
        employee.position,
      ].some((value) => value.toLowerCase().includes(keyword));

      const matchesStatus =
        statusFilter === "Tất cả" || employee.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, search, statusFilter]);

  const totalSalary = employees
    .filter((employee) => employee.status === "Đang làm việc")
    .reduce((sum, employee) => sum + employee.salary, 0);

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  function openAddModal() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      code: `NV${String(Date.now()).slice(-5)}`,
    });
    setError("");
    setModalOpen(true);
  }

  function openEditModal(employee: Employee) {
    setEditingId(employee.id);
    setForm({
      code: employee.code,
      name: employee.name,
      phone: employee.phone,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      startDate: employee.startDate,
      salary: String(employee.salary),
      status: employee.status,
    });
    setError("");
    setModalOpen(true);
  }

  function saveEmployee() {
    if (
      !form.code.trim() ||
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.department.trim() ||
      !form.position.trim()
    ) {
      setError("Vui lòng nhập đầy đủ mã, họ tên, số điện thoại, phòng ban và chức vụ.");
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

    const salary = Number(form.salary);

    if (!form.salary || !Number.isFinite(salary) || salary < 0) {
      setError("Vui lòng nhập mức lương hợp lệ.");
      return;
    }

    const duplicateCode = employees.some(
      (employee) =>
        employee.code.toLowerCase() === form.code.trim().toLowerCase() &&
        employee.id !== editingId
    );

    if (duplicateCode) {
      setError("Mã nhân viên đã tồn tại.");
      return;
    }

    const employeeData: Employee = {
      id: editingId ?? Date.now(),
      ...form,
      code: form.code.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      department: form.department.trim(),
      position: form.position.trim(),
      salary,
    };

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId ? employeeData : employee
        )
      );
    } else {
      setEmployees((current) => [employeeData, ...current]);
    }

    setModalOpen(false);
    setError("");
  }

  function deleteEmployee(employee: Employee) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa nhân viên "${employee.name}"?`
    );

    if (!confirmed) return;

    setEmployees((current) =>
      current.filter((item) => item.id !== employee.id)
    );
  }

  function statusClass(status: EmployeeStatus) {
    if (status === "Đang làm việc") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Tạm nghỉ") {
      return "bg-orange-50 text-orange-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  return (
    <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 md:p-7">
      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 text-sm text-slate-400">
            Quản lý / Nhân viên
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý nhân viên
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi thông tin nhân sự và tình trạng làm việc.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
        >
          <Plus size={19} />
          Thêm nhân viên
        </button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-600 w-fit">
            <Users size={22} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Tổng nhân viên</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {employees.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 w-fit">
            <UserCheck size={22} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Đang làm việc</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-600 w-fit">
            <UserX size={22} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Tạm nghỉ</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {pausedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600 w-fit">
            <Wallet size={22} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Tổng lương tháng</p>
          <p className="mt-1 text-xl font-bold text-slate-800">
            {formatMoney(totalSalary)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Nhân viên đang làm việc
          </p>
        </div>
      </div>

      {/* Tìm kiếm và lọc */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm mã nhân viên, họ tên, số điện thoại, phòng ban..."
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
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Tạm nghỉ">Tạm nghỉ</option>
            <option value="Đã nghỉ việc">Đã nghỉ việc</option>
          </select>
        </div>
      </div>

      {/* Danh sách nhân viên */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-bold text-slate-800">Danh sách nhân viên</h2>
            <p className="mt-1 text-xs text-slate-400">
              Hiển thị {filteredEmployees.length} / {employees.length} nhân viên
            </p>
          </div>
          <span className="hidden text-xs text-slate-400 sm:block">
            {retiredCount} nhân viên đã nghỉ việc
          </span>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="py-14 text-center">
            <Users className="mx-auto text-slate-300" size={40} />
            <p className="mt-3 font-medium text-slate-600">
              Không tìm thấy nhân viên
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Thử thay đổi từ khóa hoặc bộ lọc.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Nhân viên</th>
                  <th className="px-5 py-4 font-semibold">Liên hệ</th>
                  <th className="px-5 py-4 font-semibold">Phòng ban</th>
                  <th className="px-5 py-4 font-semibold">Chức vụ</th>
                  <th className="px-5 py-4 font-semibold">Lương cơ bản</th>
                  <th className="px-5 py-4 font-semibold">Trạng thái</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {employee.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {employee.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {employee.phone}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={14} />
                        {employee.email || "Chưa có email"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">
                        {employee.department}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {employee.position}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {formatMoney(employee.salary)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusClass(employee.status)}`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setDetailEmployee(employee)}
                          title="Xem chi tiết"
                          className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => openEditModal(employee)}
                          title="Sửa nhân viên"
                          className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => deleteEmployee(employee)}
                          title="Xóa nhân viên"
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

      {/* Modal thêm / sửa */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {editingId !== null ? "Cập nhật nhân viên" : "Thêm nhân viên"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Nhập thông tin nhân viên bên dưới.
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
                  Mã nhân viên *
                </label>
                <input
                  value={form.code}
                  onChange={(event) =>
                    setForm({ ...form, code: event.target.value })
                  }
                  placeholder="NV001"
                  className={inputClass}
                />
              </div>

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
                  Phòng ban *
                </label>
                <input
                  value={form.department}
                  onChange={(event) =>
                    setForm({ ...form, department: event.target.value })
                  }
                  placeholder="Ví dụ: Kế toán"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Chức vụ *
                </label>
                <input
                  value={form.position}
                  onChange={(event) =>
                    setForm({ ...form, position: event.target.value })
                  }
                  placeholder="Ví dụ: Kế toán viên"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ngày vào làm
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
                  Lương cơ bản (VNĐ) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.salary}
                  onChange={(event) =>
                    setForm({ ...form, salary: event.target.value })
                  }
                  placeholder="9000000"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Trạng thái làm việc
                </label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as EmployeeStatus,
                    })
                  }
                  className={inputClass}
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Tạm nghỉ">Tạm nghỉ</option>
                  <option value="Đã nghỉ việc">Đã nghỉ việc</option>
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
                onClick={saveEmployee}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Lưu nhân viên
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết */}
      {detailEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="text-lg font-bold text-slate-800">
                Chi tiết nhân viên
              </h3>
              <button
                onClick={() => setDetailEmployee(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-xl font-bold text-amber-700">
                  {detailEmployee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    {detailEmployee.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {detailEmployee.code}
                  </p>
                </div>
              </div>

              {[
                ["Số điện thoại", detailEmployee.phone],
                ["Email", detailEmployee.email || "Chưa cập nhật"],
                ["Phòng ban", detailEmployee.department],
                ["Chức vụ", detailEmployee.position],
                ["Ngày vào làm", formatDate(detailEmployee.startDate)],
                ["Lương cơ bản", formatMoney(detailEmployee.salary)],
                ["Trạng thái", detailEmployee.status],
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
                onClick={() => setDetailEmployee(null)}
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
