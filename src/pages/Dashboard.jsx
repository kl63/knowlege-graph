import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatApp from "../components/ChatApp"; // Import the ChatApp

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-200 p-4">
          <h2 className="font-bold mb-2">Menu</h2>
          <ul>
            <li className="mb-2">
              <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
            </li>
            <li className="mb-2">
              <Link to="/analytics" className="text-blue-600 hover:underline">Analytics</Link>
            </li>
            <li className="mb-2">
              <Link to="/reports" className="text-blue-600 hover:underline">Reports</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            {/* Analytics Graph */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">Analytics Graph</h2>
              <div className="h-48 bg-gray-300 rounded">Graph Placeholder</div>
            </div>

            {/* Data Table */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">Data Table</h2>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="border-b p-2">Item</th>
                    <th className="border-b p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b p-2">Example Item 1</td>
                    <td className="border-b p-2">100</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Example Item 2</td>
                    <td className="border-b p-2">200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LLM Chat Component */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">AI Chat Assistant</h2>
            <ChatApp />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
