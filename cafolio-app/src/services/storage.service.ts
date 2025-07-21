import { apiClient } from "@/lib/api";

export interface UploadImageResponse {
  message: string;
  fileName: string;
  url: string;
}

export const storageService = {
  uploadImage: async (file: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const { data } = await apiClient.post("/api/storage/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};