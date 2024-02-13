const redirectView = (req, res) => {
    res.redirect(res.locals.redirect);
}

export default redirectView;
