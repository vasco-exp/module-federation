export interface RemoteConfig {
  /* --- For Loading --- */
  remoteName: string; // remote Name
  exposedModule: string; // folder exposed by remote
  remoteEntry: string; // remoteEntry url
  /* --- For Routing --- */
  path: string; // host path by access remote
  displayName: string; // display link name
  ngModuleName: string; // module exposed by remote
}
