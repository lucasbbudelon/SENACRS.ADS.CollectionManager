import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { UserProfileService } from '../shared/services/user-profile.service'
import { CollectionService } from '../shared/services/collection.service'
import { AlbumService } from '../shared/services/album.service'
import { GroupService } from '../shared/services/group.service'
import { SocketService } from '../shared/services/socket.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    UserProfileService,
    CollectionService,
    AlbumService,
    GroupService,
    SocketService
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
