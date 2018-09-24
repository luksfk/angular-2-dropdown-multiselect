import { Pipe, Directive, ElementRef, Host, Input, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, IterableDiffers, Output, HostListener, NgModule } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultiSelectSearchFilter {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutofocusDirective {
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
const /** @type {?} */ MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectDropdownComponent),
    multi: true,
};
class MultiselectDropdownComponent {
    /**
     * @param {?} element
     * @param {?} fb
     * @param {?} searchFilter
     * @param {?} differs
     * @param {?} cdRef
     */
    constructor(element, fb, searchFilter, differs, cdRef) {
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
        this.onModelChange = (_) => { };
        this.onModelTouched = () => { };
        this.differ = differs.find([]).create(null);
        this.settings = this.defaultSettings;
        this.texts = this.defaultTexts;
    }
    /**
     * @return {?}
     */
    get focusBack() {
        return this.settings.focusBack && this._focusBack;
    }
    /**
     * @return {?}
     */
    clickedOutside() {
        if (!this.isVisible || !this.settings.closeOnClickOutside) {
            return;
        }
        this.isVisible = false;
        this._focusBack = true;
        this.dropdownClosed.emit();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set isVisible(val) {
        this._isVisible = val;
        this._workerDocClicked = val ? false : this._workerDocClicked;
    }
    /**
     * @return {?}
     */
    get isVisible() {
        return this._isVisible;
    }
    /**
     * @return {?}
     */
    get searchLimit() {
        return this.settings.searchRenderLimit;
    }
    /**
     * @return {?}
     */
    get searchRenderAfter() {
        return this.settings.searchRenderAfter;
    }
    /**
     * @return {?}
     */
    get searchLimitApplied() {
        return this.searchLimit > 0 && this.options.length > this.searchLimit;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getItemStyle(option) {
        if (!option.isLabel) ;
        if (option.disabled) ;
    }
    /**
     * @return {?}
     */
    getItemStyleSelectionDisabled() {
        if (this.disabledSelection) {
            return { cursor: 'default' };
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.title = this.texts.defaultTitle || '';
        this.filterControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            this.updateRenderItems();
            if (this.settings.isLazyLoad) {
                this.load();
            }
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['options']) {
            this.options = this.options || [];
            this.parents = this.options
                .filter(option => typeof option.parentId === 'number')
                .map(option => option.parentId);
            this.updateRenderItems();
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                this.loadedValueIds.length === 0) {
                this.loadedValueIds = this.loadedValueIds.concat(changes["options"].currentValue.map(value => value.id));
            }
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                changes["options"].previousValue) {
                const /** @type {?} */ addedValues = changes["options"].currentValue.filter(value => this.loadedValueIds.indexOf(value.id) === -1);
                this.loadedValueIds.concat(addedValues.map(value => value.id));
                if (this.checkAllStatus) {
                    this.addChecks(addedValues);
                }
                else if (this.checkAllSearchRegister.size > 0) {
                    this.checkAllSearchRegister.forEach(searchValue => this.addChecks(this.applyFilters(addedValues, searchValue)));
                }
            }
            if (this.texts) {
                this.updateTitle();
            }
            this.fireModelChange();
        }
        if (changes['settings']) {
            this.settings = Object.assign({}, this.defaultSettings, this.settings);
        }
        if (changes['texts']) {
            this.texts = Object.assign({}, this.defaultTexts, this.texts);
            if (!changes['texts'].isFirstChange()) {
                this.updateTitle();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next();
    }
    /**
     * @return {?}
     */
    updateRenderItems() {
        this.renderItems =
            !this.searchLimitApplied ||
                this.filterControl.value.length >= this.searchRenderAfter;
        this.filteredOptions = this.applyFilters(this.options, this.settings.isLazyLoad ? '' : this.filterControl.value);
        this.renderFilteredOptions = this.renderItems ? this.filteredOptions : [];
        this.focusedItem = undefined;
    }
    /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    applyFilters(options, value) {
        return this.searchFilter.transform(options, value, this.settings.searchMaxLimit, this.settings.searchMaxRenderedItems);
    }
    /**
     * @return {?}
     */
    fireModelChange() {
        if (this.model != this.prevModel) {
            this.prevModel = this.model;
            this.onModelChange(this.model);
            this.onModelTouched();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    }
    /**
     * @param {?} _c
     * @return {?}
     */
    validate(_c) {
        if (this.model && this.model.length) {
            return {
                required: {
                    valid: false
                }
            };
        }
        if (this.options.filter(o => this.model.indexOf(o.id) && !o.disabled).length === 0) {
            return {
                selection: {
                    valid: false
                }
            };
        }
        return null;
    }
    /**
     * @param {?} _fn
     * @return {?}
     */
    registerOnValidatorChange(_fn) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clearSearch(event) {
        this.maybeStopPropagation(event);
        this.filterControl.setValue('');
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    toggleDropdown(e) {
        if (this.isVisible) {
            this._focusBack = true;
        }
        this.isVisible = !this.isVisible;
        this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        this.focusedItem = undefined;
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    closeDropdown(e) {
        this.isVisible = true;
        this.toggleDropdown(e);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    isSelected(option) {
        return this.model && this.model.indexOf(option.id) > -1;
    }
    /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    setSelected(_event, option) {
        if (option.isLabel) {
            return;
        }
        if (option.disabled) {
            return;
        }
        if (this.disabledSelection) {
            return;
        }
        setTimeout(() => {
            this.maybeStopPropagation(_event);
            this.maybePreventDefault(_event);
            const /** @type {?} */ index = this.model.indexOf(option.id);
            const /** @type {?} */ isAtSelectionLimit = this.settings.selectionLimit > 0 &&
                this.model.length >= this.settings.selectionLimit;
            const /** @type {?} */ removeItem = (idx, id) => {
                this.model.splice(idx, 1);
                this.onRemoved.emit(id);
                if (this.settings.isLazyLoad &&
                    this.lazyLoadOptions.some(val => val.id === id)) {
                    this.lazyLoadOptions.splice(this.lazyLoadOptions.indexOf(this.lazyLoadOptions.find(val => val.id === id)), 1);
                }
            };
            if (index > -1) {
                if (this.settings.minSelectionLimit === undefined ||
                    this.numSelected > this.settings.minSelectionLimit) {
                    removeItem(index, option.id);
                }
                const /** @type {?} */ parentIndex = option.parentId && this.model.indexOf(option.parentId);
                if (parentIndex > -1) {
                    removeItem(parentIndex, option.parentId);
                }
                else if (this.parents.indexOf(option.id) > -1) {
                    this.options
                        .filter(child => this.model.indexOf(child.id) > -1 &&
                        child.parentId === option.id)
                        .forEach(child => removeItem(this.model.indexOf(child.id), child.id));
                }
            }
            else if (isAtSelectionLimit && !this.settings.autoUnselect) {
                this.selectionLimitReached.emit(this.model.length);
                return;
            }
            else {
                const /** @type {?} */ addItem = (id) => {
                    this.model.push(id);
                    this.onAdded.emit(id);
                    if (this.settings.isLazyLoad &&
                        !this.lazyLoadOptions.some(val => val.id === id)) {
                        this.lazyLoadOptions.push(option);
                    }
                };
                addItem(option.id);
                if (!isAtSelectionLimit) {
                    if (option.parentId && !this.settings.ignoreLabels) {
                        const /** @type {?} */ children = this.options.filter(child => child.id !== option.id && child.parentId === option.parentId);
                        if (children.every(child => this.model.indexOf(child.id) > -1)) {
                            addItem(option.parentId);
                        }
                    }
                    else if (this.parents.indexOf(option.id) > -1) {
                        const /** @type {?} */ children = this.options.filter(child => this.model.indexOf(child.id) < 0 && child.parentId === option.id);
                        children.forEach(child => addItem(child.id));
                    }
                }
                else {
                    removeItem(0, this.model[0]);
                }
            }
            if (this.settings.closeOnSelect) {
                this.toggleDropdown();
            }
            this.model = this.model.slice();
            this.fireModelChange();
        }, 0);
    }
    /**
     * @return {?}
     */
    updateNumSelected() {
        this.numSelected =
            this.model.filter(id => this.parents.indexOf(id) < 0).length || 0;
    }
    /**
     * @return {?}
     */
    updateTitle() {
        let /** @type {?} */ numSelectedOptions = this.options.length;
        if (this.settings.ignoreLabels) {
            numSelectedOptions = this.options.filter((option) => !option.isLabel).length;
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
            const /** @type {?} */ useOptions = this.settings.isLazyLoad && this.lazyLoadOptions.length
                ? this.lazyLoadOptions
                : this.options;
            let /** @type {?} */ titleSelections;
            if (this.settings.maintainSelectionOrderInTitle) {
                const /** @type {?} */ optionIds = useOptions.map((selectOption, idx) => selectOption.id);
                titleSelections = this.model
                    .map((selectedId) => optionIds.indexOf(selectedId))
                    .filter((optionIndex) => optionIndex > -1)
                    .map((optionIndex) => useOptions[optionIndex]);
            }
            else {
                titleSelections = useOptions.filter((option) => this.model.indexOf(option.id) > -1);
            }
            this.title = titleSelections.map((option) => option.name).join(', ');
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
    }
    /**
     * @return {?}
     */
    searchFilterApplied() {
        return (this.settings.enableSearch &&
            this.filterControl.value &&
            this.filterControl.value.length > 0);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    addChecks(options) {
        const /** @type {?} */ checkedOptions = options
            .filter((option) => {
            if (!option.disabled &&
                (this.model.indexOf(option.id) === -1 &&
                    !(this.settings.ignoreLabels && option.isLabel))) {
                this.onAdded.emit(option.id);
                return true;
            }
            return false;
        })
            .map((option) => option.id);
        this.model = this.model.concat(checkedOptions);
    }
    /**
     * @return {?}
     */
    checkAll() {
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
    }
    /**
     * @return {?}
     */
    uncheckAll() {
        if (!this.disabledSelection) {
            const /** @type {?} */ checkedOptions = this.model;
            let /** @type {?} */ unCheckedOptions = !this.searchFilterApplied()
                ? this.model
                : this.filteredOptions.map((option) => option.id);
            // set unchecked options only to the ones that were checked
            unCheckedOptions = checkedOptions.filter(item => unCheckedOptions.indexOf(item) > -1);
            this.model = this.model.filter((id) => {
                if ((unCheckedOptions.indexOf(id) < 0 &&
                    this.settings.minSelectionLimit === undefined) ||
                    unCheckedOptions.indexOf(id) < this.settings.minSelectionLimit) {
                    return true;
                }
                else {
                    this.onRemoved.emit(id);
                    return false;
                }
            });
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied()) {
                    if (this.checkAllSearchRegister.has(this.filterControl.value)) {
                        this.checkAllSearchRegister.delete(this.filterControl.value);
                        this.checkAllSearchRegister.forEach(function (searchTerm) {
                            const /** @type {?} */ filterOptions = this.applyFilters(this.options.filter(option => unCheckedOptions.indexOf(option.id) > -1), searchTerm);
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
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    preventCheckboxCheck(event, option) {
        if (option.disabled ||
            (this.settings.selectionLimit &&
                !this.settings.autoUnselect &&
                this.model.length >= this.settings.selectionLimit &&
                this.model.indexOf(option.id) === -1 &&
                this.maybePreventDefault(event))) {
            this.maybePreventDefault(event);
        }
    }
    /**
     * @param {?=} option
     * @return {?}
     */
    isCheckboxDisabled(option) {
        return this.disabledSelection || option && option.disabled;
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    checkScrollPosition(ev) {
        const /** @type {?} */ scrollTop = ev.target.scrollTop;
        const /** @type {?} */ scrollHeight = ev.target.scrollHeight;
        const /** @type {?} */ scrollElementHeight = ev.target.clientHeight;
        const /** @type {?} */ roundingPixel = 1;
        const /** @type {?} */ gutterPixel = 1;
        if (scrollTop >=
            scrollHeight -
                (1 + this.settings.loadViewDistance) * scrollElementHeight -
                roundingPixel -
                gutterPixel) {
            this.load();
        }
    }
    /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    checkScrollPropagation(ev, element) {
        const /** @type {?} */ scrollTop = element.scrollTop;
        const /** @type {?} */ scrollHeight = element.scrollHeight;
        const /** @type {?} */ scrollElementHeight = element.clientHeight;
        if ((ev.deltaY > 0 && scrollTop + scrollElementHeight >= scrollHeight) ||
            (ev.deltaY < 0 && scrollTop <= 0)) {
            ev = ev || window.event;
            this.maybePreventDefault(ev);
            ev.returnValue = false;
        }
    }
    /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    trackById(idx, selectOption) {
        return selectOption.id;
    }
    /**
     * @return {?}
     */
    load() {
        this.onLazyLoad.emit({
            length: this.options.length,
            filter: this.filterControl.value,
            checkAllSearches: this.checkAllSearchRegister,
            checkAllStatus: this.checkAllStatus,
        });
    }
    /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    focusItem(dir, e) {
        if (!this.isVisible) {
            return;
        }
        this.maybePreventDefault(e);
        const /** @type {?} */ idx = this.filteredOptions.indexOf(this.focusedItem);
        if (idx === -1) {
            this.focusedItem = this.filteredOptions[0];
            return;
        }
        const /** @type {?} */ nextIdx = idx + dir;
        const /** @type {?} */ newIdx = nextIdx < 0
            ? this.filteredOptions.length - 1
            : nextIdx % this.filteredOptions.length;
        this.focusedItem = this.filteredOptions[newIdx];
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    maybePreventDefault(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    maybeStopPropagation(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    }
}
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
MultiselectDropdownComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: FormBuilder, },
    { type: MultiSelectSearchFilter, },
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OffClickDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultiselectDropdownModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MultiSelectSearchFilter, MultiselectDropdownModule, MultiselectDropdownComponent, AutofocusDirective as ɵa, OffClickDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5pbnRlcmZhY2UgU3RyaW5nSGFzaE1hcDxUPiB7XHJcbiAgW2s6IHN0cmluZ106IFQ7XHJcbn1cclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnc2VhcmNoRmlsdGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgcHJpdmF0ZSBfbGFzdE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdO1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlOiBTdHJpbmdIYXNoTWFwPElNdWx0aVNlbGVjdE9wdGlvbltdPiA9IHt9O1xyXG4gIHByaXZhdGUgX3NlYXJjaENhY2hlSW5jbHVzaXZlOiBTdHJpbmdIYXNoTWFwPGJvb2xlYW4gfCBudW1iZXI+ID0ge307XHJcbiAgcHJpdmF0ZSBfcHJldlNraXBwZWRJdGVtczogU3RyaW5nSGFzaE1hcDxudW1iZXI+ID0ge307XHJcblxyXG4gIHRyYW5zZm9ybShcclxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxyXG4gICAgc3RyID0gJycsXHJcbiAgICBsaW1pdCA9IDAsXHJcbiAgICByZW5kZXJMaW1pdCA9IDBcclxuICApOiBJTXVsdGlTZWxlY3RPcHRpb25bXSB7XHJcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBEcm9wIGNhY2hlIGJlY2F1c2Ugb3B0aW9ucyB3ZXJlIHVwZGF0ZWRcclxuICAgIGlmIChvcHRpb25zICE9PSB0aGlzLl9sYXN0T3B0aW9ucykge1xyXG4gICAgICB0aGlzLl9sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlID0ge307XHJcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlID0ge307XHJcbiAgICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHMgPSB0aGlzLl9zZWFyY2hDYWNoZS5oYXNPd25Qcm9wZXJ0eShzdHIpXHJcbiAgICAgID8gdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXVxyXG4gICAgICA6IHRoaXMuX2RvU2VhcmNoKG9wdGlvbnMsIHN0ciwgbGltaXQpO1xyXG5cclxuICAgIGNvbnN0IGlzVW5kZXJMaW1pdCA9IG9wdGlvbnMubGVuZ3RoIDw9IGxpbWl0O1xyXG5cclxuICAgIHJldHVybiBpc1VuZGVyTGltaXRcclxuICAgICAgPyBmaWx0ZXJlZE9wdHNcclxuICAgICAgOiB0aGlzLl9saW1pdFJlbmRlcmVkSXRlbXMoZmlsdGVyZWRPcHRzLCByZW5kZXJMaW1pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTdWJzZXRPcHRpb25zKFxyXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXHJcbiAgICBwcmV2U2VhcmNoU3RyOiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IHByZXZJbmNsdXNpdmVPcklkeCA9IHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3ByZXZTZWFyY2hTdHJdO1xyXG5cclxuICAgIGlmIChwcmV2SW5jbHVzaXZlT3JJZHggPT09IHRydWUpIHtcclxuICAgICAgLy8gSWYgaGF2ZSBwcmV2aW91cyByZXN1bHRzIGFuZCBpdCB3YXMgaW5jbHVzaXZlLCBkbyBvbmx5IHN1YnNlYXJjaFxyXG4gICAgICByZXR1cm4gcHJldk9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmV2SW5jbHVzaXZlT3JJZHggPT09ICdudW1iZXInKSB7XHJcbiAgICAgIC8vIE9yIHJldXNlIHByZXYgcmVzdWx0cyB3aXRoIHVuY2hlY2tlZCBvbmVzXHJcbiAgICAgIHJldHVybiBbLi4ucHJldk9wdGlvbnMsIC4uLm9wdGlvbnMuc2xpY2UocHJldkluY2x1c2l2ZU9ySWR4KV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kb1NlYXJjaChvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSwgc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHByZXZTdHIgPSBzdHIuc2xpY2UoMCwgLTEpO1xyXG4gICAgY29uc3QgcHJldlJlc3VsdHMgPSB0aGlzLl9zZWFyY2hDYWNoZVtwcmV2U3RyXTtcclxuICAgIGNvbnN0IHByZXZSZXN1bHRTaGlmdCA9IHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbcHJldlN0cl0gfHwgMDtcclxuXHJcbiAgICBpZiAocHJldlJlc3VsdHMpIHtcclxuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldFN1YnNldE9wdGlvbnMob3B0aW9ucywgcHJldlJlc3VsdHMsIHByZXZTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdHNMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IG1heEZvdW5kID0gbGltaXQgPiAwID8gTWF0aC5taW4obGltaXQsIG9wdHNMZW5ndGgpIDogb3B0c0xlbmd0aDtcclxuICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAodGhpcy5fZXNjYXBlUmVnRXhwKHN0ciksICdpJyk7XHJcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcblxyXG4gICAgbGV0IGkgPSAwLCBmb3VuZGVkID0gMCwgcmVtb3ZlZEZyb21QcmV2UmVzdWx0ID0gMDtcclxuXHJcbiAgICBjb25zdCBkb2VzT3B0aW9uTWF0Y2ggPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHJlZ2V4cC50ZXN0KG9wdGlvbi5uYW1lKTtcclxuICAgIGNvbnN0IGdldENoaWxkcmVuID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICBvcHRpb25zLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkKTtcclxuICAgIGNvbnN0IGdldFBhcmVudCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cclxuICAgICAgb3B0aW9ucy5maW5kKHBhcmVudCA9PiBvcHRpb24ucGFyZW50SWQgPT09IHBhcmVudC5pZCk7XHJcbiAgICBjb25zdCBmb3VuZEZuID0gKGl0ZW06IGFueSkgPT4geyBmaWx0ZXJlZE9wdHMucHVzaChpdGVtKTsgZm91bmRlZCsrOyB9O1xyXG4gICAgY29uc3Qgbm90Rm91bmRGbiA9IHByZXZSZXN1bHRzID8gKCkgPT4gcmVtb3ZlZEZyb21QcmV2UmVzdWx0KysgOiAoKSA9PiB7IH07XHJcblxyXG4gICAgZm9yICg7IGkgPCBvcHRzTGVuZ3RoICYmIGZvdW5kZWQgPCBtYXhGb3VuZDsgKytpKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcbiAgICAgIGNvbnN0IGRpcmVjdE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKG9wdGlvbik7XHJcblxyXG4gICAgICBpZiAoZGlyZWN0TWF0Y2gpIHtcclxuICAgICAgICBmb3VuZEZuKG9wdGlvbik7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTWF0Y2ggPSBnZXRDaGlsZHJlbihvcHRpb24pLnNvbWUoZG9lc09wdGlvbk1hdGNoKTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuTWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2goZ2V0UGFyZW50KG9wdGlvbikpO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50TWF0Y2gpIHtcclxuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbm90Rm91bmRGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvdGFsSXRlcmF0aW9ucyA9IGkgKyBwcmV2UmVzdWx0U2hpZnQ7XHJcblxyXG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVbc3RyXSA9IGZpbHRlcmVkT3B0cztcclxuICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3N0cl0gPSBpID09PSBvcHRzTGVuZ3RoIHx8IHRvdGFsSXRlcmF0aW9ucztcclxuICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbc3RyXSA9IHJlbW92ZWRGcm9tUHJldlJlc3VsdCArIHByZXZSZXN1bHRTaGlmdDtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRPcHRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbGltaXRSZW5kZXJlZEl0ZW1zPFQ+KGl0ZW1zOiBUW10sIGxpbWl0OiBudW1iZXIpOiBUW10ge1xyXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IGxpbWl0ICYmIGxpbWl0ID4gMCA/IGl0ZW1zLnNsaWNlKDAsIGxpbWl0KSA6IGl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZXNjYXBlUmVnRXhwKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NzQXV0b2ZvY3VzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lsbCBzZXQgZm9jdXMgaWYgc2V0IHRvIGZhbHN5IHZhbHVlIG9yIG5vdCBzZXQgYXQgYWxsXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gIGdldCBlbGVtZW50KCk6IHsgZm9jdXM/OiBGdW5jdGlvbiB9IHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEhvc3QoKSBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XHJcblxyXG4gICAgaWYgKHNzQXV0b2ZvY3VzQ2hhbmdlICYmICFzc0F1dG9mb2N1c0NoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5zc0F1dG9mb2N1cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIERvQ2hlY2ssXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgSXRlcmFibGVEaWZmZXJzLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtQ29udHJvbCxcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBWYWxpZGF0b3IsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24sIElNdWx0aVNlbGVjdFNldHRpbmdzLCBJTXVsdGlTZWxlY3RUZXh0cywgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qXHJcbiAqIEFuZ3VsYXIgMiBEcm9wZG93biBNdWx0aXNlbGVjdCBmb3IgQm9vdHN0cmFwXHJcbiAqXHJcbiAqIFNpbW9uIExpbmRoXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2Z0c2ltb24vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0XHJcbiAqL1xyXG5cclxuY29uc3QgTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3MtbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24uY29tcG9uZW50LmNzcyddLFxyXG4gIHByb3ZpZGVyczogW01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SLCBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcl0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgRG9DaGVjayxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgVmFsaWRhdG9yIHtcclxuICBmaWx0ZXJDb250cm9sOiBGb3JtQ29udHJvbCA9IHRoaXMuZmIuY29udHJvbCgnJyk7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PElNdWx0aVNlbGVjdE9wdGlvbj47XHJcbiAgQElucHV0KCkgc2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzO1xyXG4gIEBJbnB1dCgpIHRleHRzOiBJTXVsdGlTZWxlY3RUZXh0cztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25MaW1pdFJlYWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25BZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25SZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkxhenlMb2FkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkZpbHRlcjogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlQ2hhbmdlcztcclxuXHJcbiAgZ2V0IGZvY3VzQmFjaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmZvY3VzQmFjayAmJiB0aGlzLl9mb2N1c0JhY2s7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xpY2tlZE91dHNpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLnNldHRpbmdzLmNsb3NlT25DbGlja091dHNpZGUpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZvY3VzQmFjayA9IHRydWU7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGZpbHRlcmVkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICBsYXp5TG9hZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgcmVuZGVyRmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIG1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHByZXZNb2RlbDogYW55W10gPSBbXTtcclxuICBwYXJlbnRzOiBhbnlbXTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRpZmZlcjogYW55O1xyXG4gIG51bVNlbGVjdGVkOiBudW1iZXIgPSAwO1xyXG4gIHNldCBpc1Zpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWw7XHJcbiAgICB0aGlzLl93b3JrZXJEb2NDbGlja2VkID0gdmFsID8gZmFsc2UgOiB0aGlzLl93b3JrZXJEb2NDbGlja2VkO1xyXG4gIH1cclxuICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICB9XHJcbiAgcmVuZGVySXRlbXMgPSB0cnVlO1xyXG4gIGNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIgPSBuZXcgU2V0KCk7XHJcbiAgY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICBsb2FkZWRWYWx1ZUlkcyA9IFtdO1xyXG4gIF9mb2N1c0JhY2sgPSBmYWxzZTtcclxuICBmb2N1c2VkSXRlbTogSU11bHRpU2VsZWN0T3B0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICBkZWZhdWx0U2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzID0ge1xyXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgIHB1bGxSaWdodDogZmFsc2UsXHJcbiAgICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gICAgc2VhcmNoUmVuZGVyTGltaXQ6IDAsXHJcbiAgICBzZWFyY2hSZW5kZXJBZnRlcjogMSxcclxuICAgIHNlYXJjaE1heExpbWl0OiAwLFxyXG4gICAgc2VhcmNoTWF4UmVuZGVyZWRJdGVtczogMCxcclxuICAgIGNoZWNrZWRTdHlsZTogJ2NoZWNrYm94ZXMnLFxyXG4gICAgYnV0dG9uQ2xhc3NlczogJ2J0biBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgY29udGFpbmVyQ2xhc3NlczogJ2Ryb3Bkb3duLWlubGluZScsXHJcbiAgICBzZWxlY3Rpb25MaW1pdDogMCxcclxuICAgIG1pblNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXHJcbiAgICBhdXRvVW5zZWxlY3Q6IGZhbHNlLFxyXG4gICAgc2hvd0NoZWNrQWxsOiBmYWxzZSxcclxuICAgIHNob3dVbmNoZWNrQWxsOiBmYWxzZSxcclxuICAgIGZpeGVkVGl0bGU6IGZhbHNlLFxyXG4gICAgZHluYW1pY1RpdGxlTWF4SXRlbXM6IDMsXHJcbiAgICBtYXhIZWlnaHQ6ICczMDBweCcsXHJcbiAgICBpc0xhenlMb2FkOiBmYWxzZSxcclxuICAgIHN0b3BTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXHJcbiAgICBsb2FkVmlld0Rpc3RhbmNlOiAxLFxyXG4gICAgc2VsZWN0QWRkZWRWYWx1ZXM6IGZhbHNlLFxyXG4gICAgaWdub3JlTGFiZWxzOiBmYWxzZSxcclxuICAgIG1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlOiBmYWxzZSxcclxuICAgIGZvY3VzQmFjazogdHJ1ZSxcclxuICAgIHVzZUFycmF5OiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlQXJyYXkpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gW107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMubW9kZWwpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy51cGRhdGVOdW1TZWxlY3RlZCgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShfYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB0aGlzLm1vZGVsLmluZGV4T2Yoby5pZCkgJiYgIW8uZGlzYWJsZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgdmFsaWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShfZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU2VhcmNoKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy5tYXliZVN0b3BQcm9wYWdhdGlvbihldmVudCk7XHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wuc2V0VmFsdWUoJycpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcclxuICAgIHRoaXMuaXNWaXNpYmxlID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjbG9zZURyb3Bkb3duKGU/OiBFdmVudCkge1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy50b2dnbGVEcm9wZG93bihlKTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTE7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZChfZXZlbnQ6IEV2ZW50LCBvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCdvZmZDbGljaycpIG9uT2ZmQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcclxuICBwcml2YXRlIF90b3VjaEV2ZW50OiBUb3VjaEV2ZW50O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxyXG4gIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbGlja0V2ZW50ID0gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdG91Y2hFdmVudCA9IGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBcclxuICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50ICE9PSB0aGlzLl90b3VjaEV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBPZmZDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vb2ZmLWNsaWNrLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXHJcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcclxuICAgIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxyXG4gICAgT2ZmQ2xpY2tEaXJlY3RpdmVcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bk1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7NEJBYzhELEVBQUU7cUNBQ0csRUFBRTtpQ0FDaEIsRUFBRTs7Ozs7Ozs7O0lBRXJELFNBQVMsQ0FDUCxPQUE2QixFQUM3QixHQUFHLEdBQUcsRUFBRSxFQUNSLEtBQUssR0FBRyxDQUFDLEVBQ1QsV0FBVyxHQUFHLENBQUM7UUFFZixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUd4QixJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUVELHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Y0FDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7Y0FDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLHVCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUU3QyxPQUFPLFlBQVk7Y0FDZixZQUFZ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