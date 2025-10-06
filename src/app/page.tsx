'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk'

export default function Home() {
  useEffect(() => {
    const initializeSdk = async () => {
      await sdk.actions.ready();
    };
    initializeSdk();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-100 dark:from-slate-900 dark:via-emerald-900 dark:to-emerald-950 p-8">
      <div className="max-w-4xl mx-auto">
        <section className="py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Create Invoice Easy
          </h1>
          <p className="mt-6 text-lg text-emerald-900 dark:text-emerald-200">
            Craft polished invoices in minutes, track payments effortlessly, and keep your business moving forward with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/invoice/new"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Create an Invoice
            </Link>
            <a
              href="#features"
              className="rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-900"
            >
              View Features
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
