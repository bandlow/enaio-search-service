import { Component, VERSION } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { EnaioService } from './enaio.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

enum SearchType {
  REPOS,
  USERS,
  TOPICS,
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  searchSubject$ = new Subject<string>();
  results$: Observable<any>;
  searchReposFormControl = new FormControl();
  searchUsersFormControl = new FormControl();
  searchType: SearchType;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private readonly enaioService: EnaioService) {}

  ngOnInit() {
    this.results$ = this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchString) => {
        if ((searchString as any).replace(/\s/g, '')) {          
              return this.enaioService.searchUsers(searchString); 
        }
      })
    );

    this.searchReposFormControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchString) => {
        if (searchString) {
          this.searchType = SearchType.REPOS;
          console.log('Before next');
          this.searchSubject$.next(searchString);
        }
      });

    this.searchUsersFormControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchString) => {
        if (searchString) {
          this.searchType = SearchType.USERS;
          console.log('Before next');
          this.searchSubject$.next(searchString);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
