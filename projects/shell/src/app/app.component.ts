import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session-service';
import { Router } from '@angular/router';
import { RemoteConfigService } from './services/remote-config-service';
import { RemoteConfig } from './interfaces/remote-config.interface';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public remotesConfig: RemoteConfig[] = [];

  constructor(
    public session: SessionService,
    private router: Router,
    private remoteConfigServ: RemoteConfigService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.remotesConfig = await this.remoteConfigServ.loadAllRemotes();
    const routes = this.buildRoutes(this.remotesConfig);
    this.router.resetConfig(routes);
  }

  private buildRoutes(remotesConfig: RemoteConfig[]): Routes {
    const lazyRoutes: Routes = remotesConfig.map((r) => ({
      path: r.path,
      loadChildren: () => loadRemoteModule(r).then((m) => m[r.ngModuleName]),
    }));
    return [...lazyRoutes];
  }

  public click(): void {
    this.session.setSession(!this.session.isActive);
    if (!this.session.isActive) {
      this.router.navigate(['/']);
    }
  }
}
