import mongoose from "mongoose"
import { randomUUID } from 'crypto'

const User = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    email: { type: String, unique: true, require: true},
    password: { type: String, require: true}
}, {
    strict: 'throw',
    versionKey: false
})

export const userManager = mongoose.model('users', User)