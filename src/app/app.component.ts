import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  eventBusSub?: Subscription;
  isMenuOpen = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    public router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  ngOnInit(): void {
    AOS.init();
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.authService.getLoginSubject().subscribe(() => {
      this.isLoggedIn = true;
      if (this.isMenuOpen) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.getElementById('navbarNav')?.classList.add('show');
      document.body.classList.add('overlay-active');
    } else {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.getElementById('navbarNav')?.classList.remove('show');
    document.body.classList.remove('overlay-active');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.isLoggedIn = false;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
