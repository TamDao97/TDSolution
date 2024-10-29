import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/modules/shared.module';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'Reservation.WEB';

  constructor(
    private cdr: ChangeDetectorRef,
    public loadingService: LoadingService
  ) {}

  ngAfterViewInit() {
    // Sử dụng ChangeDetectorRef để yêu cầu Angular chạy lại change detection sau khi view đã render xong
    this.cdr.detectChanges();
  }
}
