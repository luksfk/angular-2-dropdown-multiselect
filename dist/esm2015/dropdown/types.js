/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IMultiSelectOption() { }
function IMultiSelectOption_tsickle_Closure_declarations() {
    /** @type {?} */
    IMultiSelectOption.prototype.id;
    /** @type {?} */
    IMultiSelectOption.prototype.name;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.disabled;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.isLabel;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.parentId;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.params;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.classes;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.image;
}
/**
 * @record
 */
export function IMultiSelectSettings() { }
function IMultiSelectSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.pullRight;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.enableSearch;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.closeOnClickOutside;
    /**
     * 0 - By default
     * If `enableSearch=true` and total amount of items more then `searchRenderLimit` (0 - No limit)
     * then render items only when user typed more then or equal `searchRenderAfter` charachters
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchRenderLimit;
    /**
     * 3 - By default
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchRenderAfter;
    /**
     * 0 - By default
     * If >0 will render only N first items
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchMaxLimit;
    /**
     * 0 - By default
     * Used with searchMaxLimit to further limit rendering for optimization
     * Should be less than searchMaxLimit to take effect
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchMaxRenderedItems;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.checkedStyle;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.buttonClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.itemClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.containerClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.selectionLimit;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.minSelectionLimit;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.closeOnSelect;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.autoUnselect;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.showCheckAll;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.showUncheckAll;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.fixedTitle;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.dynamicTitleMaxItems;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.displayAllSelectedText;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.isLazyLoad;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.loadViewDistance;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.stopScrollPropagation;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.selectAddedValues;
    /**
     * false - By default
     * If activated label IDs don't count and won't be written to the model.
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.ignoreLabels;
    /**
     * false - By default
     * If activated, the title will show selections in the order they were selected.
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.maintainSelectionOrderInTitle;
    /**
     * \@default true
     * Set the focus back to the input control when the dropdown closed
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.focusBack;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.useArray;
}
/**
 * @record
 */
export function IMultiSelectTexts() { }
function IMultiSelectTexts_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checkAll;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.uncheckAll;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checked;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checkedPlural;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchPlaceholder;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchEmptyResult;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchNoRenderText;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.defaultTitle;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.allSelected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvIiwic291cmNlcyI6WyJkcm9wZG93bi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJTXVsdGlTZWxlY3RPcHRpb24ge1xyXG4gIGlkOiBhbnk7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBpc0xhYmVsPzogYm9vbGVhbjtcclxuICBwYXJlbnRJZD86IGFueTtcclxuICBwYXJhbXM/OiBhbnk7XHJcbiAgY2xhc3Nlcz86IHN0cmluZztcclxuICBpbWFnZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTXVsdGlTZWxlY3RTZXR0aW5ncyB7XHJcbiAgcHVsbFJpZ2h0PzogYm9vbGVhbjtcclxuICBlbmFibGVTZWFyY2g/OiBib29sZWFuO1xyXG4gIGNsb3NlT25DbGlja091dHNpZGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIDAgLSBCeSBkZWZhdWx0XHJcbiAgICogSWYgYGVuYWJsZVNlYXJjaD10cnVlYCBhbmQgdG90YWwgYW1vdW50IG9mIGl0ZW1zIG1vcmUgdGhlbiBgc2VhcmNoUmVuZGVyTGltaXRgICgwIC0gTm8gbGltaXQpXHJcbiAgICogdGhlbiByZW5kZXIgaXRlbXMgb25seSB3aGVuIHVzZXIgdHlwZWQgbW9yZSB0aGVuIG9yIGVxdWFsIGBzZWFyY2hSZW5kZXJBZnRlcmAgY2hhcmFjaHRlcnNcclxuICAgKi9cclxuICBzZWFyY2hSZW5kZXJMaW1pdD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiAzIC0gQnkgZGVmYXVsdFxyXG4gICAqL1xyXG4gIHNlYXJjaFJlbmRlckFmdGVyPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIDAgLSBCeSBkZWZhdWx0XHJcbiAgICogSWYgPjAgd2lsbCByZW5kZXIgb25seSBOIGZpcnN0IGl0ZW1zXHJcbiAgICovXHJcbiAgc2VhcmNoTWF4TGltaXQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogMCAtIEJ5IGRlZmF1bHRcclxuICAgKiBVc2VkIHdpdGggc2VhcmNoTWF4TGltaXQgdG8gZnVydGhlciBsaW1pdCByZW5kZXJpbmcgZm9yIG9wdGltaXphdGlvblxyXG4gICAqIFNob3VsZCBiZSBsZXNzIHRoYW4gc2VhcmNoTWF4TGltaXQgdG8gdGFrZSBlZmZlY3RcclxuICAgKi9cclxuICBzZWFyY2hNYXhSZW5kZXJlZEl0ZW1zPzogbnVtYmVyO1xyXG4gIGNoZWNrZWRTdHlsZT86ICdjaGVja2JveGVzJyB8ICdnbHlwaGljb24nIHwgJ2ZvbnRhd2Vzb21lJyB8ICd2aXN1YWwnO1xyXG4gIGJ1dHRvbkNsYXNzZXM/OiBzdHJpbmc7XHJcbiAgaXRlbUNsYXNzZXM/OiBzdHJpbmc7XHJcbiAgY29udGFpbmVyQ2xhc3Nlcz86IHN0cmluZztcclxuICBzZWxlY3Rpb25MaW1pdD86IG51bWJlcjtcclxuICBtaW5TZWxlY3Rpb25MaW1pdD86IG51bWJlcjtcclxuICBjbG9zZU9uU2VsZWN0PzogYm9vbGVhbjtcclxuICBhdXRvVW5zZWxlY3Q/OiBib29sZWFuO1xyXG4gIHNob3dDaGVja0FsbD86IGJvb2xlYW47XHJcbiAgc2hvd1VuY2hlY2tBbGw/OiBib29sZWFuO1xyXG4gIGZpeGVkVGl0bGU/OiBib29sZWFuO1xyXG4gIGR5bmFtaWNUaXRsZU1heEl0ZW1zPzogbnVtYmVyO1xyXG4gIG1heEhlaWdodD86IHN0cmluZztcclxuICBkaXNwbGF5QWxsU2VsZWN0ZWRUZXh0PzogYm9vbGVhbjtcclxuICBpc0xhenlMb2FkPzogYm9vbGVhbjtcclxuICBsb2FkVmlld0Rpc3RhbmNlPzogbnVtYmVyO1xyXG4gIHN0b3BTY3JvbGxQcm9wYWdhdGlvbj86IGJvb2xlYW47XHJcbiAgc2VsZWN0QWRkZWRWYWx1ZXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIGZhbHNlIC0gQnkgZGVmYXVsdFxyXG4gICAqIElmIGFjdGl2YXRlZCBsYWJlbCBJRHMgZG9uJ3QgY291bnQgYW5kIHdvbid0IGJlIHdyaXR0ZW4gdG8gdGhlIG1vZGVsLlxyXG4gICAqL1xyXG4gIGlnbm9yZUxhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogZmFsc2UgLSBCeSBkZWZhdWx0XHJcbiAgICogSWYgYWN0aXZhdGVkLCB0aGUgdGl0bGUgd2lsbCBzaG93IHNlbGVjdGlvbnMgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBtYWludGFpblNlbGVjdGlvbk9yZGVySW5UaXRsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAqIFNldCB0aGUgZm9jdXMgYmFjayB0byB0aGUgaW5wdXQgY29udHJvbCB3aGVuIHRoZSBkcm9wZG93biBjbG9zZWRcclxuICAgKi9cclxuICBmb2N1c0JhY2s/OiBib29sZWFuO1xyXG4gIHVzZUFycmF5PzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTXVsdGlTZWxlY3RUZXh0cyB7XHJcbiAgY2hlY2tBbGw/OiBzdHJpbmc7XHJcbiAgdW5jaGVja0FsbD86IHN0cmluZztcclxuICBjaGVja2VkPzogc3RyaW5nO1xyXG4gIGNoZWNrZWRQbHVyYWw/OiBzdHJpbmc7XHJcbiAgc2VhcmNoUGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgc2VhcmNoRW1wdHlSZXN1bHQ/OiBzdHJpbmc7XHJcbiAgc2VhcmNoTm9SZW5kZXJUZXh0Pzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUaXRsZT86IHN0cmluZztcclxuICBhbGxTZWxlY3RlZD86IHN0cmluZztcclxufVxyXG4iXX0=