import { env } from '@/lib/env';
import { PexelsImage, PexelsResponse } from '@/types';

const PEXELS_API = 'https://api.pexels.com/v1/search';

// TODO: разбить на отдельные классы и вынести всю обработку в NetClient
export async function fetchImages(query: string, page: number | string = 1) {
  const response = await fetch(
    `${PEXELS_API}?${new URLSearchParams({
      query,
      page: page.toString(),
      per_page: '15',
    })}`,
    {
      headers: {
        Authorization: env.NEXT_PUBLIC_PEXELS_API_KEY,
      },
    }
  );

  const data: PexelsResponse = await response.json();

  return data;
}

export async function downloadImage(imageUrl: string, fileName: string) {
  const response = await fetch(imageUrl, {
    mode: 'cors', // Enables cross-origin requests
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  // Create a temporary <a> element and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function getFavoriteImages() {
  const response = await fetch('/api/images/favorite', {
    method: 'GET',
  });

  const data = await response.json();
  return data;
}

export async function toggleFavorites(
  image: PexelsImage
): Promise<{ message: string; action: string }> {
  const response = await fetch('/api/images/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(image),
  });

  return response.json();
}

export async function getUserByEmailAndPass(username: string, password: string) {
  const response = await fetch(
    `/api/users?${new URLSearchParams({
      username,
      password,
    })}`,
    {
      method: 'GET',
    }
  );

  const user = await response.json();

  return user;
}

export async function createUser(username: string, password: string) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const user = await response.json();

  return user;
}
