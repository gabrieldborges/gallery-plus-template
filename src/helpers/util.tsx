import type { Photo } from "../context/photos/model/photo";
import type { Album } from "../context/albums/model/album";

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export const photoMock: Photo = {
  id: "1234a",
  title: "Portrait Tower",
  imageId: "portrait-tower.png",
  albums: [
    {
      id: "123415",
      title: "Album 1",
    },
    {
      id: "6544321",
      title: "Album 2",
    },
    {
      id: "6544321",
      title: "Album 2",
    },
  ],
};

export const albumsListMock: Album[] = [
  {
    id: "123415",
    title: "Album 1",
  },
  {
    id: "6544321",
    title: "Album 2",
  },
  {
    id: "6544321",
    title: "Album 2",
  },
];

export const photoListMock: Photo[] = [
  {
    id: "1234a",
    title: "PhotoMock",
    imageId: "portrait-tower.png",
    albums: [
      {
        id: "123415",
        title: "Album 1",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
    ],
  },
  {
    id: "1234a",
    title: "PhotoMock",
    imageId: "portrait-tower.png",
    albums: [
      {
        id: "123415",
        title: "Album 1",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
    ],
  },
  {
    id: "1234a",
    title: "PhotoMock",
    imageId: "portrait-tower.png",
    albums: [
      {
        id: "123415",
        title: "Album 1",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
      {
        id: "6544321",
        title: "Album 2",
      },
    ],
  },
];
