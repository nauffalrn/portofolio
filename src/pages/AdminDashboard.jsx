import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileEditor from "./admin/ProfileEditor";
import ExperienceManager from "./admin/ExperienceManager";
import ProjectManager from "./admin/ProjectManager";
import CertificateManager from "./admin/CertificateManager";

const TABS = [
  { key: "profile", label: "Profile / About / Contact", Component: ProfileEditor },
  { key: "experience", label: "Experience", Component: ExperienceManager },
  { key: "project", label: "Project", Component: ProjectManager },
  { key: "certificate", label: "Achievement", Component: CertificateManager },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { signOut } = useAuth();

  const ActiveComponent = TABS.find((t) => t.key === activeTab).Component;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-sm text-zinc-400 hover:text-white"
          >
            Lihat situs ↗
          </Link>
          <button
            onClick={signOut}
            className="text-sm px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex">
        <nav className="w-56 flex-shrink-0 border-r border-zinc-800 min-h-[calc(100vh-65px)] p-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6 overflow-x-hidden">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
