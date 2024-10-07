
import mongoose,{Schema} from "mongoose";
const userSchema = new Schema({
    githubId: { 
        type: String, 
        unique: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        default:"" 
    },
    accessToken: {
        type: String,
        required: true,  // Make it required if you want to ensure all users have an access token
    },
});

export const User = mongoose.model('User', userSchema);
