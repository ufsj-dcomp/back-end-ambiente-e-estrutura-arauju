import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoComponent } from './candidato/candidato.component';
import { ConhecaComponent } from './conheca/conheca.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: '', component: AuthComponent },
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children:[
      { path: 'candidato', component: CandidatoComponent},
      { path: 'conheca', component: ConhecaComponent}
    ]
  },
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
