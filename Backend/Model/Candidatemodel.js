import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
        enum: ['candidate1', 'candidate2', 'candidate3', 'candidate4'] 
    },
    user:{
        type:mongoose.Types.ObjectId,
ref:"User",
required:[true,"user id is required"],
    }
});

export default mongoose.model('Candidate', candidateSchema);
