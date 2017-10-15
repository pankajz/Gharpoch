import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseholdNeedsPage } from './household-needs';

@NgModule({
  declarations: [
    HouseholdNeedsPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseholdNeedsPage),
  ],
})
export class HouseholdNeedsPageModule {}
