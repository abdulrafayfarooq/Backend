import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    videofile: {
        type: String, // cloudeinary url
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    duration: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
}
);

videos.plugin(mongooseAggregatePaginate);


export const Video = mongoose.model("Video", videoSchema);