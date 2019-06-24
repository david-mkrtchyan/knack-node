const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    full_name: Joi.string().required(),
    date: {
        from: Joi.string().allow('').regex(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/),
        to: Joi.string().allow('').regex(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/)
    },
    date_range: {
        from: Joi.string().regex(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/),
        to: Joi.string().regex(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/)
    }
});

const validate = function (data) {
    return Joi.validate(data, schema);
};

module.exports.validate = validate;