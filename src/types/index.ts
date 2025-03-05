import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1).email('Invalid email'),
  password: z.string().min(4),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type PexelsResponse = {
  photos: PexelsImage[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
};

export type PexelsImage = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

export type PexelsImageSrc = PexelsImage['src'];

export const createFavoriteImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
  }),
});

export const getUserByEmailAndPassSchema = z.object({
  username: z.string(),
  password: z.string(),
});
