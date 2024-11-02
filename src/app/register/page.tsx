"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the type for the form data
interface RegisterData {
  name: string;
  username: string;
  password: string;
}

// Default form data
const defaultData: RegisterData = { name: "", username: "", password: "" };

// Register component
const Register: React.FC = () => {
  const [data, setData] = useState<RegisterData>(defaultData);
  const router = useRouter();

  // Event handler for input changes
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Event handler for form submission
  const onRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!data.name || !data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", data);
      setData(defaultData); // Reset form after successful submission
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific error if needed
        console.error(error.response?.data || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", error);
      }
      alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Register</h1>
        <form onSubmit={onRegister}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-2 mb-4 border border-gray-400 rounded"
              value={data.name}
              onChange={onValueChange}
              autoComplete="off"
              required
            />

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
              required
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
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-600 text-white py-4 px-4 rounded-full w-full"
          >
            Submit
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
