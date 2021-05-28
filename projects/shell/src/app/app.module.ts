import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService } from 'shared-lib';
import { RemoteConfigService } from 'shared-lib';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [AppComponent, CarouselComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [SessionService, RemoteConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
