import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule} from'@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule} from '@angular/material/dialog';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
const MaterialComponents=[
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatDialogModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatSelectModule]


@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
