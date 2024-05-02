import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ['admin', 'user']
    },
    admin: {
        type: String,
        validate: {
            validator: function () {
                return this.role === 'admin';
            },
            message: 'Admin field is required for admin users'
        }
    },
    user: {
        type: String,
        validate: {
            validator: function () {
                return this.role === 'user';
            },
            message: 'User field is required for user accounts'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hasVoted: {
        type: Boolean,
        default: false, 
    },

}, { timestamps: true });

const UserModel= mongoose.model('User', userSchema);
export default UserModel;
