"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import axios from "axios"; // Import axios for API calls

// Define the type for the form data
interface LoginData {
  username: string;
  password: string;
}

const defaultData: LoginData = { username: "", password: "" };

const Login: React.FC = () => {
  const [data, setData] = useState<LoginData>(defaultData);
  const router = useRouter(); // Initialize the router for navigation

  // Event handler for input changes
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Event handler for form submission
  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //by using this your usename and password willnot apper in link of address in search bar 
    if (!data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/login", data);
      setData(defaultData);
      if (response.status === 200) {
        
        localStorage.setItem("userToken", response.data.token); 
        router.push("/profile"); 
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <form onSubmit={onLogin}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.username}
              onChange={onValueChange}
              autoComplete="off"
            />

            <label htmlFor="password" className="mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.password}
              onChange={onValueChange}
              autoComplete="off"
            />
          </div>
          <button
            type="submit" // Set type to submit for the button
            className="bg-blue-400 hover:bg-blue-600 text-white py-4 px-4 rounded-full w-full"
          >
            Submit
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
