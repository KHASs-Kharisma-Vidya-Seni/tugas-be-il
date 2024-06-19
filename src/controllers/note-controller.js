import asyncHandler from "express-async-handler";
import db from "../config/database.js";

// Create a new note
export const createNote = asyncHandler(async (req, res) => {
  const { title, note } = req.body;

  const currentDate = moment();
  const formattedDatetime = currentDate.toISOString();

  try {
    const result = await db
      .promise()
      .query("INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)", [
        title,
        formattedDatetime,
        note,
      ]);
    res.status(200).json({
      message: "Berhasil Membuat Sebuah Note",
      data: {
        id: result[0].insertId,
        title,
        datetime: formattedDatetime,
        note,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating note" });
  }
});

// Get all notes
export const getAllNotes = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM notes";
  try {
    const [rows] = await db.promise().query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving notes" });
  }
});

// Get a note by ID
export const getNoteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM notes WHERE id = ?";
  try {
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving note" });
  }
});

// Update a note
export const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, note } = req.body;

  const currentDate = new Date();
  const formattedDatetime = currentDate.toISOString();

  const query =
    "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?";
  try {
    const result = await db
      .promise()
      .query(query, [title, formattedDatetime, note, id]);
    if (result[0].changedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating note" });
  }
});

// Delete a note
export const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM notes WHERE id = ?";
  try {
    const result = await db.promise().query(query, [id]);
    if (result[0].affectedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting note" });
  }
});
