
"use client";

<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
=======
import { useMemo, useState } from "react";
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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
<<<<<<< HEAD
  Download,
  ArrowUpDown,
  Building2,
  Clock,
  CircleDollarSign,
  RotateCcw,
  UserRound,
  BadgeCheck,
=======
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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

<<<<<<< HEAD
type EmployeeForm = {
  code: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  salary: string;
  status: EmployeeStatus;
};

const STORAGE_KEY = "ndahome_employees";

=======
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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

<<<<<<< HEAD
const emptyForm: EmployeeForm = {
=======
const emptyForm = {
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
  code: "",
  name: "",
  phone: "",
  email: "",
  department: "",
  position: "",
  startDate: "",
  salary: "",
<<<<<<< HEAD
  status: "Đang làm việc",
=======
  status: "Đang làm việc" as EmployeeStatus,
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + "đ";

const formatDate = (date: string) => {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("vi-VN");
};

<<<<<<< HEAD
const escapeCSV = (value: string | number) =>
  `"${String(value ?? "").replace(/"/g, '""')}"`;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [departmentFilter, setDepartmentFilter] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");
=======
export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251

  const [modalOpen, setModalOpen] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
<<<<<<< HEAD
  const [form, setForm] = useState<EmployeeForm>(emptyForm);
  const [error, setError] = useState("");

  // Đọc dữ liệu từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setEmployees(parsed as Employee[]);
        }
      }
    } catch (error) {
      console.error("Không thể đọc dữ liệu nhân viên:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Lưu dữ liệu khi có thay đổi
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error("Không thể lưu dữ liệu nhân viên:", error);
    }
  }, [employees, loaded]);

=======
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
  const activeCount = employees.filter(
    (employee) => employee.status === "Đang làm việc"
  ).length;

  const pausedCount = employees.filter(
    (employee) => employee.status === "Tạm nghỉ"
  ).length;

  const retiredCount = employees.filter(
    (employee) => employee.status === "Đã nghỉ việc"
  ).length;

<<<<<<< HEAD
  const totalSalary = employees
    .filter((employee) => employee.status === "Đang làm việc")
    .reduce((sum, employee) => sum + employee.salary, 0);

  const departments = useMemo(
    () =>
      Array.from(
        new Set(
          employees
            .map((employee) => employee.department.trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b, "vi")),
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const result = employees.filter((employee) => {
=======
  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return employees.filter((employee) => {
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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

<<<<<<< HEAD
      const matchesDepartment =
        departmentFilter === "Tất cả" ||
        employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "oldest") {
        return a.startDate.localeCompare(b.startDate);
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name, "vi");
      }

      if (sortBy === "salary-high") {
        return b.salary - a.salary;
      }

      if (sortBy === "salary-low") {
        return a.salary - b.salary;
      }

      return b.startDate.localeCompare(a.startDate);
    });
  }, [employees, search, statusFilter, departmentFilter, sortBy]);

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  function generateEmployeeCode() {
    const numbers = employees
      .map((employee) => Number(employee.code.replace(/\D/g, "")))
      .filter(Number.isFinite);

    const nextNumber = Math.max(0, ...numbers) + 1;

    return `NV${String(nextNumber).padStart(3, "0")}`;
  }
=======
      return matchesSearch && matchesStatus;
    });
  }, [employees, search, statusFilter]);

  const totalSalary = employees
    .filter((employee) => employee.status === "Đang làm việc")
    .reduce((sum, employee) => sum + employee.salary, 0);

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251

  function openAddModal() {
    setEditingId(null);
    setForm({
      ...emptyForm,
<<<<<<< HEAD
      code: generateEmployeeCode(),
=======
      code: `NV${String(Date.now()).slice(-5)}`,
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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
<<<<<<< HEAD
    const code = form.code.trim();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const department = form.department.trim();
    const position = form.position.trim();

    if (!code || !name || !phone || !department || !position) {
      setError(
        "Vui lòng nhập đầy đủ mã nhân viên, họ tên, số điện thoại, phòng ban và chức vụ."
      );
      return;
    }

    if (!/^[0-9+\s.-]{9,16}$/.test(phone)) {
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
      setError("Số điện thoại không hợp lệ.");
      return;
    }

<<<<<<< HEAD
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
=======
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
      setError("Địa chỉ email không hợp lệ.");
      return;
    }

    const salary = Number(form.salary);

<<<<<<< HEAD
    if (
      form.salary.trim() === "" ||
      !Number.isFinite(salary) ||
      salary < 0
    ) {
=======
    if (!form.salary || !Number.isFinite(salary) || salary < 0) {
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
      setError("Vui lòng nhập mức lương hợp lệ.");
      return;
    }

    const duplicateCode = employees.some(
      (employee) =>
<<<<<<< HEAD
        employee.code.toLowerCase() === code.toLowerCase() &&
=======
        employee.code.toLowerCase() === form.code.trim().toLowerCase() &&
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
        employee.id !== editingId
    );

    if (duplicateCode) {
      setError("Mã nhân viên đã tồn tại.");
      return;
    }

<<<<<<< HEAD
    const duplicatePhone = employees.some(
      (employee) =>
        employee.phone.replace(/\s/g, "") === phone.replace(/\s/g, "") &&
        employee.id !== editingId
    );

    if (duplicatePhone) {
      setError("Số điện thoại này đã được sử dụng.");
      return;
    }

    const duplicateEmail =
      email &&
      employees.some(
        (employee) =>
          employee.email.toLowerCase() === email.toLowerCase() &&
          employee.id !== editingId
      );

    if (duplicateEmail) {
      setError("Email này đã được sử dụng.");
      return;
    }

    const employeeData: Employee = {
      id: editingId ?? Date.now(),
      code,
      name,
      phone,
      email,
      department,
      position,
      startDate: form.startDate,
      salary,
      status: form.status,
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    };

    if (editingId !== null) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingId ? employeeData : employee
        )
      );
<<<<<<< HEAD

      if (detailEmployee?.id === editingId) {
        setDetailEmployee(employeeData);
      }
=======
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    } else {
      setEmployees((current) => [employeeData, ...current]);
    }

    setModalOpen(false);
    setError("");
  }

  function deleteEmployee(employee: Employee) {
    const confirmed = window.confirm(
<<<<<<< HEAD
      `Bạn có chắc muốn xóa nhân viên "${employee.name}" (${employee.code})?`
=======
      `Bạn có chắc muốn xóa nhân viên "${employee.name}"?`
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
    );

    if (!confirmed) return;

    setEmployees((current) =>
      current.filter((item) => item.id !== employee.id)
    );
<<<<<<< HEAD

    if (detailEmployee?.id === employee.id) {
      setDetailEmployee(null);
    }
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("Tất cả");
    setDepartmentFilter("Tất cả");
    setSortBy("newest");
  }

  function exportCSV() {
    if (filteredEmployees.length === 0) {
      alert("Không có dữ liệu nhân viên để xuất.");
      return;
    }

    const headers = [
      "Mã nhân viên",
      "Họ và tên",
      "Số điện thoại",
      "Email",
      "Phòng ban",
      "Chức vụ",
      "Ngày vào làm",
      "Lương cơ bản",
      "Trạng thái",
    ];

    const rows = filteredEmployees.map((employee) => [
      employee.code,
      employee.name,
      employee.phone,
      employee.email,
      employee.department,
      employee.position,
      formatDate(employee.startDate),
      employee.salary,
      employee.status,
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Danh-sach-nhan-vien-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    link.click();
    URL.revokeObjectURL(url);
=======
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
  }

  function statusClass(status: EmployeeStatus) {
    if (status === "Đang làm việc") {
<<<<<<< HEAD
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (status === "Tạm nghỉ") {
      return "border border-orange-200 bg-orange-50 text-orange-700";
    }

    return "border border-slate-200 bg-slate-100 text-slate-600";
  }

  function statusDot(status: EmployeeStatus) {
    if (status === "Đang làm việc") return "bg-emerald-500";
    if (status === "Tạm nghỉ") return "bg-orange-500";
    return "bg-slate-400";
  }

  // Mỗi thẻ thống kê có màu nền riêng
  const statCards = [
    {
      title: "Tổng nhân viên",
      value: employees.length,
      description: "Tất cả nhân sự trong hệ thống",
      icon: Users,
      cardBg: "bg-[#FFF7DF]",
      iconStyle: "bg-amber-200 text-amber-800",
      border: "border-amber-200",
      hover: "hover:border-amber-400",
      valueStyle: "text-amber-800",
      accent: "bg-amber-500",
    },
    {
      title: "Đang làm việc",
      value: activeCount,
      description: "Nhân sự đang hoạt động",
      icon: UserCheck,
      cardBg: "bg-[#E8F8EF]",
      iconStyle: "bg-emerald-200 text-emerald-800",
      border: "border-emerald-200",
      hover: "hover:border-emerald-400",
      valueStyle: "text-emerald-800",
      accent: "bg-emerald-500",
    },
    {
      title: "Tạm nghỉ",
      value: pausedCount,
      description: "Nhân sự đang tạm nghỉ",
      icon: Clock,
      cardBg: "bg-[#FFF0E5]",
      iconStyle: "bg-orange-200 text-orange-800",
      border: "border-orange-200",
      hover: "hover:border-orange-400",
      valueStyle: "text-orange-800",
      accent: "bg-orange-500",
    },
    {
      title: "Đã nghỉ việc",
      value: retiredCount,
      description: "Nhân sự đã kết thúc công việc",
      icon: UserX,
      cardBg: "bg-[#EDF2FF]",
      iconStyle: "bg-blue-200 text-blue-800",
      border: "border-blue-200",
      hover: "hover:border-blue-400",
      valueStyle: "text-blue-800",
      accent: "bg-blue-500",
    },
  ];

  return (
    <div
      className="min-h-screen space-y-6 bg-slate-50/70 p-4 md:p-7"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <style jsx global>{`
        .employee-card {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .employee-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
        }

        .employee-button {
          transition: all 0.2s ease;
        }

        .employee-button:hover {
          transform: translateY(-2px);
        }

        .employee-input {
          font-family: "Times New Roman", Times, serif;
        }
      `}</style>

      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Quản lý</span>
            <span>/</span>
            <span className="font-semibold text-amber-600">Nhân viên</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý nhân viên
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Quản lý hồ sơ, phòng ban, chức vụ và tình trạng làm việc của nhân sự.
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
          </p>
        </div>

        <button
          onClick={openAddModal}
<<<<<<< HEAD
          className="employee-button flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-amber-200 hover:bg-amber-600"
=======
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
        >
          <Plus size={19} />
          Thêm nhân viên
        </button>
      </div>

<<<<<<< HEAD
      {/* Thẻ thống kê nhiều màu */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`employee-card relative overflow-hidden rounded-2xl border ${item.border} ${item.hover} ${item.cardBg} p-5 shadow-sm`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1.5 ${item.accent}`}
              />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600">
                    {item.title}
                  </p>

                  <p className={`mt-3 text-4xl font-bold ${item.valueStyle}`}>
                    {item.value}
                  </p>
                </div>

                <div className={`rounded-2xl p-3 ${item.iconStyle}`}>
                  <Icon size={25} />
                </div>
              </div>

              <div className="mt-5 border-t border-black/5 pt-3">
                <p className="text-xs font-medium text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tổng quỹ lương */}
      <div className="employee-card overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-yellow-50 shadow-sm">
        <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-100 p-4 text-amber-700">
              <Wallet size={27} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Tổng quỹ lương hàng tháng
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-800">
                {formatMoney(totalSalary)}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Chỉ tính nhân viên đang làm việc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-700">
            <CircleDollarSign size={19} />
            {activeCount} nhân viên đang hưởng lương
          </div>
        </div>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Filter size={19} className="text-amber-600" />
              Tìm kiếm và lọc nhân viên
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Tìm theo mã, họ tên, liên hệ, phòng ban hoặc chức vụ.
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="employee-button flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-amber-50 hover:text-amber-700"
          >
            <RotateCcw size={15} />
            Đặt lại bộ lọc
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nhập mã nhân viên, họ tên, số điện thoại..."
              className={`${inputClass} employee-input pl-10`}
            />
          </div>

          <div className="relative">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={`${inputClass} employee-input appearance-none pl-10`}
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Đang làm việc">Đang làm việc</option>
              <option value="Tạm nghỉ">Tạm nghỉ</option>
              <option value="Đã nghỉ việc">Đã nghỉ việc</option>
            </select>
          </div>

          <div className="relative">
            <Building2
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className={`${inputClass} employee-input appearance-none pl-10`}
            >
              <option value="Tất cả">Tất cả phòng ban</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <ArrowUpDown size={16} className="text-amber-600" />
            <span>Sắp xếp:</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
            >
              <option value="newest">Ngày vào làm mới nhất</option>
              <option value="oldest">Ngày vào làm lâu nhất</option>
              <option value="name">Tên A – Z</option>
              <option value="salary-high">Lương cao nhất</option>
              <option value="salary-low">Lương thấp nhất</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="employee-button flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            <Download size={17} />
            Xuất Excel / CSV
          </button>
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
        </div>
      </div>

      {/* Danh sách nhân viên */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
<<<<<<< HEAD
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Users size={20} className="text-amber-600" />
              Danh sách nhân viên
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Hiển thị {filteredEmployees.length} / {employees.length} nhân viên
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              {activeCount} đang làm
            </span>

            <span className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
              {pausedCount} tạm nghỉ
            </span>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
              {retiredCount} đã nghỉ
            </span>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
              <Users size={32} />
            </div>

            <p className="mt-4 text-lg font-bold text-slate-700">
              Không tìm thấy nhân viên
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Thử thay đổi từ khóa hoặc điều kiện lọc.
            </p>

            <button
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-bold">Nhân viên</th>
                  <th className="px-5 py-4 font-bold">Thông tin liên hệ</th>
                  <th className="px-5 py-4 font-bold">Phòng ban</th>
                  <th className="px-5 py-4 font-bold">Chức vụ</th>
                  <th className="px-5 py-4 font-bold">Lương cơ bản</th>
                  <th className="px-5 py-4 font-bold">Trạng thái</th>
                  <th className="px-5 py-4 text-right font-bold">Thao tác</th>
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((employee) => (
<<<<<<< HEAD
                  <tr
                    key={employee.id}
                    className="transition-colors hover:bg-amber-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-yellow-200 text-lg font-bold text-amber-800 shadow-sm">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">
                            {employee.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-amber-600">
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                            {employee.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
<<<<<<< HEAD
                        <Phone size={14} className="shrink-0 text-slate-400" />
                        {employee.phone}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={14} className="shrink-0" />
=======
                        <Phone size={14} className="text-slate-400" />
                        {employee.phone}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={14} />
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                        {employee.email || "Chưa có email"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
<<<<<<< HEAD
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        <Building2 size={13} />
=======
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                        {employee.department}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
<<<<<<< HEAD
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness
                          size={15}
                          className="shrink-0 text-slate-400"
                        />
                        {employee.position}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-700">
                        {formatMoney(employee.salary)}
                      </span>
=======
                      {employee.position}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {formatMoney(employee.salary)}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                    </td>

                    <td className="px-5 py-4">
                      <span
<<<<<<< HEAD
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(employee.status)}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDot(employee.status)}`}
                        />
=======
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusClass(employee.status)}`}
                      >
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setDetailEmployee(employee)}
                          title="Xem chi tiết"
<<<<<<< HEAD
                          className="employee-button rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openEditModal(employee)}
                          title="Sửa nhân viên"
                          className="employee-button rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => deleteEmployee(employee)}
                          title="Xóa nhân viên"
                          className="employee-button rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
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
<<<<<<< HEAD

        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-xs text-slate-400 sm:flex-row">
          <span>
            Tổng quỹ lương hiện tại:{" "}
            <strong className="text-slate-600">
              {formatMoney(totalSalary)}
            </strong>
          </span>
        </div>
=======
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
      </div>

      {/* Modal thêm / sửa */}
      {modalOpen && (
<<<<<<< HEAD
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                    <UserRound size={19} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {editingId !== null
                      ? "Cập nhật nhân viên"
                      : "Thêm nhân viên mới"}
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Nhập thông tin hồ sơ nhân sự bên dưới.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <div>
<<<<<<< HEAD
                <label className={labelClass}>Mã nhân viên *</label>
=======
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mã nhân viên *
                </label>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <input
                  value={form.code}
                  onChange={(event) =>
                    setForm({ ...form, code: event.target.value })
                  }
                  placeholder="NV001"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className={labelClass}>Họ và tên *</label>
=======
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Họ và tên *
                </label>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Nhập họ và tên"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className={labelClass}>Số điện thoại *</label>
=======
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Số điện thoại *
                </label>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <input
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="Nhập số điện thoại"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className={labelClass}>Email</label>
=======
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="example@gmail.com"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className={labelClass}>Phòng ban *</label>
                <input
                  list="employee-departments"
=======
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phòng ban *
                </label>
                <input
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                  value={form.department}
                  onChange={(event) =>
                    setForm({ ...form, department: event.target.value })
                  }
                  placeholder="Ví dụ: Kế toán"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
                />

                <datalist id="employee-departments">
                  {departments.map((department) => (
                    <option key={department} value={department} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className={labelClass}>Chức vụ *</label>
=======
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Chức vụ *
                </label>
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <input
                  value={form.position}
                  onChange={(event) =>
                    setForm({ ...form, position: event.target.value })
                  }
                  placeholder="Ví dụ: Kế toán viên"
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className={labelClass}>Ngày vào làm</label>
                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      setForm({ ...form, startDate: event.target.value })
                    }
                    className={`${inputClass} employee-input pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Lương cơ bản (VNĐ) *</label>
                <div className="relative">
                  <Wallet
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    value={form.salary}
                    onChange={(event) =>
                      setForm({ ...form, salary: event.target.value })
                    }
                    placeholder="9000000"
                    className={`${inputClass} employee-input pl-10`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Trạng thái làm việc</label>
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as EmployeeStatus,
                    })
                  }
<<<<<<< HEAD
                  className={`${inputClass} employee-input`}
=======
                  className={inputClass}
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Tạm nghỉ">Tạm nghỉ</option>
                  <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                </select>
              </div>

              {error && (
<<<<<<< HEAD
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 sm:col-span-2">
                  {error}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50/60 p-5 sm:flex-row">
              <button
                onClick={() => setModalOpen(false)}
                className="employee-button rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Hủy bỏ
              </button>

              <button
                onClick={saveEmployee}
                className="employee-button flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-amber-600"
              >
                <BadgeCheck size={17} />
                {editingId !== null ? "Lưu thay đổi" : "Lưu nhân viên"}
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết */}
      {detailEmployee && (
<<<<<<< HEAD
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDetailEmployee(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white p-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Hồ sơ nhân viên
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Thông tin chi tiết nhân sự NDAHOME
                </p>
              </div>

              <button
                onClick={() => setDetailEmployee(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-6 flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-yellow-300 text-2xl font-bold text-amber-800 shadow-sm">
                  {detailEmployee.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-bold text-slate-800">
                    {detailEmployee.name}
                  </h4>

                  <p className="mt-1 text-sm font-semibold text-amber-700">
                    {detailEmployee.code}
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusClass(detailEmployee.status)}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusDot(detailEmployee.status)}`}
                    />
                    {detailEmployee.status}
                  </span>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  {
                    label: "Số điện thoại",
                    value: detailEmployee.phone,
                    icon: Phone,
                  },
                  {
                    label: "Email",
                    value: detailEmployee.email || "Chưa cập nhật",
                    icon: Mail,
                  },
                  {
                    label: "Phòng ban",
                    value: detailEmployee.department,
                    icon: Building2,
                  },
                  {
                    label: "Chức vụ",
                    value: detailEmployee.position,
                    icon: BriefcaseBusiness,
                  },
                  {
                    label: "Ngày vào làm",
                    value: formatDate(detailEmployee.startDate),
                    icon: CalendarDays,
                  },
                  {
                    label: "Lương cơ bản",
                    value: formatMoney(detailEmployee.salary),
                    icon: Wallet,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex flex-col justify-between gap-2 border-b border-slate-100 py-3 sm:flex-row sm:items-center"
                    >
                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <Icon size={16} className="text-amber-600" />
                        {item.label}
                      </span>

                      <span className="text-sm font-semibold text-slate-800 sm:text-right">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 bg-slate-50/60 p-5 sm:flex-row">
              <button
                onClick={() => deleteEmployee(detailEmployee)}
                className="employee-button flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
                Xóa nhân viên
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setDetailEmployee(null)}
                  className="employee-button rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Đóng
                </button>

                <button
                  onClick={() => {
                    const employee = detailEmployee;
                    setDetailEmployee(null);
                    openEditModal(employee);
                  }}
                  className="employee-button flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-600"
                >
                  <Pencil size={16} />
                  Chỉnh sửa
                </button>
              </div>
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
