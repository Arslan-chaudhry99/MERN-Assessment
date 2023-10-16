import React from "react";
import "../style.css";
import { useFormik } from "formik";
import { signin } from "../../schemas/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  Password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signin,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("http://localhost:4000/login", values);
          dispatch(
            setLogin({
              user: res.data.name,
              token: res.data.token,
            })
          );

          toast.success(res.data.message);
        } catch (error) {
          toast.error(error.message);
        }
        // action.resetForm();
      },
    });

  return (
    <>
      <div className="login_main_form">
        <div className="card login_data_container shadow">
          <h4 className="text-center mt-5 mb-5">Hello there! 👋</h4>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className="mb-2 ">
                Username
              </label>
              <br />
              <input
                type="text"
                className="w-100 login_input_height px-2 py-3 "
                placeholder="Username*"
                name="username"
                id="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small className="text-danger">
                {errors.username && touched.username ? errors.username : null}
              </small>
              <br />
              <label htmlFor="password" className="mb-2 mt-4">
                Password
              </label>
              <br />
              <input
                type="text"
                className="w-100 login_input_height px-2 py-3  "
                placeholder="Password*"
                name="Password"
                id="password"
                value={values.Password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <small className="text-danger">
                {errors.Password && touched.Password ? errors.Password : null}
              </small>
              <div className="mt-1 forgot_password">
                <strong
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </strong>
              </div>
              <button className=" login_button_color mt-5 px-3 " type="submit">
                Login Now!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
