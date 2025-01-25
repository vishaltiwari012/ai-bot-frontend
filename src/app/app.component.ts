import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { FlowbiteService } from './services/flowbite/flowbite.service';
import { LoginComponent } from "./pages/login/login.component";
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, SidemenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'web-app';
  private auth = inject(AuthService);

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }


  isLoggedIn() {
    return this.auth.isAuthenticated();
  }
}
