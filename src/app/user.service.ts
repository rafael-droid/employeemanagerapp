import {Observable} from "rxjs";
import {User} from "./User";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'})
export class UserService{
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
public getUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.apiServerUrl}/user/`)}
}
