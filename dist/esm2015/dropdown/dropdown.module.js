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
export class MultiselectDropdownModule {
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
function MultiselectDropdownModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWUxRCxNQUFNOzs7WUFiTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO2dCQUM1QyxPQUFPLEVBQUU7b0JBQ1AsNEJBQTRCO29CQUM1Qix1QkFBdUI7aUJBQ3hCO2dCQUNELFlBQVksRUFBRTtvQkFDWiw0QkFBNEI7b0JBQzVCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQXV0b2ZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRvZm9jdXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXIucGlwZSc7XHJcbmltcG9ydCB7IE9mZkNsaWNrRGlyZWN0aXZlIH0gZnJvbSAnLi9vZmYtY2xpY2suZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcclxuICAgIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50LFxyXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXHJcbiAgICBBdXRvZm9jdXNEaXJlY3RpdmUsXHJcbiAgICBPZmZDbGlja0RpcmVjdGl2ZVxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aXNlbGVjdERyb3Bkb3duTW9kdWxlIHsgfVxyXG4iXX0=