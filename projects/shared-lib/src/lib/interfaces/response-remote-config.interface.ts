import { ExposesRemote } from './expose-remote.interface';

export interface ResponseRemoteConfig {
  remoteName: string; // remote Name
  remoteEntryProd: string; // url prod entry
  remoteEntryDev: string; // url dev entry
  exposes: ExposesRemote[]; // all modules exposed
}
