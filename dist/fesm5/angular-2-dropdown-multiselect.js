import { __assign, __spread } from 'tslib';
import { Pipe, Directive, ElementRef, Host, Input, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, IterableDiffers, Output, HostListener, NgModule } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            return __spread(prevOptions, options.slice(prevInclusiveOrIdx));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(elemRef) {
        this.elemRef = elemRef;
    }
    Object.defineProperty(AutofocusDirective.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elemRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutofocusDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.focus();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AutofocusDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ ssAutofocusChange = changes["ssAutofocus"];
        if (ssAutofocusChange && !ssAutofocusChange.isFirstChange()) {
            this.focus();
        }
    };
    /**
     * @return {?}
     */
    AutofocusDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.ssAutofocus) {
            return;
        }
        this.element.focus && this.element.focus();
    };
    AutofocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ssAutofocus]'
                },] }
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Host },] },
    ]; };
    AutofocusDirective.propDecorators = {
        "ssAutofocus": [{ type: Input },],
    };
    return AutofocusDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */
var /** @type {?} */ MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiselectDropdownComponent; }),
    multi: true,
};
var MultiselectDropdownComponent = /** @class */ (function () {
    function MultiselectDropdownComponent(element, fb, searchFilter, differs, cdRef) {
        this.element = element;
        this.fb = fb;
        this.searchFilter = searchFilter;
        this.cdRef = cdRef;
        this.filterControl = this.fb.control('');
        this.disabled = false;
        this.disabledSelection = false;
        this.selectionLimitReached = new EventEmitter();
        this.dropdownClosed = new EventEmitter();
        this.dropdownOpened = new EventEmitter();
        this.onAdded = new EventEmitter();
        this.onRemoved = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.onFilter = this.filterControl.valueChanges;
        this.destroyed$ = new Subject();
        this.filteredOptions = [];
        this.lazyLoadOptions = [];
        this.renderFilteredOptions = [];
        this.model = [];
        this.prevModel = [];
        this.numSelected = 0;
        this.renderItems = true;
        this.checkAllSearchRegister = new Set();
        this.checkAllStatus = false;
        this.loadedValueIds = [];
        this._focusBack = false;
        this.defaultSettings = {
            closeOnClickOutside: true,
            pullRight: false,
            enableSearch: false,
            searchRenderLimit: 0,
            searchRenderAfter: 1,
            searchMaxLimit: 0,
            searchMaxRenderedItems: 0,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-primary dropdown-toggle',
            containerClasses: 'dropdown-inline',
            selectionLimit: 0,
            minSelectionLimit: 0,
            closeOnSelect: false,
            autoUnselect: false,
            showCheckAll: false,
            showUncheckAll: false,
            fixedTitle: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
            isLazyLoad: false,
            stopScrollPropagation: false,
            loadViewDistance: 1,
            selectAddedValues: false,
            ignoreLabels: false,
            maintainSelectionOrderInTitle: false,
            focusBack: true,
            useArray: true
        };
        this.defaultTexts = {
            checkAll: 'Check all',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            searchEmptyResult: 'Nothing found...',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Select',
            allSelected: 'All selected',
        };
        this._isVisible = false;
        this._workerDocClicked = false;
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
        this.settings = this.defaultSettings;
        this.texts = this.defaultTexts;
    }
    Object.defineProperty(MultiselectDropdownComponent.prototype, "focusBack", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.focusBack && this._focusBack;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.clickedOutside = /**
     * @return {?}
     */
    function () {
        if (!this.isVisible || !this.settings.closeOnClickOutside) {
            return;
        }
        this.isVisible = false;
        this._focusBack = true;
        this.dropdownClosed.emit();
    };
    Object.defineProperty(MultiselectDropdownComponent.prototype, "isVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isVisible;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._isVisible = val;
            this._workerDocClicked = val ? false : this._workerDocClicked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.searchRenderLimit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchRenderAfter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.searchRenderAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimitApplied", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchLimit > 0 && this.options.length > this.searchLimit;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.getItemStyle = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!option.isLabel) ;
        if (option.disabled) ;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.getItemStyleSelectionDisabled = /**
     * @return {?}
     */
    function () {
        if (this.disabledSelection) {
            return { cursor: 'default' };
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.title = this.texts.defaultTitle || '';
        this.filterControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(function () {
            _this.updateRenderItems();
            if (_this.settings.isLazyLoad) {
                _this.load();
            }
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['options']) {
            this.options = this.options || [];
            this.parents = this.options
                .filter(function (option) { return typeof option.parentId === 'number'; })
                .map(function (option) { return option.parentId; });
            this.updateRenderItems();
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                this.loadedValueIds.length === 0) {
                this.loadedValueIds = this.loadedValueIds.concat(changes["options"].currentValue.map(function (value) { return value.id; }));
            }
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                changes["options"].previousValue) {
                var /** @type {?} */ addedValues_1 = changes["options"].currentValue.filter(function (value) { return _this.loadedValueIds.indexOf(value.id) === -1; });
                this.loadedValueIds.concat(addedValues_1.map(function (value) { return value.id; }));
                if (this.checkAllStatus) {
                    this.addChecks(addedValues_1);
                }
                else if (this.checkAllSearchRegister.size > 0) {
                    this.checkAllSearchRegister.forEach(function (searchValue) {
                        return _this.addChecks(_this.applyFilters(addedValues_1, searchValue));
                    });
                }
            }
            if (this.texts) {
                this.updateTitle();
            }
            this.fireModelChange();
        }
        if (changes['settings']) {
            this.settings = __assign({}, this.defaultSettings, this.settings);
        }
        if (changes['texts']) {
            this.texts = __assign({}, this.defaultTexts, this.texts);
            if (!changes['texts'].isFirstChange()) {
                this.updateTitle();
            }
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next();
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateRenderItems = /**
     * @return {?}
     */
    function () {
        this.renderItems =
            !this.searchLimitApplied ||
                this.filterControl.value.length >= this.searchRenderAfter;
        this.filteredOptions = this.applyFilters(this.options, this.settings.isLazyLoad ? '' : this.filterControl.value);
        this.renderFilteredOptions = this.renderItems ? this.filteredOptions : [];
        this.focusedItem = undefined;
    };
    /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.applyFilters = /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    function (options, value) {
        return this.searchFilter.transform(options, value, this.settings.searchMaxLimit, this.settings.searchMaxRenderedItems);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.fireModelChange = /**
     * @return {?}
     */
    function () {
        if (this.model != this.prevModel) {
            this.prevModel = this.model;
            this.onModelChange(this.model);
            this.onModelTouched();
            this.cdRef.markForCheck();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined && value !== null) {
            if (this.settings.useArray) {
                this.model = Array.isArray(value) ? value : [value];
            }
            else {
                this.model = value;
            }
            this.ngDoCheck();
        }
        else {
            if (this.settings.useArray) {
                this.model = [];
            }
            else {
                this.model = null;
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    };
    /**
     * @param {?} _c
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.validate = /**
     * @param {?} _c
     * @return {?}
     */
    function (_c) {
        var _this = this;
        if (this.model && this.model.length) {
            return {
                required: {
                    valid: false
                }
            };
        }
        if (this.options.filter(function (o) { return _this.model.indexOf(o.id) && !o.disabled; }).length === 0) {
            return {
                selection: {
                    valid: false
                }
            };
        }
        return null;
    };
    /**
     * @param {?} _fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnValidatorChange = /**
     * @param {?} _fn
     * @return {?}
     */
    function (_fn) {
        throw new Error('Method not implemented.');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.clearSearch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.maybeStopPropagation(event);
        this.filterControl.setValue('');
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.toggleDropdown = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (this.isVisible) {
            this._focusBack = true;
        }
        this.isVisible = !this.isVisible;
        this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        this.focusedItem = undefined;
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.closeDropdown = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        this.isVisible = true;
        this.toggleDropdown(e);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.isSelected = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.model && this.model.indexOf(option.id) > -1;
    };
    /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.setSelected = /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    function (_event, option) {
        var _this = this;
        if (option.isLabel) {
            return;
        }
        if (option.disabled) {
            return;
        }
        if (this.disabledSelection) {
            return;
        }
        setTimeout(function () {
            _this.maybeStopPropagation(_event);
            _this.maybePreventDefault(_event);
            var /** @type {?} */ index = _this.model.indexOf(option.id);
            var /** @type {?} */ isAtSelectionLimit = _this.settings.selectionLimit > 0 &&
                _this.model.length >= _this.settings.selectionLimit;
            var /** @type {?} */ removeItem = function (idx, id) {
                _this.model.splice(idx, 1);
                _this.onRemoved.emit(id);
                if (_this.settings.isLazyLoad &&
                    _this.lazyLoadOptions.some(function (val) { return val.id === id; })) {
                    _this.lazyLoadOptions.splice(_this.lazyLoadOptions.indexOf(_this.lazyLoadOptions.find(function (val) { return val.id === id; })), 1);
                }
            };
            if (index > -1) {
                if (_this.settings.minSelectionLimit === undefined ||
                    _this.numSelected > _this.settings.minSelectionLimit) {
                    removeItem(index, option.id);
                }
                var /** @type {?} */ parentIndex = option.parentId && _this.model.indexOf(option.parentId);
                if (parentIndex > -1) {
                    removeItem(parentIndex, option.parentId);
                }
                else if (_this.parents.indexOf(option.id) > -1) {
                    _this.options
                        .filter(function (child) {
                        return _this.model.indexOf(child.id) > -1 &&
                            child.parentId === option.id;
                    })
                        .forEach(function (child) {
                        return removeItem(_this.model.indexOf(child.id), child.id);
                    });
                }
            }
            else if (isAtSelectionLimit && !_this.settings.autoUnselect) {
                _this.selectionLimitReached.emit(_this.model.length);
                return;
            }
            else {
                var /** @type {?} */ addItem_1 = function (id) {
                    _this.model.push(id);
                    _this.onAdded.emit(id);
                    if (_this.settings.isLazyLoad &&
                        !_this.lazyLoadOptions.some(function (val) { return val.id === id; })) {
                        _this.lazyLoadOptions.push(option);
                    }
                };
                addItem_1(option.id);
                if (!isAtSelectionLimit) {
                    if (option.parentId && !_this.settings.ignoreLabels) {
                        var /** @type {?} */ children = _this.options.filter(function (child) {
                            return child.id !== option.id && child.parentId === option.parentId;
                        });
                        if (children.every(function (child) { return _this.model.indexOf(child.id) > -1; })) {
                            addItem_1(option.parentId);
                        }
                    }
                    else if (_this.parents.indexOf(option.id) > -1) {
                        var /** @type {?} */ children = _this.options.filter(function (child) {
                            return _this.model.indexOf(child.id) < 0 && child.parentId === option.id;
                        });
                        children.forEach(function (child) { return addItem_1(child.id); });
                    }
                }
                else {
                    removeItem(0, _this.model[0]);
                }
            }
            if (_this.settings.closeOnSelect) {
                _this.toggleDropdown();
            }
            _this.model = _this.model.slice();
            _this.fireModelChange();
        }, 0);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateNumSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.numSelected =
            this.model.filter(function (id) { return _this.parents.indexOf(id) < 0; }).length || 0;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateTitle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ numSelectedOptions = this.options.length;
        if (this.settings.ignoreLabels) {
            numSelectedOptions = this.options.filter(function (option) { return !option.isLabel; }).length;
        }
        if (this.numSelected === 0 || this.settings.fixedTitle) {
            this.title = this.texts ? this.texts.defaultTitle : '';
        }
        else if (this.settings.displayAllSelectedText &&
            this.model.length === numSelectedOptions) {
            this.title = this.texts ? this.texts.allSelected : '';
        }
        else if (this.settings.dynamicTitleMaxItems &&
            this.settings.dynamicTitleMaxItems >= this.numSelected) {
            var /** @type {?} */ useOptions_1 = this.settings.isLazyLoad && this.lazyLoadOptions.length
                ? this.lazyLoadOptions
                : this.options;
            var /** @type {?} */ titleSelections = void 0;
            if (this.settings.maintainSelectionOrderInTitle) {
                var /** @type {?} */ optionIds_1 = useOptions_1.map(function (selectOption, idx) { return selectOption.id; });
                titleSelections = this.model
                    .map(function (selectedId) { return optionIds_1.indexOf(selectedId); })
                    .filter(function (optionIndex) { return optionIndex > -1; })
                    .map(function (optionIndex) { return useOptions_1[optionIndex]; });
            }
            else {
                titleSelections = useOptions_1.filter(function (option) { return _this.model.indexOf(option.id) > -1; });
            }
            this.title = titleSelections.map(function (option) { return option.name; }).join(', ');
        }
        else {
            this.title =
                this.numSelected +
                    ' ' +
                    (this.numSelected === 1
                        ? this.texts.checked
                        : this.texts.checkedPlural);
        }
        this.cdRef.markForCheck();
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.searchFilterApplied = /**
     * @return {?}
     */
    function () {
        return (this.settings.enableSearch &&
            this.filterControl.value &&
            this.filterControl.value.length > 0);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.addChecks = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        var /** @type {?} */ checkedOptions = options
            .filter(function (option) {
            if (!option.disabled &&
                (_this.model.indexOf(option.id) === -1 &&
                    !(_this.settings.ignoreLabels && option.isLabel))) {
                _this.onAdded.emit(option.id);
                return true;
            }
            return false;
        })
            .map(function (option) { return option.id; });
        this.model = this.model.concat(checkedOptions);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkAll = /**
     * @return {?}
     */
    function () {
        if (!this.disabledSelection) {
            this.addChecks(!this.searchFilterApplied() ? this.options : this.filteredOptions);
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied() && !this.checkAllStatus) {
                    this.checkAllSearchRegister.add(this.filterControl.value);
                }
                else {
                    this.checkAllSearchRegister.clear();
                    this.checkAllStatus = true;
                }
                this.load();
            }
            this.fireModelChange();
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.uncheckAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabledSelection) {
            var /** @type {?} */ checkedOptions = this.model;
            var /** @type {?} */ unCheckedOptions_1 = !this.searchFilterApplied()
                ? this.model
                : this.filteredOptions.map(function (option) { return option.id; });
            // set unchecked options only to the ones that were checked
            // set unchecked options only to the ones that were checked
            unCheckedOptions_1 = checkedOptions.filter(function (item) { return unCheckedOptions_1.indexOf(item) > -1; });
            this.model = this.model.filter(function (id) {
                if ((unCheckedOptions_1.indexOf(id) < 0 &&
                    _this.settings.minSelectionLimit === undefined) ||
                    unCheckedOptions_1.indexOf(id) < _this.settings.minSelectionLimit) {
                    return true;
                }
                else {
                    _this.onRemoved.emit(id);
                    return false;
                }
            });
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied()) {
                    if (this.checkAllSearchRegister.has(this.filterControl.value)) {
                        this.checkAllSearchRegister.delete(this.filterControl.value);
                        this.checkAllSearchRegister.forEach(function (searchTerm) {
                            var /** @type {?} */ filterOptions = this.applyFilters(this.options.filter(function (option) { return unCheckedOptions_1.indexOf(option.id) > -1; }), searchTerm);
                            this.addChecks(filterOptions);
                        });
                    }
                }
                else {
                    this.checkAllSearchRegister.clear();
                    this.checkAllStatus = false;
                }
                this.load();
            }
            this.fireModelChange();
        }
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.preventCheckboxCheck = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        if (option.disabled ||
            (this.settings.selectionLimit &&
                !this.settings.autoUnselect &&
                this.model.length >= this.settings.selectionLimit &&
                this.model.indexOf(option.id) === -1 &&
                this.maybePreventDefault(event))) {
            this.maybePreventDefault(event);
        }
    };
    /**
     * @param {?=} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.isCheckboxDisabled = /**
     * @param {?=} option
     * @return {?}
     */
    function (option) {
        return this.disabledSelection || option && option.disabled;
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkScrollPosition = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var /** @type {?} */ scrollTop = ev.target.scrollTop;
        var /** @type {?} */ scrollHeight = ev.target.scrollHeight;
        var /** @type {?} */ scrollElementHeight = ev.target.clientHeight;
        var /** @type {?} */ roundingPixel = 1;
        var /** @type {?} */ gutterPixel = 1;
        if (scrollTop >=
            scrollHeight -
                (1 + this.settings.loadViewDistance) * scrollElementHeight -
                roundingPixel -
                gutterPixel) {
            this.load();
        }
    };
    /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkScrollPropagation = /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    function (ev, element) {
        var /** @type {?} */ scrollTop = element.scrollTop;
        var /** @type {?} */ scrollHeight = element.scrollHeight;
        var /** @type {?} */ scrollElementHeight = element.clientHeight;
        if ((ev.deltaY > 0 && scrollTop + scrollElementHeight >= scrollHeight) ||
            (ev.deltaY < 0 && scrollTop <= 0)) {
            ev = ev || window.event;
            this.maybePreventDefault(ev);
            ev.returnValue = false;
        }
    };
    /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.trackById = /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    function (idx, selectOption) {
        return selectOption.id;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.load = /**
     * @return {?}
     */
    function () {
        this.onLazyLoad.emit({
            length: this.options.length,
            filter: this.filterControl.value,
            checkAllSearches: this.checkAllSearchRegister,
            checkAllStatus: this.checkAllStatus,
        });
    };
    /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.focusItem = /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    function (dir, e) {
        if (!this.isVisible) {
            return;
        }
        this.maybePreventDefault(e);
        var /** @type {?} */ idx = this.filteredOptions.indexOf(this.focusedItem);
        if (idx === -1) {
            this.focusedItem = this.filteredOptions[0];
            return;
        }
        var /** @type {?} */ nextIdx = idx + dir;
        var /** @type {?} */ newIdx = nextIdx < 0
            ? this.filteredOptions.length - 1
            : nextIdx % this.filteredOptions.length;
        this.focusedItem = this.filteredOptions[newIdx];
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.maybePreventDefault = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.maybeStopPropagation = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    };
    MultiselectDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ss-multiselect-dropdown',
                    template: "<div class=\"dropdown\" [ngClass]=\"settings.containerClasses\" [class.open]=\"isVisible\" (offClick)=\"clickedOutside()\">\r\n  <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\" (click)=\"toggleDropdown($event)\" [disabled]=\"disabled\"\r\n    [ssAutofocus]=\"!focusBack\">\r\n    {{ title }}\r\n    <span class=\"caret\"></span>\r\n  </button>\r\n  <div #scroller *ngIf=\"isVisible\" class=\"dropdown-menu\" [ngClass]=\"{'chunkydropdown-menu': settings.checkedStyle == 'visual' }\"\r\n    (scroll)=\"settings.isLazyLoad ? checkScrollPosition($event) : null\" (wheel)=\"settings.stopScrollPropagation ? checkScrollPropagation($event, scroller) : null\"\r\n    [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\" [style.max-height]=\"settings.maxHeight\"\r\n    style=\"display: block; height: auto; overflow-y: auto;\" (keydown.tab)=\"focusItem(1, $event)\" (keydown.shift.tab)=\"focusItem(-1, $event)\">\r\n    <div class=\"input-group search-container\" *ngIf=\"settings.enableSearch\">\r\n      <div class=\"input-group-prepend\">\r\n        <span class=\"input-group-text\" id=\"basic-addon1\">\r\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\r\n        </span>\r\n      </div>\r\n      <input type=\"text\" class=\"form-control\" ssAutofocus [formControl]=\"filterControl\" [placeholder]=\"texts.searchPlaceholder\"\r\n        class=\"form-control\">\r\n      <div class=\"input-group-append\" *ngIf=\"filterControl.value.length>0\">\r\n        <button class=\"btn btn-default btn-secondary\" type=\"button\" (click)=\"clearSearch($event)\">\r\n          <i class=\"fa fa-times\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-check\" *ngIf=\"settings.showCheckAll && !disabledSelection\"\r\n      (click)=\"checkAll()\">\r\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-ok': settings.checkedStyle !== 'fontawesome','fa fa-check': settings.checkedStyle === 'fontawesome'}\"></span></span>\r\n      {{ texts.checkAll }}\r\n    </a>\r\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-uncheck\" *ngIf=\"settings.showUncheckAll && !disabledSelection\"\r\n      (click)=\"uncheckAll()\">\r\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-remove': settings.checkedStyle !== 'fontawesome','fa fa-times': settings.checkedStyle === 'fontawesome'}\"></span></span>\r\n      {{ texts.uncheckAll }}\r\n    </a>\r\n    <a *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" href=\"javascript:;\" class=\"dropdown-divider divider\"></a>\r\n    <a *ngIf=\"!renderItems\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchNoRenderText }}</a>\r\n    <a *ngIf=\"renderItems && !renderFilteredOptions.length\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchEmptyResult }}</a>\r\n    <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let option of renderFilteredOptions; trackBy: trackById\" [class.active]=\"isSelected(option)\"\r\n      [ngStyle]=\"getItemStyle(option)\" [ngClass]=\"option.classes\" [class.dropdown-header]=\"option.isLabel\" [ssAutofocus]=\"option !== focusedItem\"\r\n      tabindex=\"-1\" (click)=\"setSelected($event, option)\" (keydown.space)=\"setSelected($event, option)\" (keydown.enter)=\"setSelected($event, option)\">\r\n      <span *ngIf=\"!option.isLabel; else label\" role=\"menuitem\" tabindex=\"-1\" [style.padding-left]=\"this.parents.length>0&&this.parents.indexOf(option.id)<0&&'30px'\"\r\n        [ngStyle]=\"getItemStyleSelectionDisabled()\">\r\n        <ng-container [ngSwitch]=\"settings.checkedStyle\">\r\n          <input *ngSwitchCase=\"'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" (click)=\"preventCheckboxCheck($event, option)\"\r\n            [disabled]=\"isCheckboxDisabled(option)\" [ngStyle]=\"getItemStyleSelectionDisabled()\" />\r\n          <span *ngSwitchCase=\"'glyphicon'\" style=\"width: 16px;\" class=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\" [class.glyphicon-lock]=\"isCheckboxDisabled(option)\"></span>\r\n          <span *ngSwitchCase=\"'fontawesome'\" style=\"width: 16px;display: inline-block;\">\r\n            <span *ngIf=\"isSelected(option)\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></span>\r\n            <span *ngIf=\"isCheckboxDisabled(option)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span>\r\n          </span>\r\n          <span *ngSwitchCase=\"'visual'\" style=\"display:block;float:left; border-radius: 0.2em; border: 0.1em solid rgba(44, 44, 44, 0.63);background:rgba(0, 0, 0, 0.1);width: 5.5em;\">\r\n            <div class=\"slider\" [ngClass]=\"{'slideron': isSelected(option)}\">\r\n              <img *ngIf=\"option.image != null\" [src]=\"option.image\" style=\"height: 100%; width: 100%; object-fit: contain\" />\r\n              <div *ngIf=\"option.image == null\" style=\"height: 100%; width: 100%;text-align: center; display: table; background-color:rgba(0, 0, 0, 0.74)\">\r\n                <div class=\"content_wrapper\">\r\n                  <span style=\"font-size:3em;color:white\" class=\"glyphicon glyphicon-eye-close\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </span>\r\n        </ng-container>\r\n        <span [ngClass]=\"{'chunkyrow': settings.checkedStyle == 'visual' }\" [class.disabled]=\"isCheckboxDisabled(option)\" [ngClass]=\"settings.itemClasses\"\r\n          [style.font-weight]=\"this.parents.indexOf(option.id)>=0?'bold':'normal'\">\r\n          {{ option.name }}\r\n        </span>\r\n      </span>\r\n      <ng-template #label>\r\n        <span [class.disabled]=\"isCheckboxDisabled(option)\">{{ option.name }}</span>\r\n      </ng-template>\r\n    </a>\r\n  </div>\r\n</div>\r\n",
                    providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["a{outline:0!important}.dropdown-inline{display:inline-block}.dropdown-toggle .caret{margin-left:4px;white-space:nowrap;display:inline-block}.chunkydropdown-menu{min-width:20em}.chunkyrow{line-height:2;margin-left:1em;font-size:2em}.slider{width:3.8em;height:3.8em;display:block;transition:all 125ms linear;margin-left:.125em;margin-top:auto}.slideron{margin-left:1.35em}.content_wrapper{display:table-cell;vertical-align:middle}.search-container{padding:0 5px 5px}"]
                }] }
    ];
    /** @nocollapse */
    MultiselectDropdownComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FormBuilder, },
        { type: MultiSelectSearchFilter, },
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
    ]; };
    MultiselectDropdownComponent.propDecorators = {
        "options": [{ type: Input },],
        "settings": [{ type: Input },],
        "texts": [{ type: Input },],
        "disabled": [{ type: Input },],
        "disabledSelection": [{ type: Input },],
        "selectionLimitReached": [{ type: Output },],
        "dropdownClosed": [{ type: Output },],
        "dropdownOpened": [{ type: Output },],
        "onAdded": [{ type: Output },],
        "onRemoved": [{ type: Output },],
        "onLazyLoad": [{ type: Output },],
        "onFilter": [{ type: Output },],
    };
    return MultiselectDropdownComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MultiSelectSearchFilter, MultiselectDropdownModule, MultiselectDropdownComponent, AutofocusDirective as ɵa, OffClickDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5pbnRlcmZhY2UgU3RyaW5nSGFzaE1hcDxUPiB7XHJcbiAgW2s6IHN0cmluZ106IFQ7XHJcbn1cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnc2VhcmNoRmlsdGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgcHJpdmF0ZSBfbGFzdE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdO1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlOiBTdHJpbmdIYXNoTWFwPElNdWx0aVNlbGVjdE9wdGlvbltdPiA9IHt9O1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlSW5jbHVzaXZlOiBTdHJpbmdIYXNoTWFwPGJvb2xlYW4gfCBudW1iZXI+ID0ge307XHJcbiAgcHJpdmF0ZSBfcHJldlNraXBwZWRJdGVtczogU3RyaW5nSGFzaE1hcDxudW1iZXI+ID0ge307XHJcblxyXG4gIHRyYW5zZm9ybShcclxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxyXG4gICAgc3RyID0gJycsXHJcbiAgICBsaW1pdCA9IDAsXHJcbiAgICByZW5kZXJMaW1pdCA9IDBcclxuICApOiBJTXVsdGlTZWxlY3RPcHRpb25bXSB7XHJcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBEcm9wIGNhY2hlIGJlY2F1c2Ugb3B0aW9ucyB3ZXJlIHVwZGF0ZWRcclxuICAgIGlmIChvcHRpb25zICE9PSB0aGlzLl9sYXN0T3B0aW9ucykge1xyXG4gICAgICB0aGlzLl9sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlID0ge307XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlID0ge307XHJcbiAgICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHMgPSB0aGlzLl9zZWFyY2hDYWNoZS5oYXNPd25Qcm9wZXJ0eShzdHIpXHJcbiAgICAgID8gdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXVxyXG4gICAgICA6IHRoaXMuX2RvU2VhcmNoKG9wdGlvbnMsIHN0ciwgbGltaXQpO1xyXG5cclxuICAgIGNvbnN0IGlzVW5kZXJMaW1pdCA9IG9wdGlvbnMubGVuZ3RoIDw9IGxpbWl0O1xyXG5cclxuICAgIHJldHVybiBpc1VuZGVyTGltaXRcclxuICAgICAgPyBmaWx0ZXJlZE9wdHNcclxuICAgICAgOiB0aGlzLl9saW1pdFJlbmRlcmVkSXRlbXMoZmlsdGVyZWRPcHRzLCByZW5kZXJMaW1pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTdWJzZXRPcHRpb25zKFxyXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2U2VhcmNoU3RyOiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IHByZXZJbmNsdXNpdmVPcklkeCA9IHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3ByZXZTZWFyY2hTdHJdO1xyXG5cclxuICAgIGlmIChwcmV2SW5jbHVzaXZlT3JJZHggPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgaGF2ZSBwcmV2aW91cyByZXN1bHRzIGFuZCBpdCB3YXMgaW5jbHVzaXZlLCBkbyBvbmx5IHN1YnNlYXJjaFxyXG4gICAgICByZXR1cm4gcHJldk9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmV2SW5jbHVzaXZlT3JJZHggPT09ICdudW1iZXInKSB7XHJcbiAgICAgIC8vIE9yIHJldXNlIHByZXYgcmVzdWx0cyB3aXRoIHVuY2hlY2tlZCBvbmVzXHJcbiAgICAgIHJldHVybiBbLi4ucHJldk9wdGlvbnMsIC4uLm9wdGlvbnMuc2xpY2UocHJldkluY2x1c2l2ZU9ySWR4KV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kb1NlYXJjaChvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSwgc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHByZXZTdHIgPSBzdHIuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29uc3QgcHJldlJlc3VsdHMgPSB0aGlzLl9zZWFyY2hDYWNoZVtwcmV2U3RyXTtcclxuICAgIGNvbnN0IHByZXZSZXN1bHRTaGlmdCA9IHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbcHJldlN0cl0gfHwgMDtcclxuXHJcbiAgICBpZiAocHJldlJlc3VsdHMpIHtcclxuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldFN1YnNldE9wdGlvbnMob3B0aW9ucywgcHJldlJlc3VsdHMsIHByZXZTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdHNMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IG1heEZvdW5kID0gbGltaXQgPiAwID8gTWF0aC5taW4obGltaXQsIG9wdHNMZW5ndGgpIDogb3B0c0xlbmd0aDtcclxuICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAodGhpcy5fZXNjYXBlUmVnRXhwKHN0ciksICdpJyk7XHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcblxyXG4gICAgbGV0IGkgPSAwLCBmb3VuZGVkID0gMCwgcmVtb3ZlZEZyb21QcmV2UmVzdWx0ID0gMDtcclxuXHJcbiAgICBjb25zdCBkb2VzT3B0aW9uTWF0Y2ggPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHJlZ2V4cC50ZXN0KG9wdGlvbi5uYW1lKTtcclxuICAgIGNvbnN0IGdldENoaWxkcmVuID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICBvcHRpb25zLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkKTtcclxuICAgIGNvbnN0IGdldFBhcmVudCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cclxuICAgICAgb3B0aW9ucy5maW5kKHBhcmVudCA9PiBvcHRpb24ucGFyZW50SWQgPT09IHBhcmVudC5pZCk7XHJcbiAgICBjb25zdCBmb3VuZEZuID0gKGl0ZW06IGFueSkgPT4geyBmaWx0ZXJlZE9wdHMucHVzaChpdGVtKTsgZm91bmRlZCsrOyB9O1xyXG4gICAgY29uc3Qgbm90Rm91bmRGbiA9IHByZXZSZXN1bHRzID8gKCkgPT4gcmVtb3ZlZEZyb21QcmV2UmVzdWx0KysgOiAoKSA9PiB7IH07XHJcblxyXG4gICAgZm9yICg7IGkgPCBvcHRzTGVuZ3RoICYmIGZvdW5kZWQgPCBtYXhGb3VuZDsgKytpKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcbiAgICAgIGNvbnN0IGRpcmVjdE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKG9wdGlvbik7XHJcblxyXG4gICAgICBpZiAoZGlyZWN0TWF0Y2gpIHtcclxuICAgICAgICBmb3VuZEZuKG9wdGlvbik7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTWF0Y2ggPSBnZXRDaGlsZHJlbihvcHRpb24pLnNvbWUoZG9lc09wdGlvbk1hdGNoKTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuTWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2goZ2V0UGFyZW50KG9wdGlvbikpO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50TWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbm90Rm91bmRGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvdGFsSXRlcmF0aW9ucyA9IGkgKyBwcmV2UmVzdWx0U2hpZnQ7XHJcblxyXG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXSA9IGZpbHRlcmVkT3B0cztcclxuICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3N0cl0gPSBpID09PSBvcHRzTGVuZ3RoIHx8IHRvdGFsSXRlcmF0aW9ucztcclxuICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbc3RyXSA9IHJlbW92ZWRGcm9tUHJldlJlc3VsdCArIHByZXZSZXN1bHRTaGlmdDtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRPcHRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbGltaXRSZW5kZXJlZEl0ZW1zPFQ+KGl0ZW1zOiBUW10sIGxpbWl0OiBudW1iZXIpOiBUW10ge1xyXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IGxpbWl0ICYmIGxpbWl0ID4gMCA/IGl0ZW1zLnNsaWNlKDAsIGxpbWl0KSA6IGl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZXNjYXBlUmVnRXhwKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NzQXV0b2ZvY3VzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lsbCBzZXQgZm9jdXMgaWYgc2V0IHRvIGZhbHN5IHZhbHVlIG9yIG5vdCBzZXQgYXQgYWxsXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gIGdldCBlbGVtZW50KCk6IHsgZm9jdXM/OiBGdW5jdGlvbiB9IHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEhvc3QoKSBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XHJcblxyXG4gICAgaWYgKHNzQXV0b2ZvY3VzQ2hhbmdlICYmICFzc0F1dG9mb2N1c0NoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5zc0F1dG9mb2N1cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIERvQ2hlY2ssXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgSXRlcmFibGVEaWZmZXJzLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtQ29udHJvbCxcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBWYWxpZGF0b3IsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24sIElNdWx0aVNlbGVjdFNldHRpbmdzLCBJTXVsdGlTZWxlY3RUZXh0cywgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qXHJcbiAqIEFuZ3VsYXIgMiBEcm9wZG93biBNdWx0aXNlbGVjdCBmb3IgQm9vdHN0cmFwXHJcbiAqXHJcbiAqIFNpbW9uIExpbmRoXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2Z0c2ltb24vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0XHJcbiAqL1xyXG5cclxuY29uc3QgTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3MtbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24uY29tcG9uZW50LmNzcyddLFxyXG4gIHByb3ZpZGVyczogW01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SLCBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcl0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgRG9DaGVjayxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgVmFsaWRhdG9yIHtcclxuICBmaWx0ZXJDb250cm9sOiBGb3JtQ29udHJvbCA9IHRoaXMuZmIuY29udHJvbCgnJyk7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PElNdWx0aVNlbGVjdE9wdGlvbj47XHJcbiAgQElucHV0KCkgc2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzO1xyXG4gIEBJbnB1dCgpIHRleHRzOiBJTXVsdGlTZWxlY3RUZXh0cztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25MaW1pdFJlYWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25BZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25SZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkxhenlMb2FkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkZpbHRlcjogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlQ2hhbmdlcztcclxuXHJcbiAgZ2V0IGZvY3VzQmFjaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmZvY3VzQmFjayAmJiB0aGlzLl9mb2N1c0JhY2s7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xpY2tlZE91dHNpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLnNldHRpbmdzLmNsb3NlT25DbGlja091dHNpZGUpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZvY3VzQmFjayA9IHRydWU7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGZpbHRlcmVkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICBsYXp5TG9hZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgcmVuZGVyRmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIG1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHByZXZNb2RlbDogYW55W10gPSBbXTtcclxuICBwYXJlbnRzOiBhbnlbXTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRpZmZlcjogYW55O1xyXG4gIG51bVNlbGVjdGVkOiBudW1iZXIgPSAwO1xyXG4gIHNldCBpc1Zpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWw7XHJcbiAgICB0aGlzLl93b3JrZXJEb2NDbGlja2VkID0gdmFsID8gZmFsc2UgOiB0aGlzLl93b3JrZXJEb2NDbGlja2VkO1xyXG4gIH1cclxuICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICB9XHJcbiAgcmVuZGVySXRlbXMgPSB0cnVlO1xyXG4gIGNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIgPSBuZXcgU2V0KCk7XHJcbiAgY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICBsb2FkZWRWYWx1ZUlkcyA9IFtdO1xyXG4gIF9mb2N1c0JhY2sgPSBmYWxzZTtcclxuICBmb2N1c2VkSXRlbTogSU11bHRpU2VsZWN0T3B0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICBkZWZhdWx0U2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzID0ge1xyXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgIHB1bGxSaWdodDogZmFsc2UsXHJcbiAgICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gICAgc2VhcmNoUmVuZGVyTGltaXQ6IDAsXHJcbiAgICBzZWFyY2hSZW5kZXJBZnRlcjogMSxcclxuICAgIHNlYXJjaE1heExpbWl0OiAwLFxyXG4gICAgc2VhcmNoTWF4UmVuZGVyZWRJdGVtczogMCxcclxuICAgIGNoZWNrZWRTdHlsZTogJ2NoZWNrYm94ZXMnLFxyXG4gICAgYnV0dG9uQ2xhc3NlczogJ2J0biBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgY29udGFpbmVyQ2xhc3NlczogJ2Ryb3Bkb3duLWlubGluZScsXHJcbiAgICBzZWxlY3Rpb25MaW1pdDogMCxcclxuICAgIG1pblNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXHJcbiAgICBhdXRvVW5zZWxlY3Q6IGZhbHNlLFxyXG4gICAgc2hvd0NoZWNrQWxsOiBmYWxzZSxcclxuICAgIHNob3dVbmNoZWNrQWxsOiBmYWxzZSxcclxuICAgIGZpeGVkVGl0bGU6IGZhbHNlLFxyXG4gICAgZHluYW1pY1RpdGxlTWF4SXRlbXM6IDMsXHJcbiAgICBtYXhIZWlnaHQ6ICczMDBweCcsXHJcbiAgICBpc0xhenlMb2FkOiBmYWxzZSxcclxuICAgIHN0b3BTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXHJcbiAgICBsb2FkVmlld0Rpc3RhbmNlOiAxLFxyXG4gICAgc2VsZWN0QWRkZWRWYWx1ZXM6IGZhbHNlLFxyXG4gICAgaWdub3JlTGFiZWxzOiBmYWxzZSxcclxuICAgIG1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlOiBmYWxzZSxcclxuICAgIGZvY3VzQmFjazogdHJ1ZSxcclxuICAgIHVzZUFycmF5OiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gW107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMubW9kZWwpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy51cGRhdGVOdW1TZWxlY3RlZCgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShfYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB0aGlzLm1vZGVsLmluZGV4T2Yoby5pZCkgJiYgIW8uZGlzYWJsZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgdmFsaWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShfZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU2VhcmNoKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy5tYXliZVN0b3BQcm9wYWdhdGlvbihldmVudCk7XHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wuc2V0VmFsdWUoJycpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcclxuICAgIHRoaXMuaXNWaXNpYmxlID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjbG9zZURyb3Bkb3duKGU/OiBFdmVudCkge1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy50b2dnbGVEcm9wZG93bihlKTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTE7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZChfZXZlbnQ6IEV2ZW50LCBvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCdvZmZDbGljaycpIG9uT2ZmQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcclxuICBwcml2YXRlIF90b3VjaEV2ZW50OiBUb3VjaEV2ZW50O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxyXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbGlja0V2ZW50ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdG91Y2hFdmVudCA9IGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBcclxuICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICE9PSB0aGlzLl90b3VjaEV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBPZmZDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vb2ZmLWNsaWNrLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXHJcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcclxuICAgIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxyXG4gICAgT2ZmQ2xpY2tEaXJlY3RpdmVcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bk1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7NEJBYzhELEVBQUU7cUNBQ0csRUFBRTtpQ0FDaEIsRUFBRTs7Ozs7Ozs7O0lBRXJELDJDQUFTOzs7Ozs7O0lBQVQsVUFDRSxPQUE2QixFQUM3QixHQUFRLEVBQ1IsS0FBUyxFQUNULFdBQWU7UUFGZixvQkFBQSxFQUFBLFFBQVE7UUFDUixzQkFBQSxFQUFBLFNBQVM7UUFDVCw0QkFBQSxFQUFBLGVBQWU7UUFFZixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUd4QixJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUVELHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Y0FDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7Y0FDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLHFCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFB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