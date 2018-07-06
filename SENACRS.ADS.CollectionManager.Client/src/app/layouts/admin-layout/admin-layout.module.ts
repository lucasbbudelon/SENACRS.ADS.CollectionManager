import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { CollectionComponent } from '../../components/collection/collection.component';
import { AlbumComponent } from '../../components/album/album.component';
import { AlbumFormComponent } from '../../components/album/album-form/album-form.component';
import { GroupComponent } from '../../components/group/group.component';
import { GroupFormComponent } from '../../components/group/group-form/group-form.component';
import { ExchangeComponent } from '../../components/exchange/exchange.component';

import { DashboardComponent } from '../../templates/dashboard/dashboard.component';
import { TableListComponent } from '../../templates/table-list/table-list.component';
import { TypographyComponent } from '../../templates/typography/typography.component';
import { IconsComponent } from '../../templates/icons/icons.component';
import { MapsComponent } from '../../templates/maps/maps.component';
import { NotificationsComponent } from '../../templates/notifications/notifications.component';
import { UpgradeComponent } from '../../templates/upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    UserProfileComponent,
    CollectionComponent,
    AlbumComponent,
    AlbumFormComponent,
    GroupComponent,
    GroupFormComponent,
    ExchangeComponent,

    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
