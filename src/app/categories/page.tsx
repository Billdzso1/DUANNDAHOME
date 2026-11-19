
"use client";

import { useEffect, useMemo, useState } from "react";
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
  ArrowUpDown,
  FolderOpen,
  LayoutGrid,
  CircleDollarSign,
  RotateCcw,
  Eye,
  Filter,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type CategoryType = "income" | "expense";

type Category = {
  id: number;
  name: string;
  type: CategoryType;
  description: string;
  color: string;
};

type CategoryForm = {
  name: string;
  type: CategoryType;
  description: string;
  color: string;
};

const STORAGE_KEY = "ndahome_categories";

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
  green: "bg-green-50 text-green-600 ring-green-100",
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  cyan: "bg-cyan-50 text-cyan-600 ring-cyan-100",
  purple: "bg-purple-50 text-purple-600 ring-purple-100",
  red: "bg-red-50 text-red-600 ring-red-100",
  orange: "bg-orange-50 text-orange-600 ring-orange-100",
};

const colorDots: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
};

const emptyForm: CategoryForm = {
  name: "",
  type: "income",
  description: "",
  color: "green",
};

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [activeTab, setActiveTab] = useState<
    "all" | CategoryType
  >("all");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Category | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [form, setForm] = useState<CategoryForm>(emptyForm);

  // Đọc dữ liệu đã lưu khi mở trang
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Category[];

        if (Array.isArray(parsed)) {
          setCategories(parsed);
        }
      }
    } catch (error) {
      console.error("Không thể đọc danh mục:", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Lưu dữ liệu sau khi tải xong
  useEffect(() => {
    if (!hasLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error("Không thể lưu danh mục:", error);
    }
  }, [categories, hasLoaded]);

  const incomeCount = categories.filter(
    (item) => item.type === "income"
  ).length;

  const expenseCount = categories.filter(
    (item) => item.type === "expense"
  ).length;

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = categories.filter((item) => {
      const matchesTab =
        activeTab === "all" || item.type === activeTab;

      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword);

      return matchesTab && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name, "vi");
      }

      if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name, "vi");
      }

      if (sortOrder === "income-first") {
        return a.type === b.type
          ? a.name.localeCompare(b.name, "vi")
          : a.type === "income"
            ? -1
            : 1;
      }

      if (sortOrder === "expense-first") {
        return a.type === b.type
          ? a.name.localeCompare(b.name, "vi")
          : a.type === "expense"
            ? -1
            : 1;
      }

      return b.id - a.id;
    });
  }, [categories, activeTab, search, sortOrder]);

  const openAddModal = () => {
    setEditingId(null);
    setError("");
    setForm(emptyForm);
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
    const name = form.name.trim();

    if (!name) {
      setError("Vui lòng nhập tên danh mục.");
      return;
    }

    const duplicate = categories.some(
      (item) =>
        item.name.trim().toLowerCase() === name.toLowerCase() &&
        item.type === form.type &&
        item.id !== editingId
    );

    if (duplicate) {
      setError(
        "Tên danh mục này đã tồn tại trong cùng loại thu/chi."
      );
      return;
    }

    const category: Category = {
      id: editingId ?? Date.now(),
      name,
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

      setSuccess("Cập nhật danh mục thành công.");
    } else {
      setCategories((current) => [category, ...current]);
      setSuccess("Thêm danh mục mới thành công.");
    }

    closeModal();

    window.setTimeout(() => setSuccess(""), 2500);
  };

  const handleDelete = (item: Category) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa danh mục "${item.name}" không?\n\nThao tác này sẽ xóa danh mục khỏi danh sách quản lý.`
    );

    if (!confirmed) return;

    setCategories((current) =>
      current.filter((category) => category.id !== item.id)
    );

    if (showDetail?.id === item.id) {
      setShowDetail(null);
    }

    setSuccess(`Đã xóa danh mục "${item.name}".`);
    window.setTimeout(() => setSuccess(""), 2500);
  };

  const resetFilters = () => {
    setSearch("");
    setActiveTab("all");
    setSortOrder("newest");
  };

  const hasActiveFilters =
    search !== "" ||
    activeTab !== "all" ||
    sortOrder !== "newest";

  return (
    <div
      className="min-h-screen space-y-6 bg-[#f8f8f6] pb-8 font-['Times_New_Roman'] text-gray-800"
    >
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-yellow-100 bg-gradient-to-r from-white via-yellow-50 to-[#fff3c4] p-6 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-1/3 h-36 w-36 rounded-full bg-orange-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-yellow-700 shadow-sm">
              <Tags size={14} />
              NDAHOME MANAGEMENT
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Danh mục thu chi
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Quản lý, phân loại và theo dõi các nhóm khoản thu và khoản chi.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="group flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-500/30 active:translate-y-0"
          >
            <Plus
              size={19}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Thêm danh mục
          </button>
        </div>
      </div>

      {/* THÔNG BÁO */}
      {success && (
        <div className="flex animate-[fadeIn_0.25s_ease-out] items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* THỐNG KÊ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-100/70">
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-yellow-50 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Tổng danh mục
              </p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {categories.length}
              </h2>
              <p className="mt-2 text-xs text-gray-400">
                Tất cả danh mục hiện có
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-700 shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
              <Tags size={25} />
            </div>
          </div>

          <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500" />
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/70">
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Danh mục khoản thu
              </p>
              <h2 className="mt-3 text-3xl font-bold text-green-600">
                {incomeCount}
              </h2>
              <p className="mt-2 text-xs text-gray-400">
                Nhóm danh mục thu tiền
              </p>
            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600 shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
              <TrendingUp size={25} />
            </div>
          </div>

          <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-300 to-green-500 transition-all duration-500"
              style={{
                width: `${
                  categories.length
                    ? (incomeCount / categories.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-xl hover:shadow-red-100/70">
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-red-50 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Danh mục khoản chi
              </p>
              <h2 className="mt-3 text-3xl font-bold text-red-500">
                {expenseCount}
              </h2>
              <p className="mt-2 text-xs text-gray-400">
                Nhóm danh mục chi tiền
              </p>
            </div>

            <div className="rounded-2xl bg-red-100 p-4 text-red-500 shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
              <TrendingDown size={25} />
            </div>
          </div>

          <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-300 to-red-500 transition-all duration-500"
              style={{
                width: `${
                  categories.length
                    ? (expenseCount / categories.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* TÌM KIẾM VÀ LỌC */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-yellow-600" />
          <h2 className="font-bold text-gray-800">
            Tìm kiếm và lọc danh mục
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_230px_auto]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc mô tả danh mục..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div className="relative">
            <ArrowUpDown
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            >
              <option value="newest">Mới thêm trước</option>
              <option value="name-asc">Tên A - Z</option>
              <option value="name-desc">Tên Z - A</option>
              <option value="income-first">Khoản thu trước</option>
              <option value="expense-first">Khoản chi trước</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition-all hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={16} />
            Đặt lại
          </button>
        </div>
      </div>

      {/* DANH SÁCH */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-yellow-100 p-2 text-yellow-700">
                <LayoutGrid size={19} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Danh sách danh mục
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-bold text-gray-800">
                {filteredCategories.length}
              </span>{" "}
              / {categories.length} danh mục
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Tất cả", count: categories.length },
              { value: "income", label: "Khoản thu", count: incomeCount },
              { value: "expense", label: "Khoản chi", count: expenseCount },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() =>
                  setActiveTab(tab.value as "all" | CategoryType)
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === tab.value
                    ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                    : "border border-gray-100 bg-gray-50 text-gray-600 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === tab.value
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#faf9f5]">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-bold">Tên danh mục</th>
                <th className="px-5 py-4 font-bold">Loại</th>
                <th className="px-5 py-4 font-bold">Mô tả</th>
                <th className="px-5 py-4 font-bold">Màu sắc</th>
                <th className="px-5 py-4 text-center font-bold">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <tr
                    key={item.id}
                    className="group border-t border-gray-100 transition-all duration-200 hover:bg-yellow-50/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl p-3 ring-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm ${
                            colorClasses[item.color] || colorClasses.green
                          }`}
                        >
                          <Wallet size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-gray-800 transition-colors group-hover:text-yellow-700">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Mã danh mục: #{item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                          item.type === "income"
                            ? "bg-green-50 text-green-700 ring-1 ring-green-100"
                            : "bg-red-50 text-red-600 ring-1 ring-red-100"
                        }`}
                      >
                        {item.type === "income" ? (
                          <TrendingUp size={13} />
                        ) : (
                          <TrendingDown size={13} />
                        )}
                        {item.type === "income" ? "Khoản thu" : "Khoản chi"}
                      </span>
                    </td>

                    <td className="max-w-[280px] px-5 py-4 text-sm text-gray-500">
                      <span className="line-clamp-2">
                        {item.description || "Chưa có mô tả"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-4 w-4 rounded-full ring-4 ring-offset-1 ${
                            colorDots[item.color] || colorDots.green
                          }`}
                        />
                        <span className="text-xs text-gray-500">
                          {colorOptions.find(
                            (color) => color.value === item.color
                          )?.label || "Xanh lá"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => setShowDetail(item)}
                          title="Xem chi tiết"
                          className="rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => openEditModal(item)}
                          title="Sửa danh mục"
                          className="rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-100 hover:text-yellow-700"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
                          title="Xóa danh mục"
                          className="rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 rounded-2xl bg-yellow-50 p-5 text-yellow-600">
                        <FolderOpen size={32} />
                      </div>

                      <p className="font-bold text-gray-700">
                        Không tìm thấy danh mục
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc hiện tại.
                      </p>

                      <button
                        onClick={resetFilters}
                        className="mt-4 rounded-xl bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700 transition hover:bg-yellow-200"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Đang hiển thị {filteredCategories.length} danh mục
          </span>
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
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-yellow-100 bg-white shadow-2xl shadow-black/20 animate-[modalIn_0.25s_ease-out]">
            <div className="relative overflow-hidden border-b border-yellow-100 bg-gradient-to-r from-yellow-50 to-white p-6">
              <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-yellow-100/60 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-bold text-yellow-700">
                    <Tags size={13} />
                    NDAHOME CATEGORY
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId !== null
                      ? "Chỉnh sửa danh mục"
                      : "Thêm danh mục mới"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Điền thông tin để quản lý nhóm thu chi.
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="rounded-xl p-2.5 text-gray-400 transition hover:rotate-90 hover:bg-white hover:text-gray-700"
                  aria-label="Đóng"
                >
                  <X size={21} />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* LOẠI */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Loại danh mục <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, type: "income" })
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      form.type === "income"
                        ? "border-green-500 bg-green-50 text-green-700 shadow-md shadow-green-100"
                        : "border-gray-200 bg-white text-gray-500 hover:border-green-200"
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
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      form.type === "expense"
                        ? "border-red-400 bg-red-50 text-red-600 shadow-md shadow-red-100"
                        : "border-gray-200 bg-white text-gray-500 hover:border-red-200"
                    }`}
                  >
                    <TrendingDown size={18} />
                    Khoản chi
                  </button>
                </div>
              </div>

              {/* TÊN */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>

                <input
                  autoFocus
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                  }}
                  placeholder="Ví dụ: Tiền thuê phòng, Tiền điện..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                />
              </div>

              {/* MÔ TẢ */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Mô tả
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Nhập mô tả về danh mục..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                />
              </div>

              {/* MÀU */}
              <div>
                <label className="mb-3 block text-sm font-bold text-gray-700">
                  Màu nhận diện
                </label>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, color: color.value })
                      }
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-1 ${
                        form.color === color.value
                          ? "border-yellow-400 bg-yellow-50 shadow-sm"
                          : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full ring-4 ring-offset-1 ${
                          colorDots[color.value]
                        }`}
                      />
                      <span className="text-[11px] font-semibold text-gray-600">
                        {color.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PREVIEW */}
              <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50/60 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-yellow-700">
                  Xem trước danh mục
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-xl p-3 ring-1 ${
                      colorClasses[form.color] || colorClasses.green
                    }`}
                  >
                    <Wallet size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-gray-800">
                      {form.name.trim() || "Tên danh mục"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {form.description.trim() || "Chưa có mô tả"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                      form.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {form.type === "income" ? "Khoản thu" : "Khoản chi"}
                  </span>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 p-5 sm:flex-row sm:justify-end">
              <button
                onClick={closeModal}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-0.5 hover:bg-yellow-600 hover:shadow-xl"
              >
                <CheckCircle2 size={17} />
                {editingId !== null ? "Lưu thay đổi" : "Lưu danh mục"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT */}
      {showDetail && (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowDetail(null);
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-[modalIn_0.25s_ease-out]">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Chi tiết danh mục
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Thông tin danh mục đang chọn
                </p>
              </div>

              <button
                onClick={() => setShowDetail(null)}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div
                  className={`rounded-2xl p-4 ring-1 ${
                    colorClasses[showDetail.color] || colorClasses.green
                  }`}
                >
                  <Wallet size={26} />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-lg font-bold text-gray-900">
                    {showDetail.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Mã danh mục: #{showDetail.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                <span className="text-sm text-gray-500">Loại danh mục</span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    showDetail.type === "income"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {showDetail.type === "income" ? "Khoản thu" : "Khoản chi"}
                </span>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Mô tả
                </p>
                <p className="text-sm leading-relaxed text-gray-700">
                  {showDetail.description || "Chưa có mô tả cho danh mục này."}
                </p>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                <span className="text-sm text-gray-500">Màu nhận diện</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span
                    className={`h-4 w-4 rounded-full ${
                      colorDots[showDetail.color] || colorDots.green
                    }`}
                  />
                  {colorOptions.find(
                    (color) => color.value === showDetail.color
                  )?.label || "Xanh lá"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 bg-gray-50/70 p-5">
              <button
                onClick={() => {
                  openEditModal(showDetail);
                  setShowDetail(null);
                }}
                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-yellow-600"
              >
                <Pencil size={15} />
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
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
            transform: translateY(18px) scale(0.98);
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
