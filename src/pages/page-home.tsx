import Text from "../components/text";
import PhotoWidget from "../context/photos/components/photo-widget";
import type { Photo } from "../context/photos/model/photo";
import Container from "../components/container";

export default function PageHome() {
  const photoMock: Photo = {
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
  };

  return (
    <>
      <div>
        <Text variant="heading-large">Page Home!</Text>

        <Container
          as="div"
          className={"flex items-center justify-between gap-10 mt-9"}
        >
          <div className="grid grid-cols-5 gap-9">
            <PhotoWidget photo={photoMock} loading/>
            
          </div>
        </Container>
      </div>
    </>
  );
}
