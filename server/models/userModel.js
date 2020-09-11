const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
     },
     email: {
        type: String,
        match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid email',
        ],
        required: [true, 'Please add an email'],
        unique: true,
     },
     password: {
        type: String,
        required: [true, 'Please add a password'],
     },
     createdAt: {
        type: Date,
        default: Date.now,
     },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, { versionKey: false });

// encrypt password before saving user
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
 });

module.exports = mongoose.model('User', userSchema);