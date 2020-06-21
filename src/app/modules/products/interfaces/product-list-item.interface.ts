import { Entry, ImageField } from 'src/app/shared/interfaces/contentful';

export interface ProductListItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: Entry<ImageField>;
}
