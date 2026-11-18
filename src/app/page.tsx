
import Link from "next/link";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  DoorOpen,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Plus,
  Receipt,
  CalendarDays,
  House,
} from "lucide-react";

const stats = [
  {
    title: "Tổng khoản thu",
    amount: "125.000.000 đ",
    note: "Trong tháng này",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Tổng khoản chi",
    amount: "45.000.000 đ",
    note: "Trong tháng này",
    icon: TrendingDown,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    title: "Lợi nhuận",
    amount: "80.000.000 đ",
    note: "Thu trừ chi",
    icon: Wallet,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    title: "Tài sản quản lý",
    amount: "12",
    note: "Nhà / khu cho thuê",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const transactions = [
  {
    name: "Thu tiền phòng tháng 11",
    category: "Tiền thuê phòng",
    date: "18/11/2026",
    amount: "+ 15.000.000 đ",
    type: "income",
  },
  {
    name: "Thanh toán tiền điện",
    category: "Điện nước",
    date: "17/11/2026",
    amount: "- 2.500.000 đ",
    type: "expense",
  },
  {
    name: "Thu tiền phòng tháng 11",
    category: "Tiền thuê phòng",
    date: "16/11/2026",
    amount: "+ 8.000.000 đ",
    type: "income",
  },
  {
    name: "Chi phí sửa chữa",
    category: "Bảo trì",
    date: "15/11/2026",
    amount: "- 1.200.000 đ",
    type: "expense",
  },
];

const monthlyData = [
  { month: "T6", income: 55, expense: 25 },
  { month: "T7", income: 70, expense: 35 },
  { month: "T8", income: 60, expense: 30 },
  { month: "T9", income: 85, expense: 40 },
  { month: "T10", income: 75, expense: 32 },
  { month: "T11", income: 100, expense: 45 },
];

const quickActions = [
  {
    title: "Thêm khoản thu",
    description: "Ghi nhận khoản tiền thu",
    href: "/transactions",
    icon: TrendingUp,
  },
  {
    title: "Thêm khoản chi",
    description: "Ghi nhận khoản tiền chi",
    href: "/transactions",
    icon: TrendingDown,
  },
  {
    title: "Thêm khách hàng",
    description: "Quản lý người thuê phòng",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Quản lý phòng",
    description: "Theo dõi tình trạng phòng",
    href: "/properties",
    icon: House,
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Tổng quan
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Chào mừng bạn đến với hệ thống quản lý NDAHOME.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
          <CalendarDays size={17} />
          Tháng 11, 2026
        </div>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {item.title}
                </span>

                <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {item.amount}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {item.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Biểu đồ và tình trạng phòng */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Biểu đồ thu chi */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-800">
                Thống kê thu chi
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Tình hình thu chi trong 6 tháng gần đây
              </p>
            </div>

            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                Khoản thu
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                Khoản chi
              </span>
            </div>
          </div>

          <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-gray-100 pb-2">
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <div
                    className="w-4 rounded-t-md bg-yellow-500 sm:w-7"
                    style={{ height: `${item.income}%` }}
                    title={`Thu ${item.income}`}
                  />

                  <div
                    className="w-4 rounded-t-md bg-red-400 sm:w-7"
                    style={{ height: `${item.expense}%` }}
                    title={`Chi ${item.expense}`}
                  />
                </div>

                <span className="text-xs text-gray-400">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tình trạng phòng */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-gray-800">
            Tình trạng phòng
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Tổng quan các phòng đang quản lý
          </p>

          <div className="mt-7 flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-green-500">
              <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-yellow-400 border-r-yellow-400 rotate-45" />
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800">
                  48
                </h3>
                <p className="text-xs text-gray-400">
                  Tổng số phòng
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Đang cho thuê
              </span>
              <strong>36 phòng</strong>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                Phòng trống
              </span>
              <strong>12 phòng</strong>
            </div>
          </div>
        </section>
      </div>

      {/* Giao dịch gần đây */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h2 className="font-bold text-gray-800">
              Giao dịch gần đây
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Theo dõi các khoản thu chi mới nhất
            </p>
          </div>

          <Link
            href="/transactions"
            className="flex items-center gap-2 text-sm font-medium text-yellow-700 hover:text-yellow-800"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Nội dung</th>
                <th className="px-5 py-3 font-medium">Danh mục</th>
                <th className="px-5 py-3 font-medium">Ngày</th>
                <th className="px-5 py-3 text-right font-medium">
                  Số tiền
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {item.category}
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {item.date}
                  </td>

                  <td
                    className={`px-5 py-4 text-right font-semibold ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Truy cập nhanh */}
      <section>
        <div className="mb-4">
          <h2 className="font-bold text-gray-800">
            Truy cập nhanh
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Các chức năng thường xuyên sử dụng
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-yellow-300 hover:shadow-md"
              >
                <div className="rounded-xl bg-yellow-50 p-3 text-yellow-700 transition group-hover:bg-yellow-100">
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-gray-400 transition group-hover:text-yellow-600"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
