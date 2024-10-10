import axios from "axios"
import { User } from "../models/user.model.js";
const fetchPRDiff = async (diff_url,id) => {
    try {
        const user = await User.findOne({githubId:id});
        if(!user){
            throw new Error("User not found")
        }
        const token = user?.accessToken;
        const response = await axios.get(diff_url, {
        headers: {
          'Authorization': `token ${token}`,
          'User-Agent': 'request',
        },
      });
      return response.data;  // The diff data
    } catch (error) {
      console.error('Error fetching diff:', error);
      throw new Error('Failed to fetch PR diff.');
    }}
export default fetchPRDiff