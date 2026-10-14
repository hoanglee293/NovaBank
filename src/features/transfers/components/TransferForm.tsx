
"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAccounts } from
  "@/features/accounts/hooks/useAccounts";

import {
  transferSchema,
  type TransferFormValues,
} from "../schemas/transfer.schema";

import { formatCurrency } from
  "../utils/transfer.utils";

interface TransferFormProps {
  initialValues?: TransferFormValues;
  onContinue: (values: TransferFormValues) => void;
}

export function TransferForm({
  initialValues,
  onContinue,
}: TransferFormProps) {
  const {
    data: accounts = [],
    isPending,
    isError,
  } = useAccounts();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: initialValues ?? {
      sourceAccountId: "",
      destinationAccountId: "",
      amount: 0,
      description: "",
    },
  });

  const sourceAccountId = watch("sourceAccountId");
  const destinationAccountId = watch(
    "destinationAccountId"
  );
  const amount = watch("amount");

  const sourceAccount = useMemo(
    () =>
      accounts.find(
        (account) => account.id === sourceAccountId
      ),
    [accounts, sourceAccountId]
  );

  const availableBalance =
    sourceAccount?.availableBalance ?? 0;

  const insufficientBalance =
    !!sourceAccount &&
    Number.isFinite(amount) &&
    amount > availableBalance;

  function onSubmit(values: TransferFormValues) {
    const source = accounts.find(
      (account) => account.id === values.sourceAccountId
    );

    const destination = accounts.find(
      (account) =>
        account.id === values.destinationAccountId
    );

    if (!source || !destination) {
      setError("destinationAccountId", {
        message: "Please select valid accounts",
      });
      return;
    }

    if (values.amount > source.availableBalance) {
      setError("amount", {
        message: "Insufficient available balance",
      });
      return;
    }

    onContinue(values);
  }

  if (isPending) {
    return <p>Loading accounts...</p>;
  }

  if (isError) {
    return (
      <p role="alert" className="text-red-600">
        Unable to load accounts.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="sourceAccount"
          className="mb-2 block text-sm font-medium"
        >
          From Account
        </label>

        <select
          id="sourceAccount"
          {...register("sourceAccountId")}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select source account</option>

          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.accountNumber}
            </option>
          ))}
        </select>

        {errors.sourceAccountId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.sourceAccountId.message}
          </p>
        )}
      </div>

      {sourceAccount && (
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-slate-500">
            Available Balance
          </p>

          <p className="text-xl font-bold text-blue-900">
            {formatCurrency(availableBalance)}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="destinationAccount"
          className="mb-2 block text-sm font-medium"
        >
          Destination Account
        </label>

        <select
          id="destinationAccount"
          {...register("destinationAccountId")}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select destination</option>

          {accounts
            .filter(
              (account) => account.id !== sourceAccountId
            )
            .map((account) => (
              <option key={account.id} value={account.id}>
                {account.accountNumber}
              </option>
            ))}
        </select>

        {errors.destinationAccountId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.destinationAccountId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="transferAmount"
          className="mb-2 block text-sm font-medium"
        >
          Amount (VND)
        </label>

        <input
          id="transferAmount"
          type="number"
          min="1"
          step="1"
          {...register("amount", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.amount.message}
          </p>
        )}

        {insufficientBalance && (
          <p className="mt-1 text-sm text-red-600">
            Insufficient available balance
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="transferDescription"
          className="mb-2 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="transferDescription"
          {...register("description")}
          rows={3}
          placeholder="Transfer description"
          className="w-full rounded-lg border p-3"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={
          isSubmitting ||
          insufficientBalance ||
          !sourceAccount ||
          accounts.length < 2
        }
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-50"
      >
        Continue
      </button>
    </form>
  );
}
