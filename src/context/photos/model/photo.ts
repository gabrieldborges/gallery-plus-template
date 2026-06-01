import type { Album } from "../../albums/model/album";


export interface Photo {
    id : string; 
    title : string; 
    imageId : string; 
    albums : Album[]
}


