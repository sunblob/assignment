'use client';

import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageList } from './_components/ImageList';

import { fetchImages, getFavoriteImages } from '@/lib/api';
import { PexelsImage } from '@/types';

export default function Home() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [favoriteImagesIds, setFavoriteImagesIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleClick = async () => {
    await searchImages(search, 1);
  };

  const searchImages = async (query: string, pageNum: number) => {
    try {
      setLoading(true);
      const data = await fetchImages(query, pageNum);

      setImages(data.photos);
      // Assuming the API returns total_pages or we can calculate it from total_results
      setTotalPages(data.total_pages || Math.ceil(data.total_results / data.per_page) || 1);
      setPage(pageNum);
      setLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchImages(search, 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      searchImages(search, page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      searchImages(search, page - 1);
    }
  };

  const fetchFavoriteImages = useCallback(async () => {
    try {
      const favorites = await getFavoriteImages();

      setFavoriteImagesIds(favorites.map((i) => i.pexelsId));
    } catch (e) {
      setFavoriteImagesIds([]);
    }
  }, []);

  useEffect(() => {
    fetchFavoriteImages();
  }, [fetchFavoriteImages]);

  return (
    <div className="container mx-auto py-2 flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-center">Find images</h1>
      <div className="gap-2 flex justify-center">
        <Input
          placeholder="Search images"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleClick}>Search</Button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageList images={images} favoriteImagesIds={favoriteImagesIds} session={session} />

            {images.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <Button onClick={handlePrevPage} disabled={page === 1} variant="outline">
                  Previous
                </Button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={page >= totalPages} variant="outline">
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
