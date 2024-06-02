import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../_services/results.service';
import { StorageService } from '../../_services/storage.service';

interface Result {
  id: number;
  title: string;
  date: string;
  description: string;
  values: string;
  type: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Result[] = [];
  currentUser: any;
  selectedTab: number = 0;
  tabs: string[] = ['Todas', 'Urgencias', 'Citas Médicas'];

  constructor(
    private resultsService: ResultsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser) {
      this.loadResults();
    } else {
      this.results = [];
    }
  }

  loadResults(): void {
    if (this.currentUser) {
      this.resultsService.getResults(this.currentUser.id).subscribe((results: Result[]) => {
        this.results = results.sort((a: Result, b: Result) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    }
  }

  deleteResult(id: number): void {
    this.resultsService.deleteResult(this.currentUser.id, id).subscribe(() => {
      this.loadResults();
    });
  }

  filterResults(type: number): Result[] {
    return this.results.filter(result => type === 0 || result.type === type);
  }
}
