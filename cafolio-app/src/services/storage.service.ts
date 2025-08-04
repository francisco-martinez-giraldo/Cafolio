import { apiClient } from "@/lib/api";

export interface UploadImageResponse {
  message: string;
  path: string;
}

export const storageService = {
  uploadImage: async (file: File, folder?: string): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (folder) {
      formData.append('folder', folder);
    }
    
    const { data } = await apiClient.post("/api/storage/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};