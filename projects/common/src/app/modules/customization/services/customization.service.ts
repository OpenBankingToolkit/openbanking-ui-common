import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as fileSaver from 'file-saver';
import { Store, select } from '@ngrx/store';

import { BehaviorSubject } from 'rxjs';
import { ForgerockCssVarsService } from './cssvars.service';
import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgerockCustomizationService {
  public isOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected store: Store<any>,
    private cssVarsService: ForgerockCssVarsService,
    @Inject(DOCUMENT) private document: any
  ) {}

  open = async () => {
    await this.cssVarsService.init();
    this.document.body.classList.add('customization-mode');
    this.isOpened$.next(true);
  };

  close = () => this.isOpened$.next(false);
  onOpen = (): BehaviorSubject<boolean> => this.isOpened$;

  export() {
    const exportData = {};

    this.store
      .pipe(
        take(1),
        select(selectors.selectAll)
      )
      .subscribe((state: string | null) => (exportData['imgs'] = state));

    exportData['theme'] = this.cssVarsService.export();

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    fileSaver.saveAs(blob, 'customization.json');
  }
}
