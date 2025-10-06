"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type InvoiceData = {
  client: string;
  from: string;
  description: string;
  amount: string;
  currency: string;
  deadline: string;
  category: string; // 'crypto' | 'general'
  cryptoAddress: string;
  blockchainNetwork: string;
  paymentLink: string;
};

export default function PrintInvoicePage() {
  const [data, setData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("create-invoice-easy:printData");
      if (raw) {
        setData(JSON.parse(raw));
      }
    } catch (_) {
      // ignore parsing/storage errors
    }
  }, []);

  const formattedAmount = useMemo(() => {
    if (!data?.amount) return "";
    const n = Number(data.amount);
    if (Number.isNaN(n)) return data.amount;
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950 print:bg-white print:p-0">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">No invoice data found</h1>
          <p className="mt-2 text-emerald-700 dark:text-emerald-300">
            Go back to create an invoice, then use the Print PDF button.
          </p>
          <div className="mt-6 flex gap-3 justify-center print:hidden">
            <Link
              href="/invoice/new"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700"
            >
              Back to form
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 p-6 print:bg-white print:p-0">
      {/* Controls visible only on screen, hidden in printed PDF */}
      <div className="print:hidden mb-6 flex items-center justify-between">
        <Link
          href="/invoice/new"
          className="rounded-lg border border-emerald-600 px-4 py-2 text-emerald-700 font-medium hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-900"
        >
          Back to edit
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-emerald-700"
        >
          Print again
        </button>
      </div>

      <div className="mx-auto max-w-3xl bg-white shadow-lg rounded-xl p-10 border border-emerald-200 print:shadow-none print:rounded-none print:border-0 print:max-w-none print:w-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Invoice</h1>
            <p className="mt-2 text-emerald-700">
              Issued by: <span className="font-medium text-emerald-900">{data.from || "Your business"}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-700">Due Date</p>
            <p className="text-lg font-semibold text-emerald-900">{data.deadline || "—"}</p>
          </div>
        </div>

        <hr className="my-8 border-emerald-200" />

        {/* Parties */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-500">Billed To</p>
            <p className="mt-1 text-base font-medium text-emerald-900">{data.client || "Client name or company"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-500">From</p>
            <p className="mt-1 text-base font-medium text-emerald-900">{data.from || "Your business name"}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wide text-emerald-500">Description</p>
          <p className="mt-2 whitespace-pre-line rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-emerald-900">
            {data.description || "Describe the services or products provided"}
          </p>
        </div>

        {/* Amount */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-500">Amount Due</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">
              {formattedAmount ? `${formattedAmount} ${data.currency || ""}`.trim() : "0.00"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-500">Invoice Type</p>
            <p className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
              {data.category === "crypto" ? "Crypto" : "General"}
            </p>
          </div>
        </div>

        {/* Conditional payment details */}
        {data.category === "crypto" ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-500">Crypto Address</p>
              <p className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900">
                {data.cryptoAddress || "Enter a wallet address"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-500">Blockchain Network</p>
              <p className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900">
                {data.blockchainNetwork || "Specify the network"}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide text-emerald-500">Payment Link</p>
            <p className="mt-2 break-all rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900">
              {data.paymentLink || "Provide a payment URL"}
            </p>
          </div>
        )}

        <hr className="my-10 border-emerald-200" />
        <p className="text-xs text-emerald-600">
          Thank you for your business. Please submit payment by the due date above.
        </p>
      </div>
    </div>
  );
}
