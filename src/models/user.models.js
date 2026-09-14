import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    coverimage: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    watchhistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
   
    refreshToken: {
        type: String
    },
},
   {
    timestamps: true
   }
);



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id , email: this.email , name: this.name }, process.env.Access_Token_Secret,
         { expiresIn: process.env.Access_Token_Expire });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.Refresh_Token_Secret, 
        { expiresIn: process.env.Refresh_Token_Expire });
}

export const User = mongoose.model("User", userSchema);
