import { supabase } from "./supabase";

export async function uploadImage(file: File): Promise<string> {
const fileName = `${crypto.randomUUID().replace(/-/g, "")}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file);
    
    if (error) {
        console.error('Error uploading image:', error);
        throw error;
    }

    const {data: urlData} = supabase.storage
        .from('images')
        .getPublicUrl(fileName);
    
    return urlData.publicUrl;
}