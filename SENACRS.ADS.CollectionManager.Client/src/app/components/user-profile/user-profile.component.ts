import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../shared/services/index'
import { UserProfile } from '../../shared/models/index'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;
  userLogin: boolean;
  ioConnection: any;

  constructor(private _userProfileService: UserProfileService) {

  }

  async ngOnInit() {
    this.checkLogin();

    if (this.userLogin) {
      let email: string = this._userProfileService.getLogin();
      await this.loadUserProfile(email);
    }
  }

  checkLogin() {
    this.userLogin = this._userProfileService.checkLogin();
  }

  login(email: string) {
    this._userProfileService.login(email);
    this.checkLogin();
  }

  logout() {
    this._userProfileService.logout();
    this.checkLogin();
  }


  async loadUserProfile(loginUserProfile: string): Promise<void> {

    await this._userProfileService
      .get(loginUserProfile)
      .toPromise()
      .then(result => {
        if (result == null) {
          alert("Perfil de Usuário não encontrado!");
        }
        else {
          this.userProfile = result;
          this.logout();
          this.login(result.login);
        }
      })
      .catch(result => {
        console.log(result);
        alert("Erro ao carregar perfil de usuário!");
      });
  }
}
