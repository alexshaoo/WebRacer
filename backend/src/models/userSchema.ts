import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: 0
    },
    friends: {
        type: [String],
        default: []
    },
    stats: {
        cpm: {
            type:Number,
            default: 0
        },
        lpm: {
            type:Number,
            default: 0
        },
        acc: {
            type:Number,
            default: 0
        },
    },
    currency: {
        type: Number,
        min: 0,
        default: 50
    },
    bio: {
        type:String,
        default: ""
    }
})

export default mongoose.model('User', userSchema);
