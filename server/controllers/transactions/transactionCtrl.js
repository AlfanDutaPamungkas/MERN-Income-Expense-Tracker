const Category = require("../../model/Category");
const Transaction = require("../../model/Transaction");
const AppErr = require("../../utils/appErr");

const createCtrl = async(req, res, next) => {
    const { type, category, amount, date, description } = req.body;
    const categories = await Category.find({user: req.user});
    
    try {
        if (!type || !amount || !date) {
            return next(new AppErr("Type, amount and date are required", 400));
        }

        if (!categories) {
            return next(new AppErr("Your category is empty", 404));
        }

        if (category) {
            const names = categories.map(category => category.name);
            const isMatch = names.includes(category);
            if (!isMatch) {
                return next(new AppErr(`${category} is not find in db`, 400));
            }
        }

        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            date,
            description
        });
        res.status(201).json({
            status:"success",
            transaction
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const listCtrl = async(req, res, next) => {
    try {
        const { startDate, endDate, type, category } = req.query;
        let filters = {};

        if (startDate) {
            filters.date = {...filters.date, $gte: new Date(startDate)}
        }

        if (endDate) {
            filters.date = {...filters.date, $lte: new Date(endDate)}
        }

        if (type) {
            filters.type = type;
        }

        if (category) {
            if (category == "All") {
                
            } else if (category == "Uncategorized"){
                filters.category = "Uncategorized"
            } else{
                filters.category = category;
            }
        }

        const transactions = await Transaction.find(filters).sort({date:-1});

        res.json({
            status:"success",
            transactions
        })
    } catch (error) {
        next(new AppErr(error));
    }
};

const detailCtrl = async(req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json({
            status:"success",
            transaction
        })
    } catch (error) {
        next(new AppErr(error));
    }
};

const updateCtrl = async(req, res, next) => {
    const { type, category, amount, date, description } = req.body;
    const categories = await Category.find({user: req.user});
    try {
        if (!categories) {
            return next(new AppErr("Your category is empty", 404));
        }

        if (category) {
            const names = categories.map(category => category.name);
            const isMatch = names.includes(category);
            if (!isMatch) {
                return next(new AppErr(`${category} is not find in db`, 400));
            }
        }

        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return next(new AppErr("Transaction not found", 404));
        }
        
        if (transaction.user.toString() !== req.user.toString()) {
            return next(new AppErr("You are not allowed to update this transaction", 403));
        }
        
        transaction.type = type || transaction.type;
        transaction.category = category || transaction.category;
        transaction.amount = amount || transaction.amount;
        transaction.date = date || transaction.date;
        transaction.description = description || transaction.description;
        const updatedTransaction = await transaction.save();
        res.json({
            status:"success",
            updatedTransaction
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const deleteCtrl = async(req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return next(new AppErr("Transaction not found", 404));
        }
        
        if (transaction.user.toString() !== req.user.toString()) {
            return next(new AppErr("You are not allowed to delete this transaction", 403));
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({
            status:"success",
            message:"Transaction removed"
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const testingCtrl = async(req, res, next) => {
    try {
        const categories = await Category.find({user: req.user});
        const names = categories.map(category => category.name);
        const isTrue = names.includes("food");
        console.log(names);
        console.log(isTrue);
        res.json({
            names
        })
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = {createCtrl, listCtrl, updateCtrl, deleteCtrl, testingCtrl, detailCtrl};

