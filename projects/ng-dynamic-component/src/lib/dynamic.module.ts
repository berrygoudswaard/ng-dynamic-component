import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import {
  ComponentOutletInjectorModule,
  DynamicComponentInjector,
  DynamicComponentInjectorToken,
} from './component-injector';
import { DynamicAttributesModule } from './dynamic-attributes';
import { DynamicDirectivesModule } from './dynamic-directives';
import { DynamicIoModule } from './dynamic-io';
import { DynamicComponent } from './dynamic.component';
import { DynamicComponentModule } from './dynamic.component.module';

/**
 * @deprecated Since v6.0.0 - use more specific module instead:
 * - {@link DynamicIoModule}
 * - {@link DynamicComponentModule}
 * - {@link DynamicAttributesModule}
 * - {@link DynamicDirectivesModule}
 * - {@link ComponentOutletInjectorModule}
 */
@NgModule({
  exports: [
    ComponentOutletInjectorModule,
    DynamicIoModule,
    DynamicComponentModule,
    DynamicAttributesModule,
    DynamicDirectivesModule,
  ],
})
export class DynamicModule {
  /**
   * @deprecated Since v6.0.0 - forRoot is not required anymore.
   * Provide {@link DynamicComponentInjectorToken} on the component level instead of global!
   *
   * **Example:**
   * ```ts
   * @Component({
   *   selector: '...',
   *   providers: [{provide: DynamicComponentInjectorToken, useExisting: MyInjectorComponent}]
   * })
   * class MyInjectorComponent implements DynamicComponentInjector {...}
   * ```
   */
  static forRoot(
    componentInjector: Type<DynamicComponentInjector> = DynamicComponent,
  ): ModuleWithProviders<DynamicModule> {
    return {
      ngModule: DynamicModule,
      providers: [
        {
          provide: DynamicComponentInjectorToken,
          useExisting: componentInjector,
        },
      ],
    };
  }

  /**
   * @deprecated Since v6.0.0 - Passing a list of components is no longer required. Use `DynamicModule.forRoot()` instead.
   */
  static withComponents(
    components: Type<any>[],
    componentInjector?: Type<DynamicComponentInjector>,
  ): ModuleWithProviders<DynamicModule> {
    return DynamicModule.forRoot(componentInjector);
  }
}
