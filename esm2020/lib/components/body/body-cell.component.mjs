import { Component, Input, HostBinding, ViewChild, Output, EventEmitter, HostListener, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DataTableBodyCellComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.activate = new EventEmitter();
        this.treeAction = new EventEmitter();
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.cellContext = {
            onCheckboxChangeFn: this.onCheckboxChangeFn,
            activateFn: this.activateFn,
            row: this.row,
            group: this.group,
            value: this.value,
            column: this.column,
            rowHeight: this.rowHeight,
            isSelected: this.isSelected,
            rowIndex: this.rowIndex,
            treeStatus: this.treeStatus,
            onTreeAction: this.onTreeAction.bind(this)
        };
        this._element = element.nativeElement;
    }
    set group(group) {
        this._group = group;
        this.cellContext.group = group;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get group() {
        return this._group;
    }
    set rowHeight(val) {
        this._rowHeight = val;
        this.cellContext.rowHeight = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get rowHeight() {
        return this._rowHeight;
    }
    set isSelected(val) {
        this._isSelected = val;
        this.cellContext.isSelected = val;
        this.cd.markForCheck();
    }
    get isSelected() {
        return this._isSelected;
    }
    set expanded(val) {
        this._expanded = val;
        this.cellContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.cellContext.rowIndex = val;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get column() {
        return this._column;
    }
    set row(row) {
        this._row = row;
        this.cellContext.row = row;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get row() {
        return this._row;
    }
    set sorts(val) {
        this._sorts = val;
        this.calcSortDir = this.calcSortDir(val);
    }
    get sorts() {
        return this._sorts;
    }
    set treeStatus(status) {
        if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
            this._treeStatus = 'collapsed';
        }
        else {
            this._treeStatus = status;
        }
        this.cellContext.treeStatus = this._treeStatus;
        this.checkValueUpdates();
        this.cd.markForCheck();
    }
    get treeStatus() {
        return this._treeStatus;
    }
    get columnCssClasses() {
        let cls = 'datatable-body-cell';
        if (this.column.cellClass) {
            if (typeof this.column.cellClass === 'string') {
                cls += ' ' + this.column.cellClass;
            }
            else if (typeof this.column.cellClass === 'function') {
                const res = this.column.cellClass({
                    row: this.row,
                    group: this.group,
                    column: this.column,
                    value: this.value,
                    rowHeight: this.rowHeight
                });
                if (typeof res === 'string') {
                    cls += ' ' + res;
                }
                else if (typeof res === 'object') {
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true) {
                            cls += ` ${k}`;
                        }
                    }
                }
            }
        }
        if (!this.sortDir) {
            cls += ' sort-active';
        }
        if (this.isFocused) {
            cls += ' active';
        }
        if (this.sortDir === SortDirection.asc) {
            cls += ' sort-asc';
        }
        if (this.sortDir === SortDirection.desc) {
            cls += ' sort-desc';
        }
        return cls;
    }
    get width() {
        return this.column.width;
    }
    get minWidth() {
        return this.column.minWidth;
    }
    get maxWidth() {
        return this.column.maxWidth;
    }
    get height() {
        const height = this.rowHeight;
        if (isNaN(height)) {
            return height;
        }
        return height + 'px';
    }
    ngDoCheck() {
        this.checkValueUpdates();
    }
    ngOnDestroy() {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    }
    checkValueUpdates() {
        let value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            const val = this.column.$$valueGetter(this.row, this.column.prop);
            const userPipe = this.column.pipe;
            if (userPipe) {
                value = userPipe.transform(val);
            }
            else if (value !== undefined) {
                value = val;
            }
        }
        if (this.value !== value) {
            this.value = value;
            this.cellContext.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
            this.cd.markForCheck();
        }
    }
    onFocus() {
        this.isFocused = true;
    }
    onBlur() {
        this.isFocused = false;
    }
    onClick(event) {
        this.activate.emit({
            type: 'click',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    onDblClick(event) {
        this.activate.emit({
            type: 'dblclick',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        const isTargetCell = event.target === this._element;
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    }
    onCheckboxChange(event) {
        this.activate.emit({
            type: 'checkbox',
            event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element,
            treeStatus: 'collapsed'
        });
    }
    calcSortDir(sorts) {
        if (!sorts) {
            return;
        }
        const sort = sorts.find((s) => {
            return s.prop === this.column.prop;
        });
        if (sort) {
            return sort.dir;
        }
    }
    stripHtml(html) {
        if (!html.replace) {
            return html;
        }
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    }
    onTreeAction() {
        this.treeAction.emit(this.row);
    }
    calcLeftMargin(column, row) {
        const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    }
}
DataTableBodyCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableBodyCellComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DataTableBodyCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTableBodyCellComponent, selector: "datatable-body-cell", inputs: { displayCheck: "displayCheck", group: "group", rowHeight: "rowHeight", isSelected: "isSelected", expanded: "expanded", rowIndex: "rowIndex", column: "column", row: "row", sorts: "sorts", treeStatus: "treeStatus" }, outputs: { activate: "activate", treeAction: "treeAction" }, host: { listeners: { "focus": "onFocus()", "blur": "onBlur()", "click": "onClick($event)", "dblclick": "onDblClick($event)", "keydown": "onKeyDown($event)" }, properties: { "class": "this.columnCssClasses", "style.width.px": "this.width", "style.minWidth.px": "this.minWidth", "style.maxWidth.px": "this.maxWidth", "style.height": "this.height" } }, viewQueries: [{ propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      <label
        *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
        class="datatable-checkbox"
      >
        <input type="checkbox" [checked]="isSelected" (click)="onCheckboxChange($event)" />
      </label>
      <ng-container *ngIf="column.isTreeColumn">
        <button
          *ngIf="!column.treeToggleTemplate"
          class="datatable-tree-button"
          [disabled]="treeStatus === 'disabled'"
          (click)="onTreeAction()"
        >
          <span>
            <i *ngIf="treeStatus === 'loading'" class="icon datatable-icon-collapse"></i>
            <i *ngIf="treeStatus === 'collapsed'" class="icon datatable-icon-up"></i>
            <i *ngIf="treeStatus === 'expanded' || treeStatus === 'disabled'" class="icon datatable-icon-down"></i>
          </span>
        </button>
        <ng-template
          *ngIf="column.treeToggleTemplate"
          [ngTemplateOutlet]="column.treeToggleTemplate"
          [ngTemplateOutletContext]="{ cellContext: cellContext }"
        >
        </ng-template>
      </ng-container>

      <span *ngIf="!column.cellTemplate" [title]="sanitizedValue" [innerHTML]="value"> </span>
      <ng-template
        #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableBodyCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-body-cell',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      <label
        *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
        class="datatable-checkbox"
      >
        <input type="checkbox" [checked]="isSelected" (click)="onCheckboxChange($event)" />
      </label>
      <ng-container *ngIf="column.isTreeColumn">
        <button
          *ngIf="!column.treeToggleTemplate"
          class="datatable-tree-button"
          [disabled]="treeStatus === 'disabled'"
          (click)="onTreeAction()"
        >
          <span>
            <i *ngIf="treeStatus === 'loading'" class="icon datatable-icon-collapse"></i>
            <i *ngIf="treeStatus === 'collapsed'" class="icon datatable-icon-up"></i>
            <i *ngIf="treeStatus === 'expanded' || treeStatus === 'disabled'" class="icon datatable-icon-down"></i>
          </span>
        </button>
        <ng-template
          *ngIf="column.treeToggleTemplate"
          [ngTemplateOutlet]="column.treeToggleTemplate"
          [ngTemplateOutletContext]="{ cellContext: cellContext }"
        >
        </ng-template>
      </ng-container>

      <span *ngIf="!column.cellTemplate" [title]="sanitizedValue" [innerHTML]="value"> </span>
      <ng-template
        #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { displayCheck: [{
                type: Input
            }], group: [{
                type: Input
            }], rowHeight: [{
                type: Input
            }], isSelected: [{
                type: Input
            }], expanded: [{
                type: Input
            }], rowIndex: [{
                type: Input
            }], column: [{
                type: Input
            }], row: [{
                type: Input
            }], sorts: [{
                type: Input
            }], treeStatus: [{
                type: Input
            }], activate: [{
                type: Output
            }], treeAction: [{
                type: Output
            }], cellTemplate: [{
                type: ViewChild,
                args: ['cellTemplate', { read: ViewContainerRef, static: true }]
            }], columnCssClasses: [{
                type: HostBinding,
                args: ['class']
            }], width: [{
                type: HostBinding,
                args: ['style.width.px']
            }], minWidth: [{
                type: HostBinding,
                args: ['style.minWidth.px']
            }], maxWidth: [{
                type: HostBinding,
                args: ['style.maxWidth.px']
            }], height: [{
                type: HostBinding,
                args: ['style.height']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onDblClick: [{
                type: HostListener,
                args: ['dblclick', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2JvZHkvYm9keS1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUVULE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUVaLGdCQUFnQixFQUdoQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBK0N4QyxNQUFNLE9BQU8sMEJBQTBCO0lBb01yQyxZQUFZLE9BQW1CLEVBQVUsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE5RnBELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUEyRTdELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWdCbEQsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIs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QVE7c0JBRFgsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxjQUFjO2dCQWtGM0IsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU87Z0JBTXJCLE1BQU07c0JBREwsWUFBWTt1QkFBQyxNQUFNO2dCQU1wQixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWVqQyxVQUFVO3NCQURULFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWVwQyxTQUFTO3NCQURSLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgUGlwZVRyYW5zZm9ybSxcclxuICBIb3N0QmluZGluZyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBEb0NoZWNrLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQtZGlyZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XHJcblxyXG5leHBvcnQgdHlwZSBUcmVlU3RhdHVzID0gJ2NvbGxhcHNlZCcgfCAnZXhwYW5kZWQnIHwgJ2xvYWRpbmcnIHwgJ2Rpc2FibGVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHktY2VsbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCIgW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XT1cImNhbGNMZWZ0TWFyZ2luKGNvbHVtbiwgcm93KVwiPlxyXG4gICAgICA8bGFiZWxcclxuICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcclxuICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiXHJcbiAgICAgID5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiAvPlxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmlzVHJlZUNvbHVtblwiPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgICpuZ0lmPVwiIWNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtdHJlZS1idXR0b25cIlxyXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uVHJlZUFjdGlvbigpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnbG9hZGluZydcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tY29sbGFwc2VcIj48L2k+XHJcbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2NvbGxhcHNlZCdcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tdXBcIj48L2k+XHJcbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmNlbGxUZW1wbGF0ZVwiIFt0aXRsZV09XCJzYW5pdGl6ZWRWYWx1ZVwiIFtpbm5lckhUTUxdPVwidmFsdWVcIj4gPC9zcGFuPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAjY2VsbFRlbXBsYXRlXHJcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiAocm93OiBhbnksIGNvbHVtbj86IFRhYmxlQ29sdW1uLCB2YWx1ZT86IGFueSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgc2V0IGdyb3VwKGdyb3VwOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0Lmdyb3VwID0gZ3JvdXA7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGdyb3VwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHJvd0hlaWdodCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcm93SGVpZ2h0ID0gdmFsO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3dIZWlnaHQgPSB2YWw7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvd0hlaWdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaXNTZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmlzU2VsZWN0ZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNTZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBleHBhbmRlZCh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5leHBhbmRlZCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93SW5kZXgodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3Jvd0luZGV4ID0gdmFsO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3dJbmRleCA9IHZhbDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dJbmRleDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xyXG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHJvdyhyb3c6IGFueSkge1xyXG4gICAgdGhpcy5fcm93ID0gcm93O1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5yb3cgPSByb3c7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvdygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JvdztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9zb3J0cyA9IHZhbDtcclxuICAgIHRoaXMuY2FsY1NvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XHJcbiAgfVxyXG5cclxuICBnZXQgc29ydHMoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHRyZWVTdGF0dXMoc3RhdHVzOiBUcmVlU3RhdHVzKSB7XHJcbiAgICBpZiAoc3RhdHVzICE9PSAnY29sbGFwc2VkJyAmJiBzdGF0dXMgIT09ICdleHBhbmRlZCcgJiYgc3RhdHVzICE9PSAnbG9hZGluZycgJiYgc3RhdHVzICE9PSAnZGlzYWJsZWQnKSB7XHJcbiAgICAgIHRoaXMuX3RyZWVTdGF0dXMgPSAnY29sbGFwc2VkJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3RyZWVTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnRyZWVTdGF0dXMgPSB0aGlzLl90cmVlU3RhdHVzO1xyXG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCB0cmVlU3RhdHVzKCk6IFRyZWVTdGF0dXMge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RyZWVTdGF0dXM7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2NlbGxUZW1wbGF0ZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgY2VsbFRlbXBsYXRlOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuICBnZXQgY29sdW1uQ3NzQ2xhc3NlcygpOiBhbnkge1xyXG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1jZWxsJztcclxuICAgIGlmICh0aGlzLmNvbHVtbi5jZWxsQ2xhc3MpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmNlbGxDbGFzcztcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uY2VsbENsYXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uY2VsbENsYXNzKHtcclxuICAgICAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBjbHMgKz0gJyAnICsgcmVzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIGNscyArPSBgICR7a31gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc29ydERpcikge1xyXG4gICAgICBjbHMgKz0gJyBzb3J0LWFjdGl2ZSc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcclxuICAgICAgY2xzICs9ICcgYWN0aXZlJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtYXNjJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xyXG4gICAgICBjbHMgKz0gJyBzb3J0LWRlc2MnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcclxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxyXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXHJcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWF4V2lkdGg7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXHJcbiAgZ2V0IGhlaWdodCgpOiBzdHJpbmcgfCBudW1iZXIge1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5yb3dIZWlnaHQ7XHJcbiAgICBpZiAoaXNOYU4oaGVpZ2h0KSkge1xyXG4gICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhlaWdodCArICdweCc7XHJcbiAgfVxyXG5cclxuICBzYW5pdGl6ZWRWYWx1ZTogYW55O1xyXG4gIHZhbHVlOiBhbnk7XHJcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcclxuICBpc0ZvY3VzZWQgPSBmYWxzZTtcclxuICBvbkNoZWNrYm94Q2hhbmdlRm4gPSB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UuYmluZCh0aGlzKTtcclxuICBhY3RpdmF0ZUZuID0gdGhpcy5hY3RpdmF0ZS5lbWl0LmJpbmQodGhpcy5hY3RpdmF0ZSk7XHJcblxyXG4gIGNlbGxDb250ZXh0OiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2lzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XHJcbiAgcHJpdmF0ZSBfcm93OiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JvdXA6IGFueTtcclxuICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlcjtcclxuICBwcml2YXRlIF9yb3dJbmRleDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX2VsZW1lbnQ6IGFueTtcclxuICBwcml2YXRlIF90cmVlU3RhdHVzOiBUcmVlU3RhdHVzO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dCA9IHtcclxuICAgICAgb25DaGVja2JveENoYW5nZUZuOiB0aGlzLm9uQ2hlY2tib3hDaGFuZ2VGbixcclxuICAgICAgYWN0aXZhdGVGbjogdGhpcy5hY3RpdmF0ZUZuLFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgIGlzU2VsZWN0ZWQ6IHRoaXMuaXNTZWxlY3RlZCxcclxuICAgICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXgsXHJcbiAgICAgIHRyZWVTdGF0dXM6IHRoaXMudHJlZVN0YXR1cyxcclxuICAgICAgb25UcmVlQWN0aW9uOiB0aGlzLm9uVHJlZUFjdGlvbi5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNlbGxUZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLmNlbGxUZW1wbGF0ZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWx1ZVVwZGF0ZXMoKTogdm9pZCB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuXHJcbiAgICBpZiAoIXRoaXMucm93IHx8ICF0aGlzLmNvbHVtbikge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5jb2x1bW4uJCR2YWx1ZUdldHRlcih0aGlzLnJvdywgdGhpcy5jb2x1bW4ucHJvcCk7XHJcbiAgICAgIGNvbnN0IHVzZXJQaXBlOiBQaXBlVHJhbnNmb3JtID0gdGhpcy5jb2x1bW4ucGlwZTtcclxuXHJcbiAgICAgIGlmICh1c2VyUGlwZSkge1xyXG4gICAgICAgIHZhbHVlID0gdXNlclBpcGUudHJhbnNmb3JtKHZhbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5jZWxsQ29udGV4dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnNhbml0aXplZFZhbHVlID0gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RyaXBIdG1sKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gIG9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdjbGljaycsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkRibENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnZGJsY2xpY2snLFxyXG4gICAgICBldmVudCxcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgY29uc3QgaXNUYXJnZXRDZWxsID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGlzQWN0aW9uID1cclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yZXR1cm4gfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMudXAgfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5sZWZ0IHx8XHJcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XHJcblxyXG4gICAgaWYgKGlzQWN0aW9uICYmIGlzVGFyZ2V0Q2VsbCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgICAgdHlwZTogJ2tleWRvd24nLFxyXG4gICAgICAgIGV2ZW50LFxyXG4gICAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGVja2JveENoYW5nZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICBldmVudCxcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXHJcbiAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICBjZWxsRWxlbWVudDogdGhpcy5fZWxlbWVudCxcclxuICAgICAgdHJlZVN0YXR1czogJ2NvbGxhcHNlZCdcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NvcnREaXIoc29ydHM6IGFueVtdKTogYW55IHtcclxuICAgIGlmICghc29ydHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnQgPSBzb3J0cy5maW5kKChzOiBhbnkpID0+IHtcclxuICAgICAgcmV0dXJuIHMucHJvcCA9PT0gdGhpcy5jb2x1bW4ucHJvcDtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzb3J0KSB7XHJcbiAgICAgIHJldHVybiBzb3J0LmRpcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0cmlwSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFodG1sLnJlcGxhY2UpIHtcclxuICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xyXG4gIH1cclxuXHJcbiAgb25UcmVlQWN0aW9uKCkge1xyXG4gICAgdGhpcy50cmVlQWN0aW9uLmVtaXQodGhpcy5yb3cpO1xyXG4gIH1cclxuXHJcbiAgY2FsY0xlZnRNYXJnaW4oY29sdW1uOiBhbnksIHJvdzogYW55KSB7XHJcbiAgICBjb25zdCBsZXZlbEluZGVudCA9IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgIT0gbnVsbCA/IGNvbHVtbi50cmVlTGV2ZWxJbmRlbnQgOiA1MDtcclxuICAgIHJldHVybiBjb2x1bW4uaXNUcmVlQ29sdW1uID8gcm93LmxldmVsICogbGV2ZWxJbmRlbnQgOiAwO1xyXG4gIH1cclxufVxyXG4iXX0=