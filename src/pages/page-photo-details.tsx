import Text from "../components/text"
import { useParams } from "react-router"


export default function PagePhotoDetails() {
    const { id } = useParams();


    return <>
        <div>
            <Text variant="heading-large">Page PhotoDetails ! id = {id}</Text>
        </div>
    </>
}