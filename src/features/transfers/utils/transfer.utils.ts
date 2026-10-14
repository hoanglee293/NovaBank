
export function formatCurrency(
  amount: number,
  currency = "VND"
): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function maskAccountNumber(
  accountNumber: string
): string {
  const lastFour = accountNumber.slice(-4);
  return `•••• ${lastFour}`;
}
