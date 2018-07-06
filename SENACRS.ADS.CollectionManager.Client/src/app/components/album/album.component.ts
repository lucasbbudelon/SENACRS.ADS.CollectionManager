import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../shared/services/user-profile.service'

import { AlbumService } from '../../shared/services/album.service'
import { Album } from '../../shared/models/album'

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    albums: Album[];

    constructor(private _service: AlbumService,
                private _userProfileService: UserProfileService) {

    }

    async ngOnInit(): Promise<void> {

        var userProfileLogin = this._userProfileService.getLogin();

        await this._service
            .getByLogin(userProfileLogin)
            .toPromise()
            .then(result => {
                if (result.length) {
                    this.albums = result;
                } else {
                    alert("Não existem registros cadastrados!");
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao carregar registros!");
            });

    }
}
