import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Postmodel } from '../models/postmodel';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private urlBase = "https://jsonplaceholder.typicode.com"

  constructor( private http: HttpClient ) { }


  getAllPost(){
    return this.http.get<Postmodel[]>  (this.urlBase +'/posts')
  }

}
