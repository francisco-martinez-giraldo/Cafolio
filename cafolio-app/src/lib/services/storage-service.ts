import { supabase } from '../supabase';

export class StorageService {
  private bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'cafolio';

  async uploadImage(file: Buffer, fileName: string, contentType: string, folder?: string) {
    const path = folder ? `${folder}/${fileName}` : `storage/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        contentType,
        upsert: true
      });

    if (error) throw error;
    
    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);
    
    return {
      ...data,
      publicUrl: publicUrlData.publicUrl
    };
  }

  async deleteImage(fileName: string) {
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([fileName]);

    if (error) throw error;
  }
}