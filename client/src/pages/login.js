import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Talkato</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-1">
          Don't have an account?{" "}
          <a href="/register" style={{ color: "crimson" }}>
            Register Now
          </a>
        </p>
        <p className="my-1">
          <a href="/forgotpassword" style={{ color: "crimson" }}>
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
