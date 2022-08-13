const router = require("express").Router();
const {
    getAllThought,
    addThought,
    removeThought,
    addReply,
    removeReply,
    getThoughtId
  } = require('../../controllers/Thought-controller');

  router
  .route("/")
  .get(getAllThought)
  .post(addThought);

// /api/thoughts
//router.route("/").get(getAllThought);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").post(addThought);

router.route("/").post(addThought);

// /api/thoughts
router.route("/thoughts/:username").post(addThought);

// /api/Thoughts/<thoughtId>/<thoughtId>
router.route("/:thoughtId").delete(removeThought);

router.route("/:userId/:thoughtId").delete(removeThought);



router
  .route('/:id')
  .get(getThoughtId)
  .put(addReply)
  .delete(removeThought)


// router.route('/:pizzaId/:ThoughtId/:replyId').delete(removeReply);  

module.exports = router;