/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class MultiSelectSearchFilter {
    constructor() {
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
    transform(options, str = '', limit = 0, renderLimit = 0) {
        str = str.toLowerCase();
        // Drop cache because options were updated
        if (options !== this._lastOptions) {
            this._lastOptions = options;
            this._searchCache = {};
            this._searchCacheInclusive = {};
            this._prevSkippedItems = {};
        }
        const /** @type {?} */ filteredOpts = this._searchCache.hasOwnProperty(str)
            ? this._searchCache[str]
            : this._doSearch(options, str, limit);
        const /** @type {?} */ isUnderLimit = options.length <= limit;
        return isUnderLimit
            ? filteredOpts
            : this._limitRenderedItems(filteredOpts, renderLimit);
    }
    /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    _getSubsetOptions(options, prevOptions, prevSearchStr) {
        const /** @type {?} */ prevInclusiveOrIdx = this._searchCacheInclusive[prevSearchStr];
        if (prevInclusiveOrIdx === true) {
            // If have previous results and it was inclusive, do only subsearch
            return prevOptions;
        }
        else if (typeof prevInclusiveOrIdx === 'number') {
            // Or reuse prev results with unchecked ones
            return [...prevOptions, ...options.slice(prevInclusiveOrIdx)];
        }
        return options;
    }
    /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @return {?}
     */
    _doSearch(options, str, limit) {
        const /** @type {?} */ prevStr = str.slice(0, -1);
        const /** @type {?} */ prevResults = this._searchCache[prevStr];
        const /** @type {?} */ prevResultShift = this._prevSkippedItems[prevStr] || 0;
        if (prevResults) {
            options = this._getSubsetOptions(options, prevResults, prevStr);
        }
        const /** @type {?} */ optsLength = options.length;
        const /** @type {?} */ maxFound = limit > 0 ? Math.min(limit, optsLength) : optsLength;
        const /** @type {?} */ regexp = new RegExp(this._escapeRegExp(str), 'i');
        const /** @type {?} */ filteredOpts = [];
        let /** @type {?} */ i = 0, /** @type {?} */ founded = 0, /** @type {?} */ removedFromPrevResult = 0;
        const /** @type {?} */ doesOptionMatch = (option) => regexp.test(option.name);
        const /** @type {?} */ getChildren = (option) => options.filter(child => child.parentId === option.id);
        const /** @type {?} */ getParent = (option) => options.find(parent => option.parentId === parent.id);
        const /** @type {?} */ foundFn = (item) => { filteredOpts.push(item); founded++; };
        const /** @type {?} */ notFoundFn = prevResults ? () => removedFromPrevResult++ : () => { };
        for (; i < optsLength && founded < maxFound; ++i) {
            const /** @type {?} */ option = options[i];
            const /** @type {?} */ directMatch = doesOptionMatch(option);
            if (directMatch) {
                foundFn(option);
                continue;
            }
            if (typeof option.parentId === 'undefined') {
                const /** @type {?} */ childrenMatch = getChildren(option).some(doesOptionMatch);
                if (childrenMatch) {
                    foundFn(option);
                    continue;
                }
            }
            if (typeof option.parentId !== 'undefined') {
                const /** @type {?} */ parentMatch = doesOptionMatch(getParent(option));
                if (parentMatch) {
                    foundFn(option);
                    continue;
                }
            }
            notFoundFn();
        }
        const /** @type {?} */ totalIterations = i + prevResultShift;
        this._searchCache[str] = filteredOpts;
        this._searchCacheInclusive[str] = i === optsLength || totalIterations;
        this._prevSkippedItems[str] = removedFromPrevResult + prevResultShift;
        return filteredOpts;
    }
    /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    _limitRenderedItems(items, limit) {
        return items.length > limit && limit > 0 ? items.slice(0, limit) : items;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    _escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
}
MultiSelectSearchFilter.decorators = [
    { type: Pipe, args: [{
                name: 'searchFilter'
            },] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUFXcEQsTUFBTTs7NEJBR3dELEVBQUU7cUNBQ0csRUFBRTtpQ0FDaEIsRUFBRTs7Ozs7Ozs7O0lBRXJELFNBQVMsQ0FDUCxPQUE2QixFQUM3QixHQUFHLEdBQUcsRUFBRSxFQUNSLEtBQUssR0FBRyxDQUFDLEVBQ1QsV0FBVyxHQUFHLENBQUM7UUFFZixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUd4QixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1NBQzdCO1FBRUQsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7WUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qyx1QkFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFFN0MsTUFBTSxDQUFDLFlBQVk7WUFDakIsQ0FBQyxDQUFDLFlBQVk7WUFDZCxDQUFDLENBQUMs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LENBQUMsR0FBRyxxQkFBcUIsR0FBRyxlQUFlLENBQUM7UUFFdEUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7Ozs7Ozs7SUFHZCxtQkFBbUIsQ0FBSSxLQUFVLEVBQUUsS0FBYTtRQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR25FLGFBQWEsQ0FBQyxHQUFXO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7O1lBM0hyRSxJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGNBQWM7YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24gfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmludGVyZmFjZSBTdHJpbmdIYXNoTWFwPFQ+IHtcclxuICBbazogc3RyaW5nXTogVDtcclxufVxyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdzZWFyY2hGaWx0ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwcml2YXRlIF9sYXN0T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW107XHJcbiAgcHJpdmF0ZSBfc2VhcmNoQ2FjaGU6IFN0cmluZ0hhc2hNYXA8SU11bHRpU2VsZWN0T3B0aW9uW10+ID0ge307XHJcbiAgcHJpdmF0ZSBfc2VhcmNoQ2FjaGVJbmNsdXNpdmU6IFN0cmluZ0hhc2hNYXA8Ym9vbGVhbiB8IG51bWJlcj4gPSB7fTtcclxuICBwcml2YXRlIF9wcmV2U2tpcHBlZEl0ZW1zOiBTdHJpbmdIYXNoTWFwPG51bWJlcj4gPSB7fTtcclxuXHJcbiAgdHJhbnNmb3JtKFxyXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBzdHIgPSAnJyxcclxuICAgIGxpbWl0ID0gMCxcclxuICAgIHJlbmRlckxpbWl0ID0gMFxyXG4gICk6IElNdWx0aVNlbGVjdE9wdGlvbltdIHtcclxuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8vIERyb3AgY2FjaGUgYmVjYXVzZSBvcHRpb25zIHdlcmUgdXBkYXRlZFxyXG4gICAgaWYgKG9wdGlvbnMgIT09IHRoaXMuX2xhc3RPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuX2xhc3RPcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGUgPSB7fTtcclxuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmUgPSB7fTtcclxuICAgICAgdGhpcy5fcHJldlNraXBwZWRJdGVtcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcmVkT3B0cyA9IHRoaXMuX3NlYXJjaENhY2hlLmhhc093blByb3BlcnR5KHN0cilcclxuICAgICAgPyB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdXHJcbiAgICAgIDogdGhpcy5fZG9TZWFyY2gob3B0aW9ucywgc3RyLCBsaW1pdCk7XHJcblxyXG4gICAgY29uc3QgaXNVbmRlckxpbWl0ID0gb3B0aW9ucy5sZW5ndGggPD0gbGltaXQ7XHJcblxyXG4gICAgcmV0dXJuIGlzVW5kZXJMaW1pdFxyXG4gICAgICA/IGZpbHRlcmVkT3B0c1xyXG4gICAgICA6IHRoaXMuX2xpbWl0UmVuZGVyZWRJdGVtcyhmaWx0ZXJlZE9wdHMsIHJlbmRlckxpbWl0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFN1YnNldE9wdGlvbnMoXHJcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcclxuICAgIHByZXZPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcclxuICAgIHByZXZTZWFyY2hTdHI6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgcHJldkluY2x1c2l2ZU9ySWR4ID0gdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbcHJldlNlYXJjaFN0cl07XHJcblxyXG4gICAgaWYgKHByZXZJbmNsdXNpdmVPcklkeCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBJZiBoYXZlIHByZXZpb3VzIHJlc3VsdHMgYW5kIGl0IHdhcyBpbmNsdXNpdmUsIGRvIG9ubHkgc3Vic2VhcmNoXHJcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucztcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZJbmNsdXNpdmVPcklkeCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgLy8gT3IgcmV1c2UgcHJldiByZXN1bHRzIHdpdGggdW5jaGVja2VkIG9uZXNcclxuICAgICAgcmV0dXJuIFsuLi5wcmV2T3B0aW9ucywgLi4ub3B0aW9ucy5zbGljZShwcmV2SW5jbHVzaXZlT3JJZHgpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2RvU2VhcmNoKG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLCBzdHI6IHN0cmluZywgbGltaXQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgcHJldlN0ciA9IHN0ci5zbGljZSgwLCAtMSk7XHJcbiAgICBjb25zdCBwcmV2UmVzdWx0cyA9IHRoaXMuX3NlYXJjaENhY2hlW3ByZXZTdHJdO1xyXG4gICAgY29uc3QgcHJldlJlc3VsdFNoaWZ0ID0gdGhpcy5fcHJldlNraXBwZWRJdGVtc1twcmV2U3RyXSB8fCAwO1xyXG5cclxuICAgIGlmIChwcmV2UmVzdWx0cykge1xyXG4gICAgICBvcHRpb25zID0gdGhpcy5fZ2V0U3Vic2V0T3B0aW9ucyhvcHRpb25zLCBwcmV2UmVzdWx0cywgcHJldlN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3B0c0xlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xyXG4gICAgY29uc3QgbWF4Rm91bmQgPSBsaW1pdCA+IDAgPyBNYXRoLm1pbihsaW1pdCwgb3B0c0xlbmd0aCkgOiBvcHRzTGVuZ3RoO1xyXG4gICAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cCh0aGlzLl9lc2NhcGVSZWdFeHAoc3RyKSwgJ2knKTtcclxuICAgIGNvbnN0IGZpbHRlcmVkT3B0czogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuXHJcbiAgICBsZXQgaSA9IDAsIGZvdW5kZWQgPSAwLCByZW1vdmVkRnJvbVByZXZSZXN1bHQgPSAwO1xyXG5cclxuICAgIGNvbnN0IGRvZXNPcHRpb25NYXRjaCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gcmVnZXhwLnRlc3Qob3B0aW9uLm5hbWUpO1xyXG4gICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XHJcbiAgICAgIG9wdGlvbnMuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnBhcmVudElkID09PSBvcHRpb24uaWQpO1xyXG4gICAgY29uc3QgZ2V0UGFyZW50ID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICBvcHRpb25zLmZpbmQocGFyZW50ID0+IG9wdGlvbi5wYXJlbnRJZCA9PT0gcGFyZW50LmlkKTtcclxuICAgIGNvbnN0IGZvdW5kRm4gPSAoaXRlbTogYW55KSA9PiB7IGZpbHRlcmVkT3B0cy5wdXNoKGl0ZW0pOyBmb3VuZGVkKys7IH07XHJcbiAgICBjb25zdCBub3RGb3VuZEZuID0gcHJldlJlc3VsdHMgPyAoKSA9PiByZW1vdmVkRnJvbVByZXZSZXN1bHQrKyA6ICgpID0+IHsgfTtcclxuXHJcbiAgICBmb3IgKDsgaSA8IG9wdHNMZW5ndGggJiYgZm91bmRlZCA8IG1heEZvdW5kOyArK2kpIHtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcclxuICAgICAgY29uc3QgZGlyZWN0TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2gob3B0aW9uKTtcclxuXHJcbiAgICAgIGlmIChkaXJlY3RNYXRjaCkge1xyXG4gICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW5NYXRjaCA9IGdldENoaWxkcmVuKG9wdGlvbikuc29tZShkb2VzT3B0aW9uTWF0Y2gpO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGRyZW5NYXRjaCkge1xyXG4gICAgICAgICAgZm91bmRGbihvcHRpb24pO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbi5wYXJlbnRJZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnRNYXRjaCA9IGRvZXNPcHRpb25NYXRjaChnZXRQYXJlbnQob3B0aW9uKSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJlbnRNYXRjaCkge1xyXG4gICAgICAgICAgZm91bmRGbihvcHRpb24pO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBub3RGb3VuZEZuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdG90YWxJdGVyYXRpb25zID0gaSArIHByZXZSZXN1bHRTaGlmdDtcclxuXHJcbiAgICB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdID0gZmlsdGVyZWRPcHRzO1xyXG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbc3RyXSA9IGkgPT09IG9wdHNMZW5ndGggfHwgdG90YWxJdGVyYXRpb25zO1xyXG4gICAgdGhpcy5fcHJldlNraXBwZWRJdGVtc1tzdHJdID0gcmVtb3ZlZEZyb21QcmV2UmVzdWx0ICsgcHJldlJlc3VsdFNoaWZ0O1xyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZE9wdHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9saW1pdFJlbmRlcmVkSXRlbXM8VD4oaXRlbXM6IFRbXSwgbGltaXQ6IG51bWJlcik6IFRbXSB7XHJcbiAgICByZXR1cm4gaXRlbXMubGVuZ3RoID4gbGltaXQgJiYgbGltaXQgPiAwID8gaXRlbXMuc2xpY2UoMCwgbGltaXQpIDogaXRlbXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lc2NhcGVSZWdFeHAoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=