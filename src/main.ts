import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import "./styles.css";
import { provideCore } from "./app/core/core";

bootstrapApplication(AppComponent, {
  providers: [provideCore({ routes })],
}).catch((err) => console.error(err));
