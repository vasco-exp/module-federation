import { Component, OnInit } from '@angular/core';
import { SessionService } from 'shared-lib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public session: SessionService) {}

  ngOnInit(): void {}
}
