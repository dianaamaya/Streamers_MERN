import Joi from 'joi'

export const schemaUpdateStreamer = Joi.object().keys({ 
    upvote: Joi.boolean().required()
}); 

export const schemaCreateStreamer = Joi.object().keys({ 
    name: Joi.string().max(50).required(),
    platform: Joi.string().max(50).required(),
    description: Joi.string().max(300).required()
}); 