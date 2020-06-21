import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

const CART_ITEMS_LOCAL_STORAGE = 'mdz95-ecom-cart';

const DB_CART_MOCK = [
  {
    "id": "3DVqIYj4dOwwcKu6sgqOgg", "slug": "lenovo-yoga-i7", "name": "Lenevo Yoga i7", "price": 11, "image": { "sys": { "space": { "sys": { "type": "Link", "linkType": "Space", "id": "hsn03ejlp1oa" } }, "id": "Xc0ny7GWsMEMCeASWO2um", "type": "Asset", "createdAt": "2020-03-21T16:25:58.315Z", "updatedAt": "2020-03-21T16:25:58.315Z", "environment": { "sys": { "id": "master", "type": "Link", "linkType": "Environment" } }, "revision": 1, "locale": "en-US" }, "fields": { "title": "Hudson Wall Cup ", "description": "Merchandise image", "file": { "url": "//images.ctfassets.net/hsn03ejlp1oa/Xc0ny7GWsMEMCeASWO2um/6ad621661bf0d57df71bb356a657c8f1/jqvtazcyfwseah9fmysz.jpg", "details": { "size": 48751, "image": { "width": 600, "height": 600 } }, "fileName": "jqvtazcyfwseah9fmysz.jpg", "contentType": "image/jpeg" } } },
    "quantity": 1
  },

];

@Injectable()
export class CartService {
  private cartItems$: BehaviorSubject<any> = new BehaviorSubject([]);

  isAuth = false;

  constructor(private authService: AuthService) {
    this.authService.isAuth.subscribe(isAuth => {
      this.isAuth = isAuth;
      this.loadPreservedCartItems();
    });

    this.cartItems$.subscribe(items => {
      console.log('cart items: ', items);

      if (!this.isAuth) {
        this.saveCartInLocalStorage(items);
      } else {
        this.saveUserDBCart(items);
      }

    });
  }

  get cartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  addToCart(item: any): void {
    if (!item) {
      alert('Add to cart - product error');
    }

    const cartItems = this.cartItems$.getValue();
    const itemIndex = this.cartItems$.getValue().findIndex(el => el.id === item.id);


    if (itemIndex === -1) {
      this.cartItems$.next([...cartItems, { ...item, quantity: 1 }]);
    } else {
      const items = [...cartItems];

      items[itemIndex] = {
        ...items[itemIndex],
        quantity: items[itemIndex].quantity + 1
      };

      this.cartItems$.next(items);
    }


  }

  loadPreservedCartItems(): void {
    if (!this.isAuth) {
      console.log('loadPreservedCartItems', 'IF');

      const localStorageCart = this.getCartFromLocalStorage();

      this.cartItems$.next(localStorageCart);
    } else {
      console.log('loadPreservedCartItems', 'ELSE')
      this.mergePreservedCarts();
    }
  }

  getCartFromLocalStorage(): any[] {
    const storedCart: string = localStorage.getItem(CART_ITEMS_LOCAL_STORAGE);

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      return parsedCart;
    }

    return [];
  }

  saveCartInLocalStorage(cartItems: any[]): void {
    localStorage.setItem(CART_ITEMS_LOCAL_STORAGE, JSON.stringify(cartItems));
  }

  resetCartInLocalStorage(): void {
    return this.saveCartInLocalStorage([]);
  }

  getUserDBCart(): Observable<any> {
    const cart = localStorage.getItem('db-cart-ecom');

    const data = cart ? JSON.parse(cart) : [];

    return from([data]);
  }

  saveUserDBCart(cartItems): void {
    localStorage.setItem('db-cart-ecom', JSON.stringify(cartItems));
  }

  mergePreservedCarts(): void {
    this.getUserDBCart().subscribe(dbCart => {
      console.log(Array.isArray(dbCart));

      const localStorageCart = this.getCartFromLocalStorage();

      console.log('localStorageCart', localStorageCart);
      console.log('dbCart', dbCart);

      const mergedCarts = localStorageCart.reduce((acc, cur) => {
        const itemInDBCart = acc.findIndex(el => el.id === cur.id);

        if (itemInDBCart === -1) {
          return [...acc, cur];
        } else {
          const updatedCart = [...acc];

          updatedCart[itemInDBCart] = {
            ...updatedCart[itemInDBCart],
            quantity: updatedCart[itemInDBCart].quantity + cur.quantity
          };

          return updatedCart;
        }

      }, dbCart);

      this.cartItems$.next(mergedCarts);
      this.resetCartInLocalStorage();
    });
  }
}
