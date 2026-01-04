import {
  provideRouter,
  Routes,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from "@angular/router";
import {
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { spinnerInterceptor } from "./interceptors/spinner/spinner.interceptor";
import { loggingInterceptor } from "./interceptors/logging/logging.interceptor";
import { AppInterceptor } from "./interceptors/app/app.interceptor";
import { provideTransloco } from "@jsverse/transloco";
import { TranslocoService } from "./transloco/transloco-loader";
import {
  AutoRefreshTokenService,
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken,
} from "keycloak-angular";
import { environment } from "@/environments/environment";

export interface CoreOptions {
  routes: Routes;
}

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(environment.backendUrl),
  bearerPrefix: "Bearer",
});

export function provideCore({ routes }: CoreOptions) {
  return [
    provideZoneChangeDetection(),
    provideKeycloak({
      config: {
        url: environment.keycloak.authority,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: "login-required",
        redirectUri: environment.keycloak.redirectUri,
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: "logout",
          sessionTimeout: 1000,
        }),
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [urlCondition],
        },
      ],
    }),

    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: "reload",
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      })
    ),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([
        spinnerInterceptor,
        loggingInterceptor,
        includeBearerTokenInterceptor,
      ])
    ),
    provideTransloco({
      config: {
        availableLangs: ["pt", "en"],
        defaultLang: "pt",
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoService,
    }),
  ];
}
