import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemoteConfigService } from 'shared-lib';
import { RemoteConfig } from 'shared-lib';
import { SessionService } from 'shared-lib';
import { RemoteConfigUrl } from 'shared-lib';
import { environment } from '../environments/environment';

declare const remotesConfigUrl: RemoteConfigUrl[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public remotesConfig: RemoteConfig[] = [];
  public userName: any;

  constructor(
    public session: SessionService,
    private router: Router,
    private remoteConfServ: RemoteConfigService
  ) {}

  public async ngOnInit(): Promise<void> {
    debugger;
    this.remotesConfig = await this.remoteConfServ.loadAllRemotes(
      remotesConfigUrl,
      environment.production
    );
    debugger;
    const routes = this.remoteConfServ.buildRoutes();
    this.router.resetConfig(routes);
  }

  public login(): void {
    debugger;
    if (this.userName) {
      this.session.login(this.userName);
    }
  }

  public logout(): void {
    debugger;
    this.session.logout();
    this.router.navigate(['/']);
    this.userName = '';
  }
}
