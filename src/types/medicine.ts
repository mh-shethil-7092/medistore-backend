export interface IMedicine {
  _id?: string;
  name: string;
  genericName: string;
  price: number;
  availability: boolean;
  image: string; // The URL from ImgBB
  category: string;
  sellerId: string;
}