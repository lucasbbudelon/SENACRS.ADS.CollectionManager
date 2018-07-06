import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupService } from '../../../shared/services/group.service'
import { UserProfileService } from '../../../shared/services/user-profile.service'
import { SocketService } from '../../../shared/services/socket.service';

import { Group } from '../../../shared/models/group'
import { UserProfile } from '../../../shared/models/user-profile'
import { Message } from '../../../shared/models/message';
import { Event } from '../../../shared/models/event';
import { MessageType } from '../../../shared/models';

@Component({
    selector: 'app-group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

    group: Group;
    userProfile: UserProfile;
    messages: Message[] = [];
    messageContent: string;
    ioConnection: any;

    constructor(private _groupService: GroupService,
        private _route: ActivatedRoute,
        private _socketService: SocketService,
        private _userProfileService: UserProfileService) {

    }

    async ngOnInit(): Promise<void> {

        var id = this._route.params.subscribe(params => {

            var id = params['id'];

            this._groupService
                .getByGuide(id)
                .toPromise()
                .then(result => {
                    if (result == null) {
                        alert("Grupo não encontrado!");
                    } else {
                        this.group = result;
                        this.loadUserProfile();
                    }
                })
                .catch(result => {
                    console.log(result);
                    alert("Erro ao carregar grupo!");
                });
        });
    }

    async loadUserProfile(): Promise<void> {

        var userProfileLogin = this._userProfileService.getLogin();

        await this._userProfileService
            .get(userProfileLogin)
            .toPromise()
            .then(result => {
                if (result == null) {
                    alert("Perfil de Usuário não encontrado!");
                } else {
                    this.userProfile = result;
                    this.initIoConnection();
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao carregar perfil de usuário!");
            });
    }

    private initIoConnection(): void {
        this._socketService.initSocket();

        this.ioConnection = this._socketService.onMessage()
            .subscribe((message: Message) => {
                if (message.type == MessageType.Broadcast && message.group.id == this.group.id) {
                    this.messages.push(message);
                }
            });

        this._socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                // this.messages.push({
                //     from: this.userProfile,
                //     group: this.group,
                //     content: "Entrou no chat"
                // });
            });

        this._socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                // this.messages.push({
                //     from: this.userProfile,
                //     group: this.group,
                //     content: "Saiu no chat"
                // });
            });
    }

    public sendMessage(message: string): void {

        this._socketService.send({
            from: this.userProfile,
            content: message,
            type: MessageType.Broadcast,
            group: this.group,
        });

        this.messageContent = null;
    }
}
