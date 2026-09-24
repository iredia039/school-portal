"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const students = [
  { id: 1, name: "John Doe", email: "john@school.edu", class: "Grade 10A", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@school.edu", class: "Grade 10B", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@school.edu", class: "Grade 11A", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@school.edu", class: "Grade 11B", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@school.edu", class: "Grade 10A", status: "Active" },
];

const initialAnnouncements = [
  { id: 1, title: "Mid-term exams start Nov 10", date: "Oct 25", audience: "All" },
  { id: 2, title: "School sports day — Nov 3", date: "Oct 22", audience: "Students" },
  { id: 3, title: "Staff meeting on Nov 1", date: "Oct 20", audience: "Staff" },
];

type Tab = "overview" | "students" | "announcements";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", audience: "All" });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      router.replace("/login");
    } else if (role !== "admin") {
      router.replace("/dashboard");
    }
  }, [router]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase())
  );

  function addAnnouncement() {
    if (!newAnnouncement.title.trim()) return;
    setAnnouncements([
      { id: Date.now(), title: newAnnouncement.title, date: "Today", audience: newAnnouncement.audience },
      ...announcements,
    ]);
    setNewAnnouncement({ title: "", audience: "All" });
    setShowForm(false);
  }

  function deleteAnnouncement(id: number) {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "students", label: "Students", icon: "👩‍🎓" },
    { key: "announcements", label: "Announcements", icon: "📢" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-purple-700 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-2 font-bold text-lg">
          🏫 <span>School Portal</span>
          <span className="bg-purple-500 text-xs px-2 py-0.5 rounded-full ml-2">Admin</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:block opacity-80">Admin User 👋</span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              router.push("/login");
            }}
            className="bg-white text-purple-700 px-4 py-1.5 rounded-lg font-medium hover:bg-purple-50 transition"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage students, staff, and school announcements.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition -mb-px ${
                activeTab === tab.key
                  ? "border-purple-600 text-purple-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Students", value: "248", icon: "👩‍🎓" },
                { label: "Total Teachers", value: "32", icon: "👨‍🏫" },
                { label: "Classes", value: "12", icon: "🏫" },
                { label: "Avg Attendance", value: "91%", icon: "✅" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center gap-1 border border-gray-100"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-xs text-gray-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="flex flex-col gap-3">
                {[
                  { action: "New student registered", name: "Emma Clarke", time: "2 hours ago", icon: "➕" },
                  { action: "Grade updated for", name: "Grade 10A — Math", time: "4 hours ago", icon: "📝" },
                  { action: "Attendance marked for", name: "Grade 11B", time: "6 hours ago", icon: "✅" },
                  { action: "New announcement posted by", name: "Admin", time: "Yesterday", icon: "📢" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <span className="text-gray-600">{item.action} </span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-gray-800">All Students</h2>
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 w-56"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Class</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        No students found.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 font-medium text-gray-700">{s.name}</td>
                        <td className="py-3 text-gray-500">{s.email}</td>
                        <td className="py-3 text-gray-500">{s.class}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              s.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-purple-600 hover:underline text-xs font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
              >
                {showForm ? "Cancel" : "+ New"}
              </button>
            </div>

            {/* New Announcement Form */}
            {showForm && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-5 flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-purple-700">Post New Announcement</h3>
                <input
                  type="text"
                  placeholder="Announcement title..."
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
                />
                <div className="flex items-center gap-3">
                  <select
                    value={newAnnouncement.audience}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, audience: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                  >
                    <option value="All">All</option>
                    <option value="Students">Students</option>
                    <option value="Staff">Staff</option>
                  </select>
                  <button
                    onClick={addAnnouncement}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {/* Announcements List */}
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {a.date} · Audience: {a.audience}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(a.id)}
                    className="text-red-400 hover:text-red-600 text-xs font-medium ml-4"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
