import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TdToastComponent } from '../ui-control/td-toast/td-toast.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  standalone: true,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
