import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {Product} from '../../../interfaces/product.type';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private products: Product[] = [];

  getProducts$(): Observable<Product[]> {
    let params = new HttpParams();
    params = params.set('extraField', 1);
    return this.http
      .get<{ data: Product[] }>(environment.apiUrl+ 'pizzas', {
        observe: 'response',
        headers: new HttpHeaders({
          authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
        params: params,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        }),

        map((result) => (result.body ? result.body.data : []))
      );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(
      environment.apiUrl+ `/pizzas?id=${productId}`
    );
  }

  createOrder(data: { product: string; address: string; phone: string }) {
    return this.http.post<{ success: boolean; message?: string }>(
      environment.apiUrl+`/order-pizza`,
      data
    );
  }
}
