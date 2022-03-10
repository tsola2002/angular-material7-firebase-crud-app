import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';
// import { MatIconModule } from '@angular/material/icon';





@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        // MatBadgeModule,
        // MatListModule,
        // MatGridListModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatSelectModule,
        // MatRadioModule,
        // MatDatepickerModule,
        // MatNativeDateModule,
        // MatChipsModule,
        // MatTooltipModule,
        // MatTableModule,
        // MatPaginatorModule
   ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        // MatBadgeModule,
        // MatListModule,
        // MatGridListModule,
        // MatInputModule,
        // MatFormFieldModule,
        // MatSelectModule,
        // MatRadioModule,
        // MatDatepickerModule,
        // MatChipsModule,
        // MatTooltipModule,
        // MatTableModule,
        // MatPaginatorModule
   ],
    providers: [
       //MatDatepickerModule,
   ]
})
export class AngularMaterialModule { }