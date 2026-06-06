import type { Photo } from "../model/photo";
import PhotoWidget from "./photo-widget";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";

interface PhotoListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotoList({ photos, loading }: PhotoListProps) {
  return (
    <div className=" w-full space-y-6">
        
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total:{""}
        {!loading ? (
          <div>{photos?.length}</div>
        ) : (
          <Skeleton className="h-6 w-6"></Skeleton>
        )}
      </Text>
      {!loading && photos?.length > 0 && (
        <div className="
        md:grid md:grid-cols-5 md:gap-9
        grid grid-cols-2 gap-2
        
        ">
          {photos.map((photo, index) => (
            <PhotoWidget photo={photo} key={`PhotoWidget-key-${index}`}/>
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {Array.from({ length: 20 }).map((_, index) => (
            <PhotoWidget photo={{} as Photo} loading key={`Empty-PhotoWidget-key-${index}`}/>
          ))}
        </div>
      )}

      {
        !loading && photos.length === 0 && 
        <Text as="div" variant="heading-large" className="text-center flex justify-center items-center">Nenhuma foto encontrada</Text>    
      }
    </div>
  );
}
