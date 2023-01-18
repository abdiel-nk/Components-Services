import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {retry, catchError, map} from 'rxjs/operators';
import {Product, CreateProductDTO, UpdateProductDTO}from './../models/product.model';
import {throwError} from 'rxjs';

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
    if (limit && offset){
      params= params.set('limit', limit);
      params= params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {
      params
    }).pipe(
      retry(2)
    );
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl,{
       params: {limit, offset}
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
