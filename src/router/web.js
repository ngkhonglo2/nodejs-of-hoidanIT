import express from "express";
import homeContoller from "../controller/homeController"

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeContoller.getHomepage)

    router.get('/about', (req, res) => {
        res.render('about.ejs')
    })
    return app.use('/', router)
}

export default initWebRoute