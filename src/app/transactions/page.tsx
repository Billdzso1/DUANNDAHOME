
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Wallet,
  Pencil,
  Trash2,
  CalendarDays,
  X,
  RotateCcw,
  ArrowDownUp,
  ReceiptText,
  Building2,
  Tag,
  CircleDollarSign,
} from "lucide-react";

type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  property: string;
  amount: number;
  type: "income" | "expense";
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-11-18",
    description: "Thu tiền phòng tháng 11",
    category: "Tiền thuê phòng",
    property: "Nhà A - P101",
    amount: 5000000,
    type: "income",
  },
  {
    id: 2,
    date: "2026-11-17",
    description: "Thanh toán tiền điện",
    category: "Điện nước",
    property: "Nhà A",
    amount: 2500000,
    type: "expense",
  },
  {
    id: 3,
    date: "2026-11-16",
    description: "Thu tiền phòng tháng 11",
    category: "Tiền thuê phòng",
    property: "Nhà B - P202",
    amount: 4500000,
    type: "income",
  },
  {
    id: 4,
    date: "2026-11-15",
    description: "Sửa chữa máy lạnh",
    category: "Bảo trì",
    property: "Nhà A - P103",
    amount: 1200000,
    type: "expense",
  },
  {
    id: 5,
    date: "2026-10-14",
    description: "Thu tiền phòng tháng 10",
    category: "Tiền thuê phòng",
    property: "Nhà C - P301",
    amount: 5500000,
    type: "income",
  },
];

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + " đ";

const formatDate = (date: string) => {
  if (!date) return "";

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-yellow-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100";

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-200 hover:shadow-xl";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterProperty, setFilterProperty] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    property: "",
    amount: "",
    type: "income" as "income" | "expense",
  });

  const [error, setError] = useState("");

  const categories = useMemo(
    () => [...new Set(transactions.map((item) => item.category))].sort(),
    [transactions]
  );

  const properties = useMemo(
    () => [...new Set(transactions.map((item) => item.property))].sort(),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return transactions
      .filter((item) => {
        const matchesSearch =
          item.description.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.property.toLowerCase().includes(keyword);

        const matchesType =
          filterType === "all" || item.type === filterType;

        const matchesMonth =
          !filterMonth || item.date.startsWith(filterMonth);

        const matchesCategory =
          filterCategory === "all" ||
          item.category === filterCategory;

        const matchesProperty =
          filterProperty === "all" ||
          item.property === filterProperty;

        return (
          matchesSearch &&
          matchesType &&
          matchesMonth &&
          matchesCategory &&
          matchesProperty
        );
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return b.date.localeCompare(a.date);
        if (sortOrder === "oldest") return a.date.localeCompare(b.date);
        if (sortOrder === "highest") return b.amount - a.amount;
        return a.amount - b.amount;
      });
  }, [
    transactions,
    search,
    filterType,
    filterMonth,
    filterCategory,
    filterProperty,
    sortOrder,
  ]);

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const profit = totalIncome - totalExpense;

  const hasActiveFilters =
    search !== "" ||
    filterType !== "all" ||
    filterMonth !== "" ||
    filterCategory !== "all" ||
    filterProperty !== "all";

  const openAddModal = () => {
    setEditingId(null);
    setError("");

    setForm({
      date: getToday(),
      description: "",
      category: "",
      property: "",
      amount: "",
      type: "income",
    });

    setShowModal(true);
  };

  const openEditModal = (item: Transaction) => {
    setEditingId(item.id);
    setError("");

    setForm({
      date: item.date,
      description: item.description,
      category: item.category,
      property: item.property,
      amount: String(item.amount),
      type: item.type,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
  };

  const handleSave = () => {
    const amount = Number(form.amount);

    if (
      !form.date ||
      !form.description.trim() ||
      !form.category.trim() ||
      !form.amount
    ) {
      setError("Vui lòng nhập đầy đủ các thông tin bắt buộc.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Số tiền phải lớn hơn 0.");
      return;
    }

    const transaction: Transaction = {
      id: editingId ?? Date.now(),
      date: form.date,
      description: form.description.trim(),
      category: form.category.trim(),
      property: form.property.trim() || "Chưa xác định",
      amount,
      type: form.type,
    };

    if (editingId !== null) {
      setTransactions((current) =>
        current.map((item) =>
          item.id === editingId ? transaction : item
        )
      );
    } else {
      setTransactions((current) => [transaction, ...current]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa giao dịch này?"
    );

    if (!confirmed) return;

    setTransactions((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const resetFilters = () => {
    setSearch("");
    setFilterType("all");
    setFilterMonth("");
    setFilterCategory("all");
    setFilterProperty("all");
    setSortOrder("newest");
  };

  return (
    <div
      className="min-h-screen space-y-6 pb-8 text-gray-800"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-yellow-100 bg-gradient-to-r from-yellow-50 via-white to-amber-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-1/3 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-700 shadow-sm">
              <ReceiptText size={14} />
              Tài chính NDAHOME
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Quản lý thu chi
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Theo dõi, quản lý và kiểm soát các khoản thu chi của hệ thống.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="group flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-yellow-200 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-200 active:translate-y-0 active:scale-95"
          >
            <Plus
              size={19}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Thêm giao dịch
          </button>
        </div>
      </div>

      {/* THỐNG KÊ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={`${cardClass} hover:bg-gradient-to-br hover:from-white hover:to-green-50`}>
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-green-100/50 blur-2xl transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500">Tổng khoản thu</p>
              <p className="mt-1 text-xs text-gray-400">Theo bộ lọc hiện tại</p>
            </div>

            <div className="rounded-2xl bg-green-100 p-3 text-green-600 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
              <TrendingUp size={23} />
            </div>
          </div>

          <h2 className="relative mt-5 text-2xl font-bold text-green-600 transition-colors duration-300 group-hover:text-green-700">
            {formatMoney(totalIncome)}
          </h2>

          <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-green-100">
            <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-transform duration-700 group-hover:scale-x-105" />
          </div>
        </div>

        <div className={`${cardClass} hover:bg-gradient-to-br hover:from-white hover:to-red-50`}>
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-100/50 blur-2xl transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500">Tổng khoản chi</p>
              <p className="mt-1 text-xs text-gray-400">Theo bộ lọc hiện tại</p>
            </div>

            <div className="rounded-2xl bg-red-100 p-3 text-red-500 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white">
              <TrendingDown size={23} />
            </div>
          </div>

          <h2 className="relative mt-5 text-2xl font-bold text-red-500 transition-colors duration-300 group-hover:text-red-600">
            {formatMoney(totalExpense)}
          </h2>

          <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-red-100">
            <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-transform duration-700 group-hover:scale-x-105" />
          </div>
        </div>

        <div className={`${cardClass} hover:bg-gradient-to-br hover:from-white hover:to-yellow-50`}>
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-yellow-100/70 blur-2xl transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500">Lợi nhuận</p>
              <p className="mt-1 text-xs text-gray-400">Tổng thu trừ tổng chi</p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-3 text-yellow-700 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-white">
              <Wallet size={23} />
            </div>
          </div>

          <h2 className={`relative mt-5 text-2xl font-bold transition-colors duration-300 ${
            profit >= 0
              ? "text-gray-900 group-hover:text-yellow-700"
              : "text-red-500 group-hover:text-red-600"
          }`}>
            {formatMoney(profit)}
          </h2>

          <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-yellow-100">
            <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-transform duration-700 group-hover:scale-x-105" />
          </div>
        </div>
      </div>

      {/* BỘ LỌC */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-200 hover:shadow-lg">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 font-bold text-gray-900">
              <span className="rounded-lg bg-yellow-100 p-2 text-yellow-700">
                <Filter size={17} />
              </span>
              Bộ lọc giao dịch
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Tìm kiếm và phân loại các khoản thu chi
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 self-start rounded-lg px-3 py-2 text-xs font-bold text-yellow-700 transition-all duration-300 hover:bg-yellow-100 hover:text-yellow-800 sm:self-auto"
            >
              <RotateCcw size={14} className="transition-transform duration-500 hover:-rotate-180" />
              Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="relative xl:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm nội dung, danh mục, nhà hoặc phòng..."
              className={`${inputClass} pl-10`}
            />
          </div>

          <div className="relative">
            <TrendingUp
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`${inputClass} appearance-none pl-10`}
            >
              <option value="all">Tất cả giao dịch</option>
              <option value="income">Khoản thu</option>
              <option value="expense">Khoản chi</option>
            </select>
          </div>

          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>

          <div className="relative">
            <Tag
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`${inputClass} appearance-none pl-10`}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Building2
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              className={`${inputClass} appearance-none pl-10`}
            >
              <option value="all">Tất cả nhà / phòng</option>
              {properties.map((property) => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Tìm thấy{" "}
            <span className="font-bold text-gray-900">
              {filteredTransactions.length}
            </span>{" "}
            / {transactions.length} giao dịch
          </p>

          <div className="flex items-center gap-2">
            <ArrowDownUp size={15} className="text-yellow-600" />

            <span className="text-xs text-gray-500">Sắp xếp:</span>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none transition-all hover:border-yellow-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="highest">Số tiền cao nhất</option>
              <option value="lowest">Số tiền thấp nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* DANH SÁCH GIAO DỊCH */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col gap-3 border-b border-gray-100 bg-gradient-to-r from-white to-yellow-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-bold text-gray-900">
              <span className="rounded-lg bg-yellow-100 p-2 text-yellow-700">
                <ReceiptText size={18} />
              </span>
              Danh sách giao dịch
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Chi tiết các khoản thu và chi của NDAHOME
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-yellow-200 bg-white px-3 py-2 text-xs font-bold text-yellow-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <CircleDollarSign size={15} />
            {filteredTransactions.length} giao dịch
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-bold">Ngày</th>
                <th className="px-5 py-4 font-bold">Nội dung</th>
                <th className="px-5 py-4 font-bold">Danh mục</th>
                <th className="px-5 py-4 font-bold">Nhà / Phòng</th>
                <th className="px-5 py-4 text-right font-bold">Số tiền</th>
                <th className="px-5 py-4 text-center font-bold">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="group border-t border-gray-100 transition-all duration-300 hover:bg-yellow-50/70"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500 transition-colors group-hover:text-gray-800">
                      {formatDate(item.date)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-800 transition-colors duration-200 group-hover:text-yellow-800">
                        {item.description}
                      </div>

                      <span
                        className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-300 group-hover:scale-105 ${
                          item.type === "income"
                            ? "bg-green-50 text-green-700 group-hover:bg-green-100"
                            : "bg-red-50 text-red-600 group-hover:bg-red-100"
                        }`}
                      >
                        {item.type === "income" ? (
                          <TrendingUp size={11} />
                        ) : (
                          <TrendingDown size={11} />
                        )}

                        {item.type === "income" ? "KHOẢN THU" : "KHOẢN CHI"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.property}
                    </td>

                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right text-sm font-bold ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatMoney(item.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Sửa giao dịch"
                          aria-label="Sửa giao dịch"
                          className="rounded-lg p-2 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-100 hover:text-yellow-700 hover:shadow-md active:scale-90"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Xóa giao dịch"
                          aria-label="Xóa giao dịch"
                          className="rounded-lg p-2 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-red-100 hover:text-red-600 hover:shadow-md active:scale-90"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 rounded-2xl bg-yellow-50 p-4 text-yellow-600 transition-transform duration-300 hover:scale-110">
                        <ReceiptText size={30} />
                      </div>

                      <p className="font-bold text-gray-700">
                        Không tìm thấy giao dịch
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Thử thay đổi từ khóa hoặc bộ lọc để xem kết quả khác.
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 flex items-center gap-2 rounded-xl bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-200 hover:shadow-md active:scale-95"
                        >
                          <RotateCcw size={15} />
                          Xóa bộ lọc
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
        </div>
      </div>

      {/* MODAL THÊM / SỬA */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl animate-[modalIn_0.25s_ease-out]"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white p-5">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-700">
                  <ReceiptText size={14} />
                  NDAHOME
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {editingId !== null
                    ? "Cập nhật giao dịch"
                    : "Thêm giao dịch mới"}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Nhập thông tin khoản thu hoặc chi của bạn.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Đóng"
                className="rounded-xl p-2 text-gray-400 transition-all duration-300 hover:rotate-90 hover:bg-red-50 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Loại giao dịch *
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, type: "income" })
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                      form.type === "income"
                        ? "border-green-500 bg-green-50 text-green-700 shadow-sm ring-2 ring-green-100"
                        : "border-gray-200 text-gray-500 hover:border-green-300 hover:bg-green-50/50"
                    }`}
                  >
                    <TrendingUp size={18} />
                    Khoản thu
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, type: "expense" })
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                      form.type === "expense"
                        ? "border-red-400 bg-red-50 text-red-600 shadow-sm ring-2 ring-red-100"
                        : "border-gray-200 text-gray-500 hover:border-red-300 hover:bg-red-50/50"
                    }`}
                  >
                    <TrendingDown size={18} />
                    Khoản chi
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Ngày giao dịch *
                </label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Nội dung giao dịch *
                </label>

                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Ví dụ: Thu tiền phòng tháng 11"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Danh mục *
                </label>

                <input
                  list="transaction-categories"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="Nhập hoặc chọn danh mục"
                  className={inputClass}
                />

                <datalist id="transaction-categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}

                  {form.type === "income" ? (
                    <>
                      <option value="Tiền thuê phòng" />
                      <option value="Tiền cọc" />
                      <option value="Phí dịch vụ" />
                      <option value="Thu khác" />
                    </>
                  ) : (
                    <>
                      <option value="Điện nước" />
                      <option value="Bảo trì" />
                      <option value="Sửa chữa" />
                      <option value="Vệ sinh" />
                      <option value="Chi phí khác" />
                    </>
                  )}
                </datalist>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Nhà / Phòng
                </label>

                <input
                  list="transaction-properties"
                  value={form.property}
                  onChange={(e) =>
                    setForm({ ...form, property: e.target.value })
                  }
                  placeholder="Nhập hoặc chọn nhà / phòng"
                  className={inputClass}
                />

                <datalist id="transaction-properties">
                  {properties.map((property) => (
                    <option key={property} value={property} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Số tiền (VNĐ) *
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                  placeholder="Nhập số tiền"
                  className={inputClass}
                />

                {form.amount && Number(form.amount) > 0 && (
                  <p className="mt-2 rounded-lg bg-yellow-50 px-3 py-2 text-xs text-gray-600">
                    Giá trị:{" "}
                    <span className="font-bold text-yellow-800">
                      {formatMoney(Number(form.amount))}
                    </span>
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600 animate-[fadeIn_0.2s_ease-out]">
                  {error}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/70 p-5">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-100 hover:shadow-md active:scale-95"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-yellow-100 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-200 active:translate-y-0 active:scale-95"
              >
                <Plus size={16} />
                {editingId !== null ? "Lưu thay đổi" : "Lưu giao dịch"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KEYFRAMES CHO MODAL */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
