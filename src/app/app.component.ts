import { Component } from '@angular/core';
import { map, merge, Observable, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'task-progress-rxjs';

  /**
   * Start counting from 0
   * When an Async task starts, count +1
   * When an Async task completes, coun -1
   */

  public startingValue = 0;
  public taskStarts = new Observable();
  public taskCompletions = new Observable();
  public showSpinner = new Observable();

  public loadUp = this.taskStarts.pipe(map(() => 1));
  public loadDown = this.taskCompletions.pipe(map(() => -1));

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
  // Events:

  public loadVariation = merge(this.loadUp, this.loadDown);
  public currentLoadCount = this.loadVariation.pipe(
    scan(
      (totalCurrentLoads, changeInLoads) => totalCurrentLoads + changeInLoads,
      this.startingValue
    )
  );
}
