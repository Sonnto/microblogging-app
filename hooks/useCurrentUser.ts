import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // Fetch current user data using the useSWR hook.
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data, // User data fetched from the API endpoint.
    error, // Any error that occurred during the fetch.
    isLoading, // Loading status indicating if data is being fetched.
    mutate, // Function to manually trigger a re-fetch of user data.
  };
};

export default useCurrentUser;
