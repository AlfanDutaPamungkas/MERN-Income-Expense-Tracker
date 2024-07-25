const Category = require("../../model/Category");
const Transaction = require("../../model/Transaction");
const AppErr = require("../../utils/appErr");

const createCtrl = async(req, res, next) => {
    const { name, type } = req.body;
    try {
        if (!name || !type) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const normalizedName = name.toLowerCase();
        const validType = ["income", "expense"];

        if (!validType.includes(type.toLowerCase())) {
            return next(new AppErr("Invalid type", 400));
        }

        const categoryExists = await Category.findOne({name: normalizedName, user: req.user});
        if (categoryExists) {
            return next(new AppErr(`Category ${normalizedName} already exists`, 400));
        }

        const category = await Category.create({name: normalizedName, type, user: req.user});

        res.status(201).json({
            status:"success",
            message: "Category created successfully",
            category
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const listCtrl = async(req, res) => {
    const categories = await Category.find({user: req.user});

    res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        categories
    });
};

const updateCtrl = async(req, res, next) => {
    const { type, name } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new AppErr("Category not found", 404));
        }

        if (category.user.toString() !== req.user.toString()) {
            return next(new AppErr("You are not allowed to update this category", 403));
        }

        const normalizedName = name.toLowerCase();
        const oldName = category.name;

        category.name = normalizedName || category.name;
        category.type = type || category.type;
        const updatedCategory = await category.save();

        if (oldName != updatedCategory.name) {
            await Transaction.updateMany(
                {
                    user: req.user,
                    category: oldName
                },
                {
                    $set: { category: updatedCategory.name }
                }
            );
        }

        res.json({
            status:"success",
            updatedCategory
        });

    } catch (error) {
        next(new AppErr(error));
    }
};

const deleteCtrl = async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new AppErr("Category not found", 404));
        }

        if (category.user.toString() !== req.user.toString()) {
            return next(new AppErr("You are not allowed to delete this category", 403));
        }        

        const defaultCategory = "Uncategorized";
        await Transaction.updateMany(
            {
                user: req.user,
                category: category.name
            },
            { $set: { category: defaultCategory } }
        );
        await Category.findByIdAndDelete(req.params.id);
        res.json({
            status:"success",
            message:"Category removed"
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = {
    createCtrl,
    listCtrl,
    updateCtrl,
    deleteCtrl
}

