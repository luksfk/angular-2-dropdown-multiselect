(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-2-dropdown-multiselect', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-2-dropdown-multiselect'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,forms,rxjs,operators,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MultiSelectSearchFilter = (function () {
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
                if (str === void 0) {
                    str = '';
                }
                if (limit === void 0) {
                    limit = 0;
                }
                if (renderLimit === void 0) {
                    renderLimit = 0;
                }
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
            { type: core.Pipe, args: [{
                        name: 'searchFilter'
                    },] }
        ];
        return MultiSelectSearchFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AutofocusDirective = (function () {
        function AutofocusDirective(elemRef) {
            this.elemRef = elemRef;
        }
        Object.defineProperty(AutofocusDirective.prototype, "element", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Directive, args: [{
                        selector: '[ssAutofocus]'
                    },] }
        ];
        /** @nocollapse */
        AutofocusDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, decorators: [{ type: core.Host },] },
            ];
        };
        AutofocusDirective.propDecorators = {
            "ssAutofocus": [{ type: core.Input },],
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiselectDropdownComponent; }),
        multi: true,
    };
    var MultiselectDropdownComponent = (function () {
        function MultiselectDropdownComponent(element, fb, searchFilter, differs, cdRef) {
            this.element = element;
            this.fb = fb;
            this.searchFilter = searchFilter;
            this.cdRef = cdRef;
            this.filterControl = this.fb.control('');
            this.disabled = false;
            this.disabledSelection = false;
            this.selectionLimitReached = new core.EventEmitter();
            this.dropdownClosed = new core.EventEmitter();
            this.dropdownOpened = new core.EventEmitter();
            this.onAdded = new core.EventEmitter();
            this.onRemoved = new core.EventEmitter();
            this.onLazyLoad = new core.EventEmitter();
            this.onFilter = this.filterControl.valueChanges;
            this.destroyed$ = new rxjs.Subject();
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
             */ function () {
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
             */ function () {
                return this._isVisible;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._isVisible = val;
                this._workerDocClicked = val ? false : this._workerDocClicked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimit", {
            get: /**
             * @return {?}
             */ function () {
                return this.settings.searchRenderLimit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchRenderAfter", {
            get: /**
             * @return {?}
             */ function () {
                return this.settings.searchRenderAfter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimitApplied", {
            get: /**
             * @return {?}
             */ function () {
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
                this.filterControl.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'ss-multiselect-dropdown',
                        template: "<div class=\"dropdown\" [ngClass]=\"settings.containerClasses\" [class.open]=\"isVisible\" (offClick)=\"clickedOutside()\">\r\n  <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\" (click)=\"toggleDropdown($event)\" [disabled]=\"disabled\"\r\n    [ssAutofocus]=\"!focusBack\">\r\n    {{ title }}\r\n    <span class=\"caret\"></span>\r\n  </button>\r\n  <div #scroller *ngIf=\"isVisible\" class=\"dropdown-menu\" [ngClass]=\"{'chunkydropdown-menu': settings.checkedStyle == 'visual' }\"\r\n    (scroll)=\"settings.isLazyLoad ? checkScrollPosition($event) : null\" (wheel)=\"settings.stopScrollPropagation ? checkScrollPropagation($event, scroller) : null\"\r\n    [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\" [style.max-height]=\"settings.maxHeight\"\r\n    style=\"display: block; height: auto; overflow-y: auto;\" (keydown.tab)=\"focusItem(1, $event)\" (keydown.shift.tab)=\"focusItem(-1, $event)\">\r\n    <div class=\"input-group search-container\" *ngIf=\"settings.enableSearch\">\r\n      <div class=\"input-group-prepend\">\r\n        <span class=\"input-group-text\" id=\"basic-addon1\">\r\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\r\n        </span>\r\n      </div>\r\n      <input type=\"text\" class=\"form-control\" ssAutofocus [formControl]=\"filterControl\" [placeholder]=\"texts.searchPlaceholder\"\r\n        class=\"form-control\">\r\n      <div class=\"input-group-append\" *ngIf=\"filterControl.value.length>0\">\r\n        <button class=\"btn btn-default btn-secondary\" type=\"button\" (click)=\"clearSearch($event)\">\r\n          <i class=\"fa fa-times\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-check\" *ngIf=\"settings.showCheckAll && !disabledSelection\"\r\n      (click)=\"checkAll()\">\r\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-ok': settings.checkedStyle !== 'fontawesome','fa fa-check': settings.checkedStyle === 'fontawesome'}\"></span></span>\r\n      {{ texts.checkAll }}\r\n    </a>\r\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-uncheck\" *ngIf=\"settings.showUncheckAll && !disabledSelection\"\r\n      (click)=\"uncheckAll()\">\r\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-remove': settings.checkedStyle !== 'fontawesome','fa fa-times': settings.checkedStyle === 'fontawesome'}\"></span></span>\r\n      {{ texts.uncheckAll }}\r\n    </a>\r\n    <a *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" href=\"javascript:;\" class=\"dropdown-divider divider\"></a>\r\n    <a *ngIf=\"!renderItems\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchNoRenderText }}</a>\r\n    <a *ngIf=\"renderItems && !renderFilteredOptions.length\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchEmptyResult }}</a>\r\n    <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let option of renderFilteredOptions; trackBy: trackById\" [class.active]=\"isSelected(option)\"\r\n      [ngStyle]=\"getItemStyle(option)\" [ngClass]=\"option.classes\" [class.dropdown-header]=\"option.isLabel\" [ssAutofocus]=\"option !== focusedItem\"\r\n      tabindex=\"-1\" (click)=\"setSelected($event, option)\" (keydown.space)=\"setSelected($event, option)\" (keydown.enter)=\"setSelected($event, option)\">\r\n      <span *ngIf=\"!option.isLabel; else label\" role=\"menuitem\" tabindex=\"-1\" [style.padding-left]=\"this.parents.length>0&&this.parents.indexOf(option.id)<0&&'30px'\"\r\n        [ngStyle]=\"getItemStyleSelectionDisabled()\">\r\n        <ng-container [ngSwitch]=\"settings.checkedStyle\">\r\n          <input *ngSwitchCase=\"'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" (click)=\"preventCheckboxCheck($event, option)\"\r\n            [disabled]=\"isCheckboxDisabled(option)\" [ngStyle]=\"getItemStyleSelectionDisabled()\" />\r\n          <span *ngSwitchCase=\"'glyphicon'\" style=\"width: 16px;\" class=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\" [class.glyphicon-lock]=\"isCheckboxDisabled(option)\"></span>\r\n          <span *ngSwitchCase=\"'fontawesome'\" style=\"width: 16px;display: inline-block;\">\r\n            <span *ngIf=\"isSelected(option)\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></span>\r\n            <span *ngIf=\"isCheckboxDisabled(option)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span>\r\n          </span>\r\n          <span *ngSwitchCase=\"'visual'\" style=\"display:block;float:left; border-radius: 0.2em; border: 0.1em solid rgba(44, 44, 44, 0.63);background:rgba(0, 0, 0, 0.1);width: 5.5em;\">\r\n            <div class=\"slider\" [ngClass]=\"{'slideron': isSelected(option)}\">\r\n              <img *ngIf=\"option.image != null\" [src]=\"option.image\" style=\"height: 100%; width: 100%; object-fit: contain\" />\r\n              <div *ngIf=\"option.image == null\" style=\"height: 100%; width: 100%;text-align: center; display: table; background-color:rgba(0, 0, 0, 0.74)\">\r\n                <div class=\"content_wrapper\">\r\n                  <span style=\"font-size:3em;color:white\" class=\"glyphicon glyphicon-eye-close\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </span>\r\n        </ng-container>\r\n        <span [ngClass]=\"{'chunkyrow': settings.checkedStyle == 'visual' }\" [class.disabled]=\"isCheckboxDisabled(option)\" [ngClass]=\"settings.itemClasses\"\r\n          [style.font-weight]=\"this.parents.indexOf(option.id)>=0?'bold':'normal'\">\r\n          {{ option.name }}\r\n        </span>\r\n      </span>\r\n      <ng-template #label>\r\n        <span [class.disabled]=\"isCheckboxDisabled(option)\">{{ option.name }}</span>\r\n      </ng-template>\r\n    </a>\r\n  </div>\r\n</div>\r\n",
                        providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["a{outline:0!important}.dropdown-inline{display:inline-block}.dropdown-toggle .caret{margin-left:4px;white-space:nowrap;display:inline-block}.chunkydropdown-menu{min-width:20em}.chunkyrow{line-height:2;margin-left:1em;font-size:2em}.slider{width:3.8em;height:3.8em;display:block;transition:all 125ms linear;margin-left:.125em;margin-top:auto}.slideron{margin-left:1.35em}.content_wrapper{display:table-cell;vertical-align:middle}.search-container{padding:0 5px 5px}"]
                    }] }
        ];
        /** @nocollapse */
        MultiselectDropdownComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: forms.FormBuilder, },
                { type: MultiSelectSearchFilter, },
                { type: core.IterableDiffers, },
                { type: core.ChangeDetectorRef, },
            ];
        };
        MultiselectDropdownComponent.propDecorators = {
            "options": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "texts": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "disabledSelection": [{ type: core.Input },],
            "selectionLimitReached": [{ type: core.Output },],
            "dropdownClosed": [{ type: core.Output },],
            "dropdownOpened": [{ type: core.Output },],
            "onAdded": [{ type: core.Output },],
            "onRemoved": [{ type: core.Output },],
            "onLazyLoad": [{ type: core.Output },],
            "onFilter": [{ type: core.Output },],
        };
        return MultiselectDropdownComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var OffClickDirective = (function () {
        function OffClickDirective() {
            this.onOffClick = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: '[offClick]',
                    },] }
        ];
        /** @nocollapse */
        OffClickDirective.propDecorators = {
            "onOffClick": [{ type: core.Output, args: ['offClick',] },],
            "onClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
            "onTouch": [{ type: core.HostListener, args: ['touchstart', ['$event'],] },],
            "onDocumentClick": [{ type: core.HostListener, args: ['document:click', ['$event'],] },],
            "onDocumentTouch": [{ type: core.HostListener, args: ['document:touchstart', ['$event'],] },],
        };
        return OffClickDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MultiselectDropdownModule = (function () {
        function MultiselectDropdownModule() {
        }
        MultiselectDropdownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.ReactiveFormsModule],
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

    exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
    exports.MultiselectDropdownModule = MultiselectDropdownModule;
    exports.MultiselectDropdownComponent = MultiselectDropdownComponent;
    exports.ɵa = AutofocusDirective;
    exports.ɵb = OffClickDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9zZWFyY2gtZmlsdGVyLnBpcGUudHMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9hdXRvZm9jdXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vb2ZmLWNsaWNrLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5pbnRlcmZhY2UgU3RyaW5nSGFzaE1hcDxUPiB7XHJcbiAgW2s6IHN0cmluZ106IFQ7XHJcbn1cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnc2VhcmNoRmlsdGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgcHJpdmF0ZSBfbGFzdE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdO1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlOiBTdHJpbmdIYXNoTWFwPElNdWx0aVNlbGVjdE9wdGlvbltdPiA9IHt9O1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlSW5jbHVzaXZlOiBTdHJpbmdIYXNoTWFwPGJvb2xlYW4gfCBudW1iZXI+ID0ge307XHJcbiAgcHJpdmF0ZSBfcHJldlNraXBwZWRJdGVtczogU3RyaW5nSGFzaE1hcDxudW1iZXI+ID0ge307XHJcblxyXG4gIHRyYW5zZm9ybShcclxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxyXG4gICAgc3RyID0gJycsXHJcbiAgICBsaW1pdCA9IDAsXHJcbiAgICByZW5kZXJMaW1pdCA9IDBcclxuICApOiBJTXVsdGlTZWxlY3RPcHRpb25bXSB7XHJcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBEcm9wIGNhY2hlIGJlY2F1c2Ugb3B0aW9ucyB3ZXJlIHVwZGF0ZWRcclxuICAgIGlmIChvcHRpb25zICE9PSB0aGlzLl9sYXN0T3B0aW9ucykge1xyXG4gICAgICB0aGlzLl9sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlID0ge307XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlID0ge307XHJcbiAgICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHMgPSB0aGlzLl9zZWFyY2hDYWNoZS5oYXNPd25Qcm9wZXJ0eShzdHIpXHJcbiAgICAgID8gdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXVxyXG4gICAgICA6IHRoaXMuX2RvU2VhcmNoKG9wdGlvbnMsIHN0ciwgbGltaXQpO1xyXG5cclxuICAgIGNvbnN0IGlzVW5kZXJMaW1pdCA9IG9wdGlvbnMubGVuZ3RoIDw9IGxpbWl0O1xyXG5cclxuICAgIHJldHVybiBpc1VuZGVyTGltaXRcclxuICAgICAgPyBmaWx0ZXJlZE9wdHNcclxuICAgICAgOiB0aGlzLl9saW1pdFJlbmRlcmVkSXRlbXMoZmlsdGVyZWRPcHRzLCByZW5kZXJMaW1pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTdWJzZXRPcHRpb25zKFxyXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2U2VhcmNoU3RyOiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IHByZXZJbmNsdXNpdmVPcklkeCA9IHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3ByZXZTZWFyY2hTdHJdO1xyXG5cclxuICAgIGlmIChwcmV2SW5jbHVzaXZlT3JJZHggPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgaGF2ZSBwcmV2aW91cyByZXN1bHRzIGFuZCBpdCB3YXMgaW5jbHVzaXZlLCBkbyBvbmx5IHN1YnNlYXJjaFxyXG4gICAgICByZXR1cm4gcHJldk9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmV2SW5jbHVzaXZlT3JJZHggPT09ICdudW1iZXInKSB7XHJcbiAgICAgIC8vIE9yIHJldXNlIHByZXYgcmVzdWx0cyB3aXRoIHVuY2hlY2tlZCBvbmVzXHJcbiAgICAgIHJldHVybiBbLi4ucHJldk9wdGlvbnMsIC4uLm9wdGlvbnMuc2xpY2UocHJldkluY2x1c2l2ZU9ySWR4KV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kb1NlYXJjaChvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSwgc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHByZXZTdHIgPSBzdHIuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29uc3QgcHJldlJlc3VsdHMgPSB0aGlzLl9zZWFyY2hDYWNoZVtwcmV2U3RyXTtcclxuICAgIGNvbnN0IHByZXZSZXN1bHRTaGlmdCA9IHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbcHJldlN0cl0gfHwgMDtcclxuXHJcbiAgICBpZiAocHJldlJlc3VsdHMpIHtcclxuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldFN1YnNldE9wdGlvbnMob3B0aW9ucywgcHJldlJlc3VsdHMsIHByZXZTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdHNMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IG1heEZvdW5kID0gbGltaXQgPiAwID8gTWF0aC5taW4obGltaXQsIG9wdHNMZW5ndGgpIDogb3B0c0xlbmd0aDtcclxuICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAodGhpcy5fZXNjYXBlUmVnRXhwKHN0ciksICdpJyk7XHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcblxyXG4gICAgbGV0IGkgPSAwLCBmb3VuZGVkID0gMCwgcmVtb3ZlZEZyb21QcmV2UmVzdWx0ID0gMDtcclxuXHJcbiAgICBjb25zdCBkb2VzT3B0aW9uTWF0Y2ggPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHJlZ2V4cC50ZXN0KG9wdGlvbi5uYW1lKTtcclxuICAgIGNvbnN0IGdldENoaWxkcmVuID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICBvcHRpb25zLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkKTtcclxuICAgIGNvbnN0IGdldFBhcmVudCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cclxuICAgICAgb3B0aW9ucy5maW5kKHBhcmVudCA9PiBvcHRpb24ucGFyZW50SWQgPT09IHBhcmVudC5pZCk7XHJcbiAgICBjb25zdCBmb3VuZEZuID0gKGl0ZW06IGFueSkgPT4geyBmaWx0ZXJlZE9wdHMucHVzaChpdGVtKTsgZm91bmRlZCsrOyB9O1xyXG4gICAgY29uc3Qgbm90Rm91bmRGbiA9IHByZXZSZXN1bHRzID8gKCkgPT4gcmVtb3ZlZEZyb21QcmV2UmVzdWx0KysgOiAoKSA9PiB7IH07XHJcblxyXG4gICAgZm9yICg7IGkgPCBvcHRzTGVuZ3RoICYmIGZvdW5kZWQgPCBtYXhGb3VuZDsgKytpKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcbiAgICAgIGNvbnN0IGRpcmVjdE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKG9wdGlvbik7XHJcblxyXG4gICAgICBpZiAoZGlyZWN0TWF0Y2gpIHtcclxuICAgICAgICBmb3VuZEZuKG9wdGlvbik7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTWF0Y2ggPSBnZXRDaGlsZHJlbihvcHRpb24pLnNvbWUoZG9lc09wdGlvbk1hdGNoKTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuTWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2goZ2V0UGFyZW50KG9wdGlvbikpO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50TWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbm90Rm91bmRGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvdGFsSXRlcmF0aW9ucyA9IGkgKyBwcmV2UmVzdWx0U2hpZnQ7XHJcblxyXG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXSA9IGZpbHRlcmVkT3B0cztcclxuICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3N0cl0gPSBpID09PSBvcHRzTGVuZ3RoIHx8IHRvdGFsSXRlcmF0aW9ucztcclxuICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbc3RyXSA9IHJlbW92ZWRGcm9tUHJldlJlc3VsdCArIHByZXZSZXN1bHRTaGlmdDtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRPcHRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbGltaXRSZW5kZXJlZEl0ZW1zPFQ+KGl0ZW1zOiBUW10sIGxpbWl0OiBudW1iZXIpOiBUW10ge1xyXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IGxpbWl0ICYmIGxpbWl0ID4gMCA/IGl0ZW1zLnNsaWNlKDAsIGxpbWl0KSA6IGl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZXNjYXBlUmVnRXhwKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NzQXV0b2ZvY3VzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lsbCBzZXQgZm9jdXMgaWYgc2V0IHRvIGZhbHN5IHZhbHVlIG9yIG5vdCBzZXQgYXQgYWxsXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gIGdldCBlbGVtZW50KCk6IHsgZm9jdXM/OiBGdW5jdGlvbiB9IHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEhvc3QoKSBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XHJcblxyXG4gICAgaWYgKHNzQXV0b2ZvY3VzQ2hhbmdlICYmICFzc0F1dG9mb2N1c0NoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5zc0F1dG9mb2N1cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIERvQ2hlY2ssXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgSXRlcmFibGVEaWZmZXJzLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtQ29udHJvbCxcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBWYWxpZGF0b3IsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24sIElNdWx0aVNlbGVjdFNldHRpbmdzLCBJTXVsdGlTZWxlY3RUZXh0cywgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qXHJcbiAqIEFuZ3VsYXIgMiBEcm9wZG93biBNdWx0aXNlbGVjdCBmb3IgQm9vdHN0cmFwXHJcbiAqXHJcbiAqIFNpbW9uIExpbmRoXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2Z0c2ltb24vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0XHJcbiAqL1xyXG5cclxuY29uc3QgTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3MtbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24uY29tcG9uZW50LmNzcyddLFxyXG4gIHByb3ZpZGVyczogW01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SLCBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcl0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgRG9DaGVjayxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgVmFsaWRhdG9yIHtcclxuICBmaWx0ZXJDb250cm9sOiBGb3JtQ29udHJvbCA9IHRoaXMuZmIuY29udHJvbCgnJyk7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PElNdWx0aVNlbGVjdE9wdGlvbj47XHJcbiAgQElucHV0KCkgc2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzO1xyXG4gIEBJbnB1dCgpIHRleHRzOiBJTXVsdGlTZWxlY3RUZXh0cztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25MaW1pdFJlYWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25BZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25SZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkxhenlMb2FkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkZpbHRlcjogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlQ2hhbmdlcztcclxuXHJcbiAgZ2V0IGZvY3VzQmFjaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmZvY3VzQmFjayAmJiB0aGlzLl9mb2N1c0JhY2s7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xpY2tlZE91dHNpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLnNldHRpbmdzLmNsb3NlT25DbGlja091dHNpZGUpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZvY3VzQmFjayA9IHRydWU7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGZpbHRlcmVkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICBsYXp5TG9hZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgcmVuZGVyRmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIG1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHByZXZNb2RlbDogYW55W10gPSBbXTtcclxuICBwYXJlbnRzOiBhbnlbXTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRpZmZlcjogYW55O1xyXG4gIG51bVNlbGVjdGVkOiBudW1iZXIgPSAwO1xyXG4gIHNldCBpc1Zpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWw7XHJcbiAgICB0aGlzLl93b3JrZXJEb2NDbGlja2VkID0gdmFsID8gZmFsc2UgOiB0aGlzLl93b3JrZXJEb2NDbGlja2VkO1xyXG4gIH1cclxuICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICB9XHJcbiAgcmVuZGVySXRlbXMgPSB0cnVlO1xyXG4gIGNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIgPSBuZXcgU2V0KCk7XHJcbiAgY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICBsb2FkZWRWYWx1ZUlkcyA9IFtdO1xyXG4gIF9mb2N1c0JhY2sgPSBmYWxzZTtcclxuICBmb2N1c2VkSXRlbTogSU11bHRpU2VsZWN0T3B0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICBkZWZhdWx0U2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzID0ge1xyXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgIHB1bGxSaWdodDogZmFsc2UsXHJcbiAgICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gICAgc2VhcmNoUmVuZGVyTGltaXQ6IDAsXHJcbiAgICBzZWFyY2hSZW5kZXJBZnRlcjogMSxcclxuICAgIHNlYXJjaE1heExpbWl0OiAwLFxyXG4gICAgc2VhcmNoTWF4UmVuZGVyZWRJdGVtczogMCxcclxuICAgIGNoZWNrZWRTdHlsZTogJ2NoZWNrYm94ZXMnLFxyXG4gICAgYnV0dG9uQ2xhc3NlczogJ2J0biBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgY29udGFpbmVyQ2xhc3NlczogJ2Ryb3Bkb3duLWlubGluZScsXHJcbiAgICBzZWxlY3Rpb25MaW1pdDogMCxcclxuICAgIG1pblNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXHJcbiAgICBhdXRvVW5zZWxlY3Q6IGZhbHNlLFxyXG4gICAgc2hvd0NoZWNrQWxsOiBmYWxzZSxcclxuICAgIHNob3dVbmNoZWNrQWxsOiBmYWxzZSxcclxuICAgIGZpeGVkVGl0bGU6IGZhbHNlLFxyXG4gICAgZHluYW1pY1RpdGxlTWF4SXRlbXM6IDMsXHJcbiAgICBtYXhIZWlnaHQ6ICczMDBweCcsXHJcbiAgICBpc0xhenlMb2FkOiBmYWxzZSxcclxuICAgIHN0b3BTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXHJcbiAgICBsb2FkVmlld0Rpc3RhbmNlOiAxLFxyXG4gICAgc2VsZWN0QWRkZWRWYWx1ZXM6IGZhbHNlLFxyXG4gICAgaWdub3JlTGFiZWxzOiBmYWxzZSxcclxuICAgIG1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlOiBmYWxzZSxcclxuICAgIGZvY3VzQmFjazogdHJ1ZSxcclxuICAgIHVzZUFycmF5OiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gW107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMubW9kZWwpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy51cGRhdGVOdW1TZWxlY3RlZCgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShfYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB0aGlzLm1vZGVsLmluZGV4T2Yoby5pZCkgJiYgIW8uZGlzYWJsZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgdmFsaWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShfZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU2VhcmNoKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy5tYXliZVN0b3BQcm9wYWdhdGlvbihldmVudCk7XHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wuc2V0VmFsdWUoJycpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcclxuICAgIHRoaXMuaXNWaXNpYmxlID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjbG9zZURyb3Bkb3duKGU/OiBFdmVudCkge1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy50b2dnbGVEcm9wZG93bihlKTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTE7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZChfZXZlbnQ6IEV2ZW50LCBvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCdvZmZDbGljaycpIG9uT2ZmQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcclxuICBwcml2YXRlIF90b3VjaEV2ZW50OiBUb3VjaEV2ZW50O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxyXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbGlja0V2ZW50ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdG91Y2hFdmVudCA9IGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBcclxuICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICE9PSB0aGlzLl90b3VjaEV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBPZmZDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vb2ZmLWNsaWNrLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXHJcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcclxuICAgIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxyXG4gICAgT2ZmQ2xpY2tEaXJlY3RpdmVcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bk1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIlBpcGUiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiSG9zdCIsIklucHV0IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiRXZlbnRFbWl0dGVyIiwiU3ViamVjdCIsInRha2VVbnRpbCIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiRm9ybUJ1aWxkZXIiLCJJdGVyYWJsZURpZmZlcnMiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFZTyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDO1FBQ3RELEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFBO0FBRUQsb0JBNkV1QixDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxP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