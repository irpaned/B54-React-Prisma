import multer from "multer"
import path from "path"


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //         👇dimasukkan ke dalam folder upload
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

