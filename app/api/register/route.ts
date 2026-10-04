import {connection} from "@/lib/mongodb"
import User from "@/lib/userModel"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    const body = await request.json()
    const {name, email, password} = body
    if (!name || !email || !password) {
  return Response.json(
    { message: "All fields are required" },
    { status: 400 }
  );
}

    await connection;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return Response.json({ message: "User already exists" }, { status: 400 });

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return Response.json(
  { message: "Registration successful" },
  { status: 201 }
);
}
