const {
    validationResult
} = require('express-validator/check');

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

const getCategoryById = (req, res, next) => {
    const { id } = req.params;

    Category
        .findById(id)
        .select('name')
        .exec((err, category) => {
            if (err) {
                const error = new Error('Internal Server Error');
                error.status = 500;

                return next(error);
            }

            res.render('admin/category_edit', {
                category,
            });
        });
}

const postNewCategory = (req, res, next) => {
    const { title } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('danger', error.msg);
        });

        res.redirect('/admin/category/add');
    }

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

const editCategory = (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('danger', error.msg);
        });

        res.redirect(`/admin/category/edit/${id}`);
    }

    Category
        .findById(id)
        .exec((err, category) => {
            if (err) {
                const error = new Error('Internal Server Error');
                error.status = 500;

                return next(error);
            }

            category.name = title;

            category.save((err) => {
                if (err) {
                    const error = new Error('Internal Server Error');
                    error.status = 500;

                    return next(error);
                }

                req.flash('success', 'Update category successfully');
                res.redirect(`/admin/category/edit/${id}`);
            });
        });
}

const deleteCategory = (req, res, next) => {
    const { id } = req.params;

    Category
        .remove({ _id: id })
        .exec((err) => {
            if (err) {
                const error = new Error('Internal Server Error');
                error.status = 500;

                return next(error);
            }

            req.flash('success', 'Delete category successfully');
            res.redirect('/admin/category/manage');
        });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    postNewCategory,
    editCategory,
    deleteCategory,
}
