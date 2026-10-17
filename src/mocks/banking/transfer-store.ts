
import type { TransferRecord } from
  "@/features/transfers/types/transfer.types";

export interface MockAccount {
  id: string;
  ownerId: string;
  balance: number;
  currency: "VND";
}

interface TransferStore {
  accounts: Map<string, MockAccount>;
  transfers: Map<string, TransferRecord>;
  idempotency: Map<string, string>;
}

const globalStore = globalThis as typeof globalThis & {
  __novaTransferStore?: TransferStore;
};

export const transferStore =
  globalStore.__novaTransferStore ??= {
    accounts: new Map<string, MockAccount>([
      [
        "account_001",
        {
          id: "account_001",
          ownerId: "usr_001",
          balance: 120_000_000,
          currency: "VND",
        },
      ],
      [
        "account_002",
        {
          id: "account_002",
          ownerId: "usr_001",
          balance: 15_000_000,
          currency: "VND",
        },
      ],
    ]),

    transfers: new Map<string, TransferRecord>(),

    idempotency: new Map<string, string>(),
  };
