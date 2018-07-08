const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const limits = {
    fileSize: 15 * 1024 * 1024, // 15 Mb
};

module.exports = multer({ storage, limits });
