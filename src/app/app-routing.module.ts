import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulePage } from './pages/rules/rule.page';
import { PlayComponent } from './pages/play/play.component';

const routes: Routes = [
    {path: '', redirectTo: '/play', pathMatch: 'full'},
    {path: 'rules', component: RulePage},
    {path: 'play', component: PlayComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
