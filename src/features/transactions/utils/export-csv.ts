import type { Transaction } from
  "../types/transaction.types";

function escapeCsv(value: string | number): string {
  const text = String(value);

  const dangerous =
    /^[\s\x00-\x1f]*[=+\-@]/.test(text);

  const safe = dangerous
    ? `'${text}`
    : text;

  return `"${safe.replace(/"/g, '""')}"`;
}

export function exportTransactionsCsv(
  transactions: Transaction[]
) {
  const headers = [
    "ID",
    "Date",
    "Description",
    "Type",
    "Status",
    "Amount",
    "Currency",
  ];

  const rows = transactions.map((item) => [
    item.id,
    item.createdAt,
    item.description,
    item.type,
    item.status,
    item.amount,
    item.currency,
  ]);

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) =>
      row.map(escapeCsv).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(
    ["\uFEFF", csv],
    { type: "text/csv;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "novabank-transactions.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}