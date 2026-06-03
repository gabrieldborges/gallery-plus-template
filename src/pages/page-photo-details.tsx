import Text from "../components/text";
import { useParams } from "react-router";
import { photoMock, albumsListMock } from "../helpers/util";
import Container from "../components/container";
import Button from "../components/button";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import ImageFilePreview from "../components/image-file-preview";
import AlbumsListSelectable from "../context/albums/components/albums-list-selectable";
import useAlbums from "../context/albums/hooks/use-albums";
import usePhoto from "../context/photos/hooks/use-photo";
import type { Photo } from "../context/photos/model/photo";

export default function PagePhotoDetails() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { id } = useParams();
  const { photo, isPhotoLoading, previousPhotoId, nextPhotoId } = usePhoto(id);
  return (
    <>
      <Container>
        <header className="flex justify-between">
          {!isPhotoLoading ? (
            <Text variant="heading-large">{photo?.title}</Text>
          ) : (
            <Skeleton className="w-48 h-8"></Skeleton>
          )}

          <PhotosNavigator
            loading={isPhotoLoading}
            previousPhotoId={previousPhotoId}
            nextPhotoId={nextPhotoId}
          />
        </header>

        <div className="grid grid-cols-[21rem_1fr] gap-[5.75rem]">
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
              <Button variant="destructive">Excluir</Button>
            ) : (
              <Skeleton className="w-20 h-10" />
            )}
          </div>
          <div className="py-3">
            <Text as={"h3"} variant="heading-medium">
              Albuns
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
