/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, IterableDiffers, Output, } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultiSelectSearchFilter } from './search-filter.pipe';
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
export class MultiselectDropdownComponent {
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
        const /** @type {?} */ style = {};
        if (!option.isLabel) {
            style['cursor'] = 'pointer';
        }
        if (option.disabled) {
            style['cursor'] = 'default';
        }
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
function MultiselectDropdownComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MultiselectDropdownComponent.propDecorators;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.filterControl;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.options;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.settings;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.texts;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.disabled;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.disabledSelection;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.selectionLimitReached;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.dropdownClosed;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.dropdownOpened;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onAdded;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onRemoved;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onLazyLoad;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onFilter;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.destroyed$;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.filteredOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.lazyLoadOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.renderFilteredOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.model;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.prevModel;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.parents;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.title;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.differ;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.numSelected;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.renderItems;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.checkAllSearchRegister;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.checkAllStatus;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.loadedValueIds;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._focusBack;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.focusedItem;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.defaultSettings;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.defaultTexts;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._isVisible;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._workerDocClicked;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onModelChange;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onModelTouched;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.element;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.fb;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.searchFilter;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBRVYsS0FBSyxFQUNMLGVBQWUsRUFJZixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLFdBQVcsRUFFWCxpQkFBaUIsR0FFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7QUFVL0QsdUJBQU0sMEJBQTBCLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0lBQzNELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLE1BQU07Ozs7Ozs7O0lBb0hKLFlBQ1UsU0FDQSxJQUNBLGNBQ1IsT0FBd0IsRUFDaEI7UUFKQSxZQUFPLEdBQVAsT0FBTztRQUNQLE9BQUUsR0FBRixFQUFFO1FBQ0YsaUJBQVksR0FBWixZQUFZO1FBRVosVUFBSyxHQUFMLEtBQUs7NkJBbEhjLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt3QkFLbkIsS0FBSztpQ0FDSSxLQUFLO3FDQUVULElBQUksWUFBWSxFQUFFOzhCQUN6QixJQUFJLFlBQVksRUFBRTs4QkFDbEIsSUFBSSxZQUFZLEVBQUU7dUJB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QUFNLEdBQUcsQ0FBQztZQUNqQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxDQUFpQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7SUFHSyxvQkFBb0IsQ0FBQyxDQUFrQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCOzs7O1lBbHFCSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsMDJMQUF3QztnQkFFeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsdUJBQXVCLENBQUM7Z0JBQ2hFLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQTdDQyxVQUFVO1lBZVYsV0FBVztZQVFKLHVCQUF1QjtZQWxCOUIsZUFBZTtZQVJmLGlCQUFpQjs7O3dCQTBEaEIsS0FBSzt5QkFDTCxLQUFLO3NCQUNMLEtBQUs7eUJBQ0wsS0FBSztrQ0FDTCxLQUFLO3NDQUVMLE1BQU07K0JBQ04sTUFBTTsrQkFDTixNQUFNO3dCQUNOLE1BQU07MEJBQ04sTUFBTTsyQkFDTixNQUFNO3lCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRG9DaGVjayxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIFZhbGlkYXRvcixcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXIucGlwZSc7XHJcbmltcG9ydCB7IElNdWx0aVNlbGVjdE9wdGlvbiwgSU11bHRpU2VsZWN0U2V0dGluZ3MsIElNdWx0aVNlbGVjdFRleHRzLCB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLypcclxuICogQW5ndWxhciAyIERyb3Bkb3duIE11bHRpc2VsZWN0IGZvciBCb290c3RyYXBcclxuICpcclxuICogU2ltb24gTGluZGhcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3NvZnRzaW1vbi9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3RcclxuICovXHJcblxyXG5jb25zdCBNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi5jb21wb25lbnQuY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1IsIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBEb0NoZWNrLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBWYWxpZGF0b3Ige1xyXG4gIGZpbHRlckNvbnRyb2w6IEZvcm1Db250cm9sID0gdGhpcy5mYi5jb250cm9sKCcnKTtcclxuXHJcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuICBASW5wdXQoKSBzZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3M7XHJcbiAgQElucHV0KCkgdGV4dHM6IElNdWx0aVNlbGVjdFRleHRzO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGlzYWJsZWRTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZHJvcGRvd25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duT3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkFkZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvblJlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uTGF6eUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRmlsdGVyOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzO1xyXG5cclxuICBnZXQgZm9jdXNCYWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZm9jdXNCYWNrICYmIHRoaXMuX2ZvY3VzQmFjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGlja2VkT3V0c2lkZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuc2V0dGluZ3MuY2xvc2VPbkNsaWNrT3V0c2lkZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgZmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIGxhenlMb2FkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICByZW5kZXJGaWx0ZXJlZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgbW9kZWw6IGFueVtdID0gW107XHJcbiAgcHJldk1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHBhcmVudHM6IGFueVtdO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGlmZmVyOiBhbnk7XHJcbiAgbnVtU2VsZWN0ZWQ6IG51bWJlciA9IDA7XHJcbiAgc2V0IGlzVmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZSA9IHZhbDtcclxuICAgIHRoaXMuX3dvcmtlckRvY0NsaWNrZWQgPSB2YWwgPyBmYWxzZSA6IHRoaXMuX3dvcmtlckRvY0NsaWNrZWQ7XHJcbiAgfVxyXG4gIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gIH1cclxuICByZW5kZXJJdGVtcyA9IHRydWU7XHJcbiAgY2hlY2tBbGxTZWFyY2hSZWdpc3RlciA9IG5ldyBTZXQoKTtcclxuICBjaGVja0FsbFN0YXR1cyA9IGZhbHNlO1xyXG4gIGxvYWRlZFZhbHVlSWRzID0gW107XHJcbiAgX2ZvY3VzQmFjayA9IGZhbHNlO1xyXG4gIGZvY3VzZWRJdGVtOiBJTXVsdGlTZWxlY3RPcHRpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIGRlZmF1bHRTZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3MgPSB7XHJcbiAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgcHVsbFJpZ2h0OiBmYWxzZSxcclxuICAgIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgICBzZWFyY2hSZW5kZXJMaW1pdDogMCxcclxuICAgIHNlYXJjaFJlbmRlckFmdGVyOiAxLFxyXG4gICAgc2VhcmNoTWF4TGltaXQ6IDAsXHJcbiAgICBzZWFyY2hNYXhSZW5kZXJlZEl0ZW1zOiAwLFxyXG4gICAgY2hlY2tlZFN0eWxlOiAnY2hlY2tib3hlcycsXHJcbiAgICBidXR0b25DbGFzc2VzOiAnYnRuIGJ0bi1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb250YWluZXJDbGFzc2VzOiAnZHJvcGRvd24taW5saW5lJyxcclxuICAgIHNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgbWluU2VsZWN0aW9uTGltaXQ6IDAsXHJcbiAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgIGF1dG9VbnNlbGVjdDogZmFsc2UsXHJcbiAgICBzaG93Q2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgc2hvd1VuY2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgZml4ZWRUaXRsZTogZmFsc2UsXHJcbiAgICBkeW5hbWljVGl0bGVNYXhJdGVtczogMyxcclxuICAgIG1heEhlaWdodDogJzMwMHB4JyxcclxuICAgIGlzTGF6eUxvYWQ6IGZhbHNlLFxyXG4gICAgc3RvcFNjcm9sbFByb3BhZ2F0aW9uOiBmYWxzZSxcclxuICAgIGxvYWRWaWV3RGlzdGFuY2U6IDEsXHJcbiAgICBzZWxlY3RBZGRlZFZhbHVlczogZmFsc2UsXHJcbiAgICBpZ25vcmVMYWJlbHM6IGZhbHNlLFxyXG4gICAgbWFpbnRhaW5TZWxlY3Rpb25PcmRlckluVGl0bGU6IGZhbHNlLFxyXG4gICAgZm9jdXNCYWNrOiB0cnVlLFxyXG4gICAgdXNlQXJyYXk6IHRydWVcclxuICB9O1xyXG4gIGRlZmF1bHRUZXh0czogSU11bHRpU2VsZWN0VGV4dHMgPSB7XHJcbiAgICBjaGVja0FsbDogJ0NoZWNrIGFsbCcsXHJcbiAgICB1bmNoZWNrQWxsOiAnVW5jaGVjayBhbGwnLFxyXG4gICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxyXG4gICAgY2hlY2tlZFBsdXJhbDogJ2NoZWNrZWQnLFxyXG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gICAgc2VhcmNoRW1wdHlSZXN1bHQ6ICdOb3RoaW5nIGZvdW5kLi4uJyxcclxuICAgIHNlYXJjaE5vUmVuZGVyVGV4dDogJ1R5cGUgaW4gc2VhcmNoIGJveCB0byBzZWUgcmVzdWx0cy4uLicsXHJcbiAgICBkZWZhdWx0VGl0bGU6ICdTZWxlY3QnLFxyXG4gICAgYWxsU2VsZWN0ZWQ6ICdBbGwgc2VsZWN0ZWQnLFxyXG4gIH07XHJcblxyXG4gIGdldCBzZWFyY2hMaW1pdCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckxpbWl0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaFJlbmRlckFmdGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2VhcmNoUmVuZGVyQWZ0ZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgc2VhcmNoTGltaXRBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoTGltaXQgPiAwICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiB0aGlzLnNlYXJjaExpbWl0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfd29ya2VyRG9jQ2xpY2tlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hGaWx0ZXI6IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyLFxyXG4gICAgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5kZWZhdWx0U2V0dGluZ3M7XHJcbiAgICB0aGlzLnRleHRzID0gdGhpcy5kZWZhdWx0VGV4dHM7XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtU3R5bGUob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pOiBhbnkge1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgIGlmICghb3B0aW9uLmlzTGFiZWwpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ3BvaW50ZXInO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xyXG4gICAgICBzdHlsZVsnY3Vyc29yJ10gPSAnZGVmYXVsdCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtU3R5bGVTZWxlY3Rpb25EaXNhYmxlZCgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWRTZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHsgY3Vyc29yOiAnZGVmYXVsdCcgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMuZGVmYXVsdFRpdGxlIHx8ICcnO1xyXG5cclxuICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVSZW5kZXJJdGVtcygpO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ29wdGlvbnMnXSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwgW107XHJcbiAgICAgIHRoaXMucGFyZW50cyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IHR5cGVvZiBvcHRpb24ucGFyZW50SWQgPT09ICdudW1iZXInKVxyXG4gICAgICAgIC5tYXAob3B0aW9uID0+IG9wdGlvbi5wYXJlbnRJZCk7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiZcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdEFkZGVkVmFsdWVzICYmXHJcbiAgICAgICAgdGhpcy5sb2FkZWRWYWx1ZUlkcy5sZW5ndGggPT09IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRWYWx1ZUlkcyA9IHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KFxyXG4gICAgICAgICAgY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZS5tYXAodmFsdWUgPT4gdmFsdWUuaWQpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIGNoYW5nZXMub3B0aW9ucy5wcmV2aW91c1ZhbHVlXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNvbnN0IGFkZGVkVmFsdWVzID0gY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZS5maWx0ZXIoXHJcbiAgICAgICAgICB2YWx1ZSA9PiB0aGlzLmxvYWRlZFZhbHVlSWRzLmluZGV4T2YodmFsdWUuaWQpID09PSAtMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRWYWx1ZUlkcy5jb25jYXQoYWRkZWRWYWx1ZXMubWFwKHZhbHVlID0+IHZhbHVlLmlkKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tBbGxTdGF0dXMpIHtcclxuICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKGFkZGVkVmFsdWVzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5zaXplID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmZvckVhY2goc2VhcmNoVmFsdWUgPT5cclxuICAgICAgICAgICAgdGhpcy5hZGRDaGVja3ModGhpcy5hcHBseUZpbHRlcnMoYWRkZWRWYWx1ZXMsIHNlYXJjaFZhbHVlKSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy50ZXh0cykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snc2V0dGluZ3MnXSkge1xyXG4gICAgICB0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLmRlZmF1bHRTZXR0aW5ncywgLi4udGhpcy5zZXR0aW5ncyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWyd0ZXh0cyddKSB7XHJcbiAgICAgIHRoaXMudGV4dHMgPSB7IC4uLnRoaXMuZGVmYXVsdFRleHRzLCAuLi50aGlzLnRleHRzIH07XHJcbiAgICAgIGlmICghY2hhbmdlc1sndGV4dHMnXS5pc0ZpcnN0Q2hhbmdlKCkpIHsgdGhpcy51cGRhdGVUaXRsZSgpOyB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSZW5kZXJJdGVtcygpIHtcclxuICAgIHRoaXMucmVuZGVySXRlbXMgPVxyXG4gICAgICAhdGhpcy5zZWFyY2hMaW1pdEFwcGxpZWQgfHxcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlLmxlbmd0aCA+PSB0aGlzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyhcclxuICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgPyAnJyA6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVuZGVyRmlsdGVyZWRPcHRpb25zID0gdGhpcy5yZW5kZXJJdGVtcyA/IHRoaXMuZmlsdGVyZWRPcHRpb25zIDogW107XHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlGaWx0ZXJzKG9wdGlvbnMsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hGaWx0ZXIudHJhbnNmb3JtKFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWFyY2hNYXhMaW1pdCxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWFyY2hNYXhSZW5kZXJlZEl0ZW1zXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZmlyZU1vZGVsQ2hhbmdlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZWwgIT0gdGhpcy5wcmV2TW9kZWwpIHtcclxuICAgICAgdGhpcy5wcmV2TW9kZWwgPSB0aGlzLm1vZGVsO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XHJcbiAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKF86IGFueSkgPT4geyB9O1xyXG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VBcnJheSkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gdmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubmdEb0NoZWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VBcnJheSkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBbXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5tb2RlbCk7XHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU51bVNlbGVjdGVkKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKF9jOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHtcclxuICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHRoaXMubW9kZWwuaW5kZXhPZihvLmlkKSAmJiAhby5kaXNhYmxlZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0aW9uOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKF9mbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWFyY2goZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLm1heWJlU3RvcFByb3BhZ2F0aW9uKGV2ZW50KTtcclxuICAgIHRoaXMuZmlsdGVyQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEcm9wZG93bihlPzogRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICB0aGlzLl9mb2N1c0JhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKGUpO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKF9ldmVudDogRXZlbnQsIG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9uLmlzTGFiZWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5tYXliZVN0b3BQcm9wYWdhdGlvbihfZXZlbnQpO1xyXG4gICAgICB0aGlzLm1heWJlUHJldmVudERlZmF1bHQoX2V2ZW50KTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLmlkKTtcclxuICAgICAgY29uc3QgaXNBdFNlbGVjdGlvbkxpbWl0ID1cclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ID4gMCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwubGVuZ3RoID49IHRoaXMuc2V0dGluZ3Muc2VsZWN0aW9uTGltaXQ7XHJcbiAgICAgIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaWR4LCBpZCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMubW9kZWwuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZWQuZW1pdChpZCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5zb21lKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc3BsaWNlKFxyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5pbmRleE9mKFxyXG4gICAgICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLmZpbmQodmFsID0+IHZhbC5pZCA9PT0gaWQpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIDFcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm1pblNlbGVjdGlvbkxpbWl0ID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgIHRoaXMubnVtU2VsZWN0ZWQgPiB0aGlzLnNldHRpbmdzLm1pblNlbGVjdGlvbkxpbWl0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKGluZGV4LCBvcHRpb24uaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnRJbmRleCA9XHJcbiAgICAgICAgICBvcHRpb24ucGFyZW50SWQgJiYgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5wYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKHBhcmVudEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgIHJlbW92ZUl0ZW0ocGFyZW50SW5kZXgsIG9wdGlvbi5wYXJlbnRJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgICAgICAgICAuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpID4gLTEgJiZcclxuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudElkID09PSBvcHRpb24uaWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChjaGlsZCA9PlxyXG4gICAgICAgICAgICAgIHJlbW92ZUl0ZW0odGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSwgY2hpbGQuaWQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGlzQXRTZWxlY3Rpb25MaW1pdCAmJiAhdGhpcy5zZXR0aW5ncy5hdXRvVW5zZWxlY3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkxpbWl0UmVhY2hlZC5lbWl0KHRoaXMubW9kZWwubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYWRkSXRlbSA9IChpZCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5tb2RlbC5wdXNoKGlkKTtcclxuICAgICAgICAgIHRoaXMub25BZGRlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgICAgICF0aGlzLmxhenlMb2FkT3B0aW9ucy5zb21lKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnB1c2gob3B0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRJdGVtKG9wdGlvbi5pZCk7XHJcbiAgICAgICAgaWYgKCFpc0F0U2VsZWN0aW9uTGltaXQpIHtcclxuICAgICAgICAgIGlmIChvcHRpb24ucGFyZW50SWQgJiYgIXRoaXMuc2V0dGluZ3MuaWdub3JlTGFiZWxzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5vcHRpb25zLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgY2hpbGQuaWQgIT09IG9wdGlvbi5pZCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLnBhcmVudElkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbi5ldmVyeShjaGlsZCA9PiB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpID4gLTEpKSB7XHJcbiAgICAgICAgICAgICAgYWRkSXRlbShvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50cy5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCkgPCAwICYmIGNoaWxkLnBhcmVudElkID09PSBvcHRpb24uaWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBhZGRJdGVtKGNoaWxkLmlkKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlbW92ZUl0ZW0oMCwgdGhpcy5tb2RlbFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNsb3NlT25TZWxlY3QpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuc2xpY2UoKTtcclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuXHJcbiAgICB9LCAwKVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTnVtU2VsZWN0ZWQoKSB7XHJcbiAgICB0aGlzLm51bVNlbGVjdGVkID1cclxuICAgICAgdGhpcy5tb2RlbC5maWx0ZXIoaWQgPT4gdGhpcy5wYXJlbnRzLmluZGV4T2YoaWQpIDwgMCkubGVuZ3RoIHx8IDA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUaXRsZSgpIHtcclxuICAgIGxldCBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaWdub3JlTGFiZWxzKSB7XHJcbiAgICAgIG51bVNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiAhb3B0aW9uLmlzTGFiZWxcclxuICAgICAgKS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5udW1TZWxlY3RlZCA9PT0gMCB8fCB0aGlzLnNldHRpbmdzLmZpeGVkVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSA6ICcnO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5kaXNwbGF5QWxsU2VsZWN0ZWRUZXh0ICYmXHJcbiAgICAgIHRoaXMubW9kZWwubGVuZ3RoID09PSBudW1TZWxlY3RlZE9wdGlvbnNcclxuICAgICkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy50ZXh0cyA/IHRoaXMudGV4dHMuYWxsU2VsZWN0ZWQgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgJiZcclxuICAgICAgdGhpcy5zZXR0aW5ncy5keW5hbWljVGl0bGVNYXhJdGVtcyA+PSB0aGlzLm51bVNlbGVjdGVkXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgdXNlT3B0aW9ucyA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMubGF6eUxvYWRPcHRpb25zLmxlbmd0aFxyXG4gICAgICAgICAgPyB0aGlzLmxhenlMb2FkT3B0aW9uc1xyXG4gICAgICAgICAgOiB0aGlzLm9wdGlvbnM7XHJcblxyXG4gICAgICBsZXQgdGl0bGVTZWxlY3Rpb25zOiBBcnJheTxJTXVsdGlTZWxlY3RPcHRpb24+O1xyXG5cclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFpbnRhaW5TZWxlY3Rpb25PcmRlckluVGl0bGUpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25JZHMgPSB1c2VPcHRpb25zLm1hcCgoc2VsZWN0T3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24sIGlkeDogbnVtYmVyKSA9PiBzZWxlY3RPcHRpb24uaWQpO1xyXG4gICAgICAgIHRpdGxlU2VsZWN0aW9ucyA9IHRoaXMubW9kZWxcclxuICAgICAgICAgIC5tYXAoKHNlbGVjdGVkSWQpID0+IG9wdGlvbklkcy5pbmRleE9mKHNlbGVjdGVkSWQpKVxyXG4gICAgICAgICAgLmZpbHRlcigob3B0aW9uSW5kZXgpID0+IG9wdGlvbkluZGV4ID4gLTEpXHJcbiAgICAgICAgICAubWFwKChvcHRpb25JbmRleCkgPT4gdXNlT3B0aW9uc1tvcHRpb25JbmRleF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRpdGxlU2VsZWN0aW9ucyA9IHVzZU9wdGlvbnMuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVNlbGVjdGlvbnMubWFwKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gb3B0aW9uLm5hbWUpLmpvaW4oJywgJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRpdGxlID1cclxuICAgICAgICB0aGlzLm51bVNlbGVjdGVkICtcclxuICAgICAgICAnICcgK1xyXG4gICAgICAgICh0aGlzLm51bVNlbGVjdGVkID09PSAxXHJcbiAgICAgICAgICA/IHRoaXMudGV4dHMuY2hlY2tlZFxyXG4gICAgICAgICAgOiB0aGlzLnRleHRzLmNoZWNrZWRQbHVyYWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaEZpbHRlckFwcGxpZWQoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmVuYWJsZVNlYXJjaCAmJlxyXG4gICAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUgJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlLmxlbmd0aCA+IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDaGVja3Mob3B0aW9ucykge1xyXG4gICAgY29uc3QgY2hlY2tlZE9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgIC5maWx0ZXIoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIW9wdGlvbi5kaXNhYmxlZCAmJlxyXG4gICAgICAgICAgKFxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLmlkKSA9PT0gLTEgJiZcclxuICAgICAgICAgICAgISh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscyAmJiBvcHRpb24uaXNMYWJlbClcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMub25BZGRlZC5lbWl0KG9wdGlvbi5pZCk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KVxyXG4gICAgICAubWFwKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gb3B0aW9uLmlkKTtcclxuXHJcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5jb25jYXQoY2hlY2tlZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGwoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWRTZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5hZGRDaGVja3MoXHJcbiAgICAgICAgIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpID8gdGhpcy5vcHRpb25zIDogdGhpcy5maWx0ZXJlZE9wdGlvbnNcclxuICAgICAgKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLnNldHRpbmdzLnNlbGVjdEFkZGVkVmFsdWVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpICYmICF0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuYWRkKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5jbGVhcigpO1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1bmNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gdGhpcy5tb2RlbDtcclxuICAgICAgbGV0IHVuQ2hlY2tlZE9wdGlvbnMgPSAhdGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKClcclxuICAgICAgICA/IHRoaXMubW9kZWxcclxuICAgICAgICA6IHRoaXMuZmlsdGVyZWRPcHRpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcbiAgICAgIC8vIHNldCB1bmNoZWNrZWQgb3B0aW9ucyBvbmx5IHRvIHRoZSBvbmVzIHRoYXQgd2VyZSBjaGVja2VkXHJcbiAgICAgIHVuQ2hlY2tlZE9wdGlvbnMgPSBjaGVja2VkT3B0aW9ucy5maWx0ZXIoaXRlbSA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2YoaXRlbSkgPiAtMSk7XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLmZpbHRlcigoaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICh1bkNoZWNrZWRPcHRpb25zLmluZGV4T2YoaWQpIDwgMCAmJlxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1pblNlbGVjdGlvbkxpbWl0ID09PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2YoaWQpIDwgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5oYXModGhpcy5maWx0ZXJDb250cm9sLnZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZGVsZXRlKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKGZ1bmN0aW9uIChzZWFyY2hUZXJtKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyT3B0aW9ucyA9IHRoaXMuYXBwbHlGaWx0ZXJzKHRoaXMub3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHVuQ2hlY2tlZE9wdGlvbnMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpLCBzZWFyY2hUZXJtKTtcclxuICAgICAgICAgICAgICB0aGlzLmFkZENoZWNrcyhmaWx0ZXJPcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5jbGVhcigpO1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJldmVudENoZWNrYm94Q2hlY2soZXZlbnQ6IEV2ZW50LCBvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgaWYgKFxyXG4gICAgICBvcHRpb24uZGlzYWJsZWQgfHxcclxuICAgICAgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0aW9uTGltaXQgJiZcclxuICAgICAgICAhdGhpcy5zZXR0aW5ncy5hdXRvVW5zZWxlY3QgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KGV2ZW50KVxyXG4gICAgICApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQ2hlY2tib3hEaXNhYmxlZChvcHRpb24/OiBJTXVsdGlTZWxlY3RPcHRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRpc2FibGVkU2VsZWN0aW9uIHx8IG9wdGlvbiAmJiBvcHRpb24uZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBjaGVja1Njcm9sbFBvc2l0aW9uKGV2KSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBldi50YXJnZXQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZXYudGFyZ2V0LnNjcm9sbEhlaWdodDtcclxuICAgIGNvbnN0IHNjcm9sbEVsZW1lbnRIZWlnaHQgPSBldi50YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgY29uc3Qgcm91bmRpbmdQaXhlbCA9IDE7XHJcbiAgICBjb25zdCBndXR0ZXJQaXhlbCA9IDE7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBzY3JvbGxUb3AgPj1cclxuICAgICAgc2Nyb2xsSGVpZ2h0IC1cclxuICAgICAgKDEgKyB0aGlzLnNldHRpbmdzLmxvYWRWaWV3RGlzdGFuY2UpICogc2Nyb2xsRWxlbWVudEhlaWdodCAtXHJcbiAgICAgIHJvdW5kaW5nUGl4ZWwgLVxyXG4gICAgICBndXR0ZXJQaXhlbFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQcm9wYWdhdGlvbihldiwgZWxlbWVudCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBlbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICAgIGNvbnN0IHNjcm9sbEVsZW1lbnRIZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChldi5kZWx0YVkgPiAwICYmIHNjcm9sbFRvcCArIHNjcm9sbEVsZW1lbnRIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0KSB8fFxyXG4gICAgICAoZXYuZGVsdGFZIDwgMCAmJiBzY3JvbGxUb3AgPD0gMClcclxuICAgICkge1xyXG4gICAgICBldiA9IGV2IHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KGV2KTtcclxuICAgICAgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYWNrQnlJZChpZHg6IG51bWJlciwgc2VsZWN0T3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIHJldHVybiBzZWxlY3RPcHRpb24uaWQ7XHJcbiAgfVxyXG5cclxuICBsb2FkKCkge1xyXG4gICAgdGhpcy5vbkxhenlMb2FkLmVtaXQoe1xyXG4gICAgICBsZW5ndGg6IHRoaXMub3B0aW9ucy5sZW5ndGgsXHJcbiAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlLFxyXG4gICAgICBjaGVja0FsbFNlYXJjaGVzOiB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIsXHJcbiAgICAgIGNoZWNrQWxsU3RhdHVzOiB0aGlzLmNoZWNrQWxsU3RhdHVzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmb2N1c0l0ZW0oZGlyOiBudW1iZXIsIGU/OiBFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KGUpO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuZmlsdGVyZWRPcHRpb25zLmluZGV4T2YodGhpcy5mb2N1c2VkSXRlbSk7XHJcblxyXG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5mb2N1c2VkSXRlbSA9IHRoaXMuZmlsdGVyZWRPcHRpb25zWzBdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV4dElkeCA9IGlkeCArIGRpcjtcclxuICAgIGNvbnN0IG5ld0lkeCA9XHJcbiAgICAgIG5leHRJZHggPCAwXHJcbiAgICAgICAgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGggLSAxXHJcbiAgICAgICAgOiBuZXh0SWR4ICUgdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1tuZXdJZHhdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVByZXZlbnREZWZhdWx0KGU/OiB7IHByZXZlbnREZWZhdWx0PzogRnVuY3Rpb24gfSkge1xyXG4gICAgaWYgKGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1heWJlU3RvcFByb3BhZ2F0aW9uKGU/OiB7IHN0b3BQcm9wYWdhdGlvbj86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==