import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  name: string = '';
  email: string = '';
  message: string = '';


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

  onSubmit(): void {
    this.name = '';
    this.email = '';
    this.message = '';

    const confirmationMessage = document.getElementById('confirmationMessage') as HTMLElement;
    confirmationMessage.style.display = 'block';

    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 5000);
  }
}
