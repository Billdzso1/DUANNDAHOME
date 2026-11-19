
<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft, ArrowUpRight, Wallet, Building2, TrendingUp,
  Plus, ReceiptText, Users, Home, Search, Filter, CalendarDays,
  CheckCircle2, Clock3, CreditCard, Banknote, Eye, ArrowRight,
  ChevronDown, Activity, X
} from "lucide-react";

const formatMoney = (amount) =>
  new Intl.NumberFormat("vi-VN").format(amount) + " đ";

const months = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
  "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
  "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const monthlyData = [
  { month: 6, year: 2026, income: 82000000, expense: 32000000 },
  { month: 7, year: 2026, income: 95000000, expense: 42000000 },
  { month: 8, year: 2026, income: 76000000, expense: 38000000 },
  { month: 9, year: 2026, income: 110000000, expense: 48000000 },
  { month: 10, year: 2026, income: 98000000, expense: 52000000 },
  { month: 11, year: 2026, income: 125000000, expense: 45000000 },
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
];

const transactions = [
  {
<<<<<<< HEAD
    id: "GD001", name: "Nguyễn Văn An", initials: "NA",
    description: "Thanh toán tiền thuê phòng A01",
    category: "Tiền thuê phòng", date: "18/11/2026",
    time: "09:30", amount: 8500000, type: "income",
    method: "Chuyển khoản", status: "completed",
    note: "Thanh toán tiền thuê tháng 11", property: "Phòng A01"
  },
  {
    id: "GD002", name: "Công ty Điện lực", initials: "EV",
    description: "Thanh toán hóa đơn tiền điện",
    category: "Chi phí điện", date: "17/11/2026",
    time: "14:15", amount: 3200000, type: "expense",
    method: "Tiền mặt", status: "completed",
    note: "Hóa đơn điện tháng 11", property: "Tòa nhà NDAHOME"
  },
  {
    id: "GD003", name: "Trần Thị Mai", initials: "TM",
    description: "Thanh toán tiền thuê phòng B02",
    category: "Tiền thuê phòng", date: "16/11/2026",
    time: "10:05", amount: 7500000, type: "income",
    method: "Chuyển khoản", status: "completed",
    note: "Thanh toán tiền thuê tháng 11", property: "Phòng B02"
  },
  {
    id: "GD004", name: "Đơn vị sửa chữa", initials: "SC",
    description: "Sửa chữa hệ thống nước",
    category: "Bảo trì tài sản", date: "15/11/2026",
    time: "16:20", amount: 1800000, type: "expense",
    method: "Tiền mặt", status: "pending",
    note: "Chờ xác nhận thanh toán", property: "Tòa nhà NDAHOME"
  },
  {
    id: "GD005", name: "Lê Minh Tuấn", initials: "LT",
    description: "Thanh toán tiền thuê phòng C03",
    category: "Tiền thuê phòng", date: "14/11/2026",
    time: "08:45", amount: 9000000, type: "income",
    method: "Chuyển khoản", status: "completed",
    note: "Thanh toán tiền thuê tháng 11", property: "Phòng C03"
  },
  {
    id: "GD006", name: "Công ty vệ sinh", initials: "VS",
    description: "Chi phí vệ sinh khu vực chung",
    category: "Chi phí vận hành", date: "13/11/2026",
    time: "11:00", amount: 1200000, type: "expense",
    method: "Chuyển khoản", status: "completed",
    note: "Chi phí vệ sinh định kỳ", property: "Tòa nhà NDAHOME"
  },
];

const quickActions = [
  {
    title: "Thêm giao dịch",
    description: "Ghi nhận khoản thu hoặc chi mới",
    icon: ReceiptText, href: "/transactions",
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    title: "Quản lý khách hàng",
    description: "Xem và cập nhật thông tin khách thuê",
    icon: Users, href: "/customers",
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Quản lý tài sản",
    description: "Theo dõi phòng và bất động sản",
    icon: Home, href: "/properties",
    color: "bg-purple-100 text-purple-700"
  },
];

const getTransactionMonth = (date) => {
  const [day, month, year] = date.split("/");
  return { month: Number(month), year: Number(year) };
};

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [chartRange, setChartRange] = useState("6");
  const [activeBar, setActiveBar] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const years = Array.from(
    { length: 11 },
    (_, index) => 2026 - index
  );

  // Lọc giao dịch theo tháng và năm đang chọn
  const periodTransactions = transactions.filter((transaction) => {
    const date = getTransactionMonth(transaction.date);
    return date.month === selectedMonth && date.year === selectedYear;
  });

  const filteredTransactions = periodTransactions.filter((transaction) => {
    const keyword = searchTerm.toLowerCase().trim();

    const searchableText = [
      transaction.id,
      transaction.name,
      transaction.description,
      transaction.category,
      transaction.method,
      transaction.note,
      transaction.property,
      transaction.date
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(keyword);
    const matchesType =
      filterType === "all" || transaction.type === filterType;
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncome = periodTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = periodTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  // Tạo dữ liệu biểu đồ theo khoảng thời gian
  const rangeCount = chartRange === "year" ? 12 : Number(chartRange);

  const chartData = Array.from({ length: rangeCount }, (_, index) => {
    const date = new Date(
      selectedYear,
      selectedMonth - rangeCount + index
    );

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const found = monthlyData.find(
      (item) => item.month === month && item.year === year
    );

    return {
      month,
      year,
      label: `T${month}`,
      income: found?.income || 0,
      expense: found?.expense || 0
    };
  });

  // Tháng được ghim bằng thao tác click
  const selectedChartData =
    chartData.find(
      (item) =>
        item.month === (activeBar?.month || selectedMonth) &&
        item.year === (activeBar?.year || selectedYear)
    ) || chartData[chartData.length - 1];

  // Dữ liệu đang hiển thị: ưu tiên cột đang rê chuột
  const displayChartData = hoveredBar
    ? chartData.find(
        (item) =>
          item.month === hoveredBar.month &&
          item.year === hoveredBar.year
      ) || selectedChartData
    : selectedChartData;

  const maxChartValue = Math.max(
    10000000,
    ...chartData.flatMap((item) => [
      item.income,
      item.expense
    ])
  );

  const statCards = [
    {
      title: "Tổng khoản thu",
      value: totalIncome,
      description: "Tổng thu trong tháng được chọn",
      icon: ArrowDownLeft,
      cardBg: "bg-blue-50",
      border: "border-blue-100",
      hover: "hover:bg-blue-100 hover:border-blue-300",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Tổng khoản chi",
      value: totalExpense,
      description: "Tổng chi trong tháng được chọn",
      icon: ArrowUpRight,
      cardBg: "bg-red-50",
      border: "border-red-100",
      hover: "hover:bg-red-100 hover:border-red-300",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Lợi nhuận",
      value: totalIncome - totalExpense,
      description: "Thu nhập sau khi trừ chi phí",
      icon: TrendingUp,
      cardBg: "bg-emerald-50",
      border: "border-emerald-100",
      hover: "hover:bg-emerald-100 hover:border-emerald-300",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      title: "Tài sản quản lý",
      value: 12,
      description: "Đang quản lý ổn định",
      icon: Building2,
      cardBg: "bg-purple-50",
      border: "border-purple-100",
      hover: "hover:bg-purple-100 hover:border-purple-300",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      isCount: true
    }
  ];

  // Hàm xử lý rê chuột trên từng cột
  const handleBarEnter = (data, type) => {
    setHoveredBar({
      month: data.month,
      year: data.year,
      type
    });
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
  };

  // Hàm xử lý click để ghim tháng đang xem
  const handleBarClick = (data, type) => {
    const isSameBar =
      activeBar?.month === data.month &&
      activeBar?.year === data.year &&
      activeBar?.type === type;

    setActiveBar(
      isSameBar
        ? null
        : {
            month: data.month,
            year: data.year,
            type
          }
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] p-4 text-gray-900 md:p-7">
      <style jsx global>{`
        html, body, button, input, select, textarea {
          font-family: "Times New Roman", Times, serif !important;
        }
      `}</style>

      <div className="mx-auto max-w-[1500px] space-y-7">

        {/* HEADER */}
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
              <span>Trang chủ</span>
              <span>/</span>
              <span className="text-gray-900">Tổng quan</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-950">
              Tổng quan hệ thống
            </h1>

            <p className="mt-1 text-base text-gray-500">
              Theo dõi tình hình thu chi và hoạt động NDAHOME.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
              <CalendarDays size={17} className="text-gray-500" />

              <select
                value={selectedMonth}
                onChange={(event) => {
                  setSelectedMonth(Number(event.target.value));
                  setActiveBar(null);
                  setHoveredBar(null);
                }}
                className="cursor-pointer bg-transparent px-1 py-2 text-sm font-semibold outline-none"
                aria-label="Chọn tháng"
              >
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(event) => {
                  setSelectedYear(Number(event.target.value));
                  setActiveBar(null);
                  setHoveredBar(null);
                }}
                className="cursor-pointer bg-transparent px-1 py-2 text-sm font-semibold outline-none"
                aria-label="Chọn năm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/transactions"
              className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
            >
              <Plus size={18} />
              Thêm giao dịch
            </Link>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`group rounded-2xl border ${stat.border} ${stat.cardBg} ${stat.hover} p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-gray-600">
                    {stat.title}
                  </div>

                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="mt-5 text-2xl font-black tracking-tight text-gray-950">
                  {stat.isCount ? stat.value : formatMoney(stat.value)}
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                  <Activity size={14} />
                  {stat.description}
                </div>
              </div>
            );
          })}
        </section>

        {/* CHART AND PROPERTY STATUS */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Thống kê thu chi
                </h2>

                <p className="mt-1 text-base text-gray-500">
                  So sánh doanh thu và chi phí theo khoảng thời gian
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <select
                  value={chartRange}
                  onChange={(event) => {
                    setChartRange(event.target.value);
                    setActiveBar(null);
                    setHoveredBar(null);
                  }}
                  className="cursor-pointer bg-transparent text-sm font-semibold text-gray-700 outline-none"
                  aria-label="Chọn khoảng thời gian thống kê"
                >
                  <option value="3">3 tháng gần nhất</option>
                  <option value="6">6 tháng gần nhất</option>
                  <option value="12">12 tháng gần nhất</option>
                  <option value="year">Cả năm</option>
                </select>

                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-yellow-400" />
                Tổng doanh thu
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-gray-900" />
                Tổng khoản chi
              </div>

              <span className="ml-auto text-xs text-gray-400">
                Rê chuột để xem số liệu, bấm cột để ghim lựa chọn
              </span>
            </div>

            {/* BIỂU ĐỒ */}
            <div
              className="mt-6 flex h-[280px] items-end justify-around gap-2 border-b border-gray-200 px-2 sm:gap-4"
              onMouseLeave={handleBarLeave}
            >
              {chartData.map((data) => {
                const incomeSelected =
                  activeBar?.month === data.month &&
                  activeBar?.year === data.year &&
                  activeBar?.type === "income";

                const expenseSelected =
                  activeBar?.month === data.month &&
                  activeBar?.year === data.year &&
                  activeBar?.type === "expense";

                const incomeHovered =
                  hoveredBar?.month === data.month &&
                  hoveredBar?.year === data.year &&
                  hoveredBar?.type === "income";

                const expenseHovered =
                  hoveredBar?.month === data.month &&
                  hoveredBar?.year === data.year &&
                  hoveredBar?.type === "expense";

                const incomeHeight = Math.max(
                  (data.income / maxChartValue) * 100,
                  2
                );

                const expenseHeight = Math.max(
                  (data.expense / maxChartValue) * 100,
                  2
                );

                return (
                  <div
                    key={`${data.month}-${data.year}`}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1.5 sm:gap-2">

                      {/* CỘT DOANH THU */}
                      <div
                        className="group/bar relative flex h-full w-full max-w-10 items-end justify-center"
                        onMouseEnter={() => handleBarEnter(data, "income")}
                      >
                        <div
                          className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-48 -translate-x-1/2 rounded-xl bg-gray-950 p-3 text-left text-white shadow-2xl transition-all duration-200 ${
                            incomeHovered || incomeSelected
                              ? "visible translate-y-0 opacity-100"
                              : "invisible translate-y-2 opacity-0"
                          }`}
                        >
                          <div className="text-xs font-medium text-gray-300">
                            Tổng doanh thu tháng {data.month}/{data.year}
                          </div>

                          <div className="mt-1 text-base font-black text-yellow-300">
                            {formatMoney(data.income)}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            Khoản thu
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Doanh thu tháng ${data.month}/${data.year}: ${formatMoney(data.income)}`}
                          onMouseEnter={() => handleBarEnter(data, "income")}
                          onClick={() => handleBarClick(data, "income")}
                          className={`relative w-full rounded-t-lg bg-yellow-400 shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-x-110 hover:bg-yellow-300 hover:shadow-xl ${
                            incomeSelected
                              ? "-translate-y-3 scale-x-110 bg-yellow-300 shadow-xl ring-2 ring-yellow-500 ring-offset-2"
                              : ""
                          }`}
                          style={{ height: `${incomeHeight}%` }}
                        />
                      </div>

                      {/* CỘT KHOẢN CHI */}
                      <div
                        className="group/bar relative flex h-full w-full max-w-10 items-end justify-center"
                        onMouseEnter={() => handleBarEnter(data, "expense")}
                      >
                        <div
                          className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-48 -translate-x-1/2 rounded-xl bg-gray-950 p-3 text-left text-white shadow-2xl transition-all duration-200 ${
                            expenseHovered || expenseSelected
                              ? "visible translate-y-0 opacity-100"
                              : "invisible translate-y-2 opacity-0"
                          }`}
                        >
                          <div className="text-xs font-medium text-gray-300">
                            Tổng khoản chi tháng {data.month}/{data.year}
                          </div>

                          <div className="mt-1 text-base font-black text-yellow-300">
                            {formatMoney(data.expense)}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            Khoản chi
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Khoản chi tháng ${data.month}/${data.year}: ${formatMoney(data.expense)}`}
                          onMouseEnter={() => handleBarEnter(data, "expense")}
                          onClick={() => handleBarClick(data, "expense")}
                          className={`relative w-full rounded-t-lg bg-gray-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-x-110 hover:bg-gray-700 hover:shadow-xl ${
                            expenseSelected
                              ? "-translate-y-3 scale-x-110 bg-gray-700 shadow-xl ring-2 ring-gray-500 ring-offset-2"
                              : ""
                          }`}
                          style={{ height: `${expenseHeight}%` }}
                        />
                      </div>
                    </div>

                    <div
                      className={`mt-3 pb-3 text-sm font-bold ${
                        displayChartData?.month === data.month &&
                        displayChartData?.year === data.year
                          ? "text-gray-950"
                          : "text-gray-400"
                      }`}
                    >
                      {data.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* THÁNG ĐANG XEM - TỰ ĐỘNG CẬP NHẬT KHI RÊ CHUỘT */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Tháng đang xem
                </div>

                <div className="mt-1 font-bold text-gray-900">
                  {months[(displayChartData?.month || selectedMonth) - 1]},
                  {" "}
                  {displayChartData?.year || selectedYear}
                </div>

                {hoveredBar && (
                  <div className="mt-1 text-xs font-semibold text-gray-500">
                    Đang xem: {hoveredBar.type === "income" ? "Khoản thu" : "Khoản chi"}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-5">
                <div>
                  <div className="text-sm text-gray-500">Doanh thu</div>
                  <div className={`font-black ${
                    hoveredBar?.type === "income"
                      ? "text-yellow-800"
                      : "text-yellow-700"
                  }`}>
                    {formatMoney(displayChartData?.income || 0)}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Khoản chi</div>
                  <div className={`font-black ${
                    hoveredBar?.type === "expense"
                      ? "text-black"
                      : "text-gray-900"
                  }`}>
                    {formatMoney(displayChartData?.expense || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROPERTY STATUS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-xl font-black text-gray-950">
              Tình trạng tài sản
            </h2>

            <p className="mt-1 text-base text-gray-500">
              Tổng quan phòng đang quản lý
            </p>

            <div className="relative mx-auto mt-8 flex h-52 w-52 items-center justify-center">
              <div
                className="h-48 w-48 rounded-full transition-transform duration-500 hover:scale-105"
                style={{
                  background: "conic-gradient(#171717 0% 75%, #facc15 75% 100%)"
                }}
              />

              <div className="absolute flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-4xl font-black text-gray-950">48</span>
                <span className="mt-1 text-sm font-medium text-gray-500">
                  Tổng tài sản
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-gray-900" />
                  <span className="text-base font-semibold text-gray-600">
                    Đang cho thuê
                  </span>
                </div>
                <span className="font-black text-gray-950">36</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="text-base font-semibold text-gray-600">
                    Còn trống
                  </span>
                </div>
                <span className="font-black text-gray-950">12</span>
              </div>
            </div>

            <Link
              href="/properties"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-gray-950"
            >
              Xem danh sách tài sản <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* RECENT TRANSACTIONS */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                <ReceiptText size={21} />
              </div>

              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Giao dịch gần đây
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Danh sách giao dịch trong {months[selectedMonth - 1].toLowerCase()}, {selectedYear}
                </p>
              </div>
            </div>

            <Link
              href="/transactions"
              className="flex items-center gap-2 self-start rounded-xl border border-yellow-400 bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 shadow-sm transition-all hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg md:self-center"
            >
              Quản lý giao dịch <ArrowRight size={16} />
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-gray-50/70 p-5 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <ArrowDownLeft size={16} /> Tổng khoản thu đang lọc
              </div>

              <div className="mt-2 text-xl font-black text-emerald-800">
                {formatMoney(
                  filteredTransactions
                    .filter((item) => item.type === "income")
                    .reduce((sum, item) => sum + item.amount, 0)
                )}
              </div>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                <ArrowUpRight size={16} /> Tổng khoản chi đang lọc
              </div>

              <div className="mt-2 text-xl font-black text-red-800">
                {formatMoney(
                  filteredTransactions
                    .filter((item) => item.type === "expense")
                    .reduce((sum, item) => sum + item.amount, 0)
                )}
              </div>
            </div>

            <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-800">
                <Wallet size={16} /> Số giao dịch tìm thấy
              </div>

              <div className="mt-2 text-xl font-black text-gray-950">
                {filteredTransactions.length} giao dịch
              </div>
            </div>
          </div>

          {/* SEARCH AND FILTERS */}
          <div className="space-y-4 border-b border-gray-100 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-lg">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Nhập tên, mã giao dịch, nội dung, danh mục..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-base outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Xóa nội dung tìm kiếm"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Filter size={17} className="text-gray-400" />

                {[
                  { value: "all", label: "Tất cả" },
                  { value: "income", label: "Khoản thu" },
                  { value: "expense", label: "Khoản chi" }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setFilterType(filter.value)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                      filterType === filter.value
                        ? "bg-gray-950 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-500">
                Trạng thái:
              </span>

              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="completed">Hoàn tất</option>
                <option value="pending">Đang xử lý</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterStatus("all");
                }}
                className="text-sm font-semibold text-yellow-700 transition hover:text-yellow-900 hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-gray-50/70 text-sm font-bold text-gray-500">
                  <th className="px-5 py-4">Mã giao dịch</th>
                  <th className="px-5 py-4">Thông tin giao dịch</th>
                  <th className="px-5 py-4">Danh mục / Tài sản</th>
                  <th className="px-5 py-4">Ngày giao dịch</th>
                  <th className="px-5 py-4">Phương thức</th>
                  <th className="px-5 py-4">Số tiền</th>
                  <th className="px-5 py-4">Trạng thái</th>
                  <th className="px-5 py-4 text-center">Chi tiết</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const isIncome = transaction.type === "income";

                    return (
                      <tr
                        key={transaction.id}
                        className="group transition-colors hover:bg-yellow-50/70"
                      >
                        <td className="px-5 py-5">
                          <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-bold text-gray-700">
                            {transaction.id}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                              isIncome
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {transaction.initials}
                            </div>

                            <div>
                              <div className="font-bold text-gray-950">
                                {transaction.name}
                              </div>

                              <div className="mt-1 max-w-[240px] text-sm text-gray-500">
                                {transaction.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="font-semibold text-gray-800">
                            {transaction.category}
                          </div>

                          <div className="mt-1 text-sm text-gray-400">
                            {transaction.property}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <CalendarDays size={15} className="text-gray-400" />
                            {transaction.date}
                          </div>

                          <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                            <Clock3 size={14} /> {transaction.time}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                            {transaction.method === "Tiền mặt"
                              ? <Banknote size={17} className="text-gray-400" />
                              : <CreditCard size={17} className="text-gray-400" />}
                            {transaction.method}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className={`whitespace-nowrap text-base font-black ${
                            isIncome ? "text-emerald-600" : "text-red-600"
                          }`}>
                            {isIncome ? "+" : "-"}{formatMoney(transaction.amount)}
                          </div>

                          <div className="mt-1 text-xs text-gray-400">
                            {isIncome ? "Khoản thu" : "Khoản chi"}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${
                            transaction.status === "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            {transaction.status === "completed"
                              ? <CheckCircle2 size={14} />
                              : <Clock3 size={14} />}
                            {transaction.status === "completed"
                              ? "Hoàn tất"
                              : "Đang xử lý"}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedTransaction(transaction)}
                            aria-label={`Xem chi tiết ${transaction.id}`}
                            className="rounded-lg border border-gray-200 p-2.5 text-gray-500 transition hover:border-yellow-400 hover:bg-yellow-100 hover:text-gray-950"
                          >
                            <Eye size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-5 py-14 text-center">
                      <Search className="mx-auto mb-3 text-gray-300" size={35} />

                      <p className="font-bold text-gray-600">
                        Không tìm thấy giao dịch phù hợp
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Không có giao dịch trong tháng/năm này hoặc không khớp bộ lọc.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-4 text-sm text-gray-400 sm:flex-row sm:items-center">
            <span>
              Đang hiển thị {filteredTransactions.length} / {periodTransactions.length} giao dịch trong kỳ
            </span>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-black text-gray-950">
              Truy cập nhanh
            </h2>

            <p className="mt-1 text-base text-gray-500">
              Các chức năng thường xuyên sử dụng
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-300 hover:shadow-xl"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-gray-900">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight size={18} className="text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gray-900" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* TRANSACTION DETAIL MODAL */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedTransaction(null)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-gray-950">
                    Chi tiết giao dịch
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Mã: {selectedTransaction.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTransaction(null)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-5 text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
                  selectedTransaction.type === "income"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {selectedTransaction.type === "income"
                    ? <ArrowDownLeft size={27} />
                    : <ArrowUpRight size={27} />}
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {selectedTransaction.type === "income" ? "Khoản thu" : "Khoản chi"}
                </p>

                <div className={`mt-1 text-3xl font-black ${
                  selectedTransaction.type === "income"
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}>
                  {selectedTransaction.type === "income" ? "+" : "-"}
                  {formatMoney(selectedTransaction.amount)}
                </div>
              </div>

              <div className="space-y-4 rounded-xl bg-gray-50 p-4 text-sm">
                {[
                  ["Người giao dịch", selectedTransaction.name],
                  ["Nội dung", selectedTransaction.description],
                  ["Danh mục", selectedTransaction.category],
                  ["Tài sản liên quan", selectedTransaction.property],
                  ["Ngày giao dịch", `${selectedTransaction.date} - ${selectedTransaction.time}`],
                  ["Phương thức", selectedTransaction.method],
                  [
                    "Trạng thái",
                    selectedTransaction.status === "completed"
                      ? "Hoàn tất"
                      : "Đang xử lý"
                  ]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-right font-bold text-gray-900">
                      {value}
                    </span>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-3">
                  <div className="text-gray-500">Ghi chú</div>
                  <div className="mt-1 font-semibold text-gray-900">
                    {selectedTransaction.note}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="mt-5 w-full rounded-xl bg-gray-950 py-3 font-bold text-white transition hover:bg-gray-700"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="flex flex-col justify-between gap-2 border-t border-gray-200 py-5 text-sm text-gray-400 sm:flex-row">
          <span>© 2026 NDAHOME. Hệ thống quản lý thu chi.</span>
        </footer>
      </div>
    </main>
=======
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
>>>>>>> f915600fcc53a616529e88e1c3db206e41733251
  );
}
