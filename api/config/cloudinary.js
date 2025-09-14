import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()
//configuration
cloudinary.config({
  cloud_name: process.env.CLOUINARY_APP_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_API_SECRET
});
export default cloudinary