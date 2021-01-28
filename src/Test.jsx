import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getSongs } from "./api";

const queryClient = new QueryClient();

function Test() {
  const { data, isLoading } = useQuery("songs", getSongs);
  return (
    <QueryClientProvider QueryClient={queryClient}>
      <div>hello world</div>
    </QueryClientProvider>
  );
}

export default Test;
