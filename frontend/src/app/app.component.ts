import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {
  title = 'Angular 11 Crud';

  // SIDENAV
  public onSideNavChange!: boolean;

  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }
}
