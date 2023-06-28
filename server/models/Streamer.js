import { Schema, model } from 'mongoose'

const schema = new Schema({
   name: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: true
   },
   platform: {
    type: String,
    required: true
   },
   votes: {
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
   } 
}, {
    timestamps: true
})

export default model('Streamer', schema)
