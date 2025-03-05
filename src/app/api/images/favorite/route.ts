import { auth } from '@/auth';
import { createFavoriteImageSchema } from '@/types';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();
    const { id, width, height, url, photographer, photographer_url, src } =
      await createFavoriteImageSchema.parseAsync(body);

    let image = await prisma.image.findUnique({
      where: {
        pexelsId: id,
      },
    });

    if (!image) {
      image = await prisma.image.create({
        data: {
          pexelsId: id,
          width,
          height,
          url,
          photographer,
          photographerUrl: photographer_url,
          src,
        },
      });
    }

    let favorite = await prisma.favoriteImage.findFirst({
      where: {
        imageId: image.id,
        userId: req.auth.user!.id!,
      },
    });

    if (favorite) {
      await prisma.favoriteImage.delete({
        where: {
          id: favorite.id,
        },
      });

      return NextResponse.json({
        message: 'Removed from favorites',
        action: 'remove',
      });
    }

    favorite = await prisma.favoriteImage.create({
      data: {
        imageId: image.id,
        userId: req.auth.user!.id!,
      },
    });

    return NextResponse.json({
      message: 'Added to favorites',
      action: 'add',
    });
  } catch (e) {
    console.log('Error adding to favorites', e);

    return NextResponse.json(
      { message: 'Error adding to favorites' },
      {
        status: 500,
      }
    );
  }
});

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        {
          status: 401,
        }
      );
    }

    const favorites = await prisma.favoriteImage.findMany({
      where: {
        userId: req.auth.user!.id!,
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(favorites.map((f) => f.image));
  } catch (e) {
    console.log('Error fetching favorite images', e);

    return NextResponse.json(
      { message: 'Error fetching favorite images' },
      {
        status: 500,
      }
    );
  }
});
