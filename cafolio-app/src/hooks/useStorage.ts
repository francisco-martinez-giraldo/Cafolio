import { useMutation } from "@tanstack/react-query";
import { storageService } from "@/services/storage.service";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) => 
      storageService.uploadImage(file, folder),
  });
};