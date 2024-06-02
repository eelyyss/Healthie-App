import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

interface Result {
  id: number;
  title: string;
  date: string;
  description: string;
  values: string;
  type: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private demoResults: Result[] = [
    { id: 1, title: 'Consulta General', date: '2023-05-01', description: 'Chequeo anual', values: 'Todo normal', type: 3 },
    { id: 2, title: 'Urgencia', date: '2023-04-15', description: 'Dolor abdominal', values: 'Apendicitis', type: 1 },
    { id: 3, title: 'Cita Médica', date: '2023-03-10', description: 'Fiebre persistente', values: 'Infección viral', type: 2 },
    { id: 4, title: 'Consulta General', date: '2023-02-20', description: 'Chequeo postoperatorio', values: 'Recuperación satisfactoria', type: 3 },
    { id: 5, title: 'Urgencia', date: '2023-01-30', description: 'Fractura de brazo', values: 'Fractura compuesta', type: 1 },
    { id: 6, title: 'Cita Médica', date: '2022-12-25', description: 'Resfriado severo', values: 'Tratamiento con antibióticos', type: 2 },
    { id: 7, title: 'Consulta General', date: '2022-11-15', description: 'Revisión dental', values: 'Limpieza dental', type: 3 },
    { id: 9, title: 'Cita Médica', date: '2022-09-05', description: 'Consulta dermatológica', values: 'Dermatitis', type: 2 },
    { id: 10, title: 'Consulta General', date: '2022-08-20', description: 'Chequeo de colesterol', values: 'Niveles altos', type: 3 },
    { id: 11, title: 'Urgencia', date: '2022-07-25', description: 'Reacción alérgica', values: 'Alergia a alimentos', type: 1 },
    { id: 12, title: 'Cita Médica', date: '2022-06-15', description: 'Consulta oftalmológica', values: 'Miopía', type: 2 },
    { id: 14, title: 'Urgencia', date: '2022-04-01', description: 'Corte profundo', values: 'Sutura necesaria', type: 1 },
    { id: 15, title: 'Cita Médica', date: '2022-03-15', description: 'Consulta cardiológica', values: 'Arritmia', type: 2 }
  ];

  constructor(private storageService: StorageService) {}

  private userResultsKey(userId: number): string {
    return `results_${userId}`;
  }

  private generateRandomResults(): Result[] {
    const numResults = Math.floor(Math.random() * 10) + 1;
    const randomResults: Result[] = [];
    for (let i = 0; i < numResults; i++) {
      const randomIndex = Math.floor(Math.random() * this.demoResults.length);
      randomResults.push({ ...this.demoResults[randomIndex] });
    }
    return randomResults;
  }

  getResults(userId: number): Observable<Result[]> {
    let results = localStorage.getItem(this.userResultsKey(userId));
    if (!results) {
      // Si no hay resultados guardados para este usuario, genera resultados aleatorios
      results = JSON.stringify(this.generateRandomResults());
      localStorage.setItem(this.userResultsKey(userId), results);
    }
    return of(JSON.parse(results));
  }

  saveResults(userId: number, results: Result[]): void {
    localStorage.setItem(this.userResultsKey(userId), JSON.stringify(results));
  }

  deleteResult(userId: number, resultId: number): Observable<any> {
    const results: Result[] = JSON.parse(localStorage.getItem(this.userResultsKey(userId)) || '[]');
    const updatedResults = results.filter(result => result.id !== resultId);
    this.saveResults(userId, updatedResults);
    return of({ success: true });
  }
}
