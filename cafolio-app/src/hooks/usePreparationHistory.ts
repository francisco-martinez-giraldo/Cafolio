import { useQuery } from '@tanstack/react-query';
import { coffeePreparationsService } from '@/services';
import { getUser } from '@/lib/auth';

export function usePreparationHistory(coffeeId: string) {
  const user = getUser();
  const userEmail = user?.email || '';

  return useQuery({
    queryKey: ['preparation-history', coffeeId, userEmail],
    queryFn: () => coffeePreparationsService.getHistoryByCoffeeId(coffeeId, userEmail),
    enabled: !!userEmail && !!coffeeId,
  });
}