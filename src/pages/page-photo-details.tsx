import React from "react";
import Text from "../components/text";
import { useParams } from "react-router";
import Container from "../components/container";
import Button from "../components/button";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import ImageFilePreview from "../components/image-file-preview";
import AlbumsListSelectable from "../context/albums/components/albums-list-selectable";
import useAlbums from "../context/albums/hooks/use-albums";
import usePhoto from "../context/photos/hooks/use-photo";
import type { Photo } from "../context/photos/model/photo";
import useIsMobile from "../helpers/use-is-mobile";

export default function PagePhotoDetails() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { id } = useParams();
  const { photo, isPhotoLoading, previousPhotoId, nextPhotoId, deletePhoto } =
    usePhoto(id);

  console.log("usePhoto return:", { photo, deletePhoto });
  const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();
  const { isMobile } = useIsMobile();

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      await deletePhoto(photo!.id);
    });
  }

  return (
    <>
      <Container>
        <header className="flex justify-between whitespace-nowrap items-center md:mt-0 mt-10">
          {!isPhotoLoading ? (
            <Text variant="heading-large">{photo?.title}</Text>
          ) : (
            <Skeleton className="w-48 h-8"></Skeleton>
          )}

          {!isMobile && (
            <PhotosNavigator
              loading={isPhotoLoading}
              previousPhotoId={previousPhotoId}
              nextPhotoId={nextPhotoId}
            />
          )}
        </header>

        <div className="md:grid md:grid-cols-[21rem_1fr] md:gap-[5.75rem]">
          <div className="space-y-3 my-5">
            {!isPhotoLoading ? (
              <ImageFilePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                title={photo?.title}
                imageClassName="h-[21rem]  rounded-lg"
              />
            ) : (
              <Skeleton className="h-[21rem]" />
            )}
            {!isPhotoLoading ? (
              <div className="flex items-center justify-between">
                <Button
                  disabled={isDeletingPhoto}
                  handling={isDeletingPhoto}
                  variant="destructive"
                  onClick={handleDeletePhoto}
                >
                  {isDeletingPhoto ? "Excluindo" : "Excluir"}
                </Button>
                {isMobile && (
                  <PhotosNavigator
                    loading={isPhotoLoading}
                    previousPhotoId={previousPhotoId}
                    nextPhotoId={nextPhotoId}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-10" />
                {isMobile && <Skeleton className="w-48 h-10"></Skeleton>}
              </div>
            )}
          </div>
          <div className="py-3">
            <Text as={"h3"} variant="heading-medium">
              Álbuns
            </Text>
            <AlbumsListSelectable
              albums={albums}
              loading={isLoadingAlbums}
              photo={photo as Photo}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
