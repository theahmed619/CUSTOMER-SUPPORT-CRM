import React from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';

const statusBadgeClasses = {
  Open: 'bg-blue-50 text-blue-700 border border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
  Closed: 'bg-slate-100 text-slate-700 border border-slate-200',
};

export default function TicketTable({ tickets, onSelectTicket, loading }) {
  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 text-sm font-medium">
        Loading support tickets...
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        No tickets found matching the criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 tracking-wider">
          <tr>
            <th className="px-6 py-3.5">Ticket ID</th>
            <th className="px-6 py-3.5">Customer</th>
            <th className="px-6 py-3.5">Subject</th>
            <th className="px-6 py-3.5">Status</th>
            <th className="px-6 py-3.5">Created Date</th>
            <th className="px-6 py-3.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {tickets.map((ticket) => (
            <tr
              key={ticket.ticket_id}
              onClick={() => onSelectTicket(ticket.ticket_id)}
              className="hover:bg-blue-50/50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 font-mono font-semibold text-blue-600">
                {ticket.ticket_id}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-900 font-medium">
                  <User size={15} className="text-slate-400" />
                  {ticket.customer_name}
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-slate-800">
                {ticket.subject}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClasses[ticket.status] || statusBadgeClasses.Open}`}>
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  {new Date(ticket.created_at).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-slate-400">
                <ChevronRight size={18} className="inline text-slate-400 hover:text-blue-600" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}