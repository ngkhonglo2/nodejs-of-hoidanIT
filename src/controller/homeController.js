let getHomepage = (req, res) => {
    return (
        // render file index trong folder views
        res.render('index.ejs')
    )
}

module.exports = {
    getHomepage
}