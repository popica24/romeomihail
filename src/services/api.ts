const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface Album {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  date: string;
  location: string;
  description: string;
  cover_url: string | null;
  photo_count: number;
  is_published: boolean;
  order: number;
  created_at: string;
  photos: Array<Photo>
}

export interface Photo {
  id: number;
  image: string;
  image_url: string;
  caption: string;
  alt_text: string;
  is_featured: boolean;
  order: number;
  width: number | null;
  height: number | null;
  file_size: number | null;
  uploaded_at: string;
}

export const getAlbums = async (
  categorySlug?: string,
): Promise<Album[]> => { 
  const params = new URLSearchParams();
  if (categorySlug) params.append("category", categorySlug);

  const response = await fetch(`${API_URL}/albums/?${params}`);
  if (!response.ok) throw new Error("Failed to fetch albums");
  return response.json();
};

export const getAlbum = async (slug: string): Promise<Album> => {
  const response = await fetch(`${API_URL}/albums/${slug}/`);
  if (!response.ok) throw new Error("Failed to fetch album");
  return response.json();
};