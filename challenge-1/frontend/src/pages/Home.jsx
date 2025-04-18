import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Building2, CheckCircle, LogOut, XCircle } from "lucide-react";
import { useCompanyStore } from "../stores/useCompanyStore";

const Home = () => {
  const { user, logout } = useAuthStore();
  const { companies, getCompanies, updateStatus } = useCompanyStore();

  const [userCompanies, setUserCompanies] = useState(user.companies);

  const handleStatusChange = async (companyId, status) => {
    try {
      await updateStatus(companyId, status);
      setUserCompanies((prev) => {
        const exists = prev.find((c) => c.company === companyId);
        if (exists) {
          // Update status
          return prev.map((c) =>
            c.company === companyId ? { ...c, status } : c
          );
        } else {
          // Add new entry
          return [...prev, { company: companyId, status }];
        }
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatus = (companyId) => {
    const companyEntry = userCompanies.find((c) => c.company === companyId);
    return companyEntry ? companyEntry.status : null;
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {user.username}!
          </h1>
          <button onClick={() => logout()} className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all duration-300 font-semibold cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          All Companies
        </h2>

        {companies?.length === 0 ? (
          <div className="text-center text-gray-500">
            No companies available.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {companies?.map((company, index) => {
              const status = getStatus(company._id);

              return (
                <div
                  key={index}
                  className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 items-center justify-between border border-gray-300 rounded-2xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-indigo-500" />
                    <span className="font-medium text-gray-800">
                      {company.name} | {company.score}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(company._id, "Target")}
                      className={`px-3 py-1 rounded-xl font-medium transition text-sm ${
                        status === "Target"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                      }`}
                    >
                      Target
                    </button>
                    <button
                      onClick={() => handleStatusChange(company._id, "Not Target")}
                      className={`px-3 py-1 rounded-xl font-medium transition text-sm ${
                        status === null
                          ? "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
                          : status !== "Target"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      Not Target
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
