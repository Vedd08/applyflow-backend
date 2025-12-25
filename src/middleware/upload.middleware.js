import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/resumes',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    cb(new Error('Only PDF files allowed'));
  } else {
    cb(null, true);
  }
};

export const uploadResume = multer({
  storage,
  fileFilter
});
