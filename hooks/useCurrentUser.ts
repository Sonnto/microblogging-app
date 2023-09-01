import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // Fetch current user data using the useSWR hook.
  // Global state management SWR is a global state management library that allows you to fetch data, cache it, and revalidate it.
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  // Will check if data requires revalidated; if so, it will revalidate the data and update the cache; if not, it will return the cached data.
  return {
    data, // User data fetched from the API endpoint.
    error, // Any error that occurred during the fetch.
    isLoading, // Loading status indicating if data is being fetched.
    mutate, // Function to manually trigger a re-fetch of user data.
  };
};

export default useCurrentUser;
