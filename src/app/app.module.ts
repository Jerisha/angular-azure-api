import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavService } from './_services/nav.services';
import { ResolvingoferrorsModule } from './resolvingoferrors/resolvingoferrors.module';
import { AuditreportsModule } from './auditreports/auditreports.module';
import { UicomponentsModule } from './uicomponents/uicomponents.module';
import { MaterialModule } from './_shared/material/material.module';
import { MenuSearchPipe } from './_helper/index';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuSearchPipe,
        PopupComponent        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UicomponentsModule,
    MaterialModule,
    ResolvingoferrorsModule,
    AuditreportsModule
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
