
"use client";

import { useState } from "react";

import { TransferForm } from "./TransferForm";
import { TransferReview } from "./TransferReview";

import type { TransferFormValues } from
  "../schemas/transfer.schema";

type TransferStep = "FORM" | "REVIEW";

export function TransferFlow() {
  const [step, setStep] =
    useState<TransferStep>("FORM");

  const [transferData, setTransferData] =
    useState<TransferFormValues | null>(null);

  function handleContinue(values: TransferFormValues) {
    setTransferData(values);
    setStep("REVIEW");
  }

  function handleBack() {
    setStep("FORM");
  }

  function handleConfirm() {
    if (!transferData) return;

    // Phase 5.3:
    // Call initiateTransfer API with idempotency key.

    console.log(
      "Transfer confirmed for next phase:",
      transferData
    );
  }

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
      <header className="mb-6 space-y-2">
        <h2 className="text-xl font-bold">
          Internal Fund Transfer
        </h2>

        <p className="text-sm text-slate-500">
          {step === "FORM"
            ? "Step 1: Transfer Details"
            : "Step 2: Review & Confirm"}
        </p>

        <div className="flex gap-2">
          <div className="h-2 flex-1 rounded-full bg-blue-600" />

          <div
            className={`h-2 flex-1 rounded-full ${
              step === "REVIEW"
                ? "bg-blue-600"
                : "bg-slate-200"
            }`}
          />

          <div className="h-2 flex-1 rounded-full bg-slate-200" />
        </div>
      </header>

      {step === "FORM" && (
        <TransferForm
          initialValues={transferData ?? undefined}
          onContinue={handleContinue}
        />
      )}

      {step === "REVIEW" && transferData && (
        <TransferReview
          transfer={transferData}
          onBack={handleBack}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
}
