import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './Authentication/sign-in/sign-in.component';
import { HomeComponent } from './Home/view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TuiLineChartModule } from '@taiga-ui/addon-charts';
import { TuiArcChartModule } from '@taiga-ui/addon-charts';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { TuiBarChartModule } from '@taiga-ui/addon-charts';
import { DashboardComponent } from "./Home/Contents/Dashboard/dashboard.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from "./Loader/interceptor.service";
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { workerComponent } from "./Home/Contents/Worker/worker.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { WorkerInfoComponent } from "./WorkerInfo/view.component";
import { PersonalDetailsComponent } from "./WorkerInfo/PersonalDetails/personal-details.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FamilyDetailsComponent } from './WorkerInfo/FamilyDetails/family-details.component';
import { ResidenceDetailsComponent } from './WorkerInfo/ResidenceDetilas/residence-details.component';
import { WorkDetailsComponent } from './WorkerInfo/WorkDetails/work-details.component';
import {
  TUI_SANITIZER,
  TuiActiveZoneModule,
  TuiAutoFocusModule,
  TuiElementModule,
  TuiFilterPipeModule,
  TuiLetModule,
  TuiMapperPipeModule,
  TuiMediaModule,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownControllerModule,
  TuiDropdownModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiGroupModule,
  TuiHintControllerModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiManualHintModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiNotificationsModule,
  TuiPointerHintModule,
  TuiPrimitiveCheckboxModule,
  TuiPrimitiveTextfieldModule,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiActionModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiBadgeModule,
  TuiBreadcrumbsModule,
  TuiCalendarMonthModule,
  TuiCalendarRangeModule,
  TuiCheckboxBlockModule,
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiDropdownContextModule,
  TuiDropdownSelectionModule,
  TuiFieldErrorModule,
  TuiFilterModule,
  TuiHighlightModule,
  TuiInputCopyModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputDateTimeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputModule,
  TuiInputMonthModule,
  TuiInputMonthRangeModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiInputTagModule,
  TuiInputTimeModule,
  TuiIslandModule,
  TuiLazyLoadingModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiPaginationModule,
  TuiPresentModule,
  TuiProgressModule,
  TuiProjectClassModule,
  TuiFilterByInputPipeModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule,
  TuiRadioListModule,
  TuiRadioModule,
  TuiSelectModule,
  TuiSliderModule,
  TuiStepperModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiToggleModule,
} from '@taiga-ui/kit';


import * as icons from '@taiga-ui/icons';

import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    workerComponent,
    WorkerInfoComponent,
    PersonalDetailsComponent,
    FamilyDetailsComponent,
    ResidenceDetailsComponent,
    WorkDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    TuiLineChartModule,
    TuiArcChartModule,
    TuiPieChartModule,
    TuiBarChartModule,
    HttpClientModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Modules for main app.module that should be add once
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    // Modules for your app modules where you use our components
    TuiAccordionModule,
    TuiActionModule,
    TuiActiveZoneModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiCalendarRangeModule,
    TuiCalendarMonthModule,

    TuiCheckboxModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiPrimitiveCheckboxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiDropdownContextModule,
    TuiHostedDropdownModule,
    TuiErrorModule,
    TuiExpandModule,
    TuiFieldErrorModule,
    TuiFilterModule,
    TuiGroupModule,
    TuiMarkerIconModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateTimeModule,
    TuiInputFileModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputDateRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputPhoneInternationalModule,
    TuiPrimitiveTextfieldModule,
    TuiTextAreaModule,
    TuiIslandModule,
    TuiLabelModule,
    TuiLineClampModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiRadioModule,
    TuiRadioBlockModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiScrollbarModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiSliderModule,
    TuiSvgModule,
    TuiTagModule,
    TuiToggleModule,
    TuiTooltipModule,
    TuiBreadcrumbsModule,
    TuiPaginationModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiAutoFocusModule,
    TuiDropdownModule,
    TuiDropdownSelectionModule,
    TuiElementModule,
    TuiHighlightModule,
    TuiHintModule,
    TuiLazyLoadingModule,
    TuiManualHintModule,
    TuiPointerHintModule,
    TuiLetModule,
    TuiMediaModule,
    TuiModeModule,
    TuiPresentModule,
    TuiProgressModule,
    TuiDropdownControllerModule,
    TuiHintControllerModule,
    TuiTextfieldControllerModule,
    TuiFilterPipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiMapperPipeModule,
    TuiProjectClassModule,
    TuiFilterByInputPipeModule,
    RouterModule.forRoot([])
],
// ,schemas: [
//   CUSTOM_ELEMENTS_SCHEMA
// ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer,multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService,multi : true},
    DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}