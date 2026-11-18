
export async function POST(request) {
  try {
    // 1. Nhận dữ liệu từ yêu cầu
    const body = await request.json();

    const {
      user_id,
      category_id,
      property_id,
      customer_id,
      amount,
      description,
      transaction_date,
    } = body;

    // 2. Kiểm tra các trường bắt buộc
    if (
      user_id === undefined ||
      category_id === undefined ||
      amount === undefined ||
      !transaction_date
    ) {
      return Response.json(
        {
          success: false,
          message: "Vui lòng nhập đầy đủ thông tin bắt buộc",
        },
        { status: 400 }
      );
    }

    // 3. Kiểm tra ID
    if (
      !Number.isInteger(Number(user_id)) ||
      Number(user_id) <= 0 ||
      !Number.isInteger(Number(category_id)) ||
      Number(category_id) <= 0
    ) {
      return Response.json(
        {
          success: false,
          message: "User ID hoặc Category ID không hợp lệ",
        },
        { status: 400 }
      );
    }

    // 4. Kiểm tra số tiền
    const transactionAmount = Number(amount);

    if (
      !Number.isFinite(transactionAmount) ||
      transactionAmount <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(String(amount))
    ) {
      return Response.json(
        {
          success: false,
          message: "Số tiền không hợp lệ",
        },
        { status: 400 }
      );
    }

// 5. Kiểm tra ngày giao dịch
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const [year, month, day] = transaction_date
  .split("-")
  .map(Number);

const parsedDate = new Date(year, month - 1, day);

if (
  typeof transaction_date !== "string" ||
  !datePattern.test(transaction_date) ||
  parsedDate.getFullYear() !== year ||
  parsedDate.getMonth() !== month - 1 ||
  parsedDate.getDate() !== day
) {
  return Response.json(
    {
      success: false,
      message: "Ngày giao dịch không hợp lệ",
    },
    { status: 400 }
  );
}

    // 6. Chuẩn bị dữ liệu giao dịch
    const transaction = {
      user_id: Number(user_id),
      category_id: Number(category_id),
      property_id: property_id ? Number(property_id) : null,
      customer_id: customer_id ? Number(customer_id) : null,
      amount: transactionAmount,
      description: description || null,
      transaction_date,
    };

    // 7. Trả kết quả kiểm tra
    return Response.json(
      {
        success: true,
        message: "Dữ liệu giao dịch hợp lệ",
        transaction,
      },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Không thể xử lý dữ liệu gửi lên",
      },
      { status: 400 }
    );
  }
}
