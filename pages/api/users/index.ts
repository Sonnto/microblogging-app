// Import necessary modules and dependencies.
import { NextApiRequest, NextApiResponse } from "next";

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
    // Use Prisma to query the database and retrieve a list of users.
    const users = await prisma.user.findMany({
      // Sort the users by the createdAt field in descending order (newest first).
      orderBy: {
        createdAt: "desc",
      },
    });

    // Send a 200 OK response with the list of users in JSON format.
    return res.status(200).json(users);
  } catch (error) {
    // If an error occurs during database query or processing, log the error.
    console.log(error);

    // Return a 400 Bad Request status code to indicate a client-side error.
    return res.status(400).end();
  }
}
