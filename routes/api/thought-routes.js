const router = require("express").Router();
const {
    getAllThought,
    addThought,
    getThoughtById,
    updateThought, 
    deleteThought, 
    addReaction,   
    deleteReaction 

  } = require('../../controllers/thought-controller');


//  GET all and POST at /api/thoughts
router
  .route("/")
  .get(getAllThought)
  .post(addThought);

// Setup GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// Setup POST for reactions /api/thoughts/:id/reactions 
router
  .route("/:id/reactions")
  .post(addReaction)

// DELETE reaction
router
  .route("/:thoughtId/:reactionId")
  .delete(deleteReaction);


module.exports = router;