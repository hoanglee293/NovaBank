
import { z } from "zod";

export const transferSchema = z
  .object({
    sourceAccountId: z.string().min(
      1,
      "Vui lòng chọn tài khoản nguồn"
    ),

    destinationAccountId: z.string().min(
      1,
      "Vui lòng chọn tài khoản nhận"
    ),

    amount: z.number({
      error: "Vui lòng nhập số tiền hợp lệ",
    })
      .int("Số tiền phải là số nguyên")
      .positive("Số tiền phải lớn hơn 0")
      .max(
        500_000_000,
        "Giới hạn chuyển tiền là 500 triệu VND"
      ),

    description: z.string().trim().max(
      140,
      "Nội dung tối đa 140 ký tự"
    ),
  })
  .refine(
    (data) =>
      data.sourceAccountId !== data.destinationAccountId,
    {
      path: ["destinationAccountId"],
      message: "Không thể chuyển đến cùng tài khoản",
    }
  );

export type TransferFormValues = z.infer<
  typeof transferSchema
>;
