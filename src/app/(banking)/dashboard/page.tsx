"use client";

import { LogoutButton } from "@/features/authentication/components/LogoutButton";
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { useAuthStore } from "@/stores/auth.store";

export default function DashboardPage() {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  const {
    data: accounts,
    isLoading,
    isError,
    refetch,
  } = useAccounts();

  return (
    <main>
      <h1>
        NovaBank Dashboard
      </h1>

      <section>
        <h2>User</h2>

        <p>
          Welcome, {user?.fullName}
        </p>

        <p>
          Email: {user?.email}
        </p>

        <p>
          Role: {user?.role}
        </p>
      </section>

      <hr />

      <section>
        <h2>Accounts</h2>

        {isLoading && (
          <p>
            Loading accounts...
          </p>
        )}

        {isError && (
          <div>
            <p>
              Unable to load
              accounts.
            </p>

            <button
              type="button"
              onClick={() =>
                void refetch()
              }
            >
              Retry
            </button>
          </div>
        )}

        {accounts?.map(
          (account) => (
            <article
              key={account.id}
            >
              <h3>
                {
                  account.accountName
                }
              </h3>

              <p>
                Account:
                {" "}
                {
                  account.accountNumber
                }
              </p>

              <p>
                Balance:
                {" "}
                {account.balance.toLocaleString(
                  "vi-VN",
                )}
                {" "}
                {
                  account.currency
                }
              </p>

              <p>
                Status:
                {" "}
                {
                  account.status
                }
              </p>
            </article>
          ),
        )}
      </section>

      <hr />

      <LogoutButton />
    </main>
  );
}