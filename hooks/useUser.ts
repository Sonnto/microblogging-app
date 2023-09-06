import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// Custom hook for fetching user data using the useSWR hook.

const useUser = (userId: string) => {
  // Fetch user data using the useSWR hook.
  const { data, error, isLoading, mutate } = useSWR(
    // Construct the API endpoint URL for the specified user ID.
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  // The useSWR hook fetches and caches user data from the specified API endpoint.

  return {
    data, // User data fetched from the API endpoint.
    error, // Any error that occurred during the data fetch.
    isLoading, // Indicates whether data is currently being fetched.
    mutate, // A function to manually trigger a re-fetch of user data.
  };
};

export default useUser;
