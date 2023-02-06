import {React,useState} from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.userLogin);
  console.log(loginState)
  let { loading } = loginState;
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    if (
      Object.keys(formData).some((key) => formData[key] === "") ||
      Object.keys(formData).length < 2
    ) {
      alert("all fields are required");
    } else {
      dispatch(login(formData))
      .then((response) => {
        console.log("response", response);
        if (response.data.success) {
          navigate("/");
          localStorage.setItem('isAuthenticated',response.data.payload.token)
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
     
    }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container md:w-5/12 w-full mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange}

            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-500 focus:outline-none my-1"
              onClick={handleSubmit}
            >
             {!loading?' Login':'Please wait...'}
            </button>
            </form>

          
            <div className="text-grey-dark mt-6">
              Don't have an account?
              <Link to={'/signup'}>
                <span className="text-blue-500 no-underline border-b border-blue-500 text-blue cursor-pointer">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
