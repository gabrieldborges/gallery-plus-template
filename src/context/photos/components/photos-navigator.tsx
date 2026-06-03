import { useNavigate } from "react-router";
import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import ArrowLeft from "../../../assets/icons/chevron-left.svg?react";
import ArrowRight from "../../../assets/icons/chevron-right.svg?react";
import cx from "classnames";
import classNames from "classnames";
import usePhoto from "../hooks/use-photo";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoId?: string;
  nextPhotoId?: string;
  loading?: boolean;
}

export default function PhotosNavigator({
  previousPhotoId,
  nextPhotoId,
  loading,
  ...props
}: PhotosNavigatorProps) {
  
  const navigate = useNavigate();

  return (
    <div className={cx("flex gap-2", classNames)} {...props}>
      {!loading ? (
        <>
          <Button
            variant="secondary"
            icon={ArrowLeft}
              onClick={() => {
              navigate(`/photos/${previousPhotoId}`);
            }}
            disabled={!previousPhotoId}
          >
            Voltar
          </Button>
          <Button
            icon={ArrowRight}
            variant="secondary"
            onClick={() => navigate(`/photos/${nextPhotoId}`)}
            disabled={!nextPhotoId}
          >
            Próxima imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-20 h-10" />
        </>
      )}
    </div>
  );
}
