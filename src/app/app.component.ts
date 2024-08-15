import { Component, ModuleWithProviders } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RuleTester } from 'eslint';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule ]
})
export class AppComponent {
  title = 'ejemplo';
}





