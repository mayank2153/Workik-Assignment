import axios from "axios"
import { User } from "../models/user.model.js";
const fetchPRDiff = async (diff_url,token) => {
    try {
        
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