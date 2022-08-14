const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String
        },
        username: {
            type: String,
            required: ["Field cannot be empty!"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
  );



const ThoughtSchema = Schema({
    thoughtText: {
        type: String,
        required: ["Field cannot be empty!"],
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: ["Field cannot be empty"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

}

);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model("Thought", ThoughtSchema);


module.exports = Thought;