import Container from "../components/container";
import PhotoList from "../context/photos/components/photos-list";
import AlbunsFilter from "../context/albums/components/albums-filter";
import useAlbums from "../context/albums/hooks/use-albums";
import usePhotos from "../context/photos/hooks/use-photos";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { photos, isLoadingPhotos } = usePhotos();

  return (
    <>
      <div>
        <Container as="div" className={""}>
          <AlbunsFilter
            albums={albums}
            loading={isLoadingAlbums}
          ></AlbunsFilter>
          <PhotoList photos={photos} loading={isLoadingPhotos} />
        </Container>
      </div>
    </>
  );
}
