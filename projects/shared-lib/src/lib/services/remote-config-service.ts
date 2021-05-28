import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteConfig } from 'shared-lib';
import { ResponseRemoteConfig } from 'shared-lib';
import { RemoteConfigUrl } from 'shared-lib';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private remotesConfig: RemoteConfig[] = [];
  private production: boolean = false;

  constructor(private http: HttpClient) {}

  public async loadAllRemotes(
    remotesConfigUrl: RemoteConfigUrl[],
    production: boolean
  ): Promise<RemoteConfig[]> {
    this.production = production;
    return Promise.all(
      remotesConfigUrl.map((remote) => {
        return this.loadRemoteConfig(
          production ? remote.configUrlProd : remote.configUrlDev
        );
      })
    ).then(() => {
      return this.remotesConfig;
    });
  }

  public buildRoutes(): Routes {
    const lazyRoutes: Routes = this.remotesConfig.map((r) => ({
      path: r.path,
      loadChildren: () => loadRemoteModule(r).then((m) => m[r.ngModuleName]),
    }));
    return [...lazyRoutes];
  }

  public getRemotesConfigs(): RemoteConfig[] | Error {
    if (!this.remotesConfig) {
      throw Error('Config file not loaded!');
    }
    return this.remotesConfig;
  }

  private async loadRemoteConfig(urlConfigRemote: string): Promise<void> {
    return this.http
      .get(urlConfigRemote)
      .toPromise()
      .then((response) => {
        const resConfig: ResponseRemoteConfig = response as ResponseRemoteConfig;
        const configs: RemoteConfig[] = resConfig.exposes.map(
          (moduleExposed) => {
            const remoteConfig: RemoteConfig = {
              remoteName: resConfig.remoteName,
              exposedModule: moduleExposed.exposedModule,
              ngModuleName: moduleExposed.ngModuleName,
              displayName: moduleExposed.displayName,
              path: moduleExposed.path,
              remoteEntry: this.production
                ? resConfig.remoteEntryProd
                : resConfig.remoteEntryDev,
            };
            return remoteConfig;
          }
        );
        this.remotesConfig = [...this.remotesConfig, ...configs];
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
