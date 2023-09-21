// Import necessary modules and dependencies.
import { NextApiResponse, NextApiRequest } from "next";

// Import the Prisma client instance.
import prisma from "@/libs/prismadb";

// Define an asynchronous function to handle the API request.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the HTTP request method is not a GET request.
  if (req.method !== "GET") {
    // If not a GET request, return a 405 Method Not Allowed status code and end the response.
    return res.status(405).end();
  }

  try {
    // Retrieve the user ID from the request query parameters.
    const userId = req.query.userId;

    // Check if userId is missing or not a string.
    if (!userId || typeof userId !== "string") {
      // If missing or not a string, throw an error with a message.
      throw new Error("Invalid user ID");
    }

    // Use Prisma to query the database to find a unique user by their ID.
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Use Prisma to count the number of followers for the user with the specified ID.
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    // Return a 200 OK response with JSON data containing the existing user's information and follower count.
    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    // If an error occurs during database query or processing, log the error.
    console.log(error);

    // Return a 400 Bad Request status code to indicate a client-side error.
    return res.status(400).end();
  }
}
