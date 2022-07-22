import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  url = GlobalConstants.apiURL; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Referrer-Policy': 'no-referrer' })
  }

  // Obtem Lista de fresadoras pela api
  getLista(): Observable<any> {
    return this.httpClient.get<any>(this.url + "listaConfigFresadoras")
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Envia dados para salvar na api
  salvarFresadora(dados): Observable<any> {
    return this.httpClient.post<any>(this.url + "save", { dados: dados })
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // buscar para editar
  buscar(id): Observable<any> {
    return this.httpClient.get<any>(this.url + "buscar/"+id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


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
    return throwError(errorMessage);
  };

}