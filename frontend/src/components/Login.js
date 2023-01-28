import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import logo from '../image/logo.svg';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Link} from 'react-router-dom'
import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-slate-500 py-2" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center my-40">
    <img className="w-[172px] flex " src={logo}/>;
    <div className="w-[586px] flex flex-col bg-[#101C42] rounded-3xl justify-center items-center py-12">
        <div className="w-[386px] ">
            <p className=" text-white font-medium text-4xl my-6">Login</p>
            <p className=" text-[#7887BC] font-normal text-lg my-2">Please Enter Your Email & Password</p>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label className="text-white" htmlFor="username">Username</label>
            <Input
              type="text"
              className="w-full  h-12 bg-[#212D52] rounded-xl outline-none  text-white  px-4"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label className="text-white" htmlFor="password">Password</label>
            <Input
              type="password"
              className="w-full  h-12 bg-[#212D52] rounded-xl outline-none  text-white  px-4"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <button className="w-full h-12 bg-[#39B677] rounded-xl hover:bg-red-500 active:bg-zinc-600 my-8">
            <span className="text-white font-normal text-lg py-2"> Login </span>
          </button>


          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
            </div>
            <Link to="/Register">
                <p className="text-[#7887BC] font-light text-lg py-2">Forgot username or password?</p>
            </Link>
        </div>
  );
};

export default Login;
