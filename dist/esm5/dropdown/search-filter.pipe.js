/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
/**
 * @record
 * @template T
 */
function StringHashMap() { }
function StringHashMap_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [k: string]: T;
    */
}
var MultiSelectSearchFilter = /** @class */ (function () {
    function MultiSelectSearchFilter() {
        this._searchCache = {};
        this._searchCacheInclusive = {};
        this._prevSkippedItems = {};
    }
    /**
     * @param {?} options
     * @param {?=} str
     * @param {?=} limit
     * @param {?=} renderLimit
     * @return {?}
     */
    MultiSelectSearchFilter.prototype.transform = /**
     * @param {?} options
     * @param {?=} str
     * @param {?=} limit
     * @param {?=} renderLimit
     * @return {?}
     */
    function (options, str, limit, renderLimit) {
        if (str === void 0) { str = ''; }
        if (limit === void 0) { limit = 0; }
        if (renderLimit === void 0) { renderLimit = 0; }
        str = str.toLowerCase();
        // Drop cache because options were updated
        if (options !== this._lastOptions) {
            this._lastOptions = options;
            this._searchCache = {};
            this._searchCacheInclusive = {};
            this._prevSkippedItems = {};
        }
        var /** @type {?} */ filteredOpts = this._searchCache.hasOwnProperty(str)
            ? this._searchCache[str]
            : this._doSearch(options, str, limit);
        var /** @type {?} */ isUnderLimit = options.length <= limit;
        return isUnderLimit
            ? filteredOpts
            : this._limitRenderedItems(filteredOpts, renderLimit);
    };
    /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._getSubsetOptions = /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    function (options, prevOptions, prevSearchStr) {
        var /** @type {?} */ prevInclusiveOrIdx = this._searchCacheInclusive[prevSearchStr];
        if (prevInclusiveOrIdx === true) {
            // If have previous results and it was inclusive, do only subsearch
            return prevOptions;
        }
        else if (typeof prevInclusiveOrIdx === 'number') {
            // Or reuse prev results with unchecked ones
            return tslib_1.__spread(prevOptions, options.slice(prevInclusiveOrIdx));
        }
        return options;
    };
    /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._doSearch = /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @return {?}
     */
    function (options, str, limit) {
        var /** @type {?} */ prevStr = str.slice(0, -1);
        var /** @type {?} */ prevResults = this._searchCache[prevStr];
        var /** @type {?} */ prevResultShift = this._prevSkippedItems[prevStr] || 0;
        if (prevResults) {
            options = this._getSubsetOptions(options, prevResults, prevStr);
        }
        var /** @type {?} */ optsLength = options.length;
        var /** @type {?} */ maxFound = limit > 0 ? Math.min(limit, optsLength) : optsLength;
        var /** @type {?} */ regexp = new RegExp(this._escapeRegExp(str), 'i');
        var /** @type {?} */ filteredOpts = [];
        var /** @type {?} */ i = 0, /** @type {?} */ founded = 0, /** @type {?} */ removedFromPrevResult = 0;
        var /** @type {?} */ doesOptionMatch = function (option) { return regexp.test(option.name); };
        var /** @type {?} */ getChildren = function (option) {
            return options.filter(function (child) { return child.parentId === option.id; });
        };
        var /** @type {?} */ getParent = function (option) {
            return options.find(function (parent) { return option.parentId === parent.id; });
        };
        var /** @type {?} */ foundFn = function (item) { filteredOpts.push(item); founded++; };
        var /** @type {?} */ notFoundFn = prevResults ? function () { return removedFromPrevResult++; } : function () { };
        for (; i < optsLength && founded < maxFound; ++i) {
            var /** @type {?} */ option = options[i];
            var /** @type {?} */ directMatch = doesOptionMatch(option);
            if (directMatch) {
                foundFn(option);
                continue;
            }
            if (typeof option.parentId === 'undefined') {
                var /** @type {?} */ childrenMatch = getChildren(option).some(doesOptionMatch);
                if (childrenMatch) {
                    foundFn(option);
                    continue;
                }
            }
            if (typeof option.parentId !== 'undefined') {
                var /** @type {?} */ parentMatch = doesOptionMatch(getParent(option));
                if (parentMatch) {
                    foundFn(option);
                    continue;
                }
            }
            notFoundFn();
        }
        var /** @type {?} */ totalIterations = i + prevResultShift;
        this._searchCache[str] = filteredOpts;
        this._searchCacheInclusive[str] = i === optsLength || totalIterations;
        this._prevSkippedItems[str] = removedFromPrevResult + prevResultShift;
        return filteredOpts;
    };
    /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._limitRenderedItems = /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    function (items, limit) {
        return items.length > limit && limit > 0 ? items.slice(0, limit) : items;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._escapeRegExp = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };
    MultiSelectSearchFilter.decorators = [
        { type: Pipe, args: [{
                    name: 'searchFilter'
                },] }
    ];
    return MultiSelectSearchFilter;
}());
export { MultiSelectSearchFilter };
function MultiSelectSearchFilter_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiSelectSearchFilter.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiSelectSearchFilter.ctorParameters;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._lastOptions;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._searchCache;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._searchCacheInclusive;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._prevSkippedItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7NEJBY1UsRUFBRTtxQ0FDRyxFQUFFO2lDQUNoQixFQUFFOzs7Ozs7Ozs7SUFFckQsMkNBQVM7Ozs7Ozs7SUFBVCxVQUNFLE9BQTZCLEVBQzdCLEdBQVEsRUFDUixLQUFTLEVBQ1QsV0FBZTtRQUZmLG9CQUFBLEVBQUEsUUFBUTtRQUNSLHNCQUFBLEVBQUEsU0FBUztRQUNULDRCQUFBLEVBQUEsZUFBZTtRQUVmLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBR3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7U0FDN0I7UUFFRCxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLHFCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUU3QyxNQUFNLENBQUMsWUFBWTtZ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QyxLQUFLLFVBQVUsSUFBSSxlQUFlLENBQUM7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixHQUFHLGVBQWUsQ0FBQztRQUV0RSxNQUFNLENBQUMsWUFBWSxDQUFDOzs7Ozs7OztJQUdkLHFEQUFtQjs7Ozs7O2NBQUksS0FBVSxFQUFFLEtBQWE7UUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUduRSwrQ0FBYTs7OztjQUFDLEdBQVc7UUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUM7OztnQkEzSHJFLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsY0FBYztpQkFDckI7O2tDQVZEOztTQVdhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElNdWx0aVNlbGVjdE9wdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuaW50ZXJmYWNlIFN0cmluZ0hhc2hNYXA8VD4ge1xyXG4gIFtrOiBzdHJpbmddOiBUO1xyXG59XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3NlYXJjaEZpbHRlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHByaXZhdGUgX2xhc3RPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXTtcclxuICBwcml2YXRlIF9zZWFyY2hDYWNoZTogU3RyaW5nSGFzaE1hcDxJTXVsdGlTZWxlY3RPcHRpb25bXT4gPSB7fTtcclxuICBwcml2YXRlIF9zZWFyY2hDYWNoZUluY2x1c2l2ZTogU3RyaW5nSGFzaE1hcDxib29sZWFuIHwgbnVtYmVyPiA9IHt9O1xyXG4gIHByaXZhdGUgX3ByZXZTa2lwcGVkSXRlbXM6IFN0cmluZ0hhc2hNYXA8bnVtYmVyPiA9IHt9O1xyXG5cclxuICB0cmFuc2Zvcm0oXHJcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcclxuICAgIHN0ciA9ICcnLFxyXG4gICAgbGltaXQgPSAwLFxyXG4gICAgcmVuZGVyTGltaXQgPSAwXHJcbiAgKTogSU11bHRpU2VsZWN0T3B0aW9uW10ge1xyXG4gICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgLy8gRHJvcCBjYWNoZSBiZWNhdXNlIG9wdGlvbnMgd2VyZSB1cGRhdGVkXHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdGhpcy5fbGFzdE9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5fbGFzdE9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICB0aGlzLl9zZWFyY2hDYWNoZSA9IHt9O1xyXG4gICAgICB0aGlzLl9zZWFyY2hDYWNoZUluY2x1c2l2ZSA9IHt9O1xyXG4gICAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyZWRPcHRzID0gdGhpcy5fc2VhcmNoQ2FjaGUuaGFzT3duUHJvcGVydHkoc3RyKVxyXG4gICAgICA/IHRoaXMuX3NlYXJjaENhY2hlW3N0cl1cclxuICAgICAgOiB0aGlzLl9kb1NlYXJjaChvcHRpb25zLCBzdHIsIGxpbWl0KTtcclxuXHJcbiAgICBjb25zdCBpc1VuZGVyTGltaXQgPSBvcHRpb25zLmxlbmd0aCA8PSBsaW1pdDtcclxuXHJcbiAgICByZXR1cm4gaXNVbmRlckxpbWl0XHJcbiAgICAgID8gZmlsdGVyZWRPcHRzXHJcbiAgICAgIDogdGhpcy5fbGltaXRSZW5kZXJlZEl0ZW1zKGZpbHRlcmVkT3B0cywgcmVuZGVyTGltaXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0U3Vic2V0T3B0aW9ucyhcclxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxyXG4gICAgcHJldk9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxyXG4gICAgcHJldlNlYXJjaFN0cjogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwcmV2SW5jbHVzaXZlT3JJZHggPSB0aGlzLl9zZWFyY2hDYWNoZUluY2x1c2l2ZVtwcmV2U2VhcmNoU3RyXTtcclxuXHJcbiAgICBpZiAocHJldkluY2x1c2l2ZU9ySWR4ID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIElmIGhhdmUgcHJldmlvdXMgcmVzdWx0cyBhbmQgaXQgd2FzIGluY2x1c2l2ZSwgZG8gb25seSBzdWJzZWFyY2hcclxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJldkluY2x1c2l2ZU9ySWR4ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAvLyBPciByZXVzZSBwcmV2IHJlc3VsdHMgd2l0aCB1bmNoZWNrZWQgb25lc1xyXG4gICAgICByZXR1cm4gWy4uLnByZXZPcHRpb25zLCAuLi5vcHRpb25zLnNsaWNlKHByZXZJbmNsdXNpdmVPcklkeCldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZG9TZWFyY2gob3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sIHN0cjogc3RyaW5nLCBsaW1pdDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwcmV2U3RyID0gc3RyLnNsaWNlKDAsIC0xKTtcclxuICAgIGNvbnN0IHByZXZSZXN1bHRzID0gdGhpcy5fc2VhcmNoQ2FjaGVbcHJldlN0cl07XHJcbiAgICBjb25zdCBwcmV2UmVzdWx0U2hpZnQgPSB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zW3ByZXZTdHJdIHx8IDA7XHJcblxyXG4gICAgaWYgKHByZXZSZXN1bHRzKSB7XHJcbiAgICAgIG9wdGlvbnMgPSB0aGlzLl9nZXRTdWJzZXRPcHRpb25zKG9wdGlvbnMsIHByZXZSZXN1bHRzLCBwcmV2U3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRzTGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XHJcbiAgICBjb25zdCBtYXhGb3VuZCA9IGxpbWl0ID4gMCA/IE1hdGgubWluKGxpbWl0LCBvcHRzTGVuZ3RoKSA6IG9wdHNMZW5ndGg7XHJcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKHRoaXMuX2VzY2FwZVJlZ0V4cChzdHIpLCAnaScpO1xyXG4gICAgY29uc3QgZmlsdGVyZWRPcHRzOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIGxldCBpID0gMCwgZm91bmRlZCA9IDAsIHJlbW92ZWRGcm9tUHJldlJlc3VsdCA9IDA7XHJcblxyXG4gICAgY29uc3QgZG9lc09wdGlvbk1hdGNoID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiByZWdleHAudGVzdChvcHRpb24ubmFtZSk7XHJcbiAgICBjb25zdCBnZXRDaGlsZHJlbiA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cclxuICAgICAgb3B0aW9ucy5maWx0ZXIoY2hpbGQgPT4gY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5pZCk7XHJcbiAgICBjb25zdCBnZXRQYXJlbnQgPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XHJcbiAgICAgIG9wdGlvbnMuZmluZChwYXJlbnQgPT4gb3B0aW9uLnBhcmVudElkID09PSBwYXJlbnQuaWQpO1xyXG4gICAgY29uc3QgZm91bmRGbiA9IChpdGVtOiBhbnkpID0+IHsgZmlsdGVyZWRPcHRzLnB1c2goaXRlbSk7IGZvdW5kZWQrKzsgfTtcclxuICAgIGNvbnN0IG5vdEZvdW5kRm4gPSBwcmV2UmVzdWx0cyA/ICgpID0+IHJlbW92ZWRGcm9tUHJldlJlc3VsdCsrIDogKCkgPT4geyB9O1xyXG5cclxuICAgIGZvciAoOyBpIDwgb3B0c0xlbmd0aCAmJiBmb3VuZGVkIDwgbWF4Rm91bmQ7ICsraSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2ldO1xyXG4gICAgICBjb25zdCBkaXJlY3RNYXRjaCA9IGRvZXNPcHRpb25NYXRjaChvcHRpb24pO1xyXG5cclxuICAgICAgaWYgKGRpcmVjdE1hdGNoKSB7XHJcbiAgICAgICAgZm91bmRGbihvcHRpb24pO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbi5wYXJlbnRJZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbk1hdGNoID0gZ2V0Q2hpbGRyZW4ob3B0aW9uKS5zb21lKGRvZXNPcHRpb25NYXRjaCk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZHJlbk1hdGNoKSB7XHJcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKGdldFBhcmVudChvcHRpb24pKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmVudE1hdGNoKSB7XHJcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vdEZvdW5kRm4oKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b3RhbEl0ZXJhdGlvbnMgPSBpICsgcHJldlJlc3VsdFNoaWZ0O1xyXG5cclxuICAgIHRoaXMuX3NlYXJjaENhY2hlW3N0cl0gPSBmaWx0ZXJlZE9wdHM7XHJcbiAgICB0aGlzLl9zZWFyY2hDYWNoZUluY2x1c2l2ZVtzdHJdID0gaSA9PT0gb3B0c0xlbmd0aCB8fCB0b3RhbEl0ZXJhdGlvbnM7XHJcbiAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zW3N0cl0gPSByZW1vdmVkRnJvbVByZXZSZXN1bHQgKyBwcmV2UmVzdWx0U2hpZnQ7XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcmVkT3B0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2xpbWl0UmVuZGVyZWRJdGVtczxUPihpdGVtczogVFtdLCBsaW1pdDogbnVtYmVyKTogVFtdIHtcclxuICAgIHJldHVybiBpdGVtcy5sZW5ndGggPiBsaW1pdCAmJiBsaW1pdCA+IDAgPyBpdGVtcy5zbGljZSgwLCBsaW1pdCkgOiBpdGVtcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2VzY2FwZVJlZ0V4cChzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==