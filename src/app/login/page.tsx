"use client";
import Link from "next/link";
import { useState } from "react";

const defaultData = { username: "", password: "" };

const Login = () => {
  const [data, setData] = useState(defaultData);

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      alert("please fill all mandatory fields");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <form action="">
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.username}
              onChange={(e) => onValueChange(e)}
            />

            <label htmlFor="password" className="mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.password}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <button
            className="bg-blue-400 hover:bg-blue-600 text-white py-4 px-4 rounded-full w-full"
            onClick={(e) => onLogin(e)}
          >
            Submit
          </button>
          <p className="mt-4 text-center">
            Don't have an Accout {""} ?
            <Link href="./register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
