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

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm();
  const { albums, isLoadingAlbums } = useAlbums();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>
        <DialogBody className="space-y-5">
          <InputText placeholder="Adicione um título" />
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
            replaceBy={<ImageFilePreview className="w-full h-56" />}
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
                    variant="ghost"
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    className="w-20 h-7"
                    key={`album-loading-${index}`}
                  ></Skeleton>
                ))}
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
