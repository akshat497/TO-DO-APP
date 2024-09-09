
const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body } = require("express-validator");
const notesController = require("../controllers/notesControllers");

// Route: GET /getallnotes - Fetch all notes
router.get('/getallnotes', fetchuser, notesController.getAllNotes);

// Route: POST /addnotes - Add a new note
router.post('/addnotes', fetchuser, [
  body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], notesController.addNote);

// Route: PUT /updatenote/:id - Update an existing note
router.put('/updatenote/:id', fetchuser, [
  body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], notesController.updateNote);

// Route: DELETE /delete/:id - Delete a note
router.delete('/delete/:id', fetchuser, notesController.deleteNote);

module.exports = router;
