import { Routes } from '@angular/router';

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

export const AdminLayoutRoutes: Routes = [
    { path: 'collection', component: CollectionComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'album', component: AlbumComponent },
    { path: 'album/:id', component: AlbumFormComponent},
    { path: 'group', component: GroupComponent },
    { path: 'group/:id', component: GroupFormComponent},
    { path: 'exchange', component: ExchangeComponent},

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
