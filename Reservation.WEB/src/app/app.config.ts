import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Interceptor } from './shared/utils/auth/interceptor';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

const icons: IconDefinition[] = Object.values(AllIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([Interceptor])),
  ],
};
