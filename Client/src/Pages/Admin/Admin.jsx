import React from "react";
import { useState } from "react";
import "../style.css";
import axios from "axios";
import { useFormik } from "formik";
import { Query } from "../../schemas/Query";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state/index";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialValues = {
  Query: "",
};
const Admin = () => {
  const [countryInfo, setcountryInfo] = useState(null);
  const [loding, setloding] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: Query,
      onSubmit: async (values, action) => {
        setloding(true);
        setcountryInfo()
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const res = await axios.get("http://localhost:4000/CountryDetails", {
            headers,
            params: values,
          });
          setloding(false);
          action.resetForm();
          setcountryInfo(res.data.data);
        } catch (error) {
          toast.error("Country not found or check internet connection.");
          action.resetForm();
          setloding(false);
        }
      },
    });

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mx-0 font-weight-bold font-monospace">
            Welcome {user}
          </h2>
          <i
            class="bi bi-power power"
            onClick={() => {
              dispatch(setLogout());
            }}
          ></i>
        </div>

        <div className="admin_contactus_new_notice_container card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-item-center gap-3">
              <input
                type="text"
                className={`w-50 login_input_height px-2 py-3 ${
                  errors.Query && touched.Query ? "error-message" : ""
                }`}
                placeholder={`${
                  errors.Query ? errors.Query : "Enter Country Name"
                }`}
                name="Query"
                id="Query"
                value={values.Query}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <div>
                <button
                  className=" login_input_height px-3 btn btn-warning"
                  type="submit"
                  disabled={errors.Query ? true : false}
                >
                  {loding ? "Looding..." : "Search"}
                </button>
              </div>
            </div>
          </form>
          {countryInfo && (
            <>
              <div className="d-flex  align-items-center flex-column mt-4">
                <h2 className="mx-0 font-weight-bold font-monospace">
                  COUNTRY: {countryInfo.commonName}
                </h2>
                <p className="font-weight-bold font-monospace">
                  <strong>Official Name:</strong> {countryInfo.nameOfficial}
                </p>
                <p className="font-weight-bold font-monospace">
                  <strong>Currencies : </strong>

                  {`${countryInfo.currency} (${countryInfo.currencySymbol})`}
                </p>
                <p className="font-weight-bold font-monospace">
                  <strong>Total Population:</strong> {countryInfo.population}
                </p>
                <p className="font-weight-bold font-monospace bg-primary text-white px-3 ">
                  <strong>1 Euro(€)</strong> 💱{" "}
                  {`${countryInfo.exchageRate}${countryInfo.currencySymbol}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
