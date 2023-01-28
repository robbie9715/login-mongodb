import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../image/logo.svg';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {Link} from 'react-router-dom';
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-slate-500 py-2" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-sm text-slate-500 py-2" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-sm text-slate-500 py-2" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-sm text-slate-500 py-2" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="flex flex-col items-center my-40">
      <img className="w-[172px] flex" src={logo}/>;
       <div className="w-[586px]  flex flex-col bg-[#101C42] rounded-3xl justify-center items-center">
          <div className="w-[386px] py-20">
              <p className=" text-white font-medium text-4xl">Register</p>
              <p className=" text-[#7887BC] font-light text-lg py-2">Please Enter Your Username & Password</p>
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label className=" text-white font-normal text-lg" htmlFor="username">Username</label>
                        <Input
                          type="text"
                          className="w-full  h-12 bg-[#212D52] text-white rounded-xl outline-none  px-4"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          validations={[required, vusername]}
                        />
                      </div>

                      <div className="form-group">
                        <label className=" text-white font-normal text-lg" htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="w-full  h-12 bg-[#212D52] text-white rounded-xl outline-none  px-4"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, validEmail]}
                        />
                      </div>

                      <div className="form-group">
                        <label className=" text-white font-normal text-lg" htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="w-full  h-12 bg-[#212D52] text-white rounded-xl outline-none  px-4"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>

                      <button className="w-full h-12 bg-[#39B677] rounded-lg hover:bg-red-500 active:bg-zinc-600 my-8 " >
                          <p className="text-white font-normal text-xl py-2"> SIGN UP </p>
                      </button>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                      <div className="text-sm text-slate-500 py-2" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
  </div>
  );
};

export default Register;
