import Ticket from "../model/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const ticket_id = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;

    const newTicket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
    });

    res.status(201).json({
      ticket_id: newTicket.ticket_id,
      created_at: newTicket.created_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 5 } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { ticket_id: { $regex: search, $options: "i" } },
        { customer_name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 5;
    const skip = (pageNum - 1) * limitNum;

    const totalTickets = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      tickets,
      pagination: {
        total: totalTickets,
        page: pageNum,
        totalPages: Math.ceil(totalTickets / limitNum) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (status) {
      ticket.status = status;
    }

    if (notes && notes.trim() !== "") {
      ticket.notes.push({ note_text: notes });
    }

    await ticket.save();

    res.json({
      success: true,
      updated_at: ticket.updated_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
