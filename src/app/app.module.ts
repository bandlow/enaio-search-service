import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { EnaioService } from './enaio.service';

@NgModule({ declarations: [AppComponent, HelloComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, FormsModule, ReactiveFormsModule], providers: [EnaioService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
