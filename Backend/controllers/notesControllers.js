
const { validationResult } = require("express-validator");
const Note = require("../models/Notes");
const { successResponse, errorResponse } = require("../utils/responseHandler"); // Import the response handler

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    return successResponse(res, "Notes fetched successfully", notes, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message, 500);
  }
};

// Add a new note
exports.addNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation failed", errors.array(), 400);
    }

    
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });

    const savedNote = await note.save();
    return successResponse(res, "Note added successfully", savedNote, 201); // 201 Created
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message, 500);
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const { title, description, tag ,active} = req.body;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation failed", errors.array(), 400);
    }

    
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    if (typeof active === 'boolean') newNote.active = active; 

    
    let note = await Note.findById(req.params.id);
    if (!note) {
      return errorResponse(res, "Note not found", {}, 404); // 404 Not Found
    }

    
    if (note.user.toString() !== req.user.id) {
      return errorResponse(res, "Unauthorized", {}, 401); // 401 Unauthorized
    }

  
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    return successResponse(res, "Note updated successfully", note, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message, 500);
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    
    let note = await Note.findById(req.params.id);
    if (!note) {
      return errorResponse(res, "Note not found", {}, 404); // 404 Not Found
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return errorResponse(res, "Unauthorized", {}, 401); // 401 Unauthorized
    }

    
    await Note.findByIdAndDelete(req.params.id);
    return successResponse(res, "Note deleted successfully", {}, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message, 500);
  }
};
