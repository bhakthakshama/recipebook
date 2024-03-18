import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:8080/recipes";

  uploadrecipe(data : any){
    return this.http.post<any>(`${this.url}`,data)
   }
  
  getrecipe(){
    return this.http.get<any>(`${this.url}`)
   }

  updaterecipe(id:number, data:any){
    return this.http.post<any>(`${this.url}/` + id, data)
   }

  deleterecipe(id :any){
    return this.http.get<any>(`${this.url}/` + id)
   }

}
