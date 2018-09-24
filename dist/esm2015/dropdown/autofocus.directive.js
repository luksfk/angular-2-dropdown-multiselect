/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Host, Input } from '@angular/core';
export class AutofocusDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
    }
    /**
     * @return {?}
     */
    get element() {
        return this.elemRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.focus();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ ssAutofocusChange = changes["ssAutofocus"];
        if (ssAutofocusChange && !ssAutofocusChange.isFirstChange()) {
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.ssAutofocus) {
            return;
        }
        this.element.focus && this.element.focus();
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ssAutofocus]'
            },] }
];
/** @nocollapse */
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Host },] },
];
AutofocusDirective.propDecorators = {
    "ssAutofocus": [{ type: Input },],
};
function AutofocusDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AutofocusDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AutofocusDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AutofocusDirective.propDecorators;
    /**
     * Will set focus if set to falsy value or not set at all
     * @type {?}
     */
    AutofocusDirective.prototype.ssAutofocus;
    /** @type {?} */
    AutofocusDirective.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2F1dG9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBS3JHLE1BQU07Ozs7SUFXSixZQUNrQjtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBQ3BCOzs7O0lBTkwsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQ25DOzs7O0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNkOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyx1QkFBTSxpQkFBaUIsR0FBRyxPQUFPLGVBQVksQ0FBQztRQUU5QyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtLQUNGOzs7O0lBRUQsS0FBSztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUM1Qzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQUptQixVQUFVLHVCQWlCekIsSUFBSTs7OzRCQVBOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbc3NBdXRvZm9jdXNdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b2ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICAvKipcclxuICAgKiBXaWxsIHNldCBmb2N1cyBpZiBzZXQgdG8gZmFsc3kgdmFsdWUgb3Igbm90IHNldCBhdCBhbGxcclxuICAgKi9cclxuICBASW5wdXQoKSBzc0F1dG9mb2N1czogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGVsZW1lbnQoKTogeyBmb2N1cz86IEZ1bmN0aW9uIH0ge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASG9zdCgpIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHNzQXV0b2ZvY3VzQ2hhbmdlID0gY2hhbmdlcy5zc0F1dG9mb2N1cztcclxuXHJcbiAgICBpZiAoc3NBdXRvZm9jdXNDaGFuZ2UgJiYgIXNzQXV0b2ZvY3VzQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIGlmICh0aGlzLnNzQXV0b2ZvY3VzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuZm9jdXMgJiYgdGhpcy5lbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=