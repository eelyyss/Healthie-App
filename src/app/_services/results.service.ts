import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private localStorageKey = 'clinicalResults';

  constructor() { }

  addResult(result: any) {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem(this.localStorageKey, JSON.stringify(results));
  }

  getResults(): any[] {
    const results = localStorage.getItem(this.localStorageKey);
    return results ? JSON.parse(results) : [];
  }

  deleteResult(index: number) {
    const results = this.getResults();
    results.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(results));
  }
}
