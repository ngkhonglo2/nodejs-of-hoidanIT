import express from "express";
import homeContoller from "../controller/homeController"
import multer from "multer"
import path from "path"

var appRoot = require('app-root-path')
let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// middleware
let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRoute = (app) => {
    router.get('/', homeContoller.getHomepage)
    router.get('/detail/user/:userId', homeContoller.getDetailpage)
    router.post('/create-new-user', homeContoller.createNewUser)
    router.post('/delete-user', homeContoller.deleteUser)
    router.get('/edit-user/:id', homeContoller.getEditPage)
    router.post('/update-user', homeContoller.postUpdateUser)

    // upload file
    router.get('/upload', homeContoller.getUploadFilePage)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeContoller.handleUploadFile)
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }
            else {
                // make sure to call next() if all was well
                next()
            }
        })
    }, homeContoller.handleUploadMultipleFile)

    router.get('/about', (req, res) => {
        res.render('about.ejs')
    })
    return app.use('/', router)
}

export default initWebRoute