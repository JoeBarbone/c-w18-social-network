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
    getThoughtById({ params }, res) {
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
                { _id: body.userId },
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



    updateThought({ params, body }, res) {
        
        console.log("Made it to update thought!");

        Thought.findOneAndUpdate(
          { _id: params.id },
          // { $push: { body } },
          body,
          { new: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'ERROR updating thought: No User found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },



    // add reaction
    addReaction({ params, body }, res) {

      console.log("made it to add reaction!");

      Thought.findOneAndUpdate(
        { _id: params.id },
        { $push: { reactions: body } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
  },


    // delete reaction
    deleteReaction({ params }, res) {

        console.log("made it to delete reaction!");

        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },


    // remove Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: "ERROR removing thought: No Thought with this id!" });
            }
            return Thought.findOneAndUpdate(
              { _id: params.id },
              { $pull: { thoughts: params.thoughtId } },
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