import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

import { UserProfile } from '../models/user-profile';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserProfileService {

    constructor(private _http: Http, private _cookieService: CookieService) {

    }

    getAll(): Observable<UserProfile[]> {
        return this._http.get(environment.apiUrl + "/UserProfile")
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    get(login: string): Observable<UserProfile> {
        return this._http.request(environment.apiUrl + "/UserProfile/GetByLogin?login=" + login)
            .map(response => {
                if (response.status == 404) {
                    return [];
                } else if (response.status == 200) {
                    return response.json();
                }

                return null;
            });
    }

    getLogin(): string {
        return this._cookieService.get("user-profile-login");
    }

    checkLogin(): boolean {
        return this._cookieService.check("user-profile-login");
    }

    login(login: string) {
        if (login != undefined) {
            this._cookieService.set("user-profile-login", login);
        }
    }

    getChat(): string {
        return this._cookieService.get("user-profile-chat");
    }

    chat(loginChat: string) {
        if (loginChat != undefined) {
            this._cookieService.set("user-profile-chat", loginChat);
        }
    }

    checkChat(): boolean {
        return this._cookieService.check("user-profile-chat");
    }

    logout() {
        this._cookieService.delete("user-profile-login");
        this._cookieService.delete("user-profile-chat");
    }
}
