import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Inject,
  ComponentFactoryResolver
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ForgerockLayoutSidebarService } from '../../sidebar/sidebar.service';
import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';
import { IForgerockMainLayoutComponents } from '../../models';
import { ForgerockMainLayoutComponentsToken } from '../../tokens';

@Component({
  // tslint:disable-next-line
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  rightNavbar: boolean;
  connected$: Observable<boolean>;
  username$: Observable<string>;
  @Input() type: 'horizontal' | 'vertical' = 'vertical';
  clientName: string = this.configService.get('client.name');
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
  dynamicTarget: ViewContainerRef;
  componentRef: ComponentRef<any>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseSidebarService: ForgerockLayoutSidebarService,
    private configService: ForgerockConfigService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ForgerockMainLayoutComponentsToken)
    private _components: IForgerockMainLayoutComponents
  ) {
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    if (!this._components.toolbar) return;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._components.toolbar);
    this.dynamicTarget.clear();
    this.componentRef = this.dynamicTarget.createComponent(componentFactory);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
