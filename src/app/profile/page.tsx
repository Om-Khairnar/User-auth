"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Profile: React.FC = () => {
  const router = useRouter();

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const response = await axios.get('/api/users/logout');
    
    if(response.status === 200){
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Welcome to Your Home Page</h1>
        <p>
          Welcome to your personalized home page.<br />
          You can view and manage your account information from here.
        </p>
        <button
          className="bg-red-400 hover:bg-red-600 text-white py-4 px-4 mt-4 rounded-full w-full"
          onClick={onLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
