export declare class PlacesService {
    getPlaces(): Promise<{
        id: number;
        urlImage: string;
        title: string;
    }[]>;
}
