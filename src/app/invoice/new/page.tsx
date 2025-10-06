'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type InvoiceFormState = {
  client: string;
  from: string;
  description: string;
  amount: string;
  currency: string;
  deadline: string;
  category: string;
  cryptoAddress: string;
  blockchainNetwork: string;
  paymentLink: string;
};

const initialState: InvoiceFormState = {
  client: '',
  from: '',
  description: '',
  amount: '',
  currency: '',
  deadline: '',
  category: 'general',
  cryptoAddress: '',
  blockchainNetwork: '',
  paymentLink: '',
};

export default function NewInvoicePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState<InvoiceFormState>(initialState);
  const router = useRouter();

  const handleCreateInvoice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    // TODO: integrate with backend or state management for invoice creation
  };

  const handlePrintInvoice = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(
          'create-invoice-easy:printData',
          JSON.stringify(formState),
        );
      } catch (e) {
        // Fallback if sessionStorage is not available
      }
      router.push('/invoice/print');
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (
    event,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const formattedAmount = useMemo(() => {
    if (!formState.amount) return '';
    const amountNumber = Number(formState.amount);
    if (Number.isNaN(amountNumber)) return formState.amount;
    return amountNumber.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [formState.amount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-100 dark:from-slate-900 dark:via-emerald-900 dark:to-emerald-950 p-8">
      <div className="mx-auto max-w-4xl">
        <header className="py-12">
          <h1 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100">
            Create a New Invoice
          </h1>
          <p className="mt-4 text-lg text-emerald-700 dark:text-emerald-300">
            Fill out the form below to generate a professional invoice for your client.
          </p>
        </header>

        <section className="mb-20 rounded-2xl border border-emerald-200 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/60">
          <form className="space-y-6" onSubmit={handleCreateInvoice}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  Client Name / Company
                </span>
                <input
                  type="text"
                  name="client"
                  required
                  placeholder="e.g. Acme Corp."
                  value={formState.client}
                  onChange={handleChange}
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  From
                </span>
                <input
                  type="text"
                  name="from"
                  required
                  placeholder="Your business name"
                  value={formState.from}
                  onChange={handleChange}
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                Invoice Type
              </span>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
              >
                <option value="crypto">Crypto</option>
                <option value="general">General</option>
              </select>
            </label>

            {formState.category === 'crypto' ? (
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    Crypto Address
                  </span>
                  <input
                    type="text"
                    name="cryptoAddress"
                    required
                    placeholder="e.g. 0x..."
                    value={formState.cryptoAddress}
                    onChange={handleChange}
                    className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    Blockchain Network
                  </span>
                  <input
                    type="text"
                    name="blockchainNetwork"
                    required
                    placeholder="e.g. Ethereum, Solana"
                    value={formState.blockchainNetwork}
                    onChange={handleChange}
                    className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  Payment Link
                </span>
                <input
                  type="url"
                  name="paymentLink"
                  required
                  placeholder="https://"
                  value={formState.paymentLink}
                  onChange={handleChange}
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                />
              </label>
            )}

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                Description
              </span>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe the services or products provided"
                value={formState.description}
                onChange={handleChange}
                className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  Amount
                </span>
                <div className="flex gap-3">
                  <input
                    type="number"
                    name="amount"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formState.amount}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                  />
                  <input
                    type="text"
                    name="currency"
                    required
                    maxLength={6}
                    placeholder="Currency (e.g. USD, BTC)"
                    value={formState.currency}
                    onChange={handleChange}
                    className="w-40 rounded-lg border border-emerald-200 bg-white px-4 py-3 uppercase text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  Deadline
                </span>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formState.deadline}
                  onChange={handleChange}
                  className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Generate Invoice
              </button>
              <button
                type="button"
                onClick={handlePrintInvoice}
                className="rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-900"
              >
                Print PDF
              </button>
              <a
                href="/"
                className="rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-900"
              >
                Cancel
              </a>
            </div>
          </form>

          {isSubmitted && (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100">
              Invoice created successfully! (Demo state — replace with real integration.)
            </div>
          )}
        </section>

        <section className="mb-20 rounded-2xl border border-emerald-300 bg-white/70 p-8 shadow-inner backdrop-blur-sm dark:border-emerald-800 dark:bg-emerald-950/40">
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
            Invoice Preview
          </h2>
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
            This preview updates in real-time as you fill out the form above.
          </p>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                  Billed To
                </p>
                <p className="mt-1 text-base font-medium text-emerald-900 dark:text-emerald-100">
                  {formState.client || 'Client name or company'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                  From
                </p>
                <p className="mt-1 text-base font-medium text-emerald-900 dark:text-emerald-100">
                  {formState.from || 'Your business name'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                Description
              </p>
              <p className="mt-1 whitespace-pre-line rounded-lg border border-emerald-100 bg-white/60 p-4 text-emerald-900 shadow-sm dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">
                {formState.description || 'Describe the services or products provided'}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                  Amount Due
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-900 dark:text-emerald-100">
                  {formattedAmount ? `${formattedAmount} ${formState.currency || ''}`.trim() : '0.00'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                  Deadline
                </p>
                <p className="mt-1 text-base font-medium text-emerald-900 dark:text-emerald-100">
                  {formState.deadline || 'Select a due date'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                Invoice Type
              </p>
              <p className="mt-1 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                {formState.category === 'crypto' ? 'Crypto' : 'General'}
              </p>
            </div>

            {formState.category === 'crypto' ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                    Crypto Address
                  </p>
                  <p className="mt-1 rounded-lg border border-emerald-100 bg-white/60 p-3 text-sm text-emerald-900 shadow-sm dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">
                    {formState.cryptoAddress || 'Enter a wallet address'}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                    Blockchain Network
                  </p>
                  <p className="mt-1 rounded-lg border border-emerald-100 bg-white/60 p-3 text-sm text-emerald-900 shadow-sm dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">
                    {formState.blockchainNetwork || 'Specify the network'}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                  Payment Link
                </p>
                <p className="mt-1 break-all rounded-lg border border-emerald-100 bg-white/60 p-3 text-sm text-emerald-900 shadow-sm dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">
                  {formState.paymentLink || 'Provide a payment URL'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
