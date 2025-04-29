import multer from 'multer';
import { TEMPORARY_UPLOAD_DIR } from '../constants/index.js';
import fs from 'node:fs';

if (!fs.existsSync(TEMPORARY_UPLOAD_DIR)) {
  fs.mkdirSync(TEMPORARY_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMPORARY_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
