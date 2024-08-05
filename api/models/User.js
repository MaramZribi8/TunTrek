const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
   name: String,
   email: { type: String, unique: true },
   password: String,
   photo: { type: String, default: null },
   Favorites: { type: [String], default: null },
   isAdmin: { type: Boolean, default: false },
   isActivated:{ type: Boolean, default: true },
   inTrouble:{ type: Boolean, default: false }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
