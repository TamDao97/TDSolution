import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
} from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test';
}
