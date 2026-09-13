import React, { useState } from "react";
import { X } from "lucide-react";
import { createTicket } from "../api/ticketApi";

export default function CreateTicketModal({
  isOpen,
  onClose,
  onTicketCreated,
}) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createTicket(formData);
      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });
      onTicketCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-900">
            Create New Support Ticket
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="m-6 mb-0 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Name
              </label>
              <input
                required
                type="text"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="Ahmed Shaikh"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Email
              </label>
              <input
                required
                type="email"
                value={formData.customer_email}
                onChange={(e) =>
                  setFormData({ ...formData, customer_email: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="ahmy@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Subject
            </label>
            <input
              required
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              placeholder="Payment debited but order pending"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              placeholder="Describe the customer issue in detail..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {submitting ? "Creating..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
