import React from "react";
import type { Album } from "../model/album";
import Text from "../../../components/text";
import InputCheckbox from "../../../components/input-checkbox";
import Divider from "../../../components/divider";
import Skeleton from "../../../components/skeleton";
import type { Photo } from "../../photos/model/photo";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";

interface AlbumsListSelectableProps extends React.ComponentProps<"div"> {
  albums: Album[];
  photo: Photo;
  loading?: boolean;
}

export default function AlbumsListSelectable({
  albums,
  photo,
  loading,
  ...props
}: AlbumsListSelectableProps) {

  const {managePhotoOnAlbum} = usePhotoAlbums();
  const [isUpdatingPhoto, setIsUpdatingPhoto] = React.useTransition();

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }
  async function handlePhotoOnAlbums(albumId: string) {
    let albumIds = [""];

    if (isChecked(albumId)) {
      console.log("checked", albumId)
      albumIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id);
    } else {
      albumIds = [...photo.albums.map((album) => album.id), albumId];
      console.log("not checked", albumId)

    }
    setIsUpdatingPhoto(async () => {
      await managePhotoOnAlbum(photo.id, albumIds);
    });
  }

  return (
    <div className="">
      {!loading && albums.length > 0 ? (
        <ul className="flex flex-col gap-4 mt-6 ">
          {albums.map((album, index) => (
            <li key={`album-item-${index}`} className="p-1">
              <div className="flex items-center justify-between ">
                <Text variant="paragraph-large" className="truncate">
                  {album.title}
                </Text>
                <InputCheckbox
                  defaultChecked={isChecked(album.id)}
                  onChange={() => handlePhotoOnAlbums(album.id)}
                  disabled={isUpdatingPhoto}
                ></InputCheckbox>
              </div>
              {index < albums?.length - 1 && (
                <Divider className="mt-4"></Divider>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-4 mt-6 h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              className="h-[2.5rem]"
              key={`skeleton-album-${index}`}
            ></Skeleton>
          ))}
        </ul>
      )}
    </div>
  );
}
