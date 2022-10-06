// const express = require('express')
import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from "./router/web"
import initAPIRoute from "./router/api"
// import connection from "./configs/connectDB"
require('dotenv').config()
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8080

app.use(morgan('combined'))

// cấu hình đối với các yêu cầu POST và PUT, khi ta đang sending data tới server và ta đang yêu cầu máy chủ chấp nhận hoặc lưu trữ dữ liệu đó
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup view engine
configViewEngine(app)
// init web route
initWebRoute(app)

// init api route
initAPIRoute(app)

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})