import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./components/Navbar";
import TicketTable from "./components/TicketTable";
import CreateTicketModal from "./components/CreateTicketModal";
import TicketDetailModal from "./components/TicketDetailModal";
import { fetchTickets } from "./api/ticketApi";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // 1. loadTickets me fallback check:
  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTickets(statusFilter, searchTerm, page, 5);

      // Agar response object me tickets array hai to wo lo, warna direct data lo
      if (data?.tickets) {
        setTickets(data.tickets);
        setPagination(
          data.pagination || { total: data.tickets.length, totalPages: 1 },
        );
      } else if (Array.isArray(data)) {
        // Fallback agar backend purana format bhej raha ho
        setTickets(data);
        setPagination({ total: data.length, totalPages: 1 });
      }
    } catch (err) {
      console.error("Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter ya search badalne par page 1 par reset karein
  useEffect(() => {
    setPage(1);
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadTickets();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [statusFilter, searchTerm, page]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      <Navbar onOpenCreateModal={() => setIsCreateOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, or subject..."
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>

          <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
            {["All", "Open", "In Progress", "Closed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <TicketTable
            tickets={tickets}
            loading={loading}
            onSelectTicket={(id) => setSelectedTicketId(id)}
          />

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <span className="text-xs font-medium text-slate-500">
              Showing Page{" "}
              <span className="font-semibold text-slate-800">
                {pagination?.totalPages === 0 ? 0 : page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {pagination?.totalPages || 1}
              </span>{" "}
              ({pagination?.total || 0} total tickets)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                disabled={page >= (pagination?.totalPages || 1) || loading}
                onClick={() => setPage((prev) => prev + 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onTicketCreated={loadTickets}
      />

      <TicketDetailModal
        ticketId={selectedTicketId}
        isOpen={Boolean(selectedTicketId)}
        onClose={() => setSelectedTicketId(null)}
        onTicketUpdated={loadTickets}
      />
    </div>
  );
}
