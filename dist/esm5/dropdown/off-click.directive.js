/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
var OffClickDirective = /** @class */ (function () {
    function OffClickDirective() {
        this.onOffClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._clickEvent = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onTouch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._touchEvent = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onDocumentClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event !== this._clickEvent) {
            this.onOffClick.emit(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onDocumentTouch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event !== this._touchEvent) {
            this.onOffClick.emit(event);
        }
    };
    OffClickDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[offClick]',
                },] }
    ];
    /** @nocollapse */
    OffClickDirective.propDecorators = {
        "onOffClick": [{ type: Output, args: ['offClick',] },],
        "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
        "onTouch": [{ type: HostListener, args: ['touchstart', ['$event'],] },],
        "onDocumentClick": [{ type: HostListener, args: ['document:click', ['$event'],] },],
        "onDocumentTouch": [{ type: HostListener, args: ['document:touchstart', ['$event'],] },],
    };
    return OffClickDirective;
}());
export { OffClickDirective };
function OffClickDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OffClickDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OffClickDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    OffClickDirective.propDecorators;
    /** @type {?} */
    OffClickDirective.prototype.onOffClick;
    /** @type {?} */
    OffClickDirective.prototype._clickEvent;
    /** @type {?} */
    OffClickDirective.prototype._touchEvent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmLWNsaWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUlsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7OzswQkFRSixJQUFJLFlBQVksRUFBTzs7Ozs7O0lBTWpELG1DQUFPOzs7O2NBQUMsS0FBaUI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Ozs7OztJQUlwQixtQ0FBTzs7OztjQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsMkNBQWU7Ozs7Y0FBQyxLQUFpQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7Ozs7OztJQUlJLDJDQUFlOzs7O2NBQUMsS0FBaUI7UUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCOzs7Z0JBaENKLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzs7OytCQUdFLE1BQU0sU0FBQyxVQUFVOzRCQUtqQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUtoQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29DQUtyQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0NBT3pDLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7NEJBcENqRDs7U0FhYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCdvZmZDbGljaycpIG9uT2ZmQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcclxuICBwcml2YXRlIF90b3VjaEV2ZW50OiBUb3VjaEV2ZW50O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxyXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbGlja0V2ZW50ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdG91Y2hFdmVudCA9IGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBcclxuICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICE9PSB0aGlzLl90b3VjaEV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19