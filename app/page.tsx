import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* School Icon */}
        <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl">
          🏫
        </div>
        <h1 className="text-3xl font-bold text-gray-800">School Portal</h1>
        <p className="text-gray-500 text-center">
          Welcome! Please log in or create an account to continue.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/login"
            className="bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="border border-blue-600 text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
