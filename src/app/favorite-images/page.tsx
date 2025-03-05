import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { ImageList } from '../_components/ImageList';
import { PexelsImageSrc } from '@/types';

export default async function Favorites() {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  const favImages = await prisma.favoriteImage.findMany({
    where: {
      userId: session.user?.id,
    },
    include: {
      image: true,
    },
  });

  const imagesWithSrc = favImages.map(({ image }) => ({
    ...image,
    id: image.pexelsId,
    photographer_url: image.photographerUrl,
    src: image.src as PexelsImageSrc,
  }));

  // По хорошему бы тут наверное использовать serverAction для тогла избранного
  // и делать revalidate чтобы обновить список избранных

  return (
    <div className="container mx-auto flex flex-col gap-2 py-2">
      <h2 className="text-3xl font-bold">Favorite</h2>
      {imagesWithSrc.length === 0 ? (
        <div>No images yet</div>
      ) : (
        <ImageList
          images={imagesWithSrc}
          favoriteImagesIds={imagesWithSrc.map((i) => i.pexelsId)}
          session={session}
        />
      )}
    </div>
  );
}
