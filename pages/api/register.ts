import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // limit to POST only
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // get username, name, email, password from req.body
    const { username, name, email, password } = req.body;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
