import React from "react";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui-components/dialog";
import { useForm } from "react-hook-form";
import ImageFilePreview from "../../../components/image-file-preview";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import useAlbums from "../../albums/hooks/use-albums";
import type { PhotoNewFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoNewFormSchema } from "../schema";
import usePhoto from "../hooks/use-photo";
import useIsMobile from "../../../helpers/use-is-mobile";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { createPhoto } = usePhoto();
  const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();
  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });

  const albumsIds = form.watch("albumsIds");
  const {isMobile} = useIsMobile();

  const { albums, isLoadingAlbums } = useAlbums();

  const file = form.watch("file");
  const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleSubmit(payload: PhotoNewFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);
      setModalOpen(false);
    });
  }

  function handleToggleAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds");
    const albumsSet = new Set(albumsIds || []);
    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }
    form.setValue("albumsIds", Array.from(albumsSet));
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>
          <DialogBody className="space-y-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert variant="info">
              <Text variant="paragraph-medium">
                Tamanho máximo: 50MB. <br />
                Você pode selecionar arquivos em PNG, JPG, JPEG, WEBP ou SVG
              </Text>
            </Alert>
            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpeg", "jpg", "webp", " svg"]}
              maxFileSizeInMB={50}
              replaceBy={
                <ImageFilePreview src={fileSrc} className="w-full h-56" />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            ></InputSingleFile>
            <div className="flex flex-col gap-3">
              <Text as="div" variant="label-small">
                Selecionar albuns
              </Text>
              {!isLoadingAlbums && albums.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {albums.map((album, index) => (
                    <Button
                      onClick={() => handleToggleAlbum(album.id)}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      key={`button-album-${index}`}
                    >
                      {album.title}
                    </Button>
                  ))}
                </div>
              )}
              {isLoadingAlbums && (
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: isMobile ? 3 : 5 }).map((_, index) => (
                    <Skeleton
                      className="flex-1 h-7"
                      key={`album-loading-${index}`}
                    ></Skeleton>
                  ))}
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto} className="w-[9.375rem]">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" handling={isCreatingPhoto} className="w-[9.375rem]">
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
