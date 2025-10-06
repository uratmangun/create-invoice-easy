'use client';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <section className="py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Create Invoice Easy
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Craft polished invoices in minutes, track payments effortlessly, and keep your business moving forward with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-lg bg-sky-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              Get Started
            </button>
            <a
              href="#features"
              className="rounded-lg border border-sky-600 px-6 py-3 text-sky-700 font-semibold hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              View Features
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
