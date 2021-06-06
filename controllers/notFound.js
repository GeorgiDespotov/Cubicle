module.exports = {
    notFound(req, res) {
        console.log('here');
        res.render('404', { title: 'Not Found' });
    }
};