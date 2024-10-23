"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { name: "", username: "", password: "" };

const Register = () => {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!data.name || !data.username || !data.password) {
      alert("please fill all mandatory fields");
      return;
    }
    try {
      const responce = await axios.post("api/users/register", data);
      setData(defaultData);
      if(responce.status===200){
        router.push("./login");
      }
    } catch {
      error;
    }
    {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Register</h1>
        <form action="">
          <div className="mb-4 flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.name}
              onChange={(e) => onValueChange(e)}
            />

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
            onClick={(e) => onRegister(e)}
          >
            Submit
          </button>
          <p className="mt-4 text-center">
            Already have an Accout {""} ?
            <Link href="./login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
