const { Thought, User } = require("../models");

const ThoughtController = {

    // get all thoughts
    getAllThought(req, res) {
      Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
    },




    // get one thought by id
    getThoughtId({ params }, res) {
      Thought.findOne({ _id: params.id })
      .select("-__v")
      .then(dbThoughtData => {
          // if no thought is found, send 404
          if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => {
          console.log(err);
          res.json(404).json(err);
      });
  },



    // add Thought to User
    addThought({ params, body }, res) {

        console.log(body);
               
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { thoughts: _id } },
                { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "ERROR adding thought to user: No User found with this id!" });
                return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },







    addReply({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.ThoughtId },
          { $push: { replies: body } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'ERROR adding reply to user: No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    // remove reply
    removeReply({ params }, res) {
        Thought.findOneAndUpdate(
        { _id: params.ThoughtId },
        { $pull: { replies: { replyId: params.replyId } } },
        { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },


    // remove Thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: "ERROR removing thought: No Thought with this id!" });
            }
            return Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { Thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "ERROR removing thought: No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      }

};

module.exports = ThoughtController;