import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file.path);
    console.log('Cloudinary upload response:', response);
    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Помилка завантаження фото на Cloudinary');
  } finally {
    await fs.unlink(file.path);
  }
};
