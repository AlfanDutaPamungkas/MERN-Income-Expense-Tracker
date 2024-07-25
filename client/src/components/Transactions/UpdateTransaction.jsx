import React, { useEffect } from "react";
import { useFormik   } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryServices";
import { detailTransactionsAPI, updateTransactionAPI } from "../../services/transactions/transactionService";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date(),
  description: Yup.string(),
});

const UpdateTransaction = () => {
  const {id} = useParams();

  const navigate = useNavigate();

  const {mutateAsync, isPending, isError:isUpdateTransErr, error:updateTransErr, isSuccess} = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["update-transaction"]
  });

  const { data:detailTransaction } = useQuery({
    queryFn: detailTransactionsAPI,
    queryKey: ["detail-transactions", id]
  });

  const {data, isError, isLoading, isFetched, error, refetch} = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"]
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      category:"",
      amount:"",
      date:"",
      description:""
    },
    validationSchema,
    onSubmit: (values, {setSubmitting}) => {
      if (!validationSchema.isValidSync(values)) {
        setSubmitting(false);
        return;
      }
      const data = {
        ...values,
        id,
      };
      mutateAsync(data)
        .then(data => {
          navigate("/dashboard")
        })
        .catch(e => console.log(e))
    },
  });

  useEffect(() => {
    if (detailTransaction) {
      formik.setValues({
        type: detailTransaction.transaction.type || "",
        category: detailTransaction.transaction.category || "",
        amount: detailTransaction.transaction.amount || "",
        date: detailTransaction.transaction.date ? new Date(detailTransaction.transaction.date).toISOString().split("T")[0] : "" || "",
        description: detailTransaction.transaction.description || "",
      });
    }
  }, [detailTransaction]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Update Transaction
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>
      {/* Display alert message */}
      {isUpdateTransErr && (
        <AlertMessage
          type="error"
          message={
            updateTransErr?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Transaction updated successfully, redirecting..."
        />
      )}

      {/* Transaction Type Field */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Amount Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Amount"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Category
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          {data?.categories?.map((category) => {
            return (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
            )
          })}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Description (Optional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Description"
          rows="3"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
      >
        Update Transaction
      </button>
    </form>
  );
};

export default UpdateTransaction;