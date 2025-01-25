import { Component, inject } from '@angular/core';
import { SharedModule } from '../../utils/shared.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  imports: [SharedModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {
}
