import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ConfigStorage, SharedModule} from './shared.module';
import {routes} from './app-routing.module';
import {ExternalAssetsModule,} from '@pichincha/angular-sdk/external-assets';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {environment} from 'src/environments/environment';
import {ExternalAssets} from "./config/external.assets";
import {StorageModule} from "@pichincha/angular-sdk/storage";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpModule.forRoot({
      api_url: environment.apiUrl,
    }),
    StorageModule.forRoot(ConfigStorage),
    ExternalAssetsModule.forRoot(ExternalAssets),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MFModule {}
