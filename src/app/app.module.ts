import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Cloudinary from 'cloudinary-core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LocationPickComponent } from './location-pick/location-pick.component';
import { MaterialModule } from './material-module';
import { OrderListComponent } from './order-button/order-button.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { OrderFailedComponent } from './order-failed/order-failed.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';
import { PickHeatComponent } from './pick-heat/pick-heat.component';
import { PickSideDishComponent } from './pick-side-dish/pick-side-dish.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import * as fromReducers from './state/reducers/mealStore';


@NgModule({
    declarations: [
        AppComponent,
        ItemListComponent,
        PickSideDishComponent,
        OrderListComponent,
        OrderDialogComponent,
        OrderSuccessfulComponent,
        OrderFailedComponent,
        SideMenuComponent,
        PickHeatComponent,
        HomePageComponent,
        AreYouSureComponent,
        LocationPickComponent,
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatMomentDateModule,
        StoreModule.forRoot(fromReducers.reducer),
        NgxMaterialTimepickerModule.setLocale('cs-CZ'),
        StoreModule.forFeature(fromReducers.mealFeatureKey, fromReducers.reducer),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        BrowserAnimationsModule,
        CloudinaryModule.forRoot(Cloudinary, {
            cloud_name: 'dfm0kilqo'
        } as CloudinaryConfiguration),
        StoreModule.forRoot({}, {})
    ],
    providers: [
        { provide: MatDialogRef, useValue: {} },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
