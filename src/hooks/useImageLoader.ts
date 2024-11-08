import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UNSPLASH_API_KEY, ITEMS_PER_PAGE } from '@/config/constants';
import type { Image } from '@/types';

export function useImageLoader() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadedImageIds] = useState(() => new Set<string>());

  const fetchImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://search.apipoint.co/api/items?page=${page}&per_page=${ITEMS_PER_PAGE}`
      );

      const newImages = response.data
        .filter((item: any) => !loadedImageIds.has(item.id))
        .map((item: any) => ({
          id: item.id,
          title: item.title || 'Untitled',
          url: item.url,
          prompt: item.prompt || 'No description available',
          model: 'Unsplash',
          creator: item.creator,
          likes: item.likes,
          comments: item.comments,
          tags: item.tags?.map((tag: any) => tag) || [],
        }));

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
        newImages.forEach((img: Image) => loadedImageIds.add(img.id));
        setPage((prev) => prev + 1);
      }
      setHasMore(newImages.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, loadedImageIds]);

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    hasMore,
    loading,
    fetchImages,
  };
}
