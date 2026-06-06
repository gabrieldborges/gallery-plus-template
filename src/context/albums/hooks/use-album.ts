import { api } from "../../../helpers/api";
import type { Album } from "../model/album";
import type { AlbumNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotos from "../../photos/hooks/use-photos";
import { useQueryClient } from "@tanstack/react-query";


export default function useAlbum() {
    const { photos } = usePhotos();
    const queryClient = useQueryClient();

    async function createAlbum(payload: AlbumNewFormSchema) {
        try {
            const { data: album } = await api.post<Album>("/albums", {
                title: payload.title
            })

            if (payload.photosIds && payload.photosIds.length > 0) {
                await Promise.all(
                    payload.photosIds.map((photoId) => {
                        const albumsIdsPerPhoto = photos.find((photo) => photo.id === photoId)?.albums.map((album) => album.id) || [];
                        return api.put(`/photos/${photoId}/albums`, {
                            albumsIds: [...albumsIdsPerPhoto, album.id]
                        })
                    })
                )
            }
            queryClient.invalidateQueries({ queryKey: ["albums"] })
            queryClient.invalidateQueries({ queryKey: ["photos"] })
            toast.success("Álbum criado com sucesso")
        } catch (error) {
            toast.error("Erro ao criar album")
        }
    }
    return {
        createAlbum
    }


}