import Connection from "@/database/config";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

Connection();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response("username and password is required", {
        status: 401,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return new Response("Username does not Exist", { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return new Response("Incorrect Password", { status: 400 });
    }

    const tokenData = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    }); //token is 1day validate
    const response = NextResponse.json({ message: "login successfully" });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log(error);
    return new Response("Someting went wrong33", { status: 500 });
  }
};
