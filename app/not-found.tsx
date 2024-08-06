"use client";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="grid h-screen place-content-center px-4 bg-gray-900">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-700">404</h1>

          <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-400">We can't find that page.</p>

          <Link
            href="/"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
