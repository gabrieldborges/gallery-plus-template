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
import { photoListMock } from "../../../helpers/util";
import ImageFilePreview from "../../../components/image-file-preview";
import Skeleton from "../../../components/skeleton";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";


interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  // TODO: only for mock
  const isLoadingPhotos = false;
  const photos = photoListMock;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>Criar álbum</DialogHeader>
        <DialogBody className="space-y-3">
          <InputText placeholder="Adicione um título" />
          <div className="space-y-3">
            <Text as="div" variant="label-small">
              Fotos cadastradas
            </Text>
            {!isLoadingPhotos && (
              <div className="flex flex-wrap gap-3 ">
                {photos.length > 0 &&
                  photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`/images/${photo.imageId}`}
                      title={photo.title}
                      className="w-20 h-20 rounded"
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
          <DialogClose>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Criar</Button>
        </DialogFooter>
        Í
      </DialogContent>
    </Dialog>
  );
}
