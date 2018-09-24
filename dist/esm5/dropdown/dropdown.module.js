/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';
import { MultiselectDropdownComponent } from './dropdown.component';
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { OffClickDirective } from './off-click.directive';
var MultiselectDropdownModule = /** @class */ (function () {
    function MultiselectDropdownModule() {
    }
    MultiselectDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ReactiveFormsModule],
                    exports: [
                        MultiselectDropdownComponent,
                        MultiSelectSearchFilter,
                    ],
                    declarations: [
                        MultiselectDropdownComponent,
                        MultiSelectSearchFilter,
                        AutofocusDirective,
                        OffClickDirective
                    ],
                },] }
    ];
    return MultiselectDropdownModule;
}());
export { MultiselectDropdownModule };
function MultiselectDropdownModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Z0JBRXpELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7b0JBQzVDLE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7d0JBQzVCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDRCQUE0Qjt3QkFDNUIsdUJBQXVCO3dCQUN2QixrQkFBa0I7d0JBQ2xCLGlCQUFpQjtxQkFDbEI7aUJBQ0Y7O29DQXJCRDs7U0FzQmEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBPZmZDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vb2ZmLWNsaWNrLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXHJcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcclxuICAgIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxyXG4gICAgT2ZmQ2xpY2tEaXJlY3RpdmVcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bk1vZHVsZSB7IH1cclxuIl19