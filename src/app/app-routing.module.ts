import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NoteComponent} from "./note/note.component";


const routes: Routes = [{
  path: "",
  component: HomeComponent
}, {
  path: ":id",
  component: NoteComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
