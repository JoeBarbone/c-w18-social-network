const { Schema, model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");



const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: ["Must enter valid username!"],
        trim: true
    },
    email: {
        type: String,
        required: ["Must enter valid email address!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address",]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal => dateFormat(createdAtVal))
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

// Get total count of friends on retrieval
UserSchema.virtual("friendCount").get(function() {
    // return this.friends.reduce((total, friend) => total + friend.friends.length + 1, 0);
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;