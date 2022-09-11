import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    num_players: {
        type: Number,
        default: 0
    },
    players: {
        type: [String],
        default: []
    }
})

export default mongoose.model('Room', roomSchema);