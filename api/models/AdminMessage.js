const mongoose = require('mongoose');

const AdminMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true }
});

const AdminMessage = mongoose.model('AdminMessage', AdminMessageSchema);
module.exports = AdminMessage;
