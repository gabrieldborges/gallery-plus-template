import { useMediaQuery } from '@custom-react-hooks/use-media-query';



export default function useIsMobile() {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return {
        isMobile
    }

}