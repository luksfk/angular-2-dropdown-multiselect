import { ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, IterableDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, Validator } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './types';
export declare class MultiselectDropdownComponent implements OnInit, OnChanges, DoCheck, OnDestroy, ControlValueAccessor, Validator {
    private element;
    private fb;
    private searchFilter;
    private cdRef;
    filterControl: FormControl;
    options: Array<IMultiSelectOption>;
    settings: IMultiSelectSettings;
    texts: IMultiSelectTexts;
    disabled: boolean;
    disabledSelection: boolean;
    selectionLimitReached: EventEmitter<{}>;
    dropdownClosed: EventEmitter<{}>;
    dropdownOpened: EventEmitter<{}>;
    onAdded: EventEmitter<{}>;
    onRemoved: EventEmitter<{}>;
    onLazyLoad: EventEmitter<{}>;
    onFilter: Observable<string>;
    readonly focusBack: boolean;
    clickedOutside(): void;
    destroyed$: Subject<any>;
    filteredOptions: IMultiSelectOption[];
    lazyLoadOptions: IMultiSelectOption[];
    renderFilteredOptions: IMultiSelectOption[];
    model: any[];
    prevModel: any[];
    parents: any[];
    title: string;
    differ: any;
    numSelected: number;
    isVisible: boolean;
    renderItems: boolean;
    checkAllSearchRegister: Set<any>;
    checkAllStatus: boolean;
    loadedValueIds: any[];
    _focusBack: boolean;
    focusedItem: IMultiSelectOption | undefined;
    defaultSettings: IMultiSelectSettings;
    defaultTexts: IMultiSelectTexts;
    readonly searchLimit: number;
    readonly searchRenderAfter: number;
    readonly searchLimitApplied: boolean;
    private _isVisible;
    private _workerDocClicked;
    constructor(element: ElementRef, fb: FormBuilder, searchFilter: MultiSelectSearchFilter, differs: IterableDiffers, cdRef: ChangeDetectorRef);
    getItemStyle(option: IMultiSelectOption): any;
    getItemStyleSelectionDisabled(): any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    updateRenderItems(): void;
    applyFilters(options: any, value: any): IMultiSelectOption[];
    fireModelChange(): void;
    onModelChange: Function;
    onModelTouched: Function;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    ngDoCheck(): void;
    validate(_c: AbstractControl): {
        [key: string]: any;
    };
    registerOnValidatorChange(_fn: () => void): void;
    clearSearch(event: Event): void;
    toggleDropdown(e?: Event): void;
    closeDropdown(e?: Event): void;
    isSelected(option: IMultiSelectOption): boolean;
    setSelected(_event: Event, option: IMultiSelectOption): void;
    updateNumSelected(): void;
    updateTitle(): void;
    searchFilterApplied(): boolean;
    addChecks(options: any): void;
    checkAll(): void;
    uncheckAll(): void;
    preventCheckboxCheck(event: Event, option: IMultiSelectOption): void;
    isCheckboxDisabled(option?: IMultiSelectOption): boolean;
    checkScrollPosition(ev: any): void;
    checkScrollPropagation(ev: any, element: any): void;
    trackById(idx: number, selectOption: IMultiSelectOption): any;
    load(): void;
    focusItem(dir: number, e?: Event): void;
    private maybePreventDefault(e?);
    private maybeStopPropagation(e?);
}
