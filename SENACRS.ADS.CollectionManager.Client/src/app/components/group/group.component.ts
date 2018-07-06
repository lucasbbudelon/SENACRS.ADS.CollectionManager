import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../shared/services/user-profile.service'

import { GroupService } from '../../shared/services/group.service'
import { Group } from '../../shared/models/group'

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

    groups: Group[];

    constructor(private _service: GroupService,
                private _userProfileService: UserProfileService) {

    }

    async ngOnInit(): Promise<void> {

        var userProfileLogin = this._userProfileService.getLogin();

        await this._service
            .getByLogin(userProfileLogin)
            .toPromise()
            .then(result => {
                if (result.length) {
                    this.groups = result;
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
