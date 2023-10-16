import React from "react";
import { useFormik } from "formik";
import { signup } from "../../schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  Password: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signup,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("http://localhost:4000/signup", values);
          if (res.status === 201) {
            toast.success("User Created");
            return navigate("/loign");
          }
          return action.resetForm();
        } catch (error) {}
        return toast.error("Error 500");
        action.resetForm();
      },
    });
  return (
    <>
      <div className="login_main_form">
        <div className="card login_data_container shadow">
          <h4 className="text-center mt-3 ">Signup 👋</h4>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className="">
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
              <br />
              <button className=" login_button_color mt-2 px-3 " type="submit">
                Signup NOW!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
