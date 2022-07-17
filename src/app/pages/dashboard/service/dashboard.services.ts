import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:5000/'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Referrer-Policy': 'no-referrer' })
  }

  // Obtem todos os carros
  getCars(): Observable<any> {
    return this.httpClient.get<any>(this.url+"listarFresadoras")
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

//   // Obtem um carro pelo id
//   getCarById(id: number): Observable<Car> {
//     return this.httpClient.get<Car>(this.url + '/' + id)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }

//   // salva um carro
//   saveCar(car: Car): Observable<Car> {
//     return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }

//   // utualiza um carro
//   updateCar(car: Car): Observable<Car> {
//     return this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       )
//   }

//   // deleta um carro
//   deleteCar(car: Car) {
//     return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       )
//   }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}