import { NextRequest } from 'next/server';
import argon2 from 'argon2';
import prisma from '@/lib/prisma';
import { getUserByEmailAndPassSchema } from '@/types';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { username, password } = await getUserByEmailAndPassSchema.parseAsync(searchParams);
    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.findFirst({
      where: {
        email: username,
        password: hashedPassword,
      },
    });

    if (!user) {
      return {
        status: 401,
        body: { error: 'Invalid credentials' },
      };
    }

    return user;
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      body: { error: 'Internal server error' },
    };
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();
    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email: username,
        password: hashedPassword,
      },
    });

    return user;
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      body: { error: 'Internal server error' },
    };
  }
};
