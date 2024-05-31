import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../_services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
  }

  deleteResult(index: number) {
    this.resultsService.deleteResult(index);
    this.results = this.resultsService.getResults();
  }
}
