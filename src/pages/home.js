import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Home() {
  //navigate
  let navi = useNavigate();
  //init loggin state and check
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    // TODO: Add Validation?
    if (accessToken !== "undefined") {
      setIsLoggedIn(!!accessToken);
    }
  }, [accessToken]);

  //for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navi("/");
      }
    });
  };

  //toggle regi
  const [toggleRegi, SetToggleRegi] = useState(false);

  //on regi
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4)
      .max(20)
      .matches(/^(?:[A-Za-z0-9]*)$/gi, "Only letters and numbers")
      .required("username required"),
    email: Yup.string().email("invaild email").required("email is required"),
    password: Yup.string()
      .min(6)
      .required("password required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])/,
        "password must contain a number and letter"
      ),
  });

  const registration = (data) => {
    axios.post("http://localhost:3001/users/regi", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navi("/");
      }
    });
  };

  return (
    !isLoggedIn &&
    (!toggleRegi ? (
      <div>
        <p>{toggleRegi}</p>
        <label>Username: </label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login</button>

        <button onClick={() => SetToggleRegi(true)}>
          Dont have an account?
        </button>
      </div>
    ) : (
      <div className="outer">
        <div className="card">
          <Formik
            initialValues={initialValues}
            onSubmit={registration}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="inner">
                <label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field name="username" />
              </div>
              <div className="inner">
                <label>Email: </label>
                <ErrorMessage name="email" component="span" />
                <Field name="email" />
              </div>
              <div className="inner">
                <label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field name="password" type="password" />
              </div>
              <div className="inner">
                <button type="submit"> Register!</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    ))
  );
}

export default Home;
