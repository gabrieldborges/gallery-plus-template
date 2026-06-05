import React from "react";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui-components/dialog";
import InputText from "../../../components/input-text";
import Button from "../../../components/button";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import { useForm } from "react-hook-form";
import { albumNewFormSchema } from "../schemas";
import type { AlbumNewFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Album } from "../model/album";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos();
  const [modalOpen, setModalOpen] = React.useState(false);

  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handlleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || [];
    let newValue = [];
    if (selected) {
      newValue = [...photosIds, photoId];
    } else {
      newValue = photosIds.filter((id) => id !== photoId);
    }
    form.setValue("photosIds", newValue)
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    console.log(payload);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent size="lg">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>
          <DialogBody className="space-y-3">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <div className="space-y-3">
              <Text as="div" variant="label-small">
                Fotos cadastradas
              </Text>
              {!isLoadingPhotos && (
                <div className="flex overflow-x-auto gap-3 ">
                  {photos.length > 0 &&
                    photos.map((photo) => (
                      <PhotoImageSelectable
                        key={photo.id}
                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                        title={photo.title}
                        className="w-20 h-20 rounded"
                        onSelectedImage={(selected) =>
                          handlleTogglePhoto(selected, photo.id)
                        }
                      />
                    ))}
                </div>
              )}
              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-3 ">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      className="w-20 h-20 rounded"
                      key={`loading-photos-${index}`}
                    ></Skeleton>
                  ))}
                </div>
              )}
              {!isLoadingPhotos && photos.length === 0 && (
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <SelectCheckboxIllustration />
                    <Text variant="paragraph-medium" className="text-center">
                      Nenhuma foto disponível para seleção
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
