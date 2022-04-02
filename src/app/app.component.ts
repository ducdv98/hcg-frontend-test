import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ProjectQuery } from '@app/project/state/project/project.query';
import { ProjectService } from '@app/project/state/project/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public projectQuery: ProjectQuery,
              private _projectService: ProjectService,
              private _cdr: ChangeDetectorRef) {
    this._projectService.setLoading(true);
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

}
