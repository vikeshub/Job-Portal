import { v2 as Cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

export default Cloudinary;
