export interface Book {
    id : string;
    volumeInfo : {
        title : string;
        author : string[];
        description : string;
        publishDate : string;
        ratingCount : number
    }
}