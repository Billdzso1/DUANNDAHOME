
"use client";

import { useState } from "react";
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

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    date: getToday(),
    description: "",
    category: "",
    property: "",
    amount: "",
    type: "income" as "income" | "expense",
  });

  const [error, setError] = useState("");

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const profit = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter((item) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.property.toLowerCase().includes(keyword);

    const matchesType =
      filterType === "all" || item.type === filterType;

    const matchesMonth =
      !filterMonth || item.date.startsWith(filterMonth);

    return matchesSearch && matchesType && matchesMonth;
  });

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
      setTransactions((current) => [
        transaction,
        ...current,
      ]);
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
  };

  return (
    <div className="space-y-6">
      {/* TIÊU ĐỀ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý thu chi
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Theo dõi và quản lý các khoản thu chi của NDAHOME.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-600"
        >
          <Plus size={18} />
          Thêm giao dịch
        </button>
      </div>

      {/* THỐNG KÊ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Tổng khoản thu
            </span>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <TrendingUp size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {formatMoney(totalIncome)}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Tổng tiền thu trong danh sách
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Tổng khoản chi
            </span>
            <div className="rounded-xl bg-red-50 p-3 text-red-500">
              <TrendingDown size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {formatMoney(totalExpense)}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Tổng tiền chi trong danh sách
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Lợi nhuận
            </span>
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600">
              <Wallet size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {formatMoney(profit)}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Tổng thu trừ tổng chi
          </p>
        </div>
      </div>

      {/* BỘ LỌC */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm nội dung, danh mục, nhà..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-yellow-500"
            />
          </div>

          <div className="relative">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-600 outline-none focus:border-yellow-500"
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
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-600 outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Tìm thấy {filteredTransactions.length} giao dịch
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-medium text-yellow-700 hover:text-yellow-800"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* DANH SÁCH GIAO DỊCH */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-bold text-gray-800">
            Danh sách giao dịch
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Quản lý và cập nhật các giao dịch
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500">
                <th className="px-5 py-4 font-semibold">Ngày</th>
                <th className="px-5 py-4 font-semibold">Nội dung</th>
                <th className="px-5 py-4 font-semibold">Danh mục</th>
                <th className="px-5 py-4 font-semibold">Nhà / Phòng</th>
                <th className="px-5 py-4 text-right font-semibold">Số tiền</th>
                <th className="px-5 py-4 text-center font-semibold">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {formatDate(item.date)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {item.description}
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-medium ${
                          item.type === "income"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {item.type === "income" ? "Khoản thu" : "Khoản chi"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
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
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Sửa giao dịch"
                          className="rounded-lg p-2 text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Xóa giao dịch"
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-sm text-gray-500">
                      Không tìm thấy giao dịch phù hợp.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM THÊM / SỬA */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editingId !== null ? "Sửa giao dịch" : "Thêm giao dịch"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Nhập thông tin giao dịch của bạn.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Đóng"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Loại giao dịch
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, type: "income" })
                    }
                    className={`rounded-xl border p-3 text-sm font-semibold ${
                      form.type === "income"
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <TrendingUp className="mr-2 inline" size={17} />
                    Khoản thu
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, type: "expense" })
                    }
                    className={`rounded-xl border p-3 text-sm font-semibold ${
                      form.type === "expense"
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <TrendingDown className="mr-2 inline" size={17} />
                    Khoản chi
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ngày giao dịch *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nội dung *
                </label>
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Ví dụ: Thu tiền phòng tháng 11"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Danh mục *
                </label>
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="Ví dụ: Tiền thuê phòng"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nhà / Phòng
                </label>
                <input
                  value={form.property}
                  onChange={(e) =>
                    setForm({ ...form, property: e.target.value })
                  }
                  placeholder="Ví dụ: Nhà A - P101"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                {editingId !== null ? "Lưu thay đổi" : "Lưu giao dịch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
