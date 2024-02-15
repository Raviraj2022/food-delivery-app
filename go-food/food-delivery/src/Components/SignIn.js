import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( JSON.stringify({
    //   name: input.name,
    //   email: input.email,
    //   password: input.password,
    //   location: input.location,
    // }));
    console.log(input);
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credential");
    }
    if (json.success) {
      localStorage.setItem("userEmail", input.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <form
            className="w-50 m-auto mt-5 border bg-dark border-success rounded"
            onSubmit={handleSubmit}
          >
            <h2 className="text-white  text-center pt-3 pb-3">Login</h2>
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={input.email}
                onChange={handleChange}
                aria-describedby="emailHelp"
                placeholder="Please Enter your Email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone.
              </div>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={input.password}
                onChange={handleChange}
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/signup" className="m-3 mx-1 btn btn-danger">
              New User
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
