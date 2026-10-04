import { connection } from "@/lib/mongodb";
import User from "@/lib/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  await connection;
  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  } 
  return Response.json(
  { message: "Login successful" },
  { status: 200 }
);
}