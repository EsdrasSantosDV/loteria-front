import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

@Component({
  selector: "app-root",
  imports: [MainLayoutComponent],
  template: `<app-main-layout></app-main-layout>`,
})
export class AppComponent {
  title = "Sua Loteria Feliz";
}
