const router = require("express").Router();
const {
    getAllThought,    // this works 08/14/2022 12:27pm
    addThought,       // this works 08/14/2022 01:05pm
    getThoughtById,   // this works 08/14/2022 12:32pm
    updateThought,    // this works 08/14/2022 01:39pm
    deleteThought,    // this works 08/14/2022 01:38pm
    addReaction,      // this works 08/14/2022 02:18pm
    deleteReaction    // this works 08/14/2022 02:41pm

  } = require('../../controllers/thought-controller');


//  GET all and POST at /api/thoughts
router
  .route("/")
  .get(getAllThought)
  .post(addThought);


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

  // removeThought,
  // updateThought,
  // addReaction,
  // removeReaction,
  // getThoughtById


router
  .route("/:id/reactions")
  .post(addReaction)


router.route("/:thoughtId/:reactionId").delete(deleteReaction);


  // /api/thoughts
//router.route("/").get(getAllThought);

// /api/thoughts/<thoughtId>
// router.route("/:thoughtId").post(addThought);

// router.route("/").post(addThought);

// /api/thoughts
// router.route("/thoughts/:username").post(addThought);

// /api/Thoughts/<thoughtId>/<thoughtId>
// router.route("/:thoughtId").delete(removeThought);



// /api/thoughts/:thoughtId/reactions
// router.route("/:thoughtId/reactions").put(addReaction);




// router.route("/")

// router
  // .route('/:id')
  // .get(getThoughtId)
  // .put(updateThought)
  // .delete(removeThought)


// router.route('/:pizzaId/:ThoughtId/:replyId').delete(removeReply);  

module.exports = router;