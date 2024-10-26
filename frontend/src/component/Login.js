import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../reducers/userReducer";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((action) => {
        console.log('action', action)
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/products");
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
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

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
        <div className="flex flex-col">
          <div className="flex flex-col gap-5">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white p-2 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={()=> navigate('register')}
              className={`bg-blue-500 text-white p-2 rounded w-full mt-[10px] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {"Register"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
