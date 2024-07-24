import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        //type: Schema.Types.ObjectId,
        type:String,
        //ref: "User",
        required: true
    }
});

export default mongoose.model("Blog", blogSchema);