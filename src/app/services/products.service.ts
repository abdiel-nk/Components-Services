import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {retry, catchError, map} from 'rxjs/operators';
import {Product, CreateProductDTO, UpdateProductDTO}from './../models/product.model';
import {throwError, zip} from 'rxjs';
import {checkTime} from './../interceptors/time.interceptor'
import {environment} from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;


  constructor(
    private http: HttpClient
  ) { }


  // getAllProducts(){
  //   return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products/
  //   '),
  // }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    //First version
    // if (limit && offset){
    //   params= params.set('limit', limit);
    //   params= params.set('offset', limit);
    // }
    //second version
    if (limit != undefined && offset != undefined) {
    params = params.set('limit', limit);
    params = params.set('offset', offset);
}

    return this.http.get<Product[]>(this.apiUrl, {
      params , context: checkTime()
    }).pipe(
      retry(2)
    );
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl,{
       params: {limit, offset}, context: checkTime()
    }).pipe(
      retry(2),
      map(products => products.map(item =>{
        return{
          ...item,
          taxes: .18 * item.price
        }
      }))
    );
  }


  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    // usar zip para ejecutar en paralelo
  return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }
  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 500){
          return throwError('Error en el server');
        }
        if(error.status === 400){
          return throwError('El producto no existe');
        }
        if(error.status === 401){
          return throwError('No estás autorizado');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }
  create(dto: CreateProductDTO ){
    return this.http.post<Product>(this.apiUrl, dto);
  }
  update(id: string, dto: any){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }



}
