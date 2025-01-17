import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  buffer,
  bufferCount,
  combineLatest,
  interval,
  map,
  merge,
  Observable,
  of,
  Subject,
  take,
  withLatestFrom,
  zip,
  zipWith,
} from 'rxjs';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorsComponent {
  public readonly foo$ = interval(500).pipe(take(4));
  public readonly bar$ = interval(300).pipe(take(5));

  public readonly hello$ = interval(500).pipe(
    take(5),
    zipWith(of('H', 'e', 'l', 'l', 'o')),
    map(([_, x]) => x)
  );

  public readonly numbers$ = interval(300).pipe(
    take(7),
    zipWith(of(0, 1, 0, 1, 0, 1, 0)),
    map(([_, x]) => x)
  );

  public operator$!: Observable<any>;
  public operatorName$!: Observable<any>;

  public ngOnInit() {
    // this.mergeOperator();
    // this.combineLatestOperator();
    // this.withLatestFromOperator();
    // this.zipOperator();
    this.bufferOperators();
  }

  public zipOperator() {
    const hello$ = of('h', 'e', 'l', 'l', 'o');
    // const zipOp = zip(this.foo$, this.bar$, (x, y) => x + y);
    const zipOp = zip(this.hello$, this.bar$, (x, y) => x);

    zipOp.subscribe({
      next: (x) => console.log('next ' + x),
      error: (err) => console.log('error ' + err),
      complete: () => console.log('done'),
    });
  }

  public withLatestFromOperator() {
    const mapWithLatestFrom = this.hello$.pipe(
      withLatestFrom(this.numbers$, (s, n) =>
        n === 1 ? s.toUpperCase() : s.toLowerCase()
      )
    );

    mapWithLatestFrom.subscribe({
      next: (x) => console.log('next ' + x),
      error: (err) => console.log('error ' + err),
      complete: () => console.log('done'),
    });
  }

  public mergeOperator() {
    const merged = merge(this.foo$, this.bar$); // Similar to an OR

    merged.subscribe({
      next: (x) => console.log('next ' + x),
      error: (err) => console.log('error ' + err),
      complete: () => console.log('done'),
    });
  }

  public combineLatestOperator() {
    const latest = combineLatest([this.foo$, this.bar$]) // Similar to an AND
      .pipe(map(([x, y]) => x + y));

    latest.subscribe({
      next: (x) => console.log('next ' + x),
      error: (err) => console.log('error ' + err),
      complete: () => console.log('done'),
    });
  }

  public bufferOperators() {
    const bufferOp = this.hello$.pipe(bufferCount(2));

    this.operator$ = bufferOp;

    this.operatorName$ = of('bufferCount');

    bufferOp.subscribe({
      next: (x) => console.log('next ' + x),
      error: (err) => console.log('error ' + err),
      complete: () => console.log('done'),
    });
  }
}
