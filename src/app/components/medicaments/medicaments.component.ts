import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  medicamentos: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    const user = this.storageService.getUser();
    if (user) {
      this.authService.getMedications(user.id).subscribe({
        next: (data: any) => {
          this.medicamentos = data;
        },
        error: (err: any) => {
          this.errorMessage = 'Error loading medications';
          console.error(err);
        }
      });
    }
  }
}
