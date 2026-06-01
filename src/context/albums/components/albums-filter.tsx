import type { Album } from "../model/album";
import cx from "classnames";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";

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
  return (
    <div
      className={cx(" flex items-center gap-3.5 overflow-x-auto mb-9", className)}
      {...props}
    >
      {!loading && <Text variant="heading-small">Álbuns</Text>}

      {!loading ? (
        <>
          <Button variant="ghost">Todos</Button>
          {albums.map((album) => (
            <Button variant="ghost" key={album.id}>
              {album.title}
            </Button>
          ))}
        </>
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
