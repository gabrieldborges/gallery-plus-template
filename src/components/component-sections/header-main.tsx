import Container from "../container";
import cn from "classnames";
import Logo from "../../assets/images/galeria-plus-full-logo.svg?react";
import Divider from "../divider";
import Button from "../button";
import { Link } from "react-router";
import PhotoSearch from "../ui-components/photo-search";
import PhotoNewDialog from "../../context/photos/components/photo-new-dialog";
import AlbumNewDialog from "../../context/albums/components/album-new-dialog";

interface HeaderMainProps extends React.ComponentProps<typeof Container> {}

export default function HeaderMain({ className, ...props }: HeaderMainProps) {
  return (
    <>
      <Container
        as="header"
        className={cn(
          "flex items-center justify-between gap-10 mt-9",
          className,
        )}
        {...props}
      >
        <Link to={"/"}>
          <Logo className="h-5" />
        </Link>
        <PhotoSearch />
        <Divider orientation="vertical" variant="default" className="h-10" />
        <div className="flex items-center gap-3">
          <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
          <AlbumNewDialog
            trigger={<Button variant="secondary">Criar álbum</Button>}
          />
        </div>
      </Container>
    </>
  );
}
