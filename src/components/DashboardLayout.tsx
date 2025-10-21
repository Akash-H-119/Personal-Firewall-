import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6 text-xl font-bold text-gray-900 dark:text-white">
          Personal Firewall
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="block px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/monitor" className="block px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                Monitor
              </a>
            </li>
            <li>
              <a href="/rules" className="block px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                Rules
              </a>
            </li>
            <li>
              <a href="/logs" className="block px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                Logs
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
