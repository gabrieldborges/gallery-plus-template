import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui-components/dialog";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter></DialogFooter>Í
      </DialogContent>
    </Dialog>
  );
}
