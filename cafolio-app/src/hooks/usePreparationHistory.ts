import { useQuery } from "@tanstack/react-query";
import { coffeePreparationsService } from "@/services";

export function usePreparationHistory(coffeeId: string) {
  return useQuery({
    queryKey: ["preparation-history", coffeeId],
    queryFn: () => coffeePreparationsService.getHistoryByCoffeeId(coffeeId),
    enabled: !!coffeeId,
  });
}
