const router = require("express").Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

  } = require('../../controllers/User-controller');

// Set up GET all and POST at /api/Users
router
  .route("/")
  .get(getAllUser)
  .post(createUser);


// Set up GET one, PUT, and DELETE at /api/Users/:id
router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Add Friends
router
  .route("/:id/friends/:friendId")
  .put(addFriend)
  .delete(deleteFriend)

module.exports = router;