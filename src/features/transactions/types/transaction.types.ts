export type TransactionStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

export type TransactionType =
  | "CREDIT"
  | "DEBIT";

export type SortField =
  | "createdAt"
  | "amount";

export type SortOrder =
  | "asc"
  | "desc";

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  currency: "VND";
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionFilters {
  page: number;
  pageSize: number;
  status?: TransactionStatus;
  type?: TransactionType;
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}