import Container from "../container";
import cn from "classnames";
import Logo from "../../assets/images/galeria-plus-full-logo.svg?react";
import Divider from "../divider";
import Button from "../button";
import { Link, useLocation } from "react-router";
import PhotoSearch from "../ui-components/photo-search";
import PhotoNewDialog from "../../context/photos/components/photo-new-dialog";
import AlbumNewDialog from "../../context/albums/components/album-new-dialog";

interface HeaderMainProps extends React.ComponentProps<typeof Container> {}

export default function HeaderMain({ className, ...props }: HeaderMainProps) {
  const { pathname } = useLocation();

  return (
    <>
      <Container
        as="header"
        className={cn(
          `
          items-center gap-3 mt-9 flex flex-wrap
          md:flex md:flex-row md:flex-nowrap md:gap-10 md:justify-between
          `,
          className,
        )}
        {...props}
      >
        <Link to={"/"} className="order-1">
          <Logo className="h-5" />
        </Link>
        {pathname === "/" && (
          <>
            <PhotoSearch className="w-full order-4 md:w-auto md:flex-1 md:order-2 md:my-0 my-6"/>
            <Divider
              orientation="vertical"
              variant="default"
              className="h-10 hidden md:block md:order-3"
            />
          
          </>
        )}

        <div className="flex items-center gap-3 order-2 ml-auto md:order-4 md:ml-0 whitespace-nowrap">
          <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
          <AlbumNewDialog
            trigger={<Button variant="secondary">Criar álbum</Button>}
          />
        </div>
      </Container>
    </>
  );
}
