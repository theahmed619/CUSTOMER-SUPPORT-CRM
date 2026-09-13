import React, { useState, useEffect } from 'react';
import { X, Send, Clock, User, Mail } from 'lucide-react';
import { fetchTicketById, updateTicket } from '../api/ticketApi';

export default function TicketDetailModal({ ticketId, isOpen, onClose, onTicketUpdated }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Open');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ticketId && isOpen) {
      loadTicket();
    }
  }, [ticketId, isOpen]);

  const loadTicket = async () => {
    setLoading(true);
    try {
      const data = await fetchTicketById(ticketId);
      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!status && !noteText.trim()) return;
    setSaving(true);
    try {
      await updateTicket(ticketId, { status, notes: noteText });
      setNoteText('');
      await loadTicket();
      onTicketUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 tracking-wide">{ticketId}</span>
            <h2 className="text-base font-bold text-slate-900">{ticket?.subject || 'Ticket Details'}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">Loading ticket details...</div>
        ) : ticket ? (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5"><User size={14} className="text-slate-400" /> <span className="font-semibold text-slate-900">{ticket.customer_name}</span></div>
              <div className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> <span>{ticket.customer_email}</span></div>
              <div className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> <span>{new Date(ticket.created_at).toLocaleString()}</span></div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Description</h3>
              <p className="text-sm text-slate-800 bg-slate-50/50 border border-slate-200 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            <form onSubmit={handleUpdate} className="bg-blue-50/30 border border-blue-100 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-600 shadow-2xs"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Add Internal Note</label>
                <textarea
                  rows={2}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record an agent note or troubleshooting step..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Send size={13} />
                  {saving ? 'Updating...' : 'Save & Update'}
                </button>
              </div>
            </form>

            <div>
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">Internal Activity & Notes</h3>
              {ticket.notes && ticket.notes.length > 0 ? (
                <div className="space-y-3">
                  {ticket.notes.map((n, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs">
                      <p className="text-slate-800 whitespace-pre-wrap font-medium">{n.note_text}</p>
                      <span className="text-slate-400 text-[10px] mt-2 block font-medium">
                        {new Date(n.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No notes added yet.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}