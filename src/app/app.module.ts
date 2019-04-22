import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { GstMatchComponent } from './gst-match/gst-match.component';
import { GstTableComponent } from './gst-table/gst-table.component';

import { BusinessService } from './business.service';
import { EventEmitterService } from './event-emitter.service';
import { FilterPlayerPipe } from './filter-player.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GstMatchComponent,
    GstGetComponent,
    GstEditComponent,
    GstTableComponent,
    FilterPlayerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BusinessService,
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
