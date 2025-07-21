import { useMutation } from "@tanstack/react-query";
import { storageService } from "@/services/storage.service";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: storageService.uploadImage,
  });
};