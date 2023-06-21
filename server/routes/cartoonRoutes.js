import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Cartoonify!' });
  });
  
router.route('/').post(async (req, res) => {
    const {photo, type} = req.body;
    const data = new FormData();
    data.append('image', photo);
    data.append('type', type);
    const options = {
        method: 'POST',
        url: 'https://ai-cartoon-generator.p.rapidapi.com/image/effects/generate_cartoonized_image',
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'ai-cartoon-generator.p.rapidapi.com',
        },
        data: data
      };
      
    try {
        const response = await axios.request(options);
        const photo = response.data.result_url;
        res.status(200).json({ photo: photo });
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });
  
  export default router;