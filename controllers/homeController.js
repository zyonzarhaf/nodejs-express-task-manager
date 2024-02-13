const renderHomepage = (req, res) => {
    res.render('home/index', {
        title: 'Task Manager'
    });
};

export {
    renderHomepage
};
