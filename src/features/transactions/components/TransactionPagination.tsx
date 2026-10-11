"use client";

interface Props {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export function TransactionPagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-slate-600">
        Page {page} of {Math.max(totalPages, 1)}
      </span>

      <button
        type="button"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}