import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../model/photo";



interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {

    const { data, isLoading } = useQuery<PhotoDetailResponse>({
        queryKey: ["photo", id],
        queryFn: () => fetcher(`/photos/${id}`),
        enabled: !!id
    })

    return {
        photo: data,
        isPhotoLoading: isLoading,
        previousPhotoId: data?.previousPhotoId,
         nextPhotoId: data?.nextPhotoId,
    }

}