import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemoteConfig } from '../interfaces/remote-config.interface';
import { ResponseRemoteConfig } from '../interfaces/response-remote-config.interface';
import { environment } from '../../environments/environment';
import { RemoteConfigUrl } from '../interfaces/remote-config-url.interface';

declare const remotesConfigUrl: RemoteConfigUrl[];

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private remotesConfig: RemoteConfig[] = [];
  constructor(private http: HttpClient) {}

  public async loadAllRemotes(): Promise<RemoteConfig[]> {
    return Promise.all(
      remotesConfigUrl.map((remote) => {
        return this.loadRemoteConfig(
          environment.production ? remote.configUrlProd : remote.configUrlDev
        );
      })
    ).then(() => {
      return this.remotesConfig;
    });
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
              remoteEntry: environment.production
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
