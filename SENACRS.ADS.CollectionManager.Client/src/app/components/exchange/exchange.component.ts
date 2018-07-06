import { Component, OnInit } from '@angular/core';

import { SocketService, UserProfileService, AlbumService } from '../../shared/services/index'

import { UserProfile, Message, MatchItem, MessageType, Album } from '../../shared/models/index'

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

    userProfile: UserProfile;
    userProfileChat: UserProfile;
    messages: Message[] = [];
    messageContent: string;
    matchItems: MatchItem[] = [];
    albums: Album[];
    ioConnection: any;

    constructor(private _albumService: AlbumService,
        private _socketService: SocketService,
        private _userProfileService: UserProfileService) {

    }

    async ngOnInit(): Promise<void> {

        this.loadUserProfile();

        if (this._userProfileService.checkChat()) {
            this.loadUserProfileChat();
        }
    }

    async loadAlbums(loginUserProfile: string): Promise<void> {
        this._albumService
            .getByLogin(loginUserProfile)
            .toPromise()
            .then(result => {
                if (result.length) {
                    this.albums = result;
                }
                else {
                    alert("Não existem albums vinculados ao login!");
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao carregar albums!");
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
                }
                else {
                    this.userProfile = result;
                    this.loadAlbums(result.login);
                    this.initIoConnection();
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao carregar perfil de usuário!");
            });
    }

    async loadUserProfileChat(): Promise<void> {

        var userProfileLogin = this._userProfileService.getChat();

        await this._userProfileService
            .get(userProfileLogin)
            .toPromise()
            .then(result => {
                if (result == null) {
                    alert("Perfil de Usuário não encontrado!");
                }
                else {
                    this.userProfileChat = result;
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

                var forMe = message.to != null && message.to.login == this.userProfile.login;
                var fromMe = message.from.login == this.userProfile.login

                if (forMe && message.type == MessageType.Exchange) {
                    this.matchItems.push(message.content);
                }
                else if (message.type == MessageType.Chat) {

                    if (forMe && (this.userProfileChat == null || this.userProfileChat.login != message.from.login)) {
                        var openChat = confirm(message.from.name + " quer conversar.\nDeseja iniciar o chat?");
                        if (openChat) {
                            this.openChat(message.from);
                            this.messages.push(message);
                        }
                    }
                    else if (fromMe || forMe) {
                        this.messages.push(message);
                    }

                } else if (message.type == MessageType.Update) {
                    this.loadAlbums(this.userProfile.login);
                }
            });
    }

    public sendMessageChat(message: string): void {

        this._socketService.send({
            from: this.userProfile,
            content: message,
            type: MessageType.Chat,
            to: this.userProfileChat
        });

        this.messageContent = null;
    }

    public sendMessageUpdate(): void {

        this._socketService.send({
            from: this.userProfile,
            content: null,
            type: MessageType.Update,
            to: this.userProfile
        });
    }

    public openChat(userProfileChat: UserProfile) {
        this.messages = [];
        this._userProfileService.chat(userProfileChat.login);
        this.userProfileChat = userProfileChat;
    }

    async exchange(matchItem: MatchItem): Promise<void> {

        var exchange = {
            fromUserProfileLogin: this.userProfile.login,
            toUserProfileLogin: matchItem.userProfileNeed.login,
            collectionCode: matchItem.collection.code,
            collectionItemId: matchItem.collectionItem.id
        }

        await this._albumService
            .exchange(exchange)
            .toPromise()
            .then(result => {
                alert("Troca Efetuada com sucesso!");
                document.getElementById(matchItem.collectionItem.id).style.display = "none";
                this.sendMessageUpdate();
            })
            .catch(result => {
                console.log(result);
                alert("Não foi possível efetuar a troca!");
            });
    }

    public match(albumId: string) {
        this._albumService
            .match(albumId)
            .toPromise()
            .then(result => {
                if (result.length) {
                    for (let match of result) {
                        for (let matchItem of match.itemsNeed) {
                            this._socketService.send({
                                from: match.userProfile,
                                to: matchItem.userProfileChange,
                                type: MessageType.Exchange,
                                group: match.group,
                                content: matchItem
                            });
                        }
                    }
                }
                else {
                    alert("Não existem trocas a fazer nesse album!");
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao verificar troca albums!");
            });
    }

    public matchByProximity(albumId: string, distance: number) {
        this._albumService
            .matchByProximity(albumId, distance)
            .toPromise()
            .then(result => {
                if (result.length) {
                    for (let match of result) {
                        for (let matchItem of match.itemsNeed) {
                            this._socketService.send({
                                from: match.userProfile,
                                to: matchItem.userProfileChange,
                                type: MessageType.Exchange,
                                group: match.group,
                                content: matchItem
                            });
                        }
                    }
                }
                else {
                    alert("Não existem trocas a fazer!");
                }
            })
            .catch(result => {
                console.log(result);
                alert("Erro ao verificar troca por proximidade!");
            });
    }
}
