"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const subjects = [
  { name: "Mathematics", grade: "A", score: 92, teacher: "Mr. Johnson" },
  { name: "English Language", grade: "B+", score: 85, teacher: "Mrs. Williams" },
  { name: "Physics", grade: "A-", score: 88, teacher: "Mr. Brown" },
  { name: "Chemistry", grade: "B", score: 78, teacher: "Mrs. Davis" },
  { name: "History", grade: "A", score: 94, teacher: "Mr. Wilson" },
];

const announcements = [
  { title: "Mid-term exams start Nov 10", date: "Oct 25", type: "exam" },
  { title: "School sports day — Nov 3", date: "Oct 22", type: "event" },
  { title: "Submit project proposals by Oct 30", date: "Oct 20", type: "assignment" },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      router.replace("/login");
    } else if (role === "admin") {
      router.replace("/admin");
    }
  }, [router]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-2 font-bold text-lg">
          🏫 <span>School Portal</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:block opacity-80">Hello, John Doe 👋</span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              router.push("/login");
            }}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, John! Here&apos;s your academic overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "GPA", value: "3.8", icon: "📊" },
            { label: "Attendance", value: "94%", icon: "✅" },
            { label: "Subjects", value: "5", icon: "📚" },
            { label: "Assignments", value: "3 Due", icon: "📝" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center gap-1 border border-gray-100"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xl font-bold text-gray-800">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Grades Table */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">My Grades</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-2 font-medium">Subject</th>
                    <th className="pb-2 font-medium">Teacher</th>
                    <th className="pb-2 font-medium">Score</th>
                    <th className="pb-2 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((s) => (
                    <tr key={s.name} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 font-medium text-gray-700">{s.name}</td>
                      <td className="py-3 text-gray-500">{s.teacher}</td>
                      <td className="py-3 text-gray-700">{s.score}%</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            s.grade.startsWith("A")
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {s.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Announcements</h2>
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div key={a.title} className="border-l-4 border-blue-400 pl-3 py-1">
                  <p className="text-sm font-medium text-gray-700">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today&apos;s Timetable</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { time: "8:00 AM", subject: "Mathematics", room: "Room 101" },
              { time: "10:00 AM", subject: "English", room: "Room 204" },
              { time: "12:00 PM", subject: "Lunch Break", room: "Cafeteria" },
              { time: "1:00 PM", subject: "Physics", room: "Lab 3" },
              { time: "3:00 PM", subject: "History", room: "Room 305" },
            ].map((t) => (
              <div
                key={t.time}
                className="bg-blue-50 rounded-lg px-4 py-3 flex flex-col gap-0.5 min-w-[130px]"
              >
                <span className="text-xs text-blue-500 font-semibold">{t.time}</span>
                <span className="text-sm font-medium text-gray-700">{t.subject}</span>
                <span className="text-xs text-gray-400">{t.room}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
