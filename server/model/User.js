const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9_-]*$/,
            trim: true
          },
        email: {
            type: String,
            required: true,
            unique: true,
          },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

