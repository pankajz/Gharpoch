import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalCareBabyCarePage } from './personal-care-baby-care';

@NgModule({
  declarations: [
    PersonalCareBabyCarePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalCareBabyCarePage),
  ],
})
export class PersonalCareBabyCarePageModule {}
