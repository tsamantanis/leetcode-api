const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    questions: [{type: String}],
    hash: String,
    salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 180);

    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            questions: this.questions,
            exp: parseInt(exp.getTime() / 1000),
        },
        process.env.SECRET
    );
};

UserSchema.methods.toAuthJSON = function(){
    return {
        _id: this._id,
        email: this.email,
        questions: this.questions,
        token: this.generateJWT(),
    };
};

mongoose.model('User', UserSchema);
