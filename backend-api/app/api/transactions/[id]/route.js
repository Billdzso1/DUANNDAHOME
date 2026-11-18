
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 1. Kiểm tra ID giao dịch
    const transactionId = Number(id);

    if (!Number.isInteger(transactionId) || transactionId <= 0) {
      return Response.json(
        {
          success: false,
          message: "ID giao dịch không hợp lệ",
        },
        { status: 400 }
      );
    }

    // 2. Các trường được phép chỉnh sửa
    const allowedFields = [
      "user_id",
      "category_id",
      "property_id",
      "customer_id",
      "amount",
      "description",
      "transaction_date",
    ];

    // 3. Lọc dữ liệu được gửi lên
    const updates = {};

    for (const field of allowedFields) {
      if (Object.hasOwn(body, field)) {
        updates[field] = body[field];
      }
    }

    // 4. Kiểm tra dữ liệu cập nhật
    if (Object.keys(updates).length === 0) {
      return Response.json(
        {
          success: false,
          message: "Không có dữ liệu cần cập nhật",
        },
        { status: 400 }
      );
    }

    // 5. Kiểm tra số tiền nếu có cập nhật
    if (Object.hasOwn(updates, "amount")) {
      const amount = Number(updates.amount);

      if (!Number.isFinite(amount) || amount <= 0) {
        return Response.json(
          {
            success: false,
            message: "Số tiền không hợp lệ",
          },
          { status: 400 }
        );
      }

      updates.amount = amount;
    }

    // 6. Trả dữ liệu đã kiểm tra
    return Response.json(
      {
        success: true,
        message: "Dữ liệu cập nhật hợp lệ",
        id: transactionId,
        updates,
      },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Không thể xử lý dữ liệu cập nhật",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // 1. Lấy ID giao dịch từ URL
    const { id } = await params;
    const transactionId = Number(id);

    // 2. Kiểm tra ID
    if (!Number.isInteger(transactionId) || transactionId <= 0) {
      return Response.json(
        {
          success: false,
          message: "ID giao dịch không hợp lệ",
        },
        { status: 400 }
      );
    }

    // 3. Trả kết quả
    return Response.json(
      {
        success: true,
        message: "ID giao dịch hợp lệ, có thể tiến hành xóa",
        id: transactionId,
      },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Không thể xử lý yêu cầu xóa giao dịch",
      },
      { status: 400 }
    );
  }
}
