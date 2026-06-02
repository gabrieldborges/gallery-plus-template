import Text from "../components/text";
import { useParams } from "react-router";
import { photoMock, albumsListMock } from "../helpers/util";
import Container from "../components/container";
import Button from "../components/button";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../context/photos/components/photos-navigator";
import ImageFilePreview from "../components/image-file-preview";
import AlbumsListSelectable from "../context/albums/components/albums-list-selectable";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const photo = photoMock;
  const isLoadingPhoto = false;
  return (
    <>
      <Container>
        <header className="flex justify-between">
          {!isLoadingPhoto ? (
            <Text variant="heading-large">{photo.title}</Text>
          ) : (
            <Skeleton className="w-48 h-8"></Skeleton>
          )}

          <PhotosNavigator />
        </header>

        <div className="grid grid-cols-[21rem_1fr] gap-[5.75rem]">
          <div className="space-y-3 my-5">
            {!isLoadingPhoto ? (
              <ImageFilePreview
                src={`/images/${photo?.imageId}`}
                title={photo.title}
                imageClassName="h-[21rem]  rounded-lg"
              />
            ) : (
              <Skeleton className="h-[21rem]" />
            )}
            {!isLoadingPhoto ? (
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
              albums={albumsListMock}
              loading={isLoadingPhoto}
              photo={photoMock}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
