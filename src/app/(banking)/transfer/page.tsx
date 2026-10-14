
import { TransferFlow } from
  "@/features/transfers/components/TransferFlow";

export default function TransferPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Fund Transfer
        </h1>

        <p className="text-slate-500">
          Transfer funds securely between your accounts
        </p>
      </div>

      <TransferFlow />
    </div>
  );
}
