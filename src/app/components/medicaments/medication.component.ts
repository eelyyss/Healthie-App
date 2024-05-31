import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../../_services/medication.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
  medications: any[] = [];

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.medications = this.medicationService.getMedications();
  }

  refreshMedications(): void {
    this.medications = this.medicationService.getMedications();
  }
}
