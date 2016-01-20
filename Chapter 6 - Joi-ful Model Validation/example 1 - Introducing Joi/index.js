'use strict';

const Joi = require('joi');

const userSchema = Joi.object().keys({
    username: Joi.string().min(4).max(40).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013)
});

const user = {
    username: 'johnbrett',
    birthyear: 1989,
    random: 'test'
};

Joi.validate(user, userSchema, { stripUnknown: true }, (err, value) => {

    if (err) {
        return console.log(err);
    }

    return console.log(value);
});