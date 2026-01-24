// src/app/portfolio/page.tsx
import Link from "next/link";
import AllowScroll from "../boat-adventure/captains-quarters/components/AllowScroll";

export default function PortfolioPage() {
  return (
    <>
      <AllowScroll />
      <div className="min-h-screen bg-white">
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Thatcher McClure</h1>
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                ← Back to Choice
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Portfolio Coming Soon
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              This clean, professional version of the portfolio is under construction.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/boat-adventure"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try the Interactive Version
              </Link>
              <Link 
                href="/"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}