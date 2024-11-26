import { useState, useEffect, useCallback, useMemo } from 'react';
import imagesData from '../images.json';
import type { Image } from '@/types';

const ITEMS_PER_PAGE = 12;

export function useImageLoader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return imagesData;

    return imagesData.filter((image) => {
      const searchableText = `${image.title} ${image.prompt} ${image.tags.join(' ')}`.toLowerCase();
      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const hasMore = useMemo(() => {
    return currentPage * ITEMS_PER_PAGE < filteredImages.length;
  }, [currentPage, filteredImages.length]);

  const loadMoreImages = useCallback(() => {
    if (!hasMore) return;
    
    const nextPage = currentPage + 1;
    const newImages = filteredImages.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedImages(newImages);
    setCurrentPage(nextPage);
  }, [currentPage, filteredImages, hasMore]);

  useEffect(() => {
    setCurrentPage(1);
    const initialImages = filteredImages.slice(0, ITEMS_PER_PAGE);
    setDisplayedImages(initialImages);
  }, [searchQuery, filteredImages]);

  return {
    images: displayedImages,
    hasMore,
    loadMoreImages,
    searchQuery,
    setSearchQuery,
  };
}
