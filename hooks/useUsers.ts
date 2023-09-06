import useSWR from "swr";

import fetcher from "@/libs/fetcher";

// Custom hook for fetching user data using the useSWR hook.

// SWR is a state management library that simplifies data fetching, caching, and revalidation.
const useUsers = () => {
  // Fetch user data using the useSWR hook.
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  // The useSWR hook fetches and caches user data from the specified API endpoint.

  return {
    data, // User data fetched from the API endpoint.
    error, // Any error that occurred during the data fetch.
    isLoading, // Indicates whether data is currently being fetched.
    mutate, // A function to manually trigger a re-fetch of user data.
  };
};

export default useUsers;
