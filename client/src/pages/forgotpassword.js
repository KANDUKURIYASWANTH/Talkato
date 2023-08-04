import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/actions/authAction';
import { useHistory } from 'react-router-dom';

const Forgotpassword = () => {
  const history=useHistory();
  const initialState = { email: "", password: "" };
  const [userData,setUserData]=useState(initialState)
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(userData));
    history.push('/')
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
          onChange={handleChangeInput}
          value={email}
          aria-describedby="emailHelp"/>
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
        disabled={email && password ? false : true}>
        Reset Password
        </button>
        <p className="my-1">
          Don't have an account?{" "}
          <a href="/register" style={{ color: "crimson" }}>
            Register Now
          </a>
        </p>
        <p className="my-1">
          <a href="/" style={{ color: "crimson" }}>
            Login now!
          </a>
        </p>
      </form>
    </div>
    
  )
}

export default Forgotpassword