import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

import { Album, Match, Exchange } from '../models/index';

import { environment } from '../../../environments/environment';

@Injectable()
export class AlbumService {

    constructor(private _http: Http) {

    }

    get(id: string): Observable<Album> {
        return this._http.get(environment.apiUrl + "/Album?id=" + id)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getAll(): Observable<Album[]> {
        return this._http.get(environment.apiUrl + "/Album")
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getByLogin(login: string): Observable<Album[]> {
        return this._http.request(environment.apiUrl + "/Album/GetByLogin?login=" + login)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    match(albumId: string): Observable<Match[]> {
        return this._http.request(environment.apiUrl + "/Album/Match?albumId=" + albumId)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    matchByProximity(albumId: string, distance: number): Observable<Match[]> {

        var url = "/Album/matchByProximity" +
        "?albumId=" + albumId +
        "&distance=" + distance;

        return this._http.request(environment.apiUrl + url)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    exchange(exchange: Exchange): Observable<void> {

        var url = "/Album/Exchange" +
        "?fromUserProfileLogin=" + exchange.fromUserProfileLogin +
        "&toUserProfileLogin=" + exchange.toUserProfileLogin +
        "&collectionCode=" + exchange.collectionCode +
        "&collectionItemId=" + exchange.collectionItemId;

        return this._http.request(environment.apiUrl + url)
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
