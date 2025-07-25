import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi); // Đăng ký locale cho Angular
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
