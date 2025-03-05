import { Session } from 'next-auth';
import { PexelsImage } from '@/types';
import { ImageCard } from './ImageCard';

type Props = {
  images: PexelsImage[];
  session: Session | null;
  favoriteImagesIds: number[];
};

export const ImageList = ({ images, session, favoriteImagesIds }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          isAuthorized={!!session}
          isFavorite={favoriteImagesIds.includes(image.id)}
        />
      ))}
    </div>
  );
};
