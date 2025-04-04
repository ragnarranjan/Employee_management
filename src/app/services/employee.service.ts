import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/employees"

  addemployee(data : any):Observable<any>
  {
   return this.http.post<any>(this.url,data)
  }


  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }


  showall():Observable<any>{
      return this.http.get(this.url)
  }


// showall():Observable<any>{
//   return this.http.get(this.url)
// }

}
