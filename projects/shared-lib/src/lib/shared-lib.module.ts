import { NgModule } from '@angular/core';
import { SharedLibComponent } from './shared-lib.component';
import { SessionService } from './services/session-service';
import { RemoteConfigService } from './services/remote-config-service';

@NgModule({
  declarations: [SharedLibComponent],
  imports: [],
  exports: [SharedLibComponent],
  providers: [SessionService, RemoteConfigService],
})
export class SharedLibModule {}
