import express from "express";
import apiController from '../controller/apiController'

let router = express.Router()

const initAPIRoute = (app) => {
    router.get('/users', apiController.getAllUsers); //method get data
    router.post('/create-user', apiController.createNewUser) //method post data
    router.put('/update-user', apiController.updateUser) //method put data
    router.delete('/delete-user/:id', apiController.deleteUser) //method delete data
    return app.use('/api/v1/', router)
}

export default initAPIRoute