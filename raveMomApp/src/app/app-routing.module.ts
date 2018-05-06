import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { SosComponent } from './sos/sos.component';
import { PlurtifyComponent } from './plurtify/plurtify.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FriendlistComponent } from './friendlist/friendlist.component';
 
const routes: Routes = [
    {
        path: '',
        component: SosComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'party',
        component: PlurtifyComponent
    },
    {
        path: 'userprofile',
        component: UserProfileComponent
    },
    {
        path: 'friendlist',
        component: FriendlistComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }