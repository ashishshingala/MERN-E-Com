import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../reducers/userReducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../component/ToastMessage";

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values)).then((action) => {
        if (action.payload.user) {
          showSuccessToast("User Registered successfully");
          navigate("/");
        } else if (action.payload.data.status === 422) {
          showErrorToast(action.payload.data.message);
        } else {
          showErrorToast("Something went wrong!!");
        }
      });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            {...formik.getFieldProps("firstName")}
            className={`border p-2 w-full rounded ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            {...formik.getFieldProps("lastName")}
            className={`border p-2 w-full rounded ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={`border p-2 w-full rounded ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className={`border p-2 w-full rounded ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
