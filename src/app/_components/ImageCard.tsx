'use client';

import Image from 'next/image';
import { PexelsImage } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { toast } from 'sonner';

import { DownloadIcon, HeartIcon } from 'lucide-react';
import { toggleFavorites, downloadImage } from '@/lib/api';
import { cn } from '@/lib/utils';

type Props = {
  image: PexelsImage;
  isFavorite: boolean;
  isAuthorized: boolean;
};

export const ImageCard = ({ image, isAuthorized, isFavorite }: Props) => {
  const handleToggleFavorite = async () => {
    try {
      const data = await toggleFavorites(image);

      if (data.action === 'remove') {
        toast('Removed from favorites');
      } else {
        toast('Added to favorites');
      }
    } catch (e: unknown) {
      console.log('Error toggling favorite', e);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-between p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DownloadIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sizes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(image.src).map(([size, url]) => (
              <DropdownMenuItem
                key={size}
                onClick={() => downloadImage(url, `${image.id}-${size}`)}
              >
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {isAuthorized && (
          <HeartIcon
            onClick={() => handleToggleFavorite()}
            className={isFavorite ? 'text-red-500' : ''}
          />
        )}
      </div>
      <Image
        src={image.src.landscape}
        alt={image.photographer}
        height={300}
        width={300}
        className="w-auto"
      />
      <p>
        Original image size: {image.width} x {image.height}
      </p>
      <p>
        Photo by:{' '}
        <a href={image.photographer_url} target="_blank" className="underline">
          {image.photographer}
        </a>
      </p>
    </div>
  );
};
