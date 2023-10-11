// Import necessary modules and dependencies.
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

// Define an asynchronous function to handle the API request.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the HTTP request method is not a PATCH request.
  if (req.method !== "PATCH") {
    // If not a PATCH request, return a 405 Method Not Allowed status code and end the response.
    return res.status(405).end();
  }

  try {
    // Authenticate the user and retrieve their information.
    const { currentUser } = await serverAuth(req, res);

    // Destructure user data from the request body.
    const { name, username, bio, profileImage, coverImage } = req.body;

    // Check if required fields (name and username) are missing.
    if (!name || !username) {
      // If missing, throw an error with a message.
      throw new Error("Missing fields");
    }

    // Use Prisma to update the user's information in the database.
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    // Return a 200 OK response with JSON data containing the updated user's information.
    return res.status(200).json(updatedUser);
  } catch (error) {
    // If an error occurs during database query or processing, log the error.
    console.log(error);

    // Return a 400 Bad Request status code to indicate a client-side error.
    return res.status(400).end();
  }
}
