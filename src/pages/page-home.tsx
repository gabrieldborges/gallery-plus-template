import Container from "../components/container";
import PhotoList from "../context/photos/components/photos-list";
import { photoListMock } from "../helpers/util";
import AlbunsFilter from "../context/albums/components/albums-filter";
import { albumsListMock } from "../helpers/util";

export default function PageHome() {

  return (
    <>
      <div>
        <Container
          as="div"
          className={" mt-9"}
        >
          <AlbunsFilter albums={albumsListMock} ></AlbunsFilter>
          <PhotoList photos={photoListMock} />
        </Container>
      </div>
    </>
  );
}
