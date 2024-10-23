"use client";
import Link from "next/link";
import { useState } from "react";

const defaultData = { username: "", password: "" };

const Profile = () => {
  const onLogout = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="bg-white px-20 pt-9 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Welcome to Home page</h1>
        <p>
          Welcome to your personalized home page <br /> you can view and manage
          you account information from here{" "}
        </p>
        <button
          className="bg-red-400 hover:bg-red-600 text-white py-4 px-4 mt-4 rounded-full w-full"
          onClick={(e) => onLogout(e)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
