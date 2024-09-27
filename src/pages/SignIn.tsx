import { FC } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { loginThunk } from "../store/asyncThunk/auth-thunk";
import { useAppDispatch, useAppSelector } from "../store";
interface LoginFormData {
  username: string;
  password: string;
}

interface LocationState {
  from: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { status, error } = useAppSelector((state) => state.auth);

  const initialValues: LoginFormData = {
    username: "",
    password: "",
  };

  const state = location.state as LocationState;
  const urlPath = state?.from || "/products-list";

  const handleSubmit = async (values: LoginFormData) => {
    const resultAction = await dispatch(loginThunk(values));

    if (loginThunk.fulfilled.match(resultAction)) {
      navigate(urlPath, { replace: true });
    } else {
      console.error("Failed to login:", resultAction.payload);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <h2 className="pt-24 text-center text-3xl font-extrabold text-gray-900">
        Login
      </h2>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border shadow-lg p-8 rounded-xl bg-gray-50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-8">
                    <label htmlFor="username" className="text-gray-600">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="my-8">
                    <label htmlFor="password" className="text-gray-600">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
                    disabled={isSubmitting || status === "loading"}
                  >
                    {status === "loading" ? "Logging in..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {status === "failed" && (
            <div className="text-red-500 text-center mt-1">
              {error || "An error occurred. Please try again."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

/*
import { FC } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginMutation } from "../store/query/useLogin";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

interface LocationState {
  from: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const SignIn: FC = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues: LoginFormData = {
    username: "",
    password: "",
  };

  const state = location.state as LocationState;
  const urlPath = state?.from || "/products-list";

  const handleSubmit = async (values: LoginFormData) => {
    try {
      const result = await login(values).unwrap();
      localStorage.setItem("access_token", result.token);
      navigate(urlPath, { replace: true });
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <h2 className="pt-24 text-center text-3xl font-extrabold text-gray-900">
        Login
      </h2>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border shadow-lg p-8 rounded-xl bg-gray-50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-8">
                    <label htmlFor="username" className="text-gray-600">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="my-8">
                    <label htmlFor="password" className="text-gray-600">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {error && (
            <div className="text-red-500 text-center mt-1">
              An error occurred. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
*/
