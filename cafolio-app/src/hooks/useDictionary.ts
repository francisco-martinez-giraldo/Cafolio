import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dictionaryService } from '@/services';
import { DictionaryType, CreateDictionaryRequest } from '@/types/api';

export const useDictionaryByType = (type: DictionaryType) => {
  return useQuery({
    queryKey: ['dictionary', type],
    queryFn: () => dictionaryService.getByType(type),
  });
};

export const useDictionaryTypes = () => {
  return useQuery({
    queryKey: ['dictionary', 'types'],
    queryFn: dictionaryService.getAllTypes,
  });
};

export const useCreateDictionary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dictionaryService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dictionary', data.type] });
      queryClient.invalidateQueries({ queryKey: ['dictionary', 'types'] });
    },
  });
};

export const useUpdateDictionary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateDictionaryRequest> }) =>
      dictionaryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dictionary', data.type] });
    },
  });
};

export const useDeleteDictionary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dictionaryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dictionary'] });
    },
  });
};