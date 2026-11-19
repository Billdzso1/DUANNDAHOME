
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Home,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  DoorOpen,
  Users,
  Wallet,
  TrendingUp,
  Building2,
  BedDouble,
  Wrench,
  AlertCircle,
  ChevronDown,
  MapPin,
  Filter,
  RefreshCw,
} from "lucide-react";

type RoomStatus = "Đang thuê" | "Phòng trống" | "Bảo trì";

type Room = {
  id: number;
  name: string;
  area: number;
  price: number;
  status: RoomStatus;
  tenant: string;
};

type Property = {
  id: number;
  name: string;
  address: string;
  description: string;
  rooms: Room[];
};

const STORAGE_KEY = "ndahome_properties";

const initialProperties: Property[] = [
  {
    id: 1,
    name: "Nhà trọ Nguyễn Văn Cừ",
    address: "Quận 5, TP. Hồ Chí Minh",
    description: "Khu nhà trọ gần trường đại học",
    rooms: [
      { id: 101, name: "Phòng 101", area: 20, price: 3500000, status: "Đang thuê", tenant: "Nguyễn Văn An" },
      { id: 102, name: "Phòng 102", area: 22, price: 3800000, status: "Đang thuê", tenant: "Trần Thị Bình" },
      { id: 103, name: "Phòng 103", area: 18, price: 3200000, status: "Phòng trống", tenant: "" },
      { id: 104, name: "Phòng 104", area: 25, price: 4000000, status: "Bảo trì", tenant: "" },
    ],
  },
  {
    id: 2,
    name: "Nhà nguyên căn Bình Thạnh",
    address: "Quận Bình Thạnh, TP. Hồ Chí Minh",
    description: "Nhà nguyên căn có nhiều phòng",
    rooms: [
      { id: 201, name: "Phòng 201", area: 24, price: 4200000, status: "Đang thuê", tenant: "Lê Minh Tuấn" },
      { id: 202, name: "Phòng 202", area: 20, price: 3500000, status: "Phòng trống", tenant: "" },
      { id: 203, name: "Phòng 203", area: 22, price: 3800000, status: "Đang thuê", tenant: "Phạm Thị Hoa" },
    ],
  },
  {
    id: 3,
    name: "Khu trọ Tân Bình",
    address: "Quận Tân Bình, TP. Hồ Chí Minh",
    description: "Khu trọ mới xây",
    rooms: [
      { id: 301, name: "Phòng 301", area: 18, price: 3000000, status: "Phòng trống", tenant: "" },
      { id: 302, name: "Phòng 302", area: 21, price: 3600000, status: "Đang thuê", tenant: "Đỗ Quốc Huy" },
    ],
  },
];

// Chuẩn hóa trạng thái để dữ liệu cũ và dữ liệu mới dùng chung một định dạng.
const normalizeStatus = (status: unknown): RoomStatus => {
  const value = String(status ?? "")
    .normalize("NFC")
    .trim()
    .toLocaleLowerCase("vi-VN");

  if (
    value === "phòng trống" ||
    value === "còn trống" ||
    value === "trống"
  ) {
    return "Phòng trống";
  }

  if (value === "đang thuê" || value === "đã thuê") {
    return "Đang thuê";
  }

  if (value === "bảo trì" || value === "đang bảo trì") {
    return "Bảo trì";
  }

  return "Phòng trống";
};

// Chuẩn hóa dữ liệu phòng khi đọc từ localStorage.
const normalizeRoom = (room: any): Room => ({
  id: Number(room.id) || Date.now() + Math.floor(Math.random() * 10000),
  name: String(room.name ?? ""),
  area: Number(room.area) || 0,
  price: Number(room.price) || 0,
  status: normalizeStatus(room.status),
  tenant: String(room.tenant ?? ""),
});

// Chuẩn hóa dữ liệu nhà khi đọc từ localStorage.
const normalizeProperty = (property: any): Property => ({
  id: Number(property.id) || Date.now() + Math.floor(Math.random() * 10000),
  name: String(property.name ?? ""),
  address: String(property.address ?? ""),
  description: String(property.description ?? ""),
  rooms: Array.isArray(property.rooms)
    ? property.rooms.map(normalizeRoom)
    : [],
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const emptyRoom = (): Omit<Room, "id"> => ({
  name: "",
  area: 20,
  price: 3000000,
  status: "Phòng trống",
  tenant: "",
});

const emptyProperty = (): Omit<Property, "id" | "rooms"> => ({
  name: "",
  address: "",
  description: "",
});

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [storageReady, setStorageReady] = useState(false);

  const [search, setSearch] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<number | "all">("all");

  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<number | null>(null);
  const [editingRoom, setEditingRoom] = useState<number | null>(null);
  const [roomPropertyId, setRoomPropertyId] = useState<number | null>(null);

  const [propertyForm, setPropertyForm] = useState(emptyProperty());
  const [roomForm, setRoomForm] = useState(emptyRoom());
  const [error, setError] = useState("");

  // Đọc dữ liệu đã lưu.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setProperties(parsed.map(normalizeProperty));
        }
      }
    } catch (err) {
      console.error("Không thể đọc dữ liệu nhà/phòng:", err);
    } finally {
      setStorageReady(true);
    }
  }, []);

  // Chỉ lưu sau khi đã đọc dữ liệu xong.
  useEffect(() => {
    if (!storageReady) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (err) {
      console.error("Không thể lưu dữ liệu nhà/phòng:", err);
    }
  }, [properties, storageReady]);

  // Tất cả phòng trong hệ thống.
  const allRooms = useMemo(
    () => properties.flatMap((property) => property.rooms),
    [properties]
  );

  // Thống kê dùng chung trạng thái đã chuẩn hóa.
  const totalProperties = properties.length;
  const totalRooms = allRooms.length;

  const rentedRooms = allRooms.filter(
    (room) => normalizeStatus(room.status) === "Đang thuê"
  ).length;

  const vacantRooms = allRooms.filter(
    (room) => normalizeStatus(room.status) === "Phòng trống"
  ).length;

  const maintenanceRooms = allRooms.filter(
    (room) => normalizeStatus(room.status) === "Bảo trì"
  ).length;

  const expectedRevenue = allRooms
    .filter((room) => normalizeStatus(room.status) === "Đang thuê")
    .reduce((sum, room) => sum + room.price, 0);

  const occupancyRate =
    totalRooms > 0 ? Math.round((rentedRooms / totalRooms) * 100) : 0;

  // Lọc danh sách nhà.
  const filteredProperties = properties.filter((property) => {
    const keyword = search.trim().toLocaleLowerCase("vi-VN");

    const matchesSearch =
      keyword === "" ||
      property.name.toLocaleLowerCase("vi-VN").includes(keyword) ||
      property.address.toLocaleLowerCase("vi-VN").includes(keyword) ||
      property.rooms.some(
        (room) =>
          room.name.toLocaleLowerCase("vi-VN").includes(keyword) ||
          room.tenant.toLocaleLowerCase("vi-VN").includes(keyword)
      );

    const matchesPropertyFilter =
      propertyFilter === "all" ||
      (propertyFilter === "vacant" &&
        property.rooms.some(
          (room) => normalizeStatus(room.status) === "Phòng trống"
        )) ||
      (propertyFilter === "full" &&
        property.rooms.length > 0 &&
        property.rooms.every(
          (room) => normalizeStatus(room.status) === "Đang thuê"
        )) ||
      (propertyFilter === "empty" && property.rooms.length === 0);

    return matchesSearch && matchesPropertyFilter;
  });

  // Lọc bảng tổng hợp phòng.
  // Bộ lọc nhà, từ khóa và trạng thái được xử lý riêng biệt.
  const displayedRooms = useMemo(() => {
    return properties
      .filter(
        (property) =>
          selectedProperty === "all" ||
          property.id === selectedProperty
      )
      .flatMap((property) =>
        property.rooms.map((room) => ({
          ...room,
          status: normalizeStatus(room.status),
          propertyId: property.id,
          propertyName: property.name,
        }))
      )
      .filter((room) => {
        const keyword = search.trim().toLocaleLowerCase("vi-VN");

        const matchesSearch =
          keyword === "" ||
          room.name.toLocaleLowerCase("vi-VN").includes(keyword) ||
          room.tenant.toLocaleLowerCase("vi-VN").includes(keyword) ||
          room.propertyName.toLocaleLowerCase("vi-VN").includes(keyword);

        const matchesStatus =
          roomFilter === "all" ||
          normalizeStatus(room.status) === normalizeStatus(roomFilter);

        return matchesSearch && matchesStatus;
      });
  }, [properties, selectedProperty, search, roomFilter]);

  // Reset toàn bộ bộ lọc.
  const resetFilters = () => {
    setSearch("");
    setPropertyFilter("all");
    setRoomFilter("all");
    setSelectedProperty("all");
  };

  const openAddProperty = () => {
    setEditingProperty(null);
    setPropertyForm(emptyProperty());
    setError("");
    setShowPropertyModal(true);
  };

  const openEditProperty = (property: Property) => {
    setEditingProperty(property.id);
    setPropertyForm({
      name: property.name,
      address: property.address,
      description: property.description,
    });
    setError("");
    setShowPropertyModal(true);
  };

  const saveProperty = () => {
    if (!propertyForm.name.trim() || !propertyForm.address.trim()) {
      setError("Vui lòng nhập tên nhà và địa chỉ.");
      return;
    }

    if (editingProperty !== null) {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === editingProperty
            ? { ...property, ...propertyForm }
            : property
        )
      );
    } else {
      setProperties((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...propertyForm,
          rooms: [],
        },
      ]);
    }

    setShowPropertyModal(false);
    setError("");
  };

  const deleteProperty = (id: number) => {
    const property = properties.find((item) => item.id === id);
    if (!property) return;

    if (
      !window.confirm(
        `Bạn có chắc muốn xóa "${property.name}" và toàn bộ phòng thuộc nhà này?`
      )
    ) {
      return;
    }

    setProperties((prev) => prev.filter((item) => item.id !== id));

    if (selectedProperty === id) setSelectedProperty("all");
  };

  const openAddRoom = (propertyId: number) => {
    setRoomPropertyId(propertyId);
    setEditingRoom(null);
    setRoomForm(emptyRoom());
    setError("");
    setShowRoomModal(true);
  };

  const openEditRoom = (propertyId: number, room: Room) => {
    setRoomPropertyId(propertyId);
    setEditingRoom(room.id);
    setRoomForm({
      name: room.name,
      area: room.area,
      price: room.price,
      status: normalizeStatus(room.status),
      tenant: room.tenant,
    });
    setError("");
    setShowRoomModal(true);
  };

  const saveRoom = () => {
    if (roomPropertyId === null) {
      setError("Vui lòng chọn nhà cần thêm phòng.");
      return;
    }

    if (!roomForm.name.trim()) {
      setError("Vui lòng nhập tên phòng.");
      return;
    }

    if (!Number.isFinite(roomForm.area) || roomForm.area <= 0) {
      setError("Diện tích phải lớn hơn 0.");
      return;
    }

    if (!Number.isFinite(roomForm.price) || roomForm.price < 0) {
      setError("Giá thuê không hợp lệ.");
      return;
    }

    if (roomForm.status === "Đang thuê" && !roomForm.tenant.trim()) {
      setError("Vui lòng nhập tên người thuê.");
      return;
    }

    const property = properties.find((item) => item.id === roomPropertyId);
    if (!property) return;

    const duplicate = property.rooms.some(
      (room) =>
        room.name.trim().toLowerCase() === roomForm.name.trim().toLowerCase() &&
        room.id !== editingRoom
    );

    if (duplicate) {
      setError("Tên phòng đã tồn tại trong nhà này.");
      return;
    }

    setProperties((prev) =>
      prev.map((item) => {
        if (item.id !== roomPropertyId) return item;

        if (editingRoom !== null) {
          return {
            ...item,
            rooms: item.rooms.map((room) =>
              room.id === editingRoom
                ? {
                    ...room,
                    ...roomForm,
                    tenant:
                      roomForm.status === "Đang thuê" ? roomForm.tenant : "",
                  }
                : room
            ),
          };
        }

        return {
          ...item,
          rooms: [
            ...item.rooms,
            {
              id: Date.now(),
              ...roomForm,
              tenant:
                roomForm.status === "Đang thuê" ? roomForm.tenant : "",
            },
          ],
        };
      })
    );

    setShowRoomModal(false);
    setError("");
  };

  const deleteRoom = (propertyId: number, roomId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này?")) return;

    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              rooms: property.rooms.filter((room) => room.id !== roomId),
            }
          : property
      )
    );
  };

  const getStatusStyle = (status: RoomStatus) => {
    const normalized = normalizeStatus(status);

    if (normalized === "Đang thuê") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (normalized === "Bảo trì") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }

    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100";

  const statCards = [
    {
      title: "Tổng số nhà",
      value: totalProperties,
      description: "Số bất động sản đang quản lý",
      icon: Building2,
      iconColor: "text-blue-600",
      bg: "bg-blue-50",
      hover: "hover:bg-blue-100",
      border: "border-blue-100",
    },
    {
      title: "Tổng số phòng",
      value: totalRooms,
      description: "Tổng phòng thuộc các nhà",
      icon: DoorOpen,
      iconColor: "text-violet-600",
      bg: "bg-violet-50",
      hover: "hover:bg-violet-100",
      border: "border-violet-100",
    },
    {
      title: "Phòng đang thuê",
      value: rentedRooms,
      description: `${occupancyRate}% tỷ lệ lấp đầy`,
      icon: Users,
      iconColor: "text-emerald-600",
      bg: "bg-emerald-50",
      hover: "hover:bg-emerald-100",
      border: "border-emerald-100",
    },
    {
      title: "Phòng trống",
      value: vacantRooms,
      description: `${maintenanceRooms} phòng đang bảo trì`,
      icon: BedDouble,
      iconColor: "text-amber-600",
      bg: "bg-amber-50",
      hover: "hover:bg-amber-100",
      border: "border-amber-100",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#f8f8f6] px-4 py-6 text-gray-800 sm:px-6 lg:px-8"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-yellow-700">
              <Home size={17} />
              NDAHOME / QUẢN LÝ BẤT ĐỘNG SẢN
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Quản lý nhà / phòng
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Theo dõi danh sách nhà, tình trạng phòng và doanh thu dự kiến.
            </p>
          </div>

          <button
            onClick={openAddProperty}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-yellow-500 hover:shadow-md"
          >
            <Plus size={19} />
            Thêm nhà mới
          </button>
        </div>

        {/* STATISTICS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`group rounded-2xl border ${stat.border} ${stat.bg} p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 ${stat.hover} hover:shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl bg-white/80 p-3 ${stat.iconColor} shadow-sm transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon size={23} />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* REVENUE AND OCCUPANCY */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-yellow-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3 text-yellow-700">
                <Wallet size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Doanh thu dự kiến / tháng
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {formatCurrency(expectedRevenue)}
                </h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Tổng tiền thuê theo giá niêm yết của các phòng đang có người thuê.
              Đây không phải số tiền thực tế đã thu.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tỷ lệ lấp đầy</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {occupancyRate}%
                </h2>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingUp size={23} />
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {rentedRooms}/{totalRooms} phòng đang được thuê
            </p>
          </div>
        </section>

        {/* PROPERTY LIST */}
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Danh sách nhà
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Quản lý thông tin và tình trạng phòng theo từng nhà.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={17}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm nhà, phòng, người thuê..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-yellow-400 sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  value={propertyFilter}
                  onChange={(e) => setPropertyFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-yellow-400 sm:w-52"
                >
                  <option value="all">Tất cả nhà</option>
                  <option value="vacant">Có phòng trống</option>
                  <option value="full">Đã lấp đầy</option>
                  <option value="empty">Chưa có phòng</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={15}
                />
              </div>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <Building2 className="mx-auto text-gray-300" size={38} />
              <p className="mt-3 font-semibold text-gray-700">
                Không tìm thấy nhà phù hợp
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Thử thay đổi từ khóa hoặc bộ lọc.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredProperties.map((property) => {
                const rented = property.rooms.filter(
                  (room) => normalizeStatus(room.status) === "Đang thuê"
                ).length;

                const vacant = property.rooms.filter(
                  (room) => normalizeStatus(room.status) === "Phòng trống"
                ).length;

                const maintenance = property.rooms.filter(
                  (room) => normalizeStatus(room.status) === "Bảo trì"
                ).length;

                const rate =
                  property.rooms.length > 0
                    ? Math.round((rented / property.rooms.length) * 100)
                    : 0;

                return (
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="rounded-xl bg-yellow-100 p-3 text-yellow-700">
                            <Building2 size={24} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-bold text-gray-900">
                              {property.name}
                            </h3>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                              <MapPin size={14} />
                              {property.address}
                            </p>
                            {property.description && (
                              <p className="mt-1 text-sm text-gray-400">
                                {property.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex shrink-0 gap-1">
                          <button
                            onClick={() => openEditProperty(property)}
                            title="Sửa thông tin nhà"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-yellow-100 hover:text-yellow-700"
                          >
                            <Edit size={17} />
                          </button>
                          <button
                            onClick={() => deleteProperty(property.id)}
                            title="Xóa nhà"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-white p-3 text-center">
                          <p className="text-xl font-bold text-gray-900">
                            {property.rooms.length}
                          </p>
                          <p className="text-xs text-gray-500">Tổng phòng</p>
                        </div>
                        <div className="rounded-xl bg-emerald-50 p-3 text-center">
                          <p className="text-xl font-bold text-emerald-700">
                            {rented}
                          </p>
                          <p className="text-xs text-emerald-700">Đang thuê</p>
                        </div>
                        <div className="rounded-xl bg-blue-50 p-3 text-center">
                          <p className="text-xl font-bold text-blue-700">
                            {vacant}
                          </p>
                          <p className="text-xs text-blue-700">Phòng trống</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex justify-between text-xs text-gray-500">
                          <span>Tỷ lệ lấp đầy</span>
                          <span className="font-bold text-gray-700">
                            {rate}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                        {maintenance > 0 && (
                          <p className="mt-2 flex items-center gap-1 text-xs text-amber-700">
                            <Wrench size={13} />
                            {maintenance} phòng đang bảo trì
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="font-bold text-gray-800">
                          Danh sách phòng
                        </h4>
                        <button
                          onClick={() => openAddRoom(property.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-2 text-xs font-bold text-gray-900 transition hover:bg-yellow-500"
                        >
                          <Plus size={15} />
                          Thêm phòng
                        </button>
                      </div>

                      {property.rooms.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400">
                          Nhà này chưa có phòng nào.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {property.rooms.map((room) => (
                            <div
                              key={room.id}
                              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-yellow-200 hover:bg-yellow-50/40"
                            >
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-bold text-gray-800">
                                    {room.name}
                                  </p>
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getStatusStyle(room.status)}`}
                                  >
                                    {normalizeStatus(room.status)}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                  {room.area} m² · {formatCurrency(room.price)}
                                </p>
                                {room.tenant && (
                                  <p className="mt-1 text-xs text-gray-500">
                                    Người thuê: {room.tenant}
                                  </p>
                                )}
                              </div>

                              <div className="flex shrink-0">
                                <button
                                  onClick={() => openEditRoom(property.id, room)}
                                  title="Sửa phòng"
                                  className="rounded-lg p-2 text-gray-500 hover:bg-yellow-100 hover:text-yellow-700"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => deleteRoom(property.id, room.id)}
                                  title="Xóa phòng"
                                  className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ROOM TABLE */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Tổng hợp phòng
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Danh sách phòng của các nhà đang quản lý.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={selectedProperty}
                onChange={(e) =>
                  setSelectedProperty(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-yellow-400"
              >
                <option value="all">Tất cả nhà</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>

              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-yellow-400"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đang thuê">Đang thuê</option>
                <option value="Phòng trống">Phòng trống</option>
                <option value="Bảo trì">Bảo trì</option>
              </select>

              <button
                onClick={resetFilters}
                title="Đặt lại bộ lọc"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
              >
                <RefreshCw size={15} />
                Đặt lại
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4">Tên phòng</th>
                  <th className="px-5 py-4">Nhà</th>
                  <th className="px-5 py-4">Diện tích</th>
                  <th className="px-5 py-4">Giá thuê</th>
                  <th className="px-5 py-4">Người thuê</th>
                  <th className="px-5 py-4">Trạng thái</th>
                  <th className="px-5 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayedRooms.map((room) => (
                  <tr
                    key={`${room.propertyId}-${room.id}`}
                    className="transition hover:bg-yellow-50/40"
                  >
                    <td className="px-5 py-4 font-bold text-gray-800">
                      {room.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {room.propertyName}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {room.area} m²
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {formatCurrency(room.price)}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {room.tenant || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(room.status)}`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() =>
                            openEditRoom(room.propertyId, {
                              id: room.id,
                              name: room.name,
                              area: room.area,
                              price: room.price,
                              status: room.status,
                              tenant: room.tenant,
                            })
                          }
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-yellow-100 hover:text-yellow-700"
                          title="Sửa phòng"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteRoom(room.propertyId, room.id)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Xóa phòng"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {displayedRooms.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <BedDouble className="mx-auto text-gray-300" size={32} />
                      <p className="mt-3 font-semibold text-gray-600">
                        Không tìm thấy phòng phù hợp
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Hãy kiểm tra bộ lọc nhà, trạng thái hoặc từ khóa tìm kiếm.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
                      >
                        Xóa bộ lọc
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Đang hiển thị {displayedRooms.length} phòng
            {roomFilter !== "all" ? ` · Trạng thái: ${roomFilter}` : ""}
          </div>
        </section>

        {/* PROPERTY MODAL */}
        {showPropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingProperty !== null ? "Cập nhật nhà" : "Thêm nhà mới"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Nhập thông tin cơ bản của bất động sản.
                  </p>
                </div>
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên nhà <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={propertyForm.name}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Nhà trọ Nguyễn Văn Cừ"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={propertyForm.address}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Nhập địa chỉ nhà"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mô tả
                  </label>
                  <textarea
                    rows={3}
                    value={propertyForm.description}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Thông tin mô tả thêm..."
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 p-5">
                <button
                  onClick={() => setShowPropertyModal(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={saveProperty}
                  className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
                >
                  {editingProperty !== null ? "Lưu thay đổi" : "Thêm nhà"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ROOM MODAL */}
        {showRoomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
            <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingRoom !== null ? "Cập nhật phòng" : "Thêm phòng mới"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Điền thông tin và trạng thái phòng.
                  </p>
                </div>
                <button
                  onClick={() => setShowRoomModal(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên phòng <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={roomForm.name}
                    onChange={(e) =>
                      setRoomForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Phòng 101"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Diện tích (m²)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={roomForm.area}
                      onChange={(e) =>
                        setRoomForm((prev) => ({
                          ...prev,
                          area: Number(e.target.value),
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Giá thuê (VNĐ)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="100000"
                      value={roomForm.price}
                      onChange={(e) =>
                        setRoomForm((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Trạng thái phòng
                  </label>
                  <select
                    value={roomForm.status}
                    onChange={(e) =>
                      setRoomForm((prev) => ({
                        ...prev,
                        status: normalizeStatus(e.target.value),
                        tenant:
                          normalizeStatus(e.target.value) === "Đang thuê"
                            ? prev.tenant
                            : "",
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="Phòng trống">Phòng trống</option>
                    <option value="Đang thuê">Đang thuê</option>
                    <option value="Bảo trì">Bảo trì</option>
                  </select>
                </div>

                {roomForm.status === "Đang thuê" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Người thuê <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={roomForm.tenant}
                      onChange={(e) =>
                        setRoomForm((prev) => ({
                          ...prev,
                          tenant: e.target.value,
                        }))
                      }
                      placeholder="Nhập tên người thuê"
                      className={inputClass}
                    />
                  </div>
                )}

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 p-5">
                <button
                  onClick={() => setShowRoomModal(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={saveRoom}
                  className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
                >
                  {editingRoom !== null ? "Lưu thay đổi" : "Thêm phòng"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
