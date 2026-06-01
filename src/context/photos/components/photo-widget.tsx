import type { Photo } from "../model/photo";
import ImageFilePreview from "../../../components/image-file-preview";
import Text from "../../../components/text";
import Badge from "../../../components/badge";
import { Link } from "react-router";
import { buttonVariants } from "../../../components/button";
import { buttonTextVariants } from "../../../components/button";
import Skeleton from "../../../components/skeleton";

interface PhotoWidgetProps {
  photo: Photo;
  loading?: boolean;
}

export default function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
  const badgeNumberDisplay = 2;

  return (
    <div className="flex flex-col gap-4 w-[10.875rem]">
      {!loading ? (
        <ImageFilePreview
          src={`/images/${photo.imageId}`}
          title={photo.title}
          imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg"
        />
      ) : (
        <Skeleton className="w-[10.875rem] h-[10.875rem] rounded-lg"></Skeleton>
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="truncate">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="h-6 w-full"></Skeleton>
        )}

        {!loading ? (
          <div className="flex gap-1 min-h-5.5">
            {photo.albums.slice(0, badgeNumberDisplay).map((album) => (
              <Badge size="xs" className="truncate" key={album.id}>
                {album.title}
              </Badge>
            ))}
            {photo.albums.length > badgeNumberDisplay && (
              <Badge size="xs">
                +{photo.albums.length - badgeNumberDisplay}
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`album-loading-${index}`}
                className="w-full h-4 rounded-sm"
              ></Skeleton>
            ))}
          </div>
        )}
      </div>
      {!loading ? (
        <Link
          to={`/fotos/${photo.id}`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
        >
          <Text
            className={buttonTextVariants({
              variant: "secondary",
              size: "sm",
            })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10"></Skeleton>
      )}
    </div>
  );
}
