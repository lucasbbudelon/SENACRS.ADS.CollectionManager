import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

import { Group } from '../models/group';

import { environment } from '../../../environments/environment';

@Injectable()
export class GroupService {

    constructor(private _http: Http) {
        
    }

    getAll(): Observable<Group[]> {
        return this._http.get(environment.apiUrl + "/Group")
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getByLogin(login: string): Observable<Group[]> {
        return this._http.request(environment.apiUrl + "/Group/GetByLogin?login=" + login)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getByGuide(guide: string): Observable<Group> {
        return this._http.request(environment.apiUrl + "/Group/GetByGuide?guide=" + guide)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }
}
