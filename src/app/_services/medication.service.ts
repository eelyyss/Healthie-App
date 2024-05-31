import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private localStorageKey = 'medications';
  private medicationsList = [
    { name: 'Aspirina', duration: '7 días', dose: '100 mg' },
    { name: 'Paracetamol', duration: '5 días', dose: '500 mg' },
    { name: 'Ibuprofeno', duration: '10 días', dose: '200 mg' },
    { name: 'Amoxicilina', duration: '7 días', dose: '500 mg' },
    { name: 'Metformina', duration: '30 días', dose: '850 mg' },
    { name: 'Atorvastatina', duration: '30 días', dose: '10 mg' },
    { name: 'Lisinopril', duration: '30 días', dose: '20 mg' },
    { name: 'Omeprazol', duration: '14 días', dose: '40 mg' },
    { name: 'Levotiroxina', duration: '30 días', dose: '100 mcg' },
    { name: 'Simvastatina', duration: '30 días', dose: '20 mg' },
    { name: 'Amlodipina', duration: '30 días', dose: '5 mg' },
    { name: 'Losartán', duration: '30 días', dose: '50 mg' },
    { name: 'Metoprolol', duration: '30 días', dose: '100 mg' },
    { name: 'Clopidogrel', duration: '30 días', dose: '75 mg' },
    { name: 'Pantoprazol', duration: '14 días', dose: '40 mg' },
    { name: 'Sertralina', duration: '30 días', dose: '50 mg' },
    { name: 'Ranitidina', duration: '14 días', dose: '150 mg' },
    { name: 'Tramadol', duration: '7 días', dose: '50 mg' },
    { name: 'Gabapentina', duration: '30 días', dose: '300 mg' },
    { name: 'Citalopram', duration: '30 días', dose: '20 mg' },
    { name: 'Alprazolam', duration: '14 días', dose: '0.5 mg' },
    { name: 'Furosemida', duration: '7 días', dose: '40 mg' },
    { name: 'Hydrocodone', duration: '7 días', dose: '10 mg' },
    { name: 'Prednisona', duration: '5 días', dose: '20 mg' },
    { name: 'Meloxicam', duration: '10 días', dose: '15 mg' },
    { name: 'Duloxetina', duration: '30 días', dose: '60 mg' },
    { name: 'Venlafaxina', duration: '30 días', dose: '75 mg' },
    { name: 'Escitalopram', duration: '30 días', dose: '10 mg' },
    { name: 'Bupropion', duration: '30 días', dose: '150 mg' },
    { name: 'Ciprofloxacina', duration: '7 días', dose: '500 mg' }
  ];

  constructor() { }

  private getRandomMedications(count: number): any[] {
    const shuffled = this.medicationsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getMedications(): any[] {
    const medications = localStorage.getItem(this.localStorageKey);
    if (medications) {
      return JSON.parse(medications);
    } else {
      const newMedications = this.getRandomMedications(5);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newMedications));
      return newMedications;
    }
  }


}
