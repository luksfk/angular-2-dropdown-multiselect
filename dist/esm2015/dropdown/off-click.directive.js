/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
export class OffClickDirective {
    constructor() {
        this.onOffClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._clickEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouch(event) {
        this._touchEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (event !== this._clickEvent) {
            this.onOffClick.emit(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentTouch(event) {
        if (event !== this._touchEvent) {
            this.onOffClick.emit(event);
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmLWNsaWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUlsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkMsTUFBTTs7MEJBQzZCLElBQUksWUFBWSxFQUFPOzs7Ozs7SUFNakQsT0FBTyxDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsT0FBTyxDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsZUFBZSxDQUFDLEtBQWlCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7Ozs7O0lBSUksZUFBZSxDQUFDLEtBQWlCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7OztZQWhDSixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7OzJCQUdFLE1BQU0sU0FBQyxVQUFVO3dCQUtqQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQUtoQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQUtyQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBT3pDLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIb3N0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnW29mZkNsaWNrXScsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmQ2xpY2tEaXJlY3RpdmUge1xyXG4gIEBPdXRwdXQoJ29mZkNsaWNrJykgb25PZmZDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwcml2YXRlIF9jbGlja0V2ZW50OiBNb3VzZUV2ZW50O1xyXG4gIHByaXZhdGUgX3RvdWNoRXZlbnQ6IFRvdWNoRXZlbnQ7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgXHJcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NsaWNrRXZlbnQgPSBldmVudDtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvblRvdWNoKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl90b3VjaEV2ZW50ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pIFxyXG4gIHB1YmxpYyBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCAhPT0gdGhpcy5fY2xpY2tFdmVudCkge1xyXG4gICAgICB0aGlzLm9uT2ZmQ2xpY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Eb2N1bWVudFRvdWNoKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX3RvdWNoRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=