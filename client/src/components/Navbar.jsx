import React from "react";
import { PlusCircle, LifeBuoy } from "lucide-react";

export default function Navbar({ onOpenCreateModal }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
            <LifeBuoy size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Customer Support Ticketing CRM System
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Support Operations Dashboard
            </p>
          </div>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle size={17} />
          New Ticket
        </button>
      </div>
    </header>
  );
}
