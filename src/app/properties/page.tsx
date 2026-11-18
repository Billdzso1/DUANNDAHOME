
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Building2,
  DoorOpen,
  Users,
  Wallet,
  Pencil,
  Trash2,
  X,
  ChevronRight,
  ArrowLeft,
  Home,
  CheckCircle2,
  Wrench,
  Filter,
} from "lucide-react";

type RoomStatus = "Đang thuê" | "Còn trống" | "Bảo trì";

type Room = {
  id: number;
  name: string;
  price: number;
  tenant: string;
  status: RoomStatus;
  area: number;
};

type Property = {
  id: number;
  name: string;
  address: string;
  description: string;
  rooms: Room[];
};

const initialProperties: Property[] = [
  {
    id: 1,
    name: "Nhà trọ Bình An",
    address: "123 Đường số 8, Thủ Đức, TP.HCM",
    description: "Nhà trọ khu vực Thủ Đức",
    rooms: [
      {
        id: 101,
        name: "P101",
        price: 3500000,
        tenant: "Nguyễn Văn An",
        status: "Đang thuê",
        area: 25,
      },
      {
        id: 102,
        name: "P102",
        price: 3500000,
        tenant: "",
        status: "Còn trống",
        area: 25,
      },
      {
        id: 103,
        name: "P103",
        price: 4000000,
        tenant: "Trần Thị Hoa",
        status: "Đang thuê",
        area: 30,
      },
      {
        id: 104,
        name: "P104",
        price: 3500000,
        tenant: "",
        status: "Bảo trì",
        area: 25,
      },
    ],
  },
  {
    id: 2,
    name: "Nhà trọ Phú Thịnh",
    address: "45 Đường Lê Văn Việt, Thủ Đức, TP.HCM",
    description: "Khu nhà trọ gần trung tâm",
    rooms: [
      {
        id: 201,
        name: "A101",
        price: 3000000,
        tenant: "Lê Minh Tuấn",
        status: "Đang thuê",
        area: 22,
      },
      {
        id: 202,
        name: "A102",
        price: 3000000,
        tenant: "",
        status: "Còn trống",
        area: 22,
      },
    ],
  },
];

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("vi-VN").format(amount) + "đ";

const emptyRoom = {
  name: "",
  price: "",
  tenant: "",
  status: "Còn trống" as RoomStatus,
  area: "",
};

const emptyProperty = {
  name: "",
  address: "",
  description: "",
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const [propertyModal, setPropertyModal] = useState(false);
  const [roomModal, setRoomModal] = useState(false);

  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);

  const [propertyForm, setPropertyForm] = useState(emptyProperty);
  const [roomForm, setRoomForm] = useState(emptyRoom);

  const [error, setError] = useState("");

  const selectedProperty = properties.find(
    (property) => property.id === selectedPropertyId
  );

  const allRooms = properties.flatMap((property) => property.rooms);

  const totalRooms = allRooms.length;
  const occupiedRooms = allRooms.filter(
    (room) => room.status === "Đang thuê"
  ).length;
  const vacantRooms = allRooms.filter(
    (room) => room.status === "Còn trống"
  ).length;
  const maintenanceRooms = allRooms.filter(
    (room) => room.status === "Bảo trì"
  ).length;

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        property.name.toLowerCase().includes(keyword) ||
        property.address.toLowerCase().includes(keyword) ||
        property.rooms.some((room) =>
          room.name.toLowerCase().includes(keyword)
        );

      return matchesSearch;
    });
  }, [properties, search]);

  const filteredRooms = useMemo(() => {
    if (!selectedProperty) return [];

    const keyword = search.toLowerCase().trim();

    return selectedProperty.rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(keyword) ||
        room.tenant.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Tất cả" || room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [selectedProperty, search, statusFilter]);

  function openAddProperty() {
    setEditingPropertyId(null);
    setPropertyForm(emptyProperty);
    setError("");
    setPropertyModal(true);
  }

  function openEditProperty(property: Property) {
    setEditingPropertyId(property.id);
    setPropertyForm({
      name: property.name,
      address: property.address,
      description: property.description,
    });
    setError("");
    setPropertyModal(true);
  }

  function saveProperty() {
    if (!propertyForm.name.trim() || !propertyForm.address.trim()) {
      setError("Vui lòng nhập tên nhà và địa chỉ.");
      return;
    }

    if (editingPropertyId !== null) {
      setProperties((current) =>
        current.map((property) =>
          property.id === editingPropertyId
            ? { ...property, ...propertyForm }
            : property
        )
      );
    } else {
      const newProperty: Property = {
        id: Date.now(),
        ...propertyForm,
        rooms: [],
      };

      setProperties((current) => [...current, newProperty]);
    }

    setPropertyModal(false);
    setError("");
  }

  function deleteProperty(property: Property) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa "${property.name}" và toàn bộ phòng thuộc nhà này?`
    );

    if (!confirmed) return;

    setProperties((current) =>
      current.filter((item) => item.id !== property.id)
    );

    if (selectedPropertyId === property.id) {
      setSelectedPropertyId(null);
    }
  }

  function openAddRoom() {
    if (!selectedProperty) return;

    setEditingRoomId(null);
    setRoomForm(emptyRoom);
    setError("");
    setRoomModal(true);
  }

  function openEditRoom(room: Room) {
    setEditingRoomId(room.id);
    setRoomForm({
      name: room.name,
      price: String(room.price),
      tenant: room.tenant,
      status: room.status,
      area: String(room.area),
    });
    setError("");
    setRoomModal(true);
  }

  function saveRoom() {
    if (!selectedProperty) return;

    if (!roomForm.name.trim() || !roomForm.price || !roomForm.area) {
      setError("Vui lòng nhập tên phòng, giá thuê và diện tích.");
      return;
    }

    const price = Number(roomForm.price);
    const area = Number(roomForm.area);

    if (price < 0 || area <= 0 || !Number.isFinite(price) || !Number.isFinite(area)) {
      setError("Giá thuê hoặc diện tích không hợp lệ.");
      return;
    }

    if (
      selectedProperty.rooms.some(
        (room) =>
          room.name.toLowerCase() === roomForm.name.trim().toLowerCase() &&
          room.id !== editingRoomId
      )
    ) {
      setError("Tên phòng này đã tồn tại trong nhà.");
      return;
    }

    const updatedRoom: Room = {
      id: editingRoomId ?? Date.now(),
      name: roomForm.name.trim(),
      price,
      tenant: roomForm.status === "Đang thuê" ? roomForm.tenant.trim() : "",
      status: roomForm.status,
      area,
    };

    setProperties((current) =>
      current.map((property) => {
        if (property.id !== selectedProperty.id) return property;

        if (editingRoomId !== null) {
          return {
            ...property,
            rooms: property.rooms.map((room) =>
              room.id === editingRoomId ? updatedRoom : room
            ),
          };
        }

        return {
          ...property,
          rooms: [...property.rooms, updatedRoom],
        };
      })
    );

    setRoomModal(false);
    setError("");
  }

  function deleteRoom(room: Room) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa phòng ${room.name}?`
    );

    if (!confirmed || !selectedProperty) return;

    setProperties((current) =>
      current.map((property) =>
        property.id === selectedProperty.id
          ? {
              ...property,
              rooms: property.rooms.filter((item) => item.id !== room.id),
            }
          : property
      )
    );
  }

  const statusStyle = (status: RoomStatus) => {
    if (status === "Đang thuê") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Bảo trì") {
      return "bg-orange-50 text-orange-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 md:p-7">
      {/* Tiêu đề */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-slate-400">
            <span>Quản lý</span>
            <ChevronRight size={14} />
            <span className="font-medium text-slate-600">Nhà / Phòng</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý Nhà / Phòng
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Quản lý thông tin nhà, phòng và tình trạng cho thuê.
          </p>
        </div>

        <button
          onClick={selectedProperty ? openAddRoom : openAddProperty}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
        >
          <Plus size={19} />
          {selectedProperty ? "Thêm phòng" : "Thêm nhà mới"}
        </button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            title: "Tổng số nhà",
            value: properties.length,
            icon: Building2,
            color: "bg-amber-50 text-amber-600",
          },
          {
            title: "Tổng số phòng",
            value: totalRooms,
            icon: DoorOpen,
            color: "bg-blue-50 text-blue-600",
          },
          {
            title: "Phòng đang thuê",
            value: occupiedRooms,
            icon: Users,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            title: "Phòng còn trống",
            value: vacantRooms,
            icon: Home,
            color: "bg-orange-50 text-orange-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">{item.title}</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row">
        {selectedProperty && (
          <button
            onClick={() => {
              setSelectedPropertyId(null);
              setSearch("");
              setStatusFilter("Tất cả");
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Danh sách nhà
          </button>
        )}

        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              selectedProperty
                ? "Tìm theo tên phòng hoặc khách thuê..."
                : "Tìm theo tên nhà, địa chỉ hoặc mã phòng..."
            }
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {selectedProperty && (
          <div className="relative sm:w-52">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-amber-400"
            >
              <option>Tất cả</option>
              <option>Đang thuê</option>
              <option>Còn trống</option>
              <option>Bảo trì</option>
            </select>
          </div>
        )}
      </div>

      {/* Danh sách nhà */}
      {!selectedProperty ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Danh sách nhà
            </h2>
            <span className="text-sm text-slate-500">
              {filteredProperties.length} nhà
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
              <Building2 className="mx-auto text-slate-300" size={40} />
              <p className="mt-3 font-medium text-slate-600">
                Không tìm thấy nhà nào
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Thử từ khóa khác hoặc thêm nhà mới.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredProperties.map((property) => {
                const rented = property.rooms.filter(
                  (room) => room.status === "Đang thuê"
                ).length;

                const vacant = property.rooms.filter(
                  (room) => room.status === "Còn trống"
                ).length;

                return (
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3 p-5">
                      <div className="flex min-w-0 gap-3">
                        <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                          <Building2 size={25} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold text-slate-800">
                            {property.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {property.address}
                          </p>
                          {property.description && (
                            <p className="mt-1 text-xs text-slate-400">
                              {property.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-1">
                        <button
                          onClick={() => openEditProperty(property)}
                          title="Sửa nhà"
                          className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => deleteProperty(property)}
                          title="Xóa nhà"
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 border-y border-slate-100 bg-slate-50/70">
                      <div className="p-3 text-center">
                        <p className="text-xl font-bold text-slate-800">
                          {property.rooms.length}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Tổng phòng</p>
                      </div>
                      <div className="border-x border-slate-100 p-3 text-center">
                        <p className="text-xl font-bold text-emerald-600">
                          {rented}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Đang thuê</p>
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-xl font-bold text-orange-500">
                          {vacant}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Còn trống</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-4">
                      <span className="text-xs text-slate-400">
                        {property.rooms.length === 0
                          ? "Chưa có phòng"
                          : `${property.rooms.length} phòng được quản lý`}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedPropertyId(property.id);
                          setSearch("");
                          setStatusFilter("Tất cả");
                        }}
                        className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                      >
                        Xem phòng
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Danh sách phòng của nhà được chọn */
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-400">Đang xem nhà</p>
                <h2 className="mt-1 text-xl font-bold text-slate-800">
                  {selectedProperty.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedProperty.address}
                </p>
              </div>

              <button
                onClick={() => openEditProperty(selectedProperty)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={16} />
                Sửa thông tin nhà
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Danh sách phòng
            </h2>
            <span className="text-sm text-slate-500">
              {filteredRooms.length} phòng
            </span>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
              <DoorOpen className="mx-auto text-slate-300" size={40} />
              <p className="mt-3 font-medium text-slate-600">
                Không có phòng phù hợp
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Hãy thử thay đổi bộ lọc hoặc thêm phòng mới.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Phòng</th>
                      <th className="px-5 py-4 font-semibold">Diện tích</th>
                      <th className="px-5 py-4 font-semibold">Giá thuê</th>
                      <th className="px-5 py-4 font-semibold">Khách thuê</th>
                      <th className="px-5 py-4 font-semibold">Trạng thái</th>
                      <th className="px-5 py-4 text-right font-semibold">
                        Thao tác
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50/70">
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                              <DoorOpen size={17} />
                            </div>
                            {room.name}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {room.area} m²
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-700">
                          {formatMoney(room.price)}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {room.tenant || "Chưa có khách"}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle(room.status)}`}
                          >
                            {room.status === "Đang thuê" && (
                              <CheckCircle2 size={13} />
                            )}
                            {room.status === "Bảo trì" && (
                              <Wrench size={13} />
                            )}
                            {room.status === "Còn trống" && (
                              <Home size={13} />
                            )}
                            {room.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => openEditRoom(room)}
                              title="Sửa phòng"
                              className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                            >
                              <Pencil size={17} />
                            </button>
                            <button
                              onClick={() => deleteRoom(room)}
                              title="Xóa phòng"
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
            </div>
          )}
        </div>
      )}

      {/* Modal thêm / sửa nhà */}
      {propertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {editingPropertyId ? "Cập nhật nhà" : "Thêm nhà mới"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Nhập thông tin cơ bản của nhà.
                </p>
              </div>
              <button
                onClick={() => setPropertyModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tên nhà <span className="text-red-500">*</span>
                </label>
                <input
                  value={propertyForm.name}
                  onChange={(event) =>
                    setPropertyForm({ ...propertyForm, name: event.target.value })
                  }
                  placeholder="Ví dụ: Nhà trọ Bình An"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  value={propertyForm.address}
                  onChange={(event) =>
                    setPropertyForm({
                      ...propertyForm,
                      address: event.target.value,
                    })
                  }
                  placeholder="Nhập địa chỉ nhà"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mô tả
                </label>
                <textarea
                  value={propertyForm.description}
                  onChange={(event) =>
                    setPropertyForm({
                      ...propertyForm,
                      description: event.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Thông tin mô tả thêm..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
              <button
                onClick={() => setPropertyModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={saveProperty}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm / sửa phòng */}
      {roomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {editingRoomId ? "Cập nhật phòng" : "Thêm phòng mới"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedProperty?.name}
                </p>
              </div>
              <button
                onClick={() => setRoomModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tên / Mã phòng <span className="text-red-500">*</span>
                </label>
                <input
                  value={roomForm.name}
                  onChange={(event) =>
                    setRoomForm({ ...roomForm, name: event.target.value })
                  }
                  placeholder="Ví dụ: P101"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Giá thuê (VNĐ) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={roomForm.price}
                    onChange={(event) =>
                      setRoomForm({ ...roomForm, price: event.target.value })
                    }
                    placeholder="3500000"
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Diện tích (m²) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={roomForm.area}
                    onChange={(event) =>
                      setRoomForm({ ...roomForm, area: event.target.value })
                    }
                    placeholder="25"
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Trạng thái
                </label>
                <select
                  value={roomForm.status}
                  onChange={(event) =>
                    setRoomForm({
                      ...roomForm,
                      status: event.target.value as RoomStatus,
                      tenant:
                        event.target.value === "Đang thuê"
                          ? roomForm.tenant
                          : "",
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400"
                >
                  <option> Còn trống </option>
                  <option>Đang thuê</option>
                  <option>Bảo trì</option>
                </select>
              </div>

              {roomForm.status === "Đang thuê" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tên khách thuê
                  </label>
                  <input
                    value={roomForm.tenant}
                    onChange={(event) =>
                      setRoomForm({ ...roomForm, tenant: event.target.value })
                    }
                    placeholder="Nhập tên khách thuê"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
              <button
                onClick={() => setRoomModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={saveRoom}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Lưu phòng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
