import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserProfileService, SocketService } from './shared/services/index'
import { Message } from './shared/models/index';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ioConnection: any;
  location: Location;

  constructor(private router: Router, location: Location,
    private _socketService: SocketService,
    private _userProfileService: UserProfileService) { 
      this.location = location;
    }

  ngOnInit() {
    this.initIoConnection();
  }

  showNotification(from, align, type, message, timer) {

    $.notify({
      icon: "notifications",
      message: message

    }, {
        type: type,
        timer: timer,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  private initIoConnection(): void {
    this._socketService.initSocket();

    this.ioConnection = this._socketService.onMessage()
      .subscribe((message: Message) => {
        if (message.to != null && message.to.login == this._userProfileService.getLogin()) {
          // //var notification = '<b>' + message.from.name + '</b>, participante do grupo ' + message.group.name;
          // var notification = 'SOLICITAÇÃO DE TROCA<br />' +
          //   'Usuário: ' + message.from.name + '<br />' +
          //   'Grupo:' + message.group.name + '<br />' +
          //   'Coleção:' + message.group.collection.name + '<br />' +
          //   'Item:' + message.content.collectionItem.number + '<br />';
          // this.showNotification('top', 'right', 'primary', notification, 4000);

          // var routerExchange = "exchange";
          // var titlee = this.location.prepareExternalUrl(this.location.path());
          // var route = titlee.split('/')[1];

          // if (route != routerExchange){
          //   var redirect = confirm('Você recebeu uma solicitação de troca!\nDeseja ir para área de trocas?');
          //   if (redirect) {
          //     this.router.navigate([routerExchange]);
          //   }
          // }
        }
      });
  }
}
