import { Product } from '../../catalogue/product/domain/Product';

type WishlistsVisibility = "shared" | "public" | "private"

export class Wishlists {
    owner: Product;
    visibility: WishlistsVisibility;
}

export class WishlistsLine {
    wishlist: Wishlists;
    product: Product;
    quantity: number;
    title: string;
}