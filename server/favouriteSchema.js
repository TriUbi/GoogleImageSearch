const Joi = require("joi");

const savedImg = Joi.object({

    id: Joi.string().required(),

    favourite: Joi.object({
        url: Joi.string().required(),
        titel: Joi.string().required(),
        byteSize: Joi.number().required() 
    }).required()
});

module.exports = {savedImg}