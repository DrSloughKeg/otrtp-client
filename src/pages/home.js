import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Home() {
  //navigate
  let navi = useNavigate();
  //authState
  const { authState } = useContext(AuthContext);
  const { setAuthState } = useContext(AuthContext);

  //toggle regi
  const [toggleRegi, SetToggleRegi] = useState(false);
  //toggle regi success
  const [toggleRegiSuccess, setToggleRegiSuccess] = useState(false);

  //init loggin state and check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //if user is already authorized send to menu
  useEffect(() => {
    if (authState) {
      setIsLoggedIn(true);
      navi("/playMenu");
    } else {
      navi("/");
    }
  }, [authState]);

  //for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    setToggleRegiSuccess(false);
    const data = { username: username, password: password };
    axios
      .post(`${process.env.REACT_APP_SITE_URL}/users/login`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data);
          setAuthState(true);
          navi("/playMenu");
        }
      });
  };

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
    setToggleRegiSuccess(false);
    axios
      .post(`${process.env.REACT_APP_SITE_URL}/users/regi`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          SetToggleRegi(false);
          setToggleRegiSuccess(true);
        }
      });
  };

  return (
    !isLoggedIn &&
    (!toggleRegi ? (
      <div className="logRegi">
        {toggleRegiSuccess && <p>Registration successful!</p>}
        <div className="formItem">
          <label>Username: </label>
        </div>
        <div className="formItem">
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="formItem">
          <label>Password: </label>
        </div>
        <div className="formItem">
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="formItem">
          <button onClick={login}> Login</button>
        </div>
        <div className="logRegiToggle">
          <button onClick={() => SetToggleRegi(true)}>
            Dont have an account?
          </button>
        </div>
      </div>
    ) : (
      <div>
        <div className="logRegi">
          <Formik
            initialValues={initialValues}
            onSubmit={registration}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="formItem">
                <label>Username: </label>
              </div>
              <div className="formItem">
                <ErrorMessage name="username" component="span" />
                <Field name="username" />
              </div>
              <div className="formItem">
                <label>Email: </label>
              </div>
              <div className="formItem">
                <ErrorMessage name="email" component="span" />
                <Field name="email" />
              </div>
              <div className="formItem">
                <label>Password: </label>
              </div>
              <div className="formItem">
                <ErrorMessage name="password" component="span" />
                <Field name="password" type="password" />
              </div>
              <div className="formItem">
                <button type="submit"> Register!</button>
                <div>
                  <button
                    className="logRegiToggle"
                    onClick={() => SetToggleRegi(false)}
                  >
                    Already have an account? Login!
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    ))
  );
}

export default Home;
