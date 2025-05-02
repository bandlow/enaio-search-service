import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { EnaioService } from './enaio.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent,HelloComponent],
  bootstrap: [AppComponent],
  providers: [EnaioService],
})
export class AppModule {}
