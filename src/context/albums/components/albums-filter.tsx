import type { Album } from "../model/album";
import cx from "classnames";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import usePhotos from "../../photos/hooks/use-photos";

interface AlbunsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}

export default function AlbunsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbunsFilterProps) {
  const { filter } = usePhotos();

  return (
    <div
      className={cx(
        " flex items-center gap-3.5  mb-9",
        className,
      )}
      {...props}
    >
      {!loading && <Text as={"div"} className="flex items-center gap-3.5  "variant="heading-small">Álbuns</Text>}

      {!loading ? (
        <div className="flex items-center gap-3.5   overflow-x-auto rounded">
          <Button
            variant={filter.albumId === null ? "primary" : "ghost"}
            onClick={() => filter.setAlbumId(null)}
          >
            Todos
          </Button>
          {albums.map((album) => (
            <Button
              variant={filter.albumId === album.id ? "primary" : "ghost"}
              onClick={() => filter.setAlbumId(album.id)}
              key={album.id}
            >
              {album.title}
            </Button>
          ))}
        </div>
      ) : (
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            className="h-7 w-full"
            key={`album-loading-${index}`}
          ></Skeleton>
        ))
      )}
    </div>
  );
}
