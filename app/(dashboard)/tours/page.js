import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllTours } from '@/utils/actions';
import ToursPage from '@/components/ToursPage';

export default async function AllToursPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
}