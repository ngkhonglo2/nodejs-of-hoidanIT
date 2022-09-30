import express from "express";

// cấu hình express
const configViewEngine = (app) => {
    // cho phép chia sẻ các file (.) public ra ngoài
    app.use(express.static('./src/public'))
    // cấu hình view engine của nó là ejs
    app.set("view engine", "ejs")
    // cấu hình thư mục ở đây là views tất cả các file ejs phải viết trong folder views
    app.set("views", "./src/views")
}

export default configViewEngine;