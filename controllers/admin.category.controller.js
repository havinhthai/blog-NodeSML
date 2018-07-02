const Category = require('../models/blog/category.model');

const getAllCategories = (req, res, next) => {
    Category
        .find()
        .select('-createdAt -__v')
        .exec((err, categories) => {
            if (err) {
                const error = new Error('Internal Server Error');
                error.status = 500;

                return next(error);
            }

            res.render('admin/category_manage', {
                categories,
            });
        });
}

const postNewCategory = (req, res, next) => {
    const { title } = req.body;

    const category = new Category({
        name: title,
    });

    // category.name = title;

    category.save((err) => {
        if (err) {
            const error = new Error('Internal Server Error');
            error.status = 500;

            return next(error);
        }

        req.flash('success', 'Add category successfully');
        res.redirect('/admin/category/manage');
    });
}

module.exports = {
    getAllCategories,
    postNewCategory,
}
