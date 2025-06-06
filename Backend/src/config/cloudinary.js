import { v2 as cloudinary } from 'cloudinary';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from '../config/env.js';
    // Configuration
cloudinary.config({ 
    
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;