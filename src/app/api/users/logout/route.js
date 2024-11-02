import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    // Corrected the return statement to include { status: 500 } as part of NextResponse.json
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
