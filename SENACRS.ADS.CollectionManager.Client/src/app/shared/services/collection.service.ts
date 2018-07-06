import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

import { Collection } from '../models/collection';

import { environment } from '../../../environments/environment';

@Injectable()
export class CollectionService {

    constructor(private _http: Http) {
        
    }

    getAll(): Observable<Collection[]> {
        return this._http.get(environment.apiUrl + "/Collection")
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getById(id : string): Observable<Collection> {
        return this._http.get(environment.apiUrl + "/Collection/", id)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    post(collection: Collection) {
        return this._http.post(environment.apiUrl + "/Collection", collection)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.text();
                }

                return null;
            });
    }
}
