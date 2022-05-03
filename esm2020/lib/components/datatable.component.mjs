import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ContentChildren, HostBinding, ContentChild, ViewEncapsulation, ChangeDetectionStrategy, SkipSelf, Optional, Inject } from '@angular/core';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { BehaviorSubject } from 'rxjs';
import { groupRowsByParents, optionalGetterForProp } from '../utils/tree';
import { setColumnDefaults, translateTemplates } from '../utils/column-helper';
import { ColumnMode } from '../types/column-mode.type';
import { SelectionType } from '../types/selection.type';
import { SortType } from '../types/sort.type';
import { ContextmenuType } from '../types/contextmenu.type';
import { DataTableColumnDirective } from './columns/column.directive';
import { DatatableRowDetailDirective } from './row-detail/row-detail.directive';
import { DatatableFooterDirective } from './footer/footer.directive';
import { DataTableBodyComponent } from './body/body.component';
import { DataTableHeaderComponent } from './header/header.component';
import { throttleable } from '../utils/throttle';
import { forceFillColumnWidths, adjustColumnWidths } from '../utils/math';
import { sortRows } from '../utils/sort';
import * as i0 from "@angular/core";
import * as i1 from "../services/scrollbar-helper.service";
import * as i2 from "../services/dimensions-helper.service";
import * as i3 from "../services/column-changes.service";
import * as i4 from "./header/header.component";
import * as i5 from "./body/body.component";
import * as i6 from "./footer/footer.component";
import * as i7 from "../directives/visibility.directive";
import * as i8 from "@angular/common";
export class DatatableComponent {
    constructor(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService, configuration) {
        this.scrollbarHelper = scrollbarHelper;
        this.dimensionsHelper = dimensionsHelper;
        this.cd = cd;
        this.columnChangesService = columnChangesService;
        this.configuration = configuration;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         */
        this.columnMode = ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         */
        this.externalSorting = false;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         */
        this.reorderable = true;
        /**
         * Swap columns on re-order columns or
         * move them.
         */
        this.swapColumns = true;
        /**
         * The type of sorting
         */
        this.sortType = SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         */
        this.sorts = [];
        /**
         * Css class overrides
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            sortUnset: 'datatable-icon-sort-unset',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * A boolean you can use to set the detault behaviour of rows and groups
         * whether they will start expanded or not. If ommited the default is NOT expanded.
         *
         */
        this.groupExpansionDefault = false;
        /**
         * Property to which you can use for determining select all
         * rows on current page or not.
         *
         * @memberOf DatatableComponent
         */
        this.selectAllRowsOnPage = false;
        /**
         * A flag for row virtualization on / off
         */
        this.virtualization = true;
        /**
         * A flag for switching summary row on / off
         */
        this.summaryRow = false;
        /**
         * A height of summary row
         */
        this.summaryHeight = 30;
        /**
         * A property holds a summary row position: top/bottom
         */
        this.summaryPosition = 'top';
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         */
        this.scroll = new EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         */
        this.activate = new EventEmitter();
        /**
         * A cell or row was selected.
         */
        this.select = new EventEmitter();
        /**
         * Column sort was invoked.
         */
        this.sort = new EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         */
        this.page = new EventEmitter();
        /**
         * Columns were re-ordered.
         */
        this.reorder = new EventEmitter();
        /**
         * Column was resized.
         */
        this.resize = new EventEmitter();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         */
        this.tableContextmenu = new EventEmitter(false);
        /**
         * A row was expanded ot collapsed for tree
         */
        this.treeAction = new EventEmitter();
        this.rowCount = 0;
        this._offsetX = new BehaviorSubject(0);
        this._count = 0;
        this._offset = 0;
        this._subscriptions = [];
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         */
        this.rowIdentity = (x) => {
            if (this._groupRowsBy) {
                // each group in groupedRows are stored as {key, value: [rows]},
                // where key is the groupRowsBy index
                return x.key;
            }
            else {
                return x;
            }
        };
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
        // apply global settings from Module.forRoot
        if (this.configuration && this.configuration.messages) {
            this.messages = { ...this.configuration.messages };
        }
    }
    /**
     * Rows that are displayed in the table.
     */
    set rows(val) {
        this._rows = val;
        if (val) {
            this._internalRows = [...val];
        }
        // auto sort on new updates
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
        // recalculate sizes/etc
        this.recalculate();
        if (this._rows && this._groupRowsBy) {
            // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
            this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
        }
        this.cd.markForCheck();
    }
    /**
     * Gets the rows.
     */
    get rows() {
        return this._rows;
    }
    /**
     * This attribute allows the user to set the name of the column to group the data with
     */
    set groupRowsBy(val) {
        if (val) {
            this._groupRowsBy = val;
            if (this._rows && this._groupRowsBy) {
                // cretes a new array with the data grouped
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
        }
    }
    get groupRowsBy() {
        return this._groupRowsBy;
    }
    /**
     * Columns to be displayed.
     */
    set columns(val) {
        if (val) {
            this._internalColumns = [...val];
            setColumnDefaults(this._internalColumns);
            this.recalculateColumns();
        }
        this._columns = val;
    }
    /**
     * Get the columns.
     */
    get columns() {
        return this._columns;
    }
    /**
     * The page size to be shown.
     * Default value: `undefined`
     */
    set limit(val) {
        this._limit = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the limit.
     */
    get limit() {
        return this._limit;
    }
    /**
     * The total count of all rows.
     * Default value: `0`
     */
    set count(val) {
        this._count = val;
        // recalculate sizes/etc
        this.recalculate();
    }
    /**
     * Gets the count.
     */
    get count() {
        return this._count;
    }
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     */
    set offset(val) {
        this._offset = val;
    }
    get offset() {
        return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
    }
    /**
     * CSS class applied if the header height if fixed height.
     */
    get isFixedHeader() {
        const headerHeight = this.headerHeight;
        return typeof headerHeight === 'string' ? headerHeight !== 'auto' : true;
    }
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     */
    get isFixedRow() {
        return this.rowHeight !== 'auto';
    }
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     */
    get isVertScroll() {
        return this.scrollbarV;
    }
    /**
     * CSS class applied to root element if
     * virtualization is enabled.
     */
    get isVirtualized() {
        return this.virtualization;
    }
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     */
    get isHorScroll() {
        return this.scrollbarH;
    }
    /**
     * CSS class applied to root element is selectable.
     */
    get isSelectable() {
        return this.selectionType !== undefined;
    }
    /**
     * CSS class applied to root is checkbox selection.
     */
    get isCheckboxSelection() {
        return this.selectionType === SelectionType.checkbox;
    }
    /**
     * CSS class applied to root if cell selection.
     */
    get isCellSelection() {
        return this.selectionType === SelectionType.cell;
    }
    /**
     * CSS class applied to root if single select.
     */
    get isSingleSelection() {
        return this.selectionType === SelectionType.single;
    }
    /**
     * CSS class added to root element if mulit select
     */
    get isMultiSelection() {
        return this.selectionType === SelectionType.multi;
    }
    /**
     * CSS class added to root element if mulit click select
     */
    get isMultiClickSelection() {
        return this.selectionType === SelectionType.multiClick;
    }
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     */
    set columnTemplates(val) {
        this._columnTemplates = val;
        this.translateColumns(val);
    }
    /**
     * Returns the column templates.
     */
    get columnTemplates() {
        return this._columnTemplates;
    }
    /**
     * Returns if all rows are selected.
     */
    get allRowsSelected() {
        let allRowsSelected = this.rows && this.selected && this.selected.length === this.rows.length;
        if (this.bodyComponent && this.selectAllRowsOnPage) {
            const indexes = this.bodyComponent.indexes;
            const rowsOnPage = indexes.last - indexes.first;
            allRowsSelected = this.selected.length === rowsOnPage;
        }
        return this.selected && this.rows && this.rows.length !== 0 && allRowsSelected;
    }
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    ngOnInit() {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    }
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     */
    ngAfterViewInit() {
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        if (typeof requestAnimationFrame === 'undefined') {
            return;
        }
        requestAnimationFrame(() => {
            this.recalculate();
            // emit page for virtual server-side kickoff
            if (this.externalPaging && this.scrollbarV) {
                this.page.emit({
                    count: this.count,
                    pageSize: this.pageSize,
                    limit: this.limit,
                    offset: 0
                });
            }
        });
    }
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     */
    ngAfterContentInit() {
        this.columnTemplates.changes.subscribe(v => this.translateColumns(v));
        this.listenForColumnInputChanges();
    }
    /**
     * Translates the templates to the column objects
     */
    translateColumns(val) {
        if (val) {
            const arr = val.toArray();
            if (arr.length) {
                this._internalColumns = translateTemplates(arr);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
                this.sortInternalRows();
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    groupArrayBy(originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        const map = new Map();
        let i = 0;
        originalArray.forEach((item) => {
            const key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        });
        const addGroup = (key, value) => {
            return { key, value };
        };
        // convert map back to a simple array of objects
        return Array.from(map, x => addGroup(x[0], x[1]));
    }
    /*
     * Lifecycle hook that is called when Angular dirty checks a directive.
     */
    ngDoCheck() {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            else {
                this._internalRows = [...this.rows];
            }
            // auto group by parent on new update
            this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
            this.recalculatePages();
            this.cd.markForCheck();
        }
    }
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     */
    recalculate() {
        this.recalculateDims();
        this.recalculateColumns();
        this.cd.markForCheck();
    }
    /**
     * Window resize handler to update sizes.
     */
    onWindowResize() {
        this.recalculate();
    }
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    recalculateColumns(columns = this._internalColumns, forceIdx = -1, allowBleed = this.scrollbarH) {
        if (!columns)
            return undefined;
        let width = this._innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === ColumnMode.force) {
            forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === ColumnMode.flex) {
            adjustColumnWidths(columns, width);
        }
        return columns;
    }
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    recalculateDims() {
        const dims = this.dimensionsHelper.getDimensions(this.element);
        this._innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            let height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    }
    /**
     * Recalculates the pages after a update.
     */
    recalculatePages() {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    }
    /**
     * Body triggered a page event.
     */
    onBodyPage({ offset }) {
        // Avoid pagination caming from body events like scroll when the table
        // has no virtualization and the external paging is enable.
        // This means, let's the developer handle pagination by my him(her) self
        if (this.externalPaging && !this.virtualization) {
            return;
        }
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    }
    /**
     * The body triggered a scroll event.
     */
    onBodyScroll(event) {
        this._offsetX.next(event.offsetX);
        this.scroll.emit(event);
        this.cd.detectChanges();
    }
    /**
     * The footer triggered a page event.
     */
    onFooterPage(event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
    }
    /**
     * Recalculates the sizes of the page
     */
    calcPageSize(val = this.rows) {
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            const size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return this.limit;
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    }
    /**
     * Calculates the row count.
     */
    calcRowCount(val = this.rows) {
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupedRows) {
                return this.groupedRows.length;
            }
            else if (this.treeFromRelation != null && this.treeToRelation != null) {
                return this._internalRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    }
    /**
     * The header triggered a contextmenu event.
     */
    onColumnContextmenu({ event, column }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.header, content: column });
    }
    /**
     * The body triggered a contextmenu event.
     */
    onRowContextmenu({ event, row }) {
        this.tableContextmenu.emit({ event, type: ContextmenuType.body, content: row });
    }
    /**
     * The header triggered a column resize event.
     */
    onColumnResize({ column, newValue }) {
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        let idx;
        const cols = this._internalColumns.map((c, i) => {
            c = { ...c };
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(cols, idx);
        this._internalColumns = cols;
        this.resize.emit({
            column,
            newValue
        });
    }
    /**
     * The header triggered a column re-order event.
     */
    onColumnReorder({ column, newValue, prevValue }) {
        const cols = this._internalColumns.map(c => {
            return { ...c };
        });
        if (this.swapColumns) {
            const prevCol = cols[newValue];
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                const movedCol = cols[prevValue];
                for (let i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                const movedCol = cols[prevValue];
                for (let i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this._internalColumns = cols;
        this.reorder.emit({
            column,
            newValue,
            prevValue
        });
    }
    /**
     * The header triggered a column sort event.
     */
    onColumnSort(event) {
        // clean selected rows
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
        this.sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    }
    /**
     * Toggle all row selection
     */
    onHeaderSelect(event) {
        if (this.bodyComponent && this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            const first = this.bodyComponent.indexes.first;
            const last = this.bodyComponent.indexes.last;
            const allSelected = this.selected.length === last - first;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                this.selected.push(...this._internalRows.slice(first, last));
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            const allSelected = this.selected.length === this.rows.length;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                this.selected.push(...this.rows);
            }
        }
        this.select.emit({
            selected: this.selected
        });
    }
    /**
     * A row was selected from body
     */
    onBodySelect(event) {
        this.select.emit(event);
    }
    /**
     * A row was expanded or collapsed for tree
     */
    onTreeAction(event) {
        const row = event.row;
        // TODO: For duplicated items this will not work
        const rowIndex = this._rows.findIndex(r => r[this.treeToRelation] === event.row[this.treeToRelation]);
        this.treeAction.emit({ row, rowIndex });
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
    listenForColumnInputChanges() {
        this._subscriptions.push(this.columnChangesService.columnInputChanges$.subscribe(() => {
            if (this.columnTemplates) {
                this.columnTemplates.notifyOnChanges();
            }
        }));
    }
    sortInternalRows() {
        this._internalRows = sortRows(this._internalRows, this._internalColumns, this.sorts);
    }
}
DatatableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableComponent, deps: [{ token: i1.ScrollbarHelper, skipSelf: true }, { token: i2.DimensionsHelper, skipSelf: true }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.KeyValueDiffers }, { token: i3.ColumnChangesService }, { token: 'configuration', optional: true }], target: i0.ɵɵFactoryTarget.Component });
DatatableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DatatableComponent, selector: "ngx-datatable", inputs: { targetMarkerTemplate: "targetMarkerTemplate", rows: "rows", groupRowsBy: "groupRowsBy", groupedRows: "groupedRows", columns: "columns", selected: "selected", scrollbarV: "scrollbarV", scrollbarH: "scrollbarH", rowHeight: "rowHeight", columnMode: "columnMode", headerHeight: "headerHeight", footerHeight: "footerHeight", externalPaging: "externalPaging", externalSorting: "externalSorting", limit: "limit", count: "count", offset: "offset", loadingIndicator: "loadingIndicator", selectionType: "selectionType", reorderable: "reorderable", swapColumns: "swapColumns", sortType: "sortType", sorts: "sorts", cssClasses: "cssClasses", messages: "messages", rowClass: "rowClass", selectCheck: "selectCheck", displayCheck: "displayCheck", groupExpansionDefault: "groupExpansionDefault", trackByProp: "trackByProp", selectAllRowsOnPage: "selectAllRowsOnPage", virtualization: "virtualization", treeFromRelation: "treeFromRelation", treeToRelation: "treeToRelation", summaryRow: "summaryRow", summaryHeight: "summaryHeight", summaryPosition: "summaryPosition", rowIdentity: "rowIdentity" }, outputs: { scroll: "scroll", activate: "activate", select: "select", sort: "sort", page: "page", reorder: "reorder", resize: "resize", tableContextmenu: "tableContextmenu", treeAction: "treeAction" }, host: { listeners: { "window:resize": "onWindowResize()" }, properties: { "class.fixed-header": "this.isFixedHeader", "class.fixed-row": "this.isFixedRow", "class.scroll-vertical": "this.isVertScroll", "class.virtualized": "this.isVirtualized", "class.scroll-horz": "this.isHorScroll", "class.selectable": "this.isSelectable", "class.checkbox-selection": "this.isCheckboxSelection", "class.cell-selection": "this.isCellSelection", "class.single-selection": "this.isSingleSelection", "class.multi-selection": "this.isMultiSelection", "class.multi-click-selection": "this.isMultiClickSelection" }, classAttribute: "ngx-datatable" }, queries: [{ propertyName: "rowDetail", first: true, predicate: DatatableRowDetailDirective, descendants: true }, { propertyName: "groupHeader", first: true, predicate: DatatableGroupHeaderDirective, descendants: true }, { propertyName: "footer", first: true, predicate: DatatableFooterDirective, descendants: true }, { propertyName: "columnTemplates", predicate: DataTableColumnDirective }], viewQueries: [{ propertyName: "bodyComponent", first: true, predicate: DataTableBodyComponent, descendants: true }, { propertyName: "headerComponent", first: true, predicate: DataTableHeaderComponent, descendants: true }], ngImport: i0, template: "<div role=\"table\" visibilityObserver (visible)=\"recalculate()\">\r\n  <datatable-header\r\n    role=\"rowgroup\"\r\n    *ngIf=\"headerHeight\"\r\n    [sorts]=\"sorts\"\r\n    [sortType]=\"sortType\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [dealsWithGroup]=\"groupedRows !== undefined\"\r\n    [columns]=\"_internalColumns\"\r\n    [headerHeight]=\"headerHeight\"\r\n    [reorderable]=\"reorderable\"\r\n    [targetMarkerTemplate]=\"targetMarkerTemplate\"\r\n    [sortAscendingIcon]=\"cssClasses.sortAscending\"\r\n    [sortDescendingIcon]=\"cssClasses.sortDescending\"\r\n    [sortUnsetIcon]=\"cssClasses.sortUnset\"\r\n    [allRowsSelected]=\"allRowsSelected\"\r\n    [selectionType]=\"selectionType\"\r\n    (sort)=\"onColumnSort($event)\"\r\n    (resize)=\"onColumnResize($event)\"\r\n    (reorder)=\"onColumnReorder($event)\"\r\n    (select)=\"onHeaderSelect($event)\"\r\n    (columnContextmenu)=\"onColumnContextmenu($event)\"\r\n  >\r\n  </datatable-header>\r\n  <datatable-body\r\n    role=\"rowgroup\"\r\n    [groupRowsBy]=\"groupRowsBy\"\r\n    [groupedRows]=\"groupedRows\"\r\n    [rows]=\"_internalRows\"\r\n    [groupExpansionDefault]=\"groupExpansionDefault\"\r\n    [scrollbarV]=\"scrollbarV\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [virtualization]=\"virtualization\"\r\n    [loadingIndicator]=\"loadingIndicator\"\r\n    [externalPaging]=\"externalPaging\"\r\n    [rowHeight]=\"rowHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [offset]=\"offset\"\r\n    [trackByProp]=\"trackByProp\"\r\n    [columns]=\"_internalColumns\"\r\n    [pageSize]=\"pageSize\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [rowDetail]=\"rowDetail\"\r\n    [groupHeader]=\"groupHeader\"\r\n    [selected]=\"selected\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [bodyHeight]=\"bodyHeight\"\r\n    [selectionType]=\"selectionType\"\r\n    [emptyMessage]=\"messages.emptyMessage\"\r\n    [rowIdentity]=\"rowIdentity\"\r\n    [rowClass]=\"rowClass\"\r\n    [selectCheck]=\"selectCheck\"\r\n    [displayCheck]=\"displayCheck\"\r\n    [summaryRow]=\"summaryRow\"\r\n    [summaryHeight]=\"summaryHeight\"\r\n    [summaryPosition]=\"summaryPosition\"\r\n    (page)=\"onBodyPage($event)\"\r\n    (activate)=\"activate.emit($event)\"\r\n    (rowContextmenu)=\"onRowContextmenu($event)\"\r\n    (select)=\"onBodySelect($event)\"\r\n    (scroll)=\"onBodyScroll($event)\"\r\n    (treeAction)=\"onTreeAction($event)\"\r\n  >\r\n  </datatable-body>\r\n  <datatable-footer\r\n    *ngIf=\"footerHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [pageSize]=\"pageSize\"\r\n    [offset]=\"offset\"\r\n    [footerHeight]=\"footerHeight\"\r\n    [footerTemplate]=\"footer\"\r\n    [totalMessage]=\"messages.totalMessage\"\r\n    [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\r\n    [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\r\n    [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\r\n    [selectedCount]=\"selected.length\"\r\n    [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\r\n    [pagerNextIcon]=\"cssClasses.pagerNext\"\r\n    (page)=\"onFooterPage($event)\"\r\n  >\r\n  </datatable-footer>\r\n</div>\r\n", styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;transform:translate(0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable *:before,.ngx-datatable *:after{box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-header-inner{display:flex;flex-direction:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:none}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{z-index:9}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group,.ngx-datatable .datatable-row-right{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:flex;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:none}.ngx-datatable .datatable-body .datatable-body-row>div{display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:none}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}\n"], components: [{ type: i4.DataTableHeaderComponent, selector: "datatable-header", inputs: ["sortAscendingIcon", "sortDescendingIcon", "sortUnsetIcon", "scrollbarH", "dealsWithGroup", "targetMarkerTemplate", "innerWidth", "sorts", "sortType", "allRowsSelected", "selectionType", "reorderable", "headerHeight", "columns", "offsetX"], outputs: ["sort", "reorder", "resize", "select", "columnContextmenu"] }, { type: i5.DataTableBodyComponent, selector: "datatable-body", inputs: ["scrollbarV", "scrollbarH", "loadingIndicator", "externalPaging", "rowHeight", "offsetX", "emptyMessage", "selectionType", "selected", "rowIdentity", "rowDetail", "groupHeader", "selectCheck", "displayCheck", "trackByProp", "rowClass", "groupedRows", "groupExpansionDefault", "innerWidth", "groupRowsBy", "virtualization", "summaryRow", "summaryPosition", "summaryHeight", "pageSize", "rows", "columns", "offset", "rowCount", "bodyHeight"], outputs: ["scroll", "page", "activate", "select", "detailToggle", "rowContextmenu", "treeAction"] }, { type: i6.DataTableFooterComponent, selector: "datatable-footer", inputs: ["footerHeight", "rowCount", "pageSize", "offset", "pagerLeftArrowIcon", "pagerRightArrowIcon", "pagerPreviousIcon", "pagerNextIcon", "totalMessage", "footerTemplate", "selectedCount", "selectedMessage"], outputs: ["page"] }], directives: [{ type: i7.VisibilityDirective, selector: "[visibilityObserver]", outputs: ["visible"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i8.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    throttleable(5)
], DatatableComponent.prototype, "onWindowResize", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-datatable', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'ngx-datatable'
                    }, template: "<div role=\"table\" visibilityObserver (visible)=\"recalculate()\">\r\n  <datatable-header\r\n    role=\"rowgroup\"\r\n    *ngIf=\"headerHeight\"\r\n    [sorts]=\"sorts\"\r\n    [sortType]=\"sortType\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [dealsWithGroup]=\"groupedRows !== undefined\"\r\n    [columns]=\"_internalColumns\"\r\n    [headerHeight]=\"headerHeight\"\r\n    [reorderable]=\"reorderable\"\r\n    [targetMarkerTemplate]=\"targetMarkerTemplate\"\r\n    [sortAscendingIcon]=\"cssClasses.sortAscending\"\r\n    [sortDescendingIcon]=\"cssClasses.sortDescending\"\r\n    [sortUnsetIcon]=\"cssClasses.sortUnset\"\r\n    [allRowsSelected]=\"allRowsSelected\"\r\n    [selectionType]=\"selectionType\"\r\n    (sort)=\"onColumnSort($event)\"\r\n    (resize)=\"onColumnResize($event)\"\r\n    (reorder)=\"onColumnReorder($event)\"\r\n    (select)=\"onHeaderSelect($event)\"\r\n    (columnContextmenu)=\"onColumnContextmenu($event)\"\r\n  >\r\n  </datatable-header>\r\n  <datatable-body\r\n    role=\"rowgroup\"\r\n    [groupRowsBy]=\"groupRowsBy\"\r\n    [groupedRows]=\"groupedRows\"\r\n    [rows]=\"_internalRows\"\r\n    [groupExpansionDefault]=\"groupExpansionDefault\"\r\n    [scrollbarV]=\"scrollbarV\"\r\n    [scrollbarH]=\"scrollbarH\"\r\n    [virtualization]=\"virtualization\"\r\n    [loadingIndicator]=\"loadingIndicator\"\r\n    [externalPaging]=\"externalPaging\"\r\n    [rowHeight]=\"rowHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [offset]=\"offset\"\r\n    [trackByProp]=\"trackByProp\"\r\n    [columns]=\"_internalColumns\"\r\n    [pageSize]=\"pageSize\"\r\n    [offsetX]=\"_offsetX | async\"\r\n    [rowDetail]=\"rowDetail\"\r\n    [groupHeader]=\"groupHeader\"\r\n    [selected]=\"selected\"\r\n    [innerWidth]=\"_innerWidth\"\r\n    [bodyHeight]=\"bodyHeight\"\r\n    [selectionType]=\"selectionType\"\r\n    [emptyMessage]=\"messages.emptyMessage\"\r\n    [rowIdentity]=\"rowIdentity\"\r\n    [rowClass]=\"rowClass\"\r\n    [selectCheck]=\"selectCheck\"\r\n    [displayCheck]=\"displayCheck\"\r\n    [summaryRow]=\"summaryRow\"\r\n    [summaryHeight]=\"summaryHeight\"\r\n    [summaryPosition]=\"summaryPosition\"\r\n    (page)=\"onBodyPage($event)\"\r\n    (activate)=\"activate.emit($event)\"\r\n    (rowContextmenu)=\"onRowContextmenu($event)\"\r\n    (select)=\"onBodySelect($event)\"\r\n    (scroll)=\"onBodyScroll($event)\"\r\n    (treeAction)=\"onTreeAction($event)\"\r\n  >\r\n  </datatable-body>\r\n  <datatable-footer\r\n    *ngIf=\"footerHeight\"\r\n    [rowCount]=\"rowCount\"\r\n    [pageSize]=\"pageSize\"\r\n    [offset]=\"offset\"\r\n    [footerHeight]=\"footerHeight\"\r\n    [footerTemplate]=\"footer\"\r\n    [totalMessage]=\"messages.totalMessage\"\r\n    [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\r\n    [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\r\n    [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\r\n    [selectedCount]=\"selected.length\"\r\n    [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\r\n    [pagerNextIcon]=\"cssClasses.pagerNext\"\r\n    (page)=\"onFooterPage($event)\"\r\n  >\r\n  </datatable-footer>\r\n</div>\r\n", styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;transform:translate(0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable *:before,.ngx-datatable *:after{box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-header-inner{display:flex;flex-direction:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:none}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{z-index:9}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group,.ngx-datatable .datatable-row-right{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:flex;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:none}.ngx-datatable .datatable-body .datatable-body-row>div{display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:none}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ScrollbarHelper, decorators: [{
                    type: SkipSelf
                }] }, { type: i2.DimensionsHelper, decorators: [{
                    type: SkipSelf
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.KeyValueDiffers }, { type: i3.ColumnChangesService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['configuration']
                }] }]; }, propDecorators: { targetMarkerTemplate: [{
                type: Input
            }], rows: [{
                type: Input
            }], groupRowsBy: [{
                type: Input
            }], groupedRows: [{
                type: Input
            }], columns: [{
                type: Input
            }], selected: [{
                type: Input
            }], scrollbarV: [{
                type: Input
            }], scrollbarH: [{
                type: Input
            }], rowHeight: [{
                type: Input
            }], columnMode: [{
                type: Input
            }], headerHeight: [{
                type: Input
            }], footerHeight: [{
                type: Input
            }], externalPaging: [{
                type: Input
            }], externalSorting: [{
                type: Input
            }], limit: [{
                type: Input
            }], count: [{
                type: Input
            }], offset: [{
                type: Input
            }], loadingIndicator: [{
                type: Input
            }], selectionType: [{
                type: Input
            }], reorderable: [{
                type: Input
            }], swapColumns: [{
                type: Input
            }], sortType: [{
                type: Input
            }], sorts: [{
                type: Input
            }], cssClasses: [{
                type: Input
            }], messages: [{
                type: Input
            }], rowClass: [{
                type: Input
            }], selectCheck: [{
                type: Input
            }], displayCheck: [{
                type: Input
            }], groupExpansionDefault: [{
                type: Input
            }], trackByProp: [{
                type: Input
            }], selectAllRowsOnPage: [{
                type: Input
            }], virtualization: [{
                type: Input
            }], treeFromRelation: [{
                type: Input
            }], treeToRelation: [{
                type: Input
            }], summaryRow: [{
                type: Input
            }], summaryHeight: [{
                type: Input
            }], summaryPosition: [{
                type: Input
            }], scroll: [{
                type: Output
            }], activate: [{
                type: Output
            }], select: [{
                type: Output
            }], sort: [{
                type: Output
            }], page: [{
                type: Output
            }], reorder: [{
                type: Output
            }], resize: [{
                type: Output
            }], tableContextmenu: [{
                type: Output
            }], treeAction: [{
                type: Output
            }], isFixedHeader: [{
                type: HostBinding,
                args: ['class.fixed-header']
            }], isFixedRow: [{
                type: HostBinding,
                args: ['class.fixed-row']
            }], isVertScroll: [{
                type: HostBinding,
                args: ['class.scroll-vertical']
            }], isVirtualized: [{
                type: HostBinding,
                args: ['class.virtualized']
            }], isHorScroll: [{
                type: HostBinding,
                args: ['class.scroll-horz']
            }], isSelectable: [{
                type: HostBinding,
                args: ['class.selectable']
            }], isCheckboxSelection: [{
                type: HostBinding,
                args: ['class.checkbox-selection']
            }], isCellSelection: [{
                type: HostBinding,
                args: ['class.cell-selection']
            }], isSingleSelection: [{
                type: HostBinding,
                args: ['class.single-selection']
            }], isMultiSelection: [{
                type: HostBinding,
                args: ['class.multi-selection']
            }], isMultiClickSelection: [{
                type: HostBinding,
                args: ['class.multi-click-selection']
            }], columnTemplates: [{
                type: ContentChildren,
                args: [DataTableColumnDirective]
            }], rowDetail: [{
                type: ContentChild,
                args: [DatatableRowDetailDirective]
            }], groupHeader: [{
                type: ContentChild,
                args: [DatatableGroupHeaderDirective]
            }], footer: [{
                type: ContentChild,
                args: [DatatableFooterDirective]
            }], bodyComponent: [{
                type: ViewChild,
                args: [DataTableBodyComponent]
            }], headerComponent: [{
                type: ViewChild,
                args: [DataTableHeaderComponent]
            }], rowIdentity: [{
                type: Input
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2RhdGF0YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9kYXRhdGFibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBSWYsV0FBVyxFQUNYLFlBQVksRUFJWixpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXZCLFFBQVEsRUFDUixRQUFRLEVBQ1IsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5GLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDJCQUEy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YTtzQkFEaEIsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBVzdCLFVBQVU7c0JBRGIsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBVTFCLFlBQVk7c0JBRGYsV0FBVzt1QkFBQyx1QkFBdUI7Z0JBVWhDLGFBQWE7c0JBRGhCLFdBQVc7dUJBQUMsbUJBQW1CO2dCQVU1QixXQUFXO3NCQURkLFdBQVc7dUJBQUMsbUJBQW1CO2dCQVM1QixZQUFZO3NCQURmLFdBQVc7dUJBQUMsa0JBQWtCO2dCQVMzQixtQkFBbUI7c0JBRHRCLFdBQVc7dUJBQUMsMEJBQTBCO2dCQVNuQyxlQUFlO3NCQURsQixXQUFXO3VCQUFDLHNCQUFzQjtnQkFTL0IsaUJBQWlCO3NCQURwQixXQUFXO3VCQUFDLHdCQUF3QjtnQkFTakMsZ0JBQWdCO3NCQURuQixXQUFXO3VCQUFDLHVCQUF1QjtnQkFTaEMscUJBQXFCO3NCQUR4QixXQUFXO3VCQUFDLDZCQUE2QjtnQkFVdEMsZUFBZTtzQkFEbEIsZUFBZTt1QkFBQyx3QkFBd0I7Z0JBaUJ6QyxTQUFTO3NCQURSLFlBQVk7dUJBQUMsMkJBQTJCO2dCQU96QyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsNkJBQTZCO2dCQU8zQyxNQUFNO3NCQURMLFlBQVk7dUJBQUMsd0JBQXdCO2dCQVF0QyxhQUFhO3NCQURaLFNBQVM7dUJBQUMsc0JBQXNCO2dCQVVqQyxlQUFlO3NCQURkLFNBQVM7dUJBQUMsd0JBQXdCO2dCQWdIMUIsV0FBVztzQkFBbkIsS0FBSztnQkFvR04sY0FBYztzQkFGYixZQUFZO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgT25Jbml0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVycyxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTa2lwU2VsZixcclxuICBPcHRpb25hbCxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJTmd4RGF0YXRhYmxlQ29uZmlnIH0gZnJvbSAnLi4vbmd4LWRhdGF0YWJsZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBncm91cFJvd3NCeVBhcmVudHMsIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCB9IGZyb20gJy4uL3V0aWxzL3RyZWUnO1xyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgc2V0Q29sdW1uRGVmYXVsdHMsIHRyYW5zbGF0ZVRlbXBsYXRlcyB9IGZyb20gJy4uL3V0aWxzL2NvbHVtbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2x1bW5Nb2RlIH0gZnJvbSAnLi4vdHlwZXMvY29sdW1uLW1vZGUudHlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvc29ydC50eXBlJztcclxuaW1wb3J0IHsgQ29udGV4dG1lbnVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvY29udGV4dG1lbnUudHlwZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2JvZHkvYm9keS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2Nyb2xsYmFySGVscGVyIH0gZnJvbSAnLi4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sdW1uQ2hhbmdlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGltZW5zaW9uc0hlbHBlciB9IGZyb20gJy4uL3NlcnZpY2VzL2RpbWVuc2lvbnMtaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0aHJvdHRsZWFibGUgfSBmcm9tICcuLi91dGlscy90aHJvdHRsZSc7XHJcbmltcG9ydCB7IGZvcmNlRmlsbENvbHVtbldpZHRocywgYWRqdXN0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XHJcbmltcG9ydCB7IHNvcnRSb3dzIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhdGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICduZ3gtZGF0YXRhYmxlJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogVGVtcGxhdGUgZm9yIHRoZSB0YXJnZXQgbWFya2VyIG9mIGRyYWcgdGFyZ2V0IGNvbHVtbnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogUm93cyB0aGF0IGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHRhYmxlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCByb3dzKHZhbDogYW55KSB7XHJcbiAgICB0aGlzLl9yb3dzID0gdmFsO1xyXG5cclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gWy4uLnZhbF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXV0byBzb3J0IG9uIG5ldyB1cGRhdGVzXHJcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XHJcbiAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8gZ3JvdXAgYnkgcGFyZW50IG9uIG5ldyB1cGRhdGVcclxuICAgIHRoaXMuX2ludGVybmFsUm93cyA9IGdyb3VwUm93c0J5UGFyZW50cyhcclxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzLFxyXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlRnJvbVJlbGF0aW9uKSxcclxuICAgICAgb3B0aW9uYWxHZXR0ZXJGb3JQcm9wKHRoaXMudHJlZVRvUmVsYXRpb24pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIHJlY2FsY3VsYXRlIHNpemVzL2V0Y1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9yb3dzICYmIHRoaXMuX2dyb3VwUm93c0J5KSB7XHJcbiAgICAgIC8vIElmIGEgY29sdW1uIGhhcyBiZWVuIHNwZWNpZmllZCBpbiBfZ3JvdXBSb3dzQnkgY3JlYXRlZCBhIG5ldyBhcnJheSB3aXRoIHRoZSBkYXRhIGdyb3VwZWQgYnkgdGhhdCByb3dcclxuICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgcm93cy5cclxuICAgKi9cclxuICBnZXQgcm93cygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGF0dHJpYnV0ZSBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gdG8gZ3JvdXAgdGhlIGRhdGEgd2l0aFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBncm91cFJvd3NCeSh2YWw6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB0aGlzLl9ncm91cFJvd3NCeSA9IHZhbDtcclxuICAgICAgaWYgKHRoaXMuX3Jvd3MgJiYgdGhpcy5fZ3JvdXBSb3dzQnkpIHtcclxuICAgICAgICAvLyBjcmV0ZXMgYSBuZXcgYXJyYXkgd2l0aCB0aGUgZGF0YSBncm91cGVkXHJcbiAgICAgICAgdGhpcy5ncm91cGVkUm93cyA9IHRoaXMuZ3JvdXBBcnJheUJ5KHRoaXMuX3Jvd3MsIHRoaXMuX2dyb3VwUm93c0J5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGdyb3VwUm93c0J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUm93c0J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHRoZSB1c2VyIHRvIHNldCBhIGdyb3VwZWQgYXJyYXkgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XHJcbiAgICogIFtcclxuICAgKiAgICB7Z3JvdXBpZD0xfSBbXHJcbiAgICogICAgICB7aWQ9MSBuYW1lPVwidGVzdDFcIn0sXHJcbiAgICogICAgICB7aWQ9MiBuYW1lPVwidGVzdDJcIn0sXHJcbiAgICogICAgICB7aWQ9MyBuYW1lPVwidGVzdDNcIn1cclxuICAgKiAgICBdfSxcclxuICAgKiAgICB7Z3JvdXBpZD0yPltcclxuICAgKiAgICAgIHtpZD00IG5hbWU9XCJ0ZXN0NFwifSxcclxuICAgKiAgICAgIHtpZD01IG5hbWU9XCJ0ZXN0NVwifSxcclxuICAgKiAgICAgIHtpZD02IG5hbWU9XCJ0ZXN0NlwifVxyXG4gICAqICAgIF19XHJcbiAgICogIF1cclxuICAgKi9cclxuICBASW5wdXQoKSBncm91cGVkUm93czogYW55W107XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbnMgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogVGFibGVDb2x1bW5bXSkge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBbLi4udmFsXTtcclxuICAgICAgc2V0Q29sdW1uRGVmYXVsdHModGhpcy5faW50ZXJuYWxDb2x1bW5zKTtcclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjb2x1bW5zLlxyXG4gICAqL1xyXG4gIGdldCBjb2x1bW5zKCk6IFRhYmxlQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIHJvdyBvYmplY3RzIHRoYXQgc2hvdWxkIGJlXHJcbiAgICogcmVwcmVzZW50ZWQgYXMgc2VsZWN0ZWQgaW4gdGhlIGdyaWQuXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYFtdYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgdmVydGljYWwgc2Nyb2xsYmFyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNjcm9sbGJhclY6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIGhvcnogc2Nyb2xsYmFyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNjcm9sbGJhckg6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJvdyBoZWlnaHQ7IHdoaWNoIGlzIG5lY2Vzc2FyeVxyXG4gICAqIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IGZvciB0aGUgbGF6eSByZW5kZXJpbmcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgfCAnYXV0bycgfCAoKHJvdz86IGFueSkgPT4gbnVtYmVyKSA9IDMwO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIGNvbHVtbiB3aWR0aCBkaXN0cmlidXRpb24gZm9ybXVsYS5cclxuICAgKiBFeGFtcGxlOiBmbGV4LCBmb3JjZSwgc3RhbmRhcmRcclxuICAgKi9cclxuICBASW5wdXQoKSBjb2x1bW5Nb2RlOiBDb2x1bW5Nb2RlIHwga2V5b2YgdHlwZW9mIENvbHVtbk1vZGUgPSBDb2x1bW5Nb2RlLnN0YW5kYXJkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWluaW11bSBoZWFkZXIgaGVpZ2h0IGluIHBpeGVscy5cclxuICAgKiBQYXNzIGEgZmFsc2V5IGZvciBubyBoZWFkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBoZWFkZXJIZWlnaHQ6IG51bWJlciA9IDMwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWluaW11bSBmb290ZXIgaGVpZ2h0IGluIHBpeGVscy5cclxuICAgKiBQYXNzIGZhbHNleSBmb3Igbm8gZm9vdGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgdGFibGUgc2hvdWxkIHVzZSBleHRlcm5hbCBwYWdpbmdcclxuICAgKiBvdGhlcndpc2UgaXRzIGFzc3VtZWQgdGhhdCBhbGwgZGF0YSBpcyBwcmVsb2FkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXh0ZXJuYWxQYWdpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIHRhYmxlIHNob3VsZCB1c2UgZXh0ZXJuYWwgc29ydGluZyBvclxyXG4gICAqIHRoZSBidWlsdC1pbiBiYXNpYyBzb3J0aW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV4dGVybmFsU29ydGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGFnZSBzaXplIHRvIGJlIHNob3duLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGB1bmRlZmluZWRgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGxpbWl0KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLl9saW1pdCA9IHZhbDtcclxuXHJcbiAgICAvLyByZWNhbGN1bGF0ZSBzaXplcy9ldGNcclxuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGxpbWl0LlxyXG4gICAqL1xyXG4gIGdldCBsaW1pdCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpbWl0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRvdGFsIGNvdW50IG9mIGFsbCByb3dzLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGAwYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBjb3VudCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY291bnQgPSB2YWw7XHJcblxyXG4gICAgLy8gcmVjYWxjdWxhdGUgc2l6ZXMvZXRjXHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjb3VudC5cclxuICAgKi9cclxuICBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IG9mZnNldCAoIHBhZ2UgLSAxICkgc2hvd24uXHJcbiAgICogRGVmYXVsdCB2YWx1ZTogYDBgXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xyXG4gIH1cclxuICBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5fb2Zmc2V0LCBNYXRoLmNlaWwodGhpcy5yb3dDb3VudCAvIHRoaXMucGFnZVNpemUpIC0gMSksIDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbGluZWFyIGxvYWRpbmcgYmFyLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBmYWxzZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGUgb2Ygcm93IHNlbGVjdGlvbi4gT3B0aW9ucyBhcmU6XHJcbiAgICpcclxuICAgKiAgLSBgc2luZ2xlYFxyXG4gICAqICAtIGBtdWx0aWBcclxuICAgKiAgLSBgY2hlY2tib3hgXHJcbiAgICogIC0gYG11bHRpQ2xpY2tgXHJcbiAgICogIC0gYGNlbGxgXHJcbiAgICpcclxuICAgKiBGb3Igbm8gc2VsZWN0aW9uIHBhc3MgYSBgZmFsc2V5YC5cclxuICAgKiBEZWZhdWx0IHZhbHVlOiBgdW5kZWZpbmVkYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZS9EaXNhYmxlIGFiaWxpdHkgdG8gcmUtb3JkZXIgY29sdW1uc1xyXG4gICAqIGJ5IGRyYWdnaW5nIHRoZW0uXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVvcmRlcmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBTd2FwIGNvbHVtbnMgb24gcmUtb3JkZXIgY29sdW1ucyBvclxyXG4gICAqIG1vdmUgdGhlbS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzd2FwQ29sdW1uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0eXBlIG9mIHNvcnRpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBzb3J0VHlwZTogU29ydFR5cGUgPSBTb3J0VHlwZS5zaW5nbGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFycmF5IG9mIHNvcnRlZCBjb2x1bW5zIGJ5IHByb3BlcnR5IGFuZCB0eXBlLlxyXG4gICAqIERlZmF1bHQgdmFsdWU6IGBbXWBcclxuICAgKi9cclxuICBASW5wdXQoKSBzb3J0czogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzIGNsYXNzIG92ZXJyaWRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNzc0NsYXNzZXM6IGFueSA9IHtcclxuICAgIHNvcnRBc2NlbmRpbmc6ICdkYXRhdGFibGUtaWNvbi11cCcsXHJcbiAgICBzb3J0RGVzY2VuZGluZzogJ2RhdGF0YWJsZS1pY29uLWRvd24nLFxyXG4gICAgc29ydFVuc2V0OiAnZGF0YXRhYmxlLWljb24tc29ydC11bnNldCcsXHJcbiAgICBwYWdlckxlZnRBcnJvdzogJ2RhdGF0YWJsZS1pY29uLWxlZnQnLFxyXG4gICAgcGFnZXJSaWdodEFycm93OiAnZGF0YXRhYmxlLWljb24tcmlnaHQnLFxyXG4gICAgcGFnZXJQcmV2aW91czogJ2RhdGF0YWJsZS1pY29uLXByZXYnLFxyXG4gICAgcGFnZXJOZXh0OiAnZGF0YXRhYmxlLWljb24tc2tpcCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNZXNzYWdlIG92ZXJyaWRlcyBmb3IgbG9jYWxpemF0aW9uXHJcbiAgICpcclxuICAgKiBlbXB0eU1lc3NhZ2UgICAgIFtkZWZhdWx0XSA9ICdObyBkYXRhIHRvIGRpc3BsYXknXHJcbiAgICogdG90YWxNZXNzYWdlICAgICBbZGVmYXVsdF0gPSAndG90YWwnXHJcbiAgICogc2VsZWN0ZWRNZXNzYWdlICBbZGVmYXVsdF0gPSAnc2VsZWN0ZWQnXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVzc2FnZXM6IGFueSA9IHtcclxuICAgIC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZFxyXG4gICAgLy8gYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xyXG4gICAgZW1wdHlNZXNzYWdlOiAnTm8gZGF0YSB0byBkaXNwbGF5JyxcclxuXHJcbiAgICAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxyXG4gICAgdG90YWxNZXNzYWdlOiAndG90YWwnLFxyXG5cclxuICAgIC8vIEZvb3RlciBzZWxlY3RlZCBtZXNzYWdlXHJcbiAgICBzZWxlY3RlZE1lc3NhZ2U6ICdzZWxlY3RlZCdcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSb3cgc3BlY2lmaWMgY2xhc3Nlcy5cclxuICAgKiBTaW1pbGFyIGltcGxlbWVudGF0aW9uIHRvIG5nQ2xhc3MuXHJcbiAgICpcclxuICAgKiAgW3Jvd0NsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCJcclxuICAgKiAgW3Jvd0NsYXNzXT1cInsgJ2ZpcnN0JzogdHJ1ZSwgJ3NlY29uZCc6IHRydWUsICd0aGlyZCc6IGZhbHNlIH1cIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgYm9vbGVhbi9mdW5jdGlvbiB5b3UgY2FuIHVzZSB0byBjaGVjayB3aGV0aGVyIHlvdSB3YW50XHJcbiAgICogdG8gc2VsZWN0IGEgcGFydGljdWxhciByb3cgYmFzZWQgb24gYSBjcml0ZXJpYS4gRXhhbXBsZTpcclxuICAgKlxyXG4gICAqICAgIChzZWxlY3Rpb24pID0+IHtcclxuICAgKiAgICAgIHJldHVybiBzZWxlY3Rpb24gIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24geW91IGNhbiB1c2UgdG8gY2hlY2sgd2hldGhlciB5b3Ugd2FudFxyXG4gICAqIHRvIHNob3cgdGhlIGNoZWNrYm94IGZvciBhIHBhcnRpY3VsYXIgcm93IGJhc2VkIG9uIGEgY3JpdGVyaWEuIEV4YW1wbGU6XHJcbiAgICpcclxuICAgKiAgICAocm93LCBjb2x1bW4sIHZhbHVlKSA9PiB7XHJcbiAgICogICAgICByZXR1cm4gcm93Lm5hbWUgIT09ICdFdGhlbCBQcmljZSc7XHJcbiAgICogICAgfVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogKHJvdzogYW55LCBjb2x1bW4/OiBhbnksIHZhbHVlPzogYW55KSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGJvb2xlYW4geW91IGNhbiB1c2UgdG8gc2V0IHRoZSBkZXRhdWx0IGJlaGF2aW91ciBvZiByb3dzIGFuZCBncm91cHNcclxuICAgKiB3aGV0aGVyIHRoZXkgd2lsbCBzdGFydCBleHBhbmRlZCBvciBub3QuIElmIG9tbWl0ZWQgdGhlIGRlZmF1bHQgaXMgTk9UIGV4cGFuZGVkLlxyXG4gICAqXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BlcnR5IHRvIHdoaWNoIHlvdSBjYW4gdXNlIGZvciBjdXN0b20gdHJhY2tpbmcgb2Ygcm93cy5cclxuICAgKiBFeGFtcGxlOiAnbmFtZSdcclxuICAgKi9cclxuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcm9wZXJ0eSB0byB3aGljaCB5b3UgY2FuIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2VsZWN0IGFsbFxyXG4gICAqIHJvd3Mgb24gY3VycmVudCBwYWdlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBEYXRhdGFibGVDb21wb25lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RBbGxSb3dzT25QYWdlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBmb3Igcm93IHZpcnR1YWxpemF0aW9uIG9uIC8gb2ZmXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUcmVlIGZyb20gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlRnJvbVJlbGF0aW9uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyZWUgdG8gcmVsYXRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmVlVG9SZWxhdGlvbjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgZm9yIHN3aXRjaGluZyBzdW1tYXJ5IHJvdyBvbiAvIG9mZlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWlnaHQgb2Ygc3VtbWFyeSByb3dcclxuICAgKi9cclxuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXIgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwcm9wZXJ0eSBob2xkcyBhIHN1bW1hcnkgcm93IHBvc2l0aW9uOiB0b3AvYm90dG9tXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgLyoqXHJcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQgdHlwaWNhbGx5IGluIGEgYHNjcm9sbGJhclY6dHJ1ZWAgc2NlbmFyaW8uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNjcm9sbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIGZvY3VzZWQgdmlhIGtleWJvYXJkIG9yIG1vdXNlIGNsaWNrLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2VsbCBvciByb3cgd2FzIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gc29ydCB3YXMgaW52b2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YWJsZSB3YXMgcGFnZWQgZWl0aGVyIHRyaWdnZXJlZCBieSB0aGUgcGFnZXIgb3IgdGhlIGJvZHkgc2Nyb2xsLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29sdW1ucyB3ZXJlIHJlLW9yZGVyZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb2x1bW4gd2FzIHJlc2l6ZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb250ZXh0IG1lbnUgd2FzIGludm9rZWQgb24gdGhlIHRhYmxlLlxyXG4gICAqIHR5cGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGhlYWRlciBvciB0aGUgYm9keSB3YXMgY2xpY2tlZC5cclxuICAgKiBjb250ZW50IGNvbnRhaW5zIGVpdGhlciB0aGUgY29sdW1uIG9yIHRoZSByb3cgdGhhdCB3YXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdGFibGVDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgdHlwZTogQ29udGV4dG1lbnVUeXBlOyBjb250ZW50OiBhbnkgfT4oZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJvdyB3YXMgZXhwYW5kZWQgb3QgY29sbGFwc2VkIGZvciB0cmVlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDU1MgY2xhc3MgYXBwbGllZCBpZiB0aGUgaGVhZGVyIGhlaWdodCBpZiBmaXhlZCBoZWlnaHQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxyXG4gIGdldCBpc0ZpeGVkSGVhZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGVhZGVySGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgIHJldHVybiB0eXBlb2YgaGVhZGVySGVpZ2h0ID09PSAnc3RyaW5nJyA/IDxzdHJpbmc+aGVhZGVySGVpZ2h0ICE9PSAnYXV0bycgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHRoZSByb3cgaGVpZ2h0cyBhcmUgZml4ZWQgaGVpZ2h0cy5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZpeGVkLXJvdycpXHJcbiAgZ2V0IGlzRml4ZWRSb3coKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQgIT09ICdhdXRvJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHZlcnRpY2FsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2Nyb2xsLXZlcnRpY2FsJylcclxuICBnZXQgaXNWZXJ0U2Nyb2xsKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsYmFyVjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgZWxlbWVudCBpZlxyXG4gICAqIHZpcnR1YWxpemF0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy52aXJ0dWFsaXplZCcpXHJcbiAgZ2V0IGlzVmlydHVhbGl6ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsaXphdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnRcclxuICAgKiBpZiB0aGUgaG9yemlvbnRhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbC1ob3J6JylcclxuICBnZXQgaXNIb3JTY3JvbGwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxiYXJIO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBlbGVtZW50IGlzIHNlbGVjdGFibGUuXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RhYmxlJylcclxuICBnZXQgaXNTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFwcGxpZWQgdG8gcm9vdCBpcyBjaGVja2JveCBzZWxlY3Rpb24uXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jaGVja2JveC1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc0NoZWNrYm94U2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgY2VsbCBzZWxlY3Rpb24uXHJcbiAgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jZWxsLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzQ2VsbFNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENTUyBjbGFzcyBhcHBsaWVkIHRvIHJvb3QgaWYgc2luZ2xlIHNlbGVjdC5cclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpbmdsZS1zZWxlY3Rpb24nKVxyXG4gIGdldCBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuc2luZ2xlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBzZWxlY3RcclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzTXVsdGlTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIHJvb3QgZWxlbWVudCBpZiBtdWxpdCBjbGljayBzZWxlY3RcclxuICAgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpLWNsaWNrLXNlbGVjdGlvbicpXHJcbiAgZ2V0IGlzTXVsdGlDbGlja1NlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGlDbGljaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbHVtbiB0ZW1wbGF0ZXMgZ2F0aGVyZWQgZnJvbSBgQ29udGVudENoaWxkcmVuYFxyXG4gICAqIGlmIGRlc2NyaWJlZCBpbiB5b3VyIG1hcmt1cC5cclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSlcclxuICBzZXQgY29sdW1uVGVtcGxhdGVzKHZhbDogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT4pIHtcclxuICAgIHRoaXMuX2NvbHVtblRlbXBsYXRlcyA9IHZhbDtcclxuICAgIHRoaXMudHJhbnNsYXRlQ29sdW1ucyh2YWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlcy5cclxuICAgKi9cclxuICBnZXQgY29sdW1uVGVtcGxhdGVzKCk6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmU+IHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5UZW1wbGF0ZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3cgRGV0YWlsIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSlcclxuICByb3dEZXRhaWw6IERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogR3JvdXAgSGVhZGVyIHRlbXBsYXRlcyBnYXRoZXJlZCBmcm9tIHRoZSBDb250ZW50Q2hpbGRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlKVxyXG4gIGdyb3VwSGVhZGVyOiBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9vdGVyIHRlbXBsYXRlIGdhdGhlcmVkIGZyb20gdGhlIENvbnRlbnRDaGlsZFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlKVxyXG4gIGZvb3RlcjogRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGJvZHkgY29tcG9uZW50IGZvciBtYW51YWxseVxyXG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgYm9keS5cclxuICAgKi9cclxuICBAVmlld0NoaWxkKERhdGFUYWJsZUJvZHlDb21wb25lbnQpXHJcbiAgYm9keUNvbXBvbmVudDogRGF0YVRhYmxlQm9keUNvbXBvbmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBoZWFkZXIgY29tcG9uZW50IGZvciBtYW51YWxseVxyXG4gICAqIGludm9raW5nIGZ1bmN0aW9ucyBvbiB0aGUgaGVhZGVyLlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIERhdGF0YWJsZUNvbXBvbmVudFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50KVxyXG4gIGhlYWRlckNvbXBvbmVudDogRGF0YVRhYmxlSGVhZGVyQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIGFsbCByb3dzIGFyZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMucm93cyAmJiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnJvd3MubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLmJvZHlDb21wb25lbnQgJiYgdGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcztcclxuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IGluZGV4ZXMubGFzdCAtIGluZGV4ZXMuZmlyc3Q7XHJcbiAgICAgIGFsbFJvd3NTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID09PSByb3dzT25QYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMucm93cyAmJiB0aGlzLnJvd3MubGVuZ3RoICE9PSAwICYmIGFsbFJvd3NTZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBib2R5SGVpZ2h0OiBudW1iZXI7XHJcbiAgcm93Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xyXG5cclxuICBfb2Zmc2V0WCA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XHJcbiAgX2xpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gIF9vZmZzZXQ6IG51bWJlciA9IDA7XHJcbiAgX3Jvd3M6IGFueVtdO1xyXG4gIF9ncm91cFJvd3NCeTogc3RyaW5nO1xyXG4gIF9pbnRlcm5hbFJvd3M6IGFueVtdO1xyXG4gIF9pbnRlcm5hbENvbHVtbnM6IFRhYmxlQ29sdW1uW107XHJcbiAgX2NvbHVtbnM6IFRhYmxlQ29sdW1uW107XHJcbiAgX2NvbHVtblRlbXBsYXRlczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZT47XHJcbiAgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBzY3JvbGxiYXJIZWxwZXI6IFNjcm9sbGJhckhlbHBlcixcclxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgZGltZW5zaW9uc0hlbHBlcjogRGltZW5zaW9uc0hlbHBlcixcclxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY29sdW1uQ2hhbmdlc1NlcnZpY2U6IENvbHVtbkNoYW5nZXNTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY29uZmlndXJhdGlvbicpIHByaXZhdGUgY29uZmlndXJhdGlvbjogSU5neERhdGF0YWJsZUNvbmZpZ1xyXG4gICkge1xyXG4gICAgLy8gZ2V0IHJlZiB0byBlbG0gZm9yIG1lYXN1cmluZ1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5yb3dEaWZmZXIgPSBkaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG5cclxuICAgIC8vIGFwcGx5IGdsb2JhbCBzZXR0aW5ncyBmcm9tIE1vZHVsZS5mb3JSb290XHJcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uICYmIHRoaXMuY29uZmlndXJhdGlvbi5tZXNzYWdlcykge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzID0geyAuLi50aGlzLmNvbmZpZ3VyYXRpb24ubWVzc2FnZXMgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmRcclxuICAgKiBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlIGFyZSBpbml0aWFsaXplZC5cclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIG5lZWQgdG8gY2FsbCB0aGlzIGltbWVkaWF0bHkgdG8gc2l6ZVxyXG4gICAgLy8gaWYgdGhlIHRhYmxlIGlzIGhpZGRlbiB0aGUgdmlzaWJpbGl0eVxyXG4gICAgLy8gbGlzdGVuZXIgd2lsbCBpbnZva2UgdGhpcyBpdHNlbGYgdXBvbiBzaG93XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXHJcbiAgICogdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XHJcbiAgICAgIHRoaXMuc29ydEludGVybmFsUm93cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIGRvbmUgdG8gcHJldmVudCB0aGUgY2hhbmdlIGRldGVjdGlvblxyXG4gICAgLy8gdHJlZSBmcm9tIGZyZWFraW5nIG91dCBiZWNhdXNlIHdlIGFyZSByZWFkanVzdGluZ1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XHJcblxyXG4gICAgICAvLyBlbWl0IHBhZ2UgZm9yIHZpcnR1YWwgc2VydmVyLXNpZGUga2lja29mZlxyXG4gICAgICBpZiAodGhpcy5leHRlcm5hbFBhZ2luZyAmJiB0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuZW1pdCh7XHJcbiAgICAgICAgICBjb3VudDogdGhpcy5jb3VudCxcclxuICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXHJcbiAgICAgICAgICBvZmZzZXQ6IDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzXHJcbiAgICogY29udGVudCBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cclxuICAgKi9cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmNvbHVtblRlbXBsYXRlcy5jaGFuZ2VzLnN1YnNjcmliZSh2ID0+IHRoaXMudHJhbnNsYXRlQ29sdW1ucyh2KSk7XHJcbiAgICB0aGlzLmxpc3RlbkZvckNvbHVtbklucHV0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyB3aWxsIGJlIHVzZWQgd2hlbiBkaXNwbGF5aW5nIG9yIHNlbGVjdGluZyByb3dzLlxyXG4gICAqIHdoZW4gdHJhY2tpbmcvY29tcGFyaW5nIHRoZW0sIHdlJ2xsIHVzZSB0aGUgdmFsdWUgb2YgdGhpcyBmbixcclxuICAgKlxyXG4gICAqIChgZm4oeCkgPT09IGZuKHkpYCBpbnN0ZWFkIG9mIGB4ID09PSB5YClcclxuICAgKi9cclxuICBASW5wdXQoKSByb3dJZGVudGl0eTogKHg6IGFueSkgPT4gYW55ID0gKHg6IGFueSkgPT4ge1xyXG4gICAgaWYgKHRoaXMuX2dyb3VwUm93c0J5KSB7XHJcbiAgICAgIC8vIGVhY2ggZ3JvdXAgaW4gZ3JvdXBlZFJvd3MgYXJlIHN0b3JlZCBhcyB7a2V5LCB2YWx1ZTogW3Jvd3NdfSxcclxuICAgICAgLy8gd2hlcmUga2V5IGlzIHRoZSBncm91cFJvd3NCeSBpbmRleFxyXG4gICAgICByZXR1cm4geC5rZXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGVzIHRoZSB0ZW1wbGF0ZXMgdG8gdGhlIGNvbHVtbiBvYmplY3RzXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlQ29sdW1ucyh2YWw6IGFueSkge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICBjb25zdCBhcnIgPSB2YWwudG9BcnJheSgpO1xyXG4gICAgICBpZiAoYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IHRyYW5zbGF0ZVRlbXBsYXRlcyhhcnIpO1xyXG4gICAgICAgIHNldENvbHVtbkRlZmF1bHRzKHRoaXMuX2ludGVybmFsQ29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcclxuICAgICAgICB0aGlzLnNvcnRJbnRlcm5hbFJvd3MoKTtcclxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbWFwIHdpdGggdGhlIGRhdGEgZ3JvdXBlZCBieSB0aGUgdXNlciBjaG9pY2Ugb2YgZ3JvdXBpbmcgaW5kZXhcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEFycmF5IHRoZSBvcmlnaW5hbCBhcnJheSBwYXNzZWQgdmlhIHBhcmFtZXRlclxyXG4gICAqIEBwYXJhbSBncm91cEJ5SW5kZXggIHRoZSBpbmRleCBvZiB0aGUgY29sdW1uIHRvIGdyb3VwIHRoZSBkYXRhIGJ5XHJcbiAgICovXHJcbiAgZ3JvdXBBcnJheUJ5KG9yaWdpbmFsQXJyYXk6IGFueSwgZ3JvdXBCeTogYW55KSB7XHJcbiAgICAvLyBjcmVhdGUgYSBtYXAgdG8gaG9sZCBncm91cHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIHJlc3VsdHNcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcclxuICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIG9yaWdpbmFsQXJyYXkuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW1bZ3JvdXBCeV07XHJcbiAgICAgIGlmICghbWFwLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgbWFwLnNldChrZXksIFtpdGVtXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWFwLmdldChrZXkpLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgICAgaSsrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWRkR3JvdXAgPSAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgcmV0dXJuIHsga2V5LCB2YWx1ZSB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBjb252ZXJ0IG1hcCBiYWNrIHRvIGEgc2ltcGxlIGFycmF5IG9mIG9iamVjdHNcclxuICAgIHJldHVybiBBcnJheS5mcm9tKG1hcCwgeCA9PiBhZGRHcm91cCh4WzBdLCB4WzFdKSk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gQW5ndWxhciBkaXJ0eSBjaGVja3MgYSBkaXJlY3RpdmUuXHJcbiAgICovXHJcbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucm93RGlmZmVyLmRpZmYodGhpcy5yb3dzKSkge1xyXG4gICAgICBpZiAoIXRoaXMuZXh0ZXJuYWxTb3J0aW5nKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gWy4uLnRoaXMucm93c107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGF1dG8gZ3JvdXAgYnkgcGFyZW50IG9uIG5ldyB1cGRhdGVcclxuICAgICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxyXG4gICAgICAgIHRoaXMuX2ludGVybmFsUm93cyxcclxuICAgICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlRnJvbVJlbGF0aW9uKSxcclxuICAgICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjJ3MgdGhlIHNpemVzIG9mIHRoZSBncmlkLlxyXG4gICAqXHJcbiAgICogVXBkYXRlZCBhdXRvbWF0aWNhbGx5IG9uIGNoYW5nZXMgdG86XHJcbiAgICpcclxuICAgKiAgLSBDb2x1bW5zXHJcbiAgICogIC0gUm93c1xyXG4gICAqICAtIFBhZ2luZyByZWxhdGVkXHJcbiAgICpcclxuICAgKiBBbHNvIGNhbiBiZSBtYW51YWxseSBpbnZva2VkIG9yIHVwb24gd2luZG93IHJlc2l6ZS5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVEaW1zKCk7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpbmRvdyByZXNpemUgaGFuZGxlciB0byB1cGRhdGUgc2l6ZXMuXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgQHRocm90dGxlYWJsZSg1KVxyXG4gIG9uV2luZG93UmVzaXplKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWx1bGNhdGVzIHRoZSBjb2x1bW4gd2lkdGhzIGJhc2VkIG9uIGNvbHVtbiB3aWR0aFxyXG4gICAqIGRpc3RyaWJ1dGlvbiBtb2RlIGFuZCBzY3JvbGxiYXIgb2Zmc2V0cy5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZUNvbHVtbnMoXHJcbiAgICBjb2x1bW5zOiBhbnlbXSA9IHRoaXMuX2ludGVybmFsQ29sdW1ucyxcclxuICAgIGZvcmNlSWR4OiBudW1iZXIgPSAtMSxcclxuICAgIGFsbG93QmxlZWQ6IGJvb2xlYW4gPSB0aGlzLnNjcm9sbGJhckhcclxuICApOiBhbnlbXSB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAoIWNvbHVtbnMpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5faW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcclxuICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMuc2Nyb2xsYmFySGVscGVyLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbHVtbk1vZGUgPT09IENvbHVtbk1vZGUuZm9yY2UpIHtcclxuICAgICAgZm9yY2VGaWxsQ29sdW1uV2lkdGhzKGNvbHVtbnMsIHdpZHRoLCBmb3JjZUlkeCwgYWxsb3dCbGVlZCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uTW9kZSA9PT0gQ29sdW1uTW9kZS5mbGV4KSB7XHJcbiAgICAgIGFkanVzdENvbHVtbldpZHRocyhjb2x1bW5zLCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRhYmxlIHNpemUuXHJcbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgcGFnZSBzaXplIGFuZCByb3cgY291bnQgY2FsY3MgdG9vLlxyXG4gICAqXHJcbiAgICovXHJcbiAgcmVjYWxjdWxhdGVEaW1zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGltcyA9IHRoaXMuZGltZW5zaW9uc0hlbHBlci5nZXREaW1lbnNpb25zKHRoaXMuZWxlbWVudCk7XHJcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gTWF0aC5mbG9vcihkaW1zLndpZHRoKTtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XHJcbiAgICAgIGxldCBoZWlnaHQgPSBkaW1zLmhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgICAgaWYgKHRoaXMuZm9vdGVySGVpZ2h0KSBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmZvb3RlckhlaWdodDtcclxuICAgICAgdGhpcy5ib2R5SGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBwYWdlcyBhZnRlciBhIHVwZGF0ZS5cclxuICAgKi9cclxuICByZWNhbGN1bGF0ZVBhZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IHRoaXMuY2FsY1BhZ2VTaXplKCk7XHJcbiAgICB0aGlzLnJvd0NvdW50ID0gdGhpcy5jYWxjUm93Q291bnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJvZHkgdHJpZ2dlcmVkIGEgcGFnZSBldmVudC5cclxuICAgKi9cclxuICBvbkJvZHlQYWdlKHsgb2Zmc2V0IH06IGFueSk6IHZvaWQge1xyXG4gICAgLy8gQXZvaWQgcGFnaW5hdGlvbiBjYW1pbmcgZnJvbSBib2R5IGV2ZW50cyBsaWtlIHNjcm9sbCB3aGVuIHRoZSB0YWJsZVxyXG4gICAgLy8gaGFzIG5vIHZpcnR1YWxpemF0aW9uIGFuZCB0aGUgZXh0ZXJuYWwgcGFnaW5nIGlzIGVuYWJsZS5cclxuICAgIC8vIFRoaXMgbWVhbnMsIGxldCdzIHRoZSBkZXZlbG9wZXIgaGFuZGxlIHBhZ2luYXRpb24gYnkgbXkgaGltKGhlcikgc2VsZlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxQYWdpbmcgJiYgIXRoaXMudmlydHVhbGl6YXRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYm9keSB0cmlnZ2VyZWQgYSBzY3JvbGwgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Cb2R5U2Nyb2xsKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9vZmZzZXRYLm5leHQoZXZlbnQub2Zmc2V0WCk7XHJcbiAgICB0aGlzLnNjcm9sbC5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZvb3RlciB0cmlnZ2VyZWQgYSBwYWdlIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uRm9vdGVyUGFnZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm9mZnNldCA9IGV2ZW50LnBhZ2UgLSAxO1xyXG4gICAgdGhpcy5ib2R5Q29tcG9uZW50LnVwZGF0ZU9mZnNldFkodGhpcy5vZmZzZXQpO1xyXG5cclxuICAgIHRoaXMucGFnZS5lbWl0KHtcclxuICAgICAgY291bnQ6IHRoaXMuY291bnQsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0QWxsUm93c09uUGFnZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjYWxjdWxhdGVzIHRoZSBzaXplcyBvZiB0aGUgcGFnZVxyXG4gICAqL1xyXG4gIGNhbGNQYWdlU2l6ZSh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIC8vIEtlZXAgdGhlIHBhZ2Ugc2l6ZSBjb25zdGFudCBldmVuIGlmIHRoZSByb3cgaGFzIGJlZW4gZXhwYW5kZWQuXHJcbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgYW4gZXhwYW5kZWQgcm93IGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgYSBjaGlsZCBvZlxyXG4gICAgLy8gdGhlIG9yaWdpbmFsIHJvdy4gIEhlbmNlIGNhbGN1bGF0aW9uIHdvdWxkIHVzZSByb3dIZWlnaHQgb25seS5cclxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xyXG4gICAgICBjb25zdCBzaXplID0gTWF0aC5jZWlsKHRoaXMuYm9keUhlaWdodCAvICh0aGlzLnJvd0hlaWdodCBhcyBudW1iZXIpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KHNpemUsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGxpbWl0IGlzIHBhc3NlZCwgd2UgYXJlIHBhZ2luZ1xyXG4gICAgaWYgKHRoaXMubGltaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5saW1pdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvdGhlcndpc2UgdXNlIHJvdyBsZW5ndGhcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3RoZXIgZW1wdHkgOihcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB0aGUgcm93IGNvdW50LlxyXG4gICAqL1xyXG4gIGNhbGNSb3dDb3VudCh2YWw6IGFueVtdID0gdGhpcy5yb3dzKTogbnVtYmVyIHtcclxuICAgIGlmICghdGhpcy5leHRlcm5hbFBhZ2luZykge1xyXG4gICAgICBpZiAoIXZhbCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWVGcm9tUmVsYXRpb24gIT0gbnVsbCAmJiB0aGlzLnRyZWVUb1JlbGF0aW9uICE9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxSb3dzLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb250ZXh0bWVudSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtbkNvbnRleHRtZW51KHsgZXZlbnQsIGNvbHVtbiB9OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudGFibGVDb250ZXh0bWVudS5lbWl0KHsgZXZlbnQsIHR5cGU6IENvbnRleHRtZW51VHlwZS5oZWFkZXIsIGNvbnRlbnQ6IGNvbHVtbiB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBib2R5IHRyaWdnZXJlZCBhIGNvbnRleHRtZW51IGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uUm93Q29udGV4dG1lbnUoeyBldmVudCwgcm93IH06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy50YWJsZUNvbnRleHRtZW51LmVtaXQoeyBldmVudCwgdHlwZTogQ29udGV4dG1lbnVUeXBlLmJvZHksIGNvbnRlbnQ6IHJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHJlc2l6ZSBldmVudC5cclxuICAgKi9cclxuICBvbkNvbHVtblJlc2l6ZSh7IGNvbHVtbiwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XHJcbiAgICAvKiBTYWZhcmkvaU9TIDEwLjIgd29ya2Fyb3VuZCAqL1xyXG4gICAgaWYgKGNvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaWR4OiBudW1iZXI7XHJcbiAgICBjb25zdCBjb2xzID0gdGhpcy5faW50ZXJuYWxDb2x1bW5zLm1hcCgoYywgaSkgPT4ge1xyXG4gICAgICBjID0geyAuLi5jIH07XHJcblxyXG4gICAgICBpZiAoYy4kJGlkID09PSBjb2x1bW4uJCRpZCkge1xyXG4gICAgICAgIGlkeCA9IGk7XHJcbiAgICAgICAgYy53aWR0aCA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhpcyBzbyB3ZSBjYW4gZm9yY2UgdGhlIGNvbHVtblxyXG4gICAgICAgIC8vIHdpZHRoIGRpc3RyaWJ1dGlvbiB0byBiZSB0byB0aGlzIHZhbHVlXHJcbiAgICAgICAgYy4kJG9sZFdpZHRoID0gbmV3VmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoY29scywgaWR4KTtcclxuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IGNvbHM7XHJcblxyXG4gICAgdGhpcy5yZXNpemUuZW1pdCh7XHJcbiAgICAgIGNvbHVtbixcclxuICAgICAgbmV3VmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlYWRlciB0cmlnZ2VyZWQgYSBjb2x1bW4gcmUtb3JkZXIgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5SZW9yZGVyKHsgY29sdW1uLCBuZXdWYWx1ZSwgcHJldlZhbHVlIH06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29scyA9IHRoaXMuX2ludGVybmFsQ29sdW1ucy5tYXAoYyA9PiB7XHJcbiAgICAgIHJldHVybiB7IC4uLmMgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnN3YXBDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IHByZXZDb2wgPSBjb2xzW25ld1ZhbHVlXTtcclxuICAgICAgY29sc1tuZXdWYWx1ZV0gPSBjb2x1bW47XHJcbiAgICAgIGNvbHNbcHJldlZhbHVlXSA9IHByZXZDb2w7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPiBwcmV2VmFsdWUpIHtcclxuICAgICAgICBjb25zdCBtb3ZlZENvbCA9IGNvbHNbcHJldlZhbHVlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcHJldlZhbHVlOyBpIDwgbmV3VmFsdWU7IGkrKykge1xyXG4gICAgICAgICAgY29sc1tpXSA9IGNvbHNbaSArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xzW25ld1ZhbHVlXSA9IG1vdmVkQ29sO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1vdmVkQ29sID0gY29sc1twcmV2VmFsdWVdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwcmV2VmFsdWU7IGkgPiBuZXdWYWx1ZTsgaS0tKSB7XHJcbiAgICAgICAgICBjb2xzW2ldID0gY29sc1tpIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbHNbbmV3VmFsdWVdID0gbW92ZWRDb2w7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSBjb2xzO1xyXG5cclxuICAgIHRoaXMucmVvcmRlci5lbWl0KHtcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBuZXdWYWx1ZSxcclxuICAgICAgcHJldlZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWFkZXIgdHJpZ2dlcmVkIGEgY29sdW1uIHNvcnQgZXZlbnQuXHJcbiAgICovXHJcbiAgb25Db2x1bW5Tb3J0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIGNsZWFuIHNlbGVjdGVkIHJvd3NcclxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFJvd3NPblBhZ2UpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvcnRzID0gZXZlbnQuc29ydHM7XHJcblxyXG4gICAgLy8gdGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgYmV0dGVyIHNpbmNlIGl0IHdpbGwgcmVzb3J0XHJcbiAgICAvLyB0aGUgcm93cyBhZ2FpbiBvbiB0aGUgJ3B1c2gnIGRldGVjdGlvbi4uLlxyXG4gICAgaWYgKHRoaXMuZXh0ZXJuYWxTb3J0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAvLyBkb24ndCB1c2Ugbm9ybWFsIHNldHRlciBzbyB3ZSBkb24ndCByZXNvcnRcclxuICAgICAgdGhpcy5zb3J0SW50ZXJuYWxSb3dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXV0byBncm91cCBieSBwYXJlbnQgb24gbmV3IHVwZGF0ZVxyXG4gICAgdGhpcy5faW50ZXJuYWxSb3dzID0gZ3JvdXBSb3dzQnlQYXJlbnRzKFxyXG4gICAgICB0aGlzLl9pbnRlcm5hbFJvd3MsXHJcbiAgICAgIG9wdGlvbmFsR2V0dGVyRm9yUHJvcCh0aGlzLnRyZWVGcm9tUmVsYXRpb24pLFxyXG4gICAgICBvcHRpb25hbEdldHRlckZvclByb3AodGhpcy50cmVlVG9SZWxhdGlvbilcclxuICAgICk7XHJcblxyXG4gICAgLy8gQWx3YXlzIGdvIHRvIGZpcnN0IHBhZ2Ugd2hlbiBzb3J0aW5nIHRvIHNlZSB0aGUgbmV3bHkgc29ydGVkIGRhdGFcclxuICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgIHRoaXMuYm9keUNvbXBvbmVudC51cGRhdGVPZmZzZXRZKHRoaXMub2Zmc2V0KTtcclxuICAgIHRoaXMuc29ydC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbGwgcm93IHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIG9uSGVhZGVyU2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJvZHlDb21wb25lbnQgJiYgdGhpcy5zZWxlY3RBbGxSb3dzT25QYWdlKSB7XHJcbiAgICAgIC8vIGJlZm9yZSB3ZSBzcGxpY2UsIGNoayBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBhbGwgc2VsZWN0ZWRcclxuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmJvZHlDb21wb25lbnQuaW5kZXhlcy5maXJzdDtcclxuICAgICAgY29uc3QgbGFzdCA9IHRoaXMuYm9keUNvbXBvbmVudC5pbmRleGVzLmxhc3Q7XHJcbiAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IGxhc3QgLSBmaXJzdDtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgZXhpc3RpbmcgZWl0aGVyIHdheVxyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcblxyXG4gICAgICAvLyBkbyB0aGUgb3Bwb3NpdGUgaGVyZVxyXG4gICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnRoaXMuX2ludGVybmFsUm93cy5zbGljZShmaXJzdCwgbGFzdCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBiZWZvcmUgd2Ugc3BsaWNlLCBjaGsgaWYgd2UgY3VycmVudGx5IGhhdmUgYWxsIHNlbGVjdGVkXHJcbiAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucm93cy5sZW5ndGg7XHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgZXhpc3RpbmcgZWl0aGVyIHdheVxyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XHJcbiAgICAgIC8vIGRvIHRoZSBvcHBvc2l0ZSBoZXJlXHJcbiAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4udGhpcy5yb3dzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHJvdyB3YXMgc2VsZWN0ZWQgZnJvbSBib2R5XHJcbiAgICovXHJcbiAgb25Cb2R5U2VsZWN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSByb3cgd2FzIGV4cGFuZGVkIG9yIGNvbGxhcHNlZCBmb3IgdHJlZVxyXG4gICAqL1xyXG4gIG9uVHJlZUFjdGlvbihldmVudDogYW55KSB7XHJcbiAgICBjb25zdCByb3cgPSBldmVudC5yb3c7XHJcbiAgICAvLyBUT0RPOiBGb3IgZHVwbGljYXRlZCBpdGVtcyB0aGlzIHdpbGwgbm90IHdvcmtcclxuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fcm93cy5maW5kSW5kZXgociA9PiByW3RoaXMudHJlZVRvUmVsYXRpb25dID09PSBldmVudC5yb3dbdGhpcy50cmVlVG9SZWxhdGlvbl0pO1xyXG4gICAgdGhpcy50cmVlQWN0aW9uLmVtaXQoeyByb3csIHJvd0luZGV4IH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpc3RlbiBmb3IgY2hhbmdlcyB0byBpbnB1dCBiaW5kaW5ncyBvZiBhbGwgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIGFuZFxyXG4gICAqIHRyaWdnZXIgdGhlIGNvbHVtblRlbXBsYXRlcy5jaGFuZ2VzIG9ic2VydmFibGUgdG8gZW1pdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29sdW1uSW5wdXRDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmNvbHVtbkNoYW5nZXNTZXJ2aWNlLmNvbHVtbklucHV0Q2hhbmdlcyQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5UZW1wbGF0ZXMpIHtcclxuICAgICAgICAgIHRoaXMuY29sdW1uVGVtcGxhdGVzLm5vdGlmeU9uQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRJbnRlcm5hbFJvd3MoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9pbnRlcm5hbFJvd3MgPSBzb3J0Um93cyh0aGlzLl9pbnRlcm5hbFJvd3MsIHRoaXMuX2ludGVybmFsQ29sdW1ucywgdGhpcy5zb3J0cyk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgcm9sZT1cInRhYmxlXCIgdmlzaWJpbGl0eU9ic2VydmVyICh2aXNpYmxlKT1cInJlY2FsY3VsYXRlKClcIj5cclxuICA8ZGF0YXRhYmxlLWhlYWRlclxyXG4gICAgcm9sZT1cInJvd2dyb3VwXCJcclxuICAgICpuZ0lmPVwiaGVhZGVySGVpZ2h0XCJcclxuICAgIFtzb3J0c109XCJzb3J0c1wiXHJcbiAgICBbc29ydFR5cGVdPVwic29ydFR5cGVcIlxyXG4gICAgW3Njcm9sbGJhckhdPVwic2Nyb2xsYmFySFwiXHJcbiAgICBbaW5uZXJXaWR0aF09XCJfaW5uZXJXaWR0aFwiXHJcbiAgICBbb2Zmc2V0WF09XCJfb2Zmc2V0WCB8IGFzeW5jXCJcclxuICAgIFtkZWFsc1dpdGhHcm91cF09XCJncm91cGVkUm93cyAhPT0gdW5kZWZpbmVkXCJcclxuICAgIFtjb2x1bW5zXT1cIl9pbnRlcm5hbENvbHVtbnNcIlxyXG4gICAgW2hlYWRlckhlaWdodF09XCJoZWFkZXJIZWlnaHRcIlxyXG4gICAgW3Jlb3JkZXJhYmxlXT1cInJlb3JkZXJhYmxlXCJcclxuICAgIFt0YXJnZXRNYXJrZXJUZW1wbGF0ZV09XCJ0YXJnZXRNYXJrZXJUZW1wbGF0ZVwiXHJcbiAgICBbc29ydEFzY2VuZGluZ0ljb25dPVwiY3NzQ2xhc3Nlcy5zb3J0QXNjZW5kaW5nXCJcclxuICAgIFtzb3J0RGVzY2VuZGluZ0ljb25dPVwiY3NzQ2xhc3Nlcy5zb3J0RGVzY2VuZGluZ1wiXHJcbiAgICBbc29ydFVuc2V0SWNvbl09XCJjc3NDbGFzc2VzLnNvcnRVbnNldFwiXHJcbiAgICBbYWxsUm93c1NlbGVjdGVkXT1cImFsbFJvd3NTZWxlY3RlZFwiXHJcbiAgICBbc2VsZWN0aW9uVHlwZV09XCJzZWxlY3Rpb25UeXBlXCJcclxuICAgIChzb3J0KT1cIm9uQ29sdW1uU29ydCgkZXZlbnQpXCJcclxuICAgIChyZXNpemUpPVwib25Db2x1bW5SZXNpemUoJGV2ZW50KVwiXHJcbiAgICAocmVvcmRlcik9XCJvbkNvbHVtblJlb3JkZXIoJGV2ZW50KVwiXHJcbiAgICAoc2VsZWN0KT1cIm9uSGVhZGVyU2VsZWN0KCRldmVudClcIlxyXG4gICAgKGNvbHVtbkNvbnRleHRtZW51KT1cIm9uQ29sdW1uQ29udGV4dG1lbnUoJGV2ZW50KVwiXHJcbiAgPlxyXG4gIDwvZGF0YXRhYmxlLWhlYWRlcj5cclxuICA8ZGF0YXRhYmxlLWJvZHlcclxuICAgIHJvbGU9XCJyb3dncm91cFwiXHJcbiAgICBbZ3JvdXBSb3dzQnldPVwiZ3JvdXBSb3dzQnlcIlxyXG4gICAgW2dyb3VwZWRSb3dzXT1cImdyb3VwZWRSb3dzXCJcclxuICAgIFtyb3dzXT1cIl9pbnRlcm5hbFJvd3NcIlxyXG4gICAgW2dyb3VwRXhwYW5zaW9uRGVmYXVsdF09XCJncm91cEV4cGFuc2lvbkRlZmF1bHRcIlxyXG4gICAgW3Njcm9sbGJhclZdPVwic2Nyb2xsYmFyVlwiXHJcbiAgICBbc2Nyb2xsYmFySF09XCJzY3JvbGxiYXJIXCJcclxuICAgIFt2aXJ0dWFsaXphdGlvbl09XCJ2aXJ0dWFsaXphdGlvblwiXHJcbiAgICBbbG9hZGluZ0luZGljYXRvcl09XCJsb2FkaW5nSW5kaWNhdG9yXCJcclxuICAgIFtleHRlcm5hbFBhZ2luZ109XCJleHRlcm5hbFBhZ2luZ1wiXHJcbiAgICBbcm93SGVpZ2h0XT1cInJvd0hlaWdodFwiXHJcbiAgICBbcm93Q291bnRdPVwicm93Q291bnRcIlxyXG4gICAgW29mZnNldF09XCJvZmZzZXRcIlxyXG4gICAgW3RyYWNrQnlQcm9wXT1cInRyYWNrQnlQcm9wXCJcclxuICAgIFtjb2x1bW5zXT1cIl9pbnRlcm5hbENvbHVtbnNcIlxyXG4gICAgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCJcclxuICAgIFtvZmZzZXRYXT1cIl9vZmZzZXRYIHwgYXN5bmNcIlxyXG4gICAgW3Jvd0RldGFpbF09XCJyb3dEZXRhaWxcIlxyXG4gICAgW2dyb3VwSGVhZGVyXT1cImdyb3VwSGVhZGVyXCJcclxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICBbaW5uZXJXaWR0aF09XCJfaW5uZXJXaWR0aFwiXHJcbiAgICBbYm9keUhlaWdodF09XCJib2R5SGVpZ2h0XCJcclxuICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxyXG4gICAgW2VtcHR5TWVzc2FnZV09XCJtZXNzYWdlcy5lbXB0eU1lc3NhZ2VcIlxyXG4gICAgW3Jvd0lkZW50aXR5XT1cInJvd0lkZW50aXR5XCJcclxuICAgIFtyb3dDbGFzc109XCJyb3dDbGFzc1wiXHJcbiAgICBbc2VsZWN0Q2hlY2tdPVwic2VsZWN0Q2hlY2tcIlxyXG4gICAgW2Rpc3BsYXlDaGVja109XCJkaXNwbGF5Q2hlY2tcIlxyXG4gICAgW3N1bW1hcnlSb3ddPVwic3VtbWFyeVJvd1wiXHJcbiAgICBbc3VtbWFyeUhlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcclxuICAgIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcclxuICAgIChwYWdlKT1cIm9uQm9keVBhZ2UoJGV2ZW50KVwiXHJcbiAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgIChyb3dDb250ZXh0bWVudSk9XCJvblJvd0NvbnRleHRtZW51KCRldmVudClcIlxyXG4gICAgKHNlbGVjdCk9XCJvbkJvZHlTZWxlY3QoJGV2ZW50KVwiXHJcbiAgICAoc2Nyb2xsKT1cIm9uQm9keVNjcm9sbCgkZXZlbnQpXCJcclxuICAgICh0cmVlQWN0aW9uKT1cIm9uVHJlZUFjdGlvbigkZXZlbnQpXCJcclxuICA+XHJcbiAgPC9kYXRhdGFibGUtYm9keT5cclxuICA8ZGF0YXRhYmxlLWZvb3RlclxyXG4gICAgKm5nSWY9XCJmb290ZXJIZWlnaHRcIlxyXG4gICAgW3Jvd0NvdW50XT1cInJvd0NvdW50XCJcclxuICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXHJcbiAgICBbb2Zmc2V0XT1cIm9mZnNldFwiXHJcbiAgICBbZm9vdGVySGVpZ2h0XT1cImZvb3RlckhlaWdodFwiXHJcbiAgICBbZm9vdGVyVGVtcGxhdGVdPVwiZm9vdGVyXCJcclxuICAgIFt0b3RhbE1lc3NhZ2VdPVwibWVzc2FnZXMudG90YWxNZXNzYWdlXCJcclxuICAgIFtwYWdlckxlZnRBcnJvd0ljb25dPVwiY3NzQ2xhc3Nlcy5wYWdlckxlZnRBcnJvd1wiXHJcbiAgICBbcGFnZXJSaWdodEFycm93SWNvbl09XCJjc3NDbGFzc2VzLnBhZ2VyUmlnaHRBcnJvd1wiXHJcbiAgICBbcGFnZXJQcmV2aW91c0ljb25dPVwiY3NzQ2xhc3Nlcy5wYWdlclByZXZpb3VzXCJcclxuICAgIFtzZWxlY3RlZENvdW50XT1cInNlbGVjdGVkLmxlbmd0aFwiXHJcbiAgICBbc2VsZWN0ZWRNZXNzYWdlXT1cIiEhc2VsZWN0aW9uVHlwZSAmJiBtZXNzYWdlcy5zZWxlY3RlZE1lc3NhZ2VcIlxyXG4gICAgW3BhZ2VyTmV4dEljb25dPVwiY3NzQ2xhc3Nlcy5wYWdlck5leHRcIlxyXG4gICAgKHBhZ2UpPVwib25Gb290ZXJQYWdlKCRldmVudClcIlxyXG4gID5cclxuICA8L2RhdGF0YWJsZS1mb290ZXI+XHJcbjwvZGl2PlxyXG4iXX0=