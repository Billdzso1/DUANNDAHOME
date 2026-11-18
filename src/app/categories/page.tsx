
"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Tags,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  type: "income" | "expense";
  description: string;
  color: string;
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Tiền thuê phòng",
    type: "income",
    description: "Thu tiền thuê phòng hàng tháng",
    color: "green",
  },
  {
    id: 2,
    name: "Tiền điện",
    type: "income",
    description: "Thu tiền điện từ khách thuê",
    color: "blue",
  },
  {
    id: 3,
    name: "Tiền nước",
    type: "income",
    description: "Thu tiền nước hàng tháng",
    color: "cyan",
  },
  {
    id: 4,
    name: "Phí dịch vụ",
    type: "income",
    description: "Các khoản phí dịch vụ khác",
    color: "purple",
  },
  {
    id: 5,
    name: "Sửa chữa",
    type: "expense",
    description: "Chi phí sửa chữa phòng và thiết bị",
    color: "red",
  },
  {
    id: 6,
    name: "Bảo trì",
    type: "expense",
    description: "Chi phí bảo trì tài sản",
    color: "orange",
  },
  {
    id: 7,
    name: "Vệ sinh",
    type: "expense",
    description: "Chi phí vệ sinh khu vực chung",
    color: "green",
  },
  {
    id: 8,
    name: "Lương nhân viên",
    type: "expense",
    description: "Chi trả lương nhân viên",
    color: "blue",
  },
];

const colorOptions = [
  { value: "green", label: "Xanh lá" },
  { value: "blue", label: "Xanh dương" },
  { value: "cyan", label: "Xanh ngọc" },
  { value: "purple", label: "Tím" },
  { value: "red", label: "Đỏ" },
  { value: "orange", label: "Cam" },
];

const colorClasses: Record<string, string> = {
  green: "bg-green-50 text-green-600",
  blue: "bg-blue-50 text-blue-600",
  cyan: "bg-cyan-50 text-cyan-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
  orange: "bg-orange-50 text-orange-600",
};

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "income" as "income" | "expense",
    description: "",
    color: "green",
  });

  const incomeCount = categories.filter(
    (item) => item.type === "income"
  ).length;

  const expenseCount = categories.filter(
    (item) => item.type === "expense"
  ).length;

  const filteredCategories = categories.filter((item) => {
    const matchesTab =
      activeTab === "all" || item.type === activeTab;

    const keyword = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    return matchesTab && matchesSearch;
  });

  const openAddModal = () => {
    setEditingId(null);
    setError("");

    setForm({
      name: "",
      type: "income",
      description: "",
      color: "green",
    });

    setShowModal(true);
  };

  const openEditModal = (item: Category) => {
    setEditingId(item.id);
    setError("");

    setForm({
      name: item.name,
      type: item.type,
      description: item.description,
      color: item.color,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setError("");
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Vui lòng nhập tên danh mục.");
      return;
    }

    const duplicate = categories.some(
      (item) =>
        item.name.trim().toLowerCase() ===
          form.name.trim().toLowerCase() &&
        item.type === form.type &&
        item.id !== editingId
    );

    if (duplicate) {
      setError("Danh mục này đã tồn tại.");
      return;
    }

    const category: Category = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      type: form.type,
      description: form.description.trim(),
      color: form.color,
    };

    if (editingId !== null) {
      setCategories((current) =>
        current.map((item) =>
          item.id === editingId ? category : item
        )
      );
    } else {
      setCategories((current) => [category, ...current]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );

    if (!confirmed) return;

    setCategories((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* TIÊU ĐỀ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Danh mục thu chi
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý và phân loại các khoản thu, khoản chi.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600"
        >
          <Plus size={18} />
          Thêm danh mục
        </button>
      </div>

      {/* THỐNG KÊ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Tổng danh mục
            </span>
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-600">
              <Tags size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {categories.length}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Tất cả danh mục hiện có
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Danh mục khoản thu
            </span>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <TrendingUp size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {incomeCount}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Nhóm danh mục thu tiền
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Danh mục khoản chi
            </span>
            <div className="rounded-xl bg-red-50 p-3 text-red-500">
              <TrendingDown size={21} />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {expenseCount}
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Nhóm danh mục chi tiền
          </p>
        </div>
      </div>

      {/* TÌM KIẾM */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm danh mục..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* DANH SÁCH */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-bold text-gray-800">
              Danh sách danh mục
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              {filteredCategories.length} danh mục
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Tất cả" },
              { value: "income", label: "Khoản thu" },
              { value: "expense", label: "Khoản chi" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  activeTab === tab.value
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500">
                <th className="px-5 py-4 font-semibold">Tên danh mục</th>
                <th className="px-5 py-4 font-semibold">Loại</th>
                <th className="px-5 py-4 font-semibold">Mô tả</th>
                <th className="px-5 py-4 font-semibold">Màu sắc</th>
                <th className="px-5 py-4 text-center font-semibold">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-xl p-2.5 ${colorClasses[item.color]}`}>
                          <Wallet size={18} />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          item.type === "income"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {item.type === "income" ? "Khoản thu" : "Khoản chi"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {item.description || "Chưa có mô tả"}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-block h-5 w-5 rounded-full ${colorClasses[item.color].split(" ")[0]}`} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          title="Sửa danh mục"
                          className="rounded-lg p-2 text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Xóa danh mục"
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
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-500">
                    Không tìm thấy danh mục phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editingId !== null ? "Sửa danh mục" : "Thêm danh mục"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Nhập thông tin danh mục thu chi.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Loại danh mục *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setForm({ ...form, type: "income" })}
                    className={`rounded-xl border p-3 text-sm font-semibold ${
                      form.type === "income"
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Khoản thu
                  </button>

                  <button
                    onClick={() => setForm({ ...form, type: "expense" })}
                    className={`rounded-xl border p-3 text-sm font-semibold ${
                      form.type === "expense"
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    Khoản chi
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tên danh mục *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nhập tên danh mục"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Mô tả về danh mục..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Màu sắc
                </label>
                <select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-yellow-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                onClick={closeModal}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                {editingId !== null ? "Lưu thay đổi" : "Lưu danh mục"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
