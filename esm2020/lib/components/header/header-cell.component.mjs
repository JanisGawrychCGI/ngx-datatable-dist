import { Component, Input, EventEmitter, Output, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { SelectionType } from '../../types/selection.type';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DataTableHeaderCellComponent {
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    set allRowsSelected(value) {
        this._allRowsSelected = value;
        this.cellContext.allRowsSelected = value;
    }
    get allRowsSelected() {
        return this._allRowsSelected;
    }
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.cd.markForCheck();
    }
    get column() {
        return this._column;
    }
    set sorts(val) {
        this._sorts = val;
        this.sortDir = this.calcSortDir(val);
        this.cellContext.sortDir = this.sortDir;
        this.sortClass = this.calcSortClass(this.sortDir);
        this.cd.markForCheck();
    }
    get sorts() {
        return this._sorts;
    }
    get columnCssClasses() {
        let cls = 'datatable-header-cell';
        if (this.column.sortable)
            cls += ' sortable';
        if (this.column.resizeable)
            cls += ' resizeable';
        if (this.column.headerClass) {
            if (typeof this.column.headerClass === 'string') {
                cls += ' ' + this.column.headerClass;
            }
            else if (typeof this.column.headerClass === 'function') {
                const res = this.column.headerClass({
                    column: this.column
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true)
                            cls += ` ${k}`;
                    }
                }
            }
        }
        const sortDir = this.sortDir;
        if (sortDir) {
            cls += ` sort-active sort-${sortDir}`;
        }
        return cls;
    }
    get name() {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
    }
    get minWidth() {
        return this.column.minWidth;
    }
    get maxWidth() {
        return this.column.maxWidth;
    }
    get width() {
        return this.column.width;
    }
    get isCheckboxable() {
        return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === SelectionType.checkbox;
    }
    onContextmenu($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    }
    ngOnInit() {
        this.sortClass = this.calcSortClass(this.sortDir);
    }
    calcSortDir(sorts) {
        if (sorts && this.column) {
            const sort = sorts.find((s) => {
                return s.prop === this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    }
    onSort() {
        if (!this.column.sortable)
            return;
        const newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue
        });
    }
    calcSortClass(sortDir) {
        if (!this.cellContext.column.sortable)
            return;
        if (sortDir === SortDirection.asc) {
            return `sort-btn sort-asc ${this.sortAscendingIcon}`;
        }
        else if (sortDir === SortDirection.desc) {
            return `sort-btn sort-desc ${this.sortDescendingIcon}`;
        }
        else {
            return `sort-btn ${this.sortUnsetIcon}`;
        }
    }
}
DataTableHeaderCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableHeaderCellComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DataTableHeaderCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTableHeaderCellComponent, selector: "datatable-header-cell", inputs: { sortType: "sortType", sortAscendingIcon: "sortAscendingIcon", sortDescendingIcon: "sortDescendingIcon", sortUnsetIcon: "sortUnsetIcon", isTarget: "isTarget", targetMarkerTemplate: "targetMarkerTemplate", targetMarkerContext: "targetMarkerContext", allRowsSelected: "allRowsSelected", selectionType: "selectionType", column: "column", headerHeight: "headerHeight", sorts: "sorts" }, outputs: { sort: "sort", select: "select", columnContextmenu: "columnContextmenu" }, host: { listeners: { "contextmenu": "onContextmenu($event)" }, properties: { "style.height.px": "this.headerHeight", "class": "this.columnCssClasses", "attr.title": "this.name", "style.minWidth.px": "this.minWidth", "style.maxWidth.px": "this.maxWidth", "style.width.px": "this.width" }, classAttribute: "datatable-header-cell" }, ngImport: i0, template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableHeaderCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-header-cell',
                    template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
                    host: {
                        class: 'datatable-header-cell'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { sortType: [{
                type: Input
            }], sortAscendingIcon: [{
                type: Input
            }], sortDescendingIcon: [{
                type: Input
            }], sortUnsetIcon: [{
                type: Input
            }], isTarget: [{
                type: Input
            }], targetMarkerTemplate: [{
                type: Input
            }], targetMarkerContext: [{
                type: Input
            }], allRowsSelected: [{
                type: Input
            }], selectionType: [{
                type: Input
            }], column: [{
                type: Input
            }], headerHeight: [{
                type: HostBinding,
                args: ['style.height.px']
            }, {
                type: Input
            }], sorts: [{
                type: Input
            }], sort: [{
                type: Output
            }], select: [{
                type: Output
            }], columnContextmenu: [{
                type: Output
            }], columnCssClasses: [{
                type: HostBinding,
                args: ['class']
            }], name: [{
                type: HostBinding,
                args: ['attr.title']
            }], minWidth: [{
                type: HostBinding,
                args: ['style.minWidth.px']
            }], maxWidth: [{
                type: HostBinding,
                args: ['style.maxWidth.px']
            }], width: [{
                type: HostBinding,
                args: ['style.width.px']
            }], onContextmenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFnQ2hFLE1BQU0sT0FBTyw0QkFBNEI7SUF3SHZDLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBeEUvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFxQyxLQUFLLENBQUMsQ0FBQztRQTREMUYsV0FBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBUTVDLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIs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O2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBSU8sZUFBZTtzQkFBM0IsS0FBSztnQkFRRyxhQUFhO3NCQUFyQixLQUFLO2dCQUVPLE1BQU07c0JBQWxCLEtBQUs7Z0JBWU4sWUFBWTtzQkFGWCxXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQzdCLEtBQUs7Z0JBR08sS0FBSztzQkFBakIsS0FBSztnQkFZSSxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFHSCxnQkFBZ0I7c0JBRG5CLFdBQVc7dUJBQUMsT0FBTztnQkFrQ2hCLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxZQUFZO2dCQU9yQixRQUFRO3NCQURYLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixRQUFRO3NCQURYLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQThCN0IsYUFBYTtzQkFEWixZQUFZO3VCQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC50eXBlJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcclxuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcbmltcG9ydCB7IG5leHRTb3J0RGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvc29ydCc7XHJcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC10ZW1wbGF0ZS13cmFwXCI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICpuZ0lmPVwiaXNUYXJnZXRcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhcmdldE1hcmtlclRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwidGFyZ2V0TWFya2VyQ29udGV4dFwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPGxhYmVsICpuZ0lmPVwiaXNDaGVja2JveGFibGVcIiBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJhbGxSb3dzU2VsZWN0ZWRcIiAoY2hhbmdlKT1cInNlbGVjdC5lbWl0KCFhbGxSb3dzU2VsZWN0ZWQpXCIgLz5cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmhlYWRlclRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtd3JhcHBlclwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLWxhYmVsIGRyYWdnYWJsZVwiIChjbGljayk9XCJvblNvcnQoKVwiIFtpbm5lckhUTUxdPVwibmFtZVwiPiA8L3NwYW4+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8c3BhbiAoY2xpY2spPVwib25Tb3J0KClcIiBbY2xhc3NdPVwic29ydENsYXNzXCI+IDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyLWNlbGwnXHJcbiAgfSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xyXG4gIEBJbnB1dCgpIHNvcnRBc2NlbmRpbmdJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc29ydERlc2NlbmRpbmdJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc29ydFVuc2V0SWNvbjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBpc1RhcmdldDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xyXG4gIEBJbnB1dCgpIHRhcmdldE1hcmtlckNvbnRleHQ6IGFueTtcclxuXHJcbiAgX2FsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgc2V0IGFsbFJvd3NTZWxlY3RlZCh2YWx1ZSkge1xyXG4gICAgdGhpcy5fYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmFsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FsbFJvd3NTZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xyXG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQucHgnKVxyXG4gIEBJbnB1dCgpXHJcbiAgaGVhZGVySGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9zb3J0cyA9IHZhbDtcclxuICAgIHRoaXMuc29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuc29ydERpciA9IHRoaXMuc29ydERpcjtcclxuICAgIHRoaXMuc29ydENsYXNzID0gdGhpcy5jYWxjU29ydENsYXNzKHRoaXMuc29ydERpcik7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNvcnRzKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3J0cztcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgY29sdW1uQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IGNvbHVtbjogYW55IH0+KGZhbHNlKTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgZ2V0IGNvbHVtbkNzc0NsYXNzZXMoKTogYW55IHtcclxuICAgIGxldCBjbHMgPSAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJztcclxuXHJcbiAgICBpZiAodGhpcy5jb2x1bW4uc29ydGFibGUpIGNscyArPSAnIHNvcnRhYmxlJztcclxuICAgIGlmICh0aGlzLmNvbHVtbi5yZXNpemVhYmxlKSBjbHMgKz0gJyByZXNpemVhYmxlJztcclxuICAgIGlmICh0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGNscyArPSAnICcgKyB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcztcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyh7XHJcbiAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgY2xzICs9IHJlcztcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcclxuICAgICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIGNscyArPSBgICR7a31gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnREaXIgPSB0aGlzLnNvcnREaXI7XHJcbiAgICBpZiAoc29ydERpcikge1xyXG4gICAgICBjbHMgKz0gYCBzb3J0LWFjdGl2ZSBzb3J0LSR7c29ydERpcn1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGl0bGUnKVxyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAvLyBndWFyYW50ZWVkIHRvIGhhdmUgYSB2YWx1ZSBieSBzZXRDb2x1bW5EZWZhdWx0cygpIGluIGNvbHVtbi1oZWxwZXIudHNcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5oZWFkZXJUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5jb2x1bW4ubmFtZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxyXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXHJcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWF4V2lkdGg7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcclxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcclxuICB9XHJcblxyXG4gIGdldCBpc0NoZWNrYm94YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5jaGVja2JveGFibGUgJiYgdGhpcy5jb2x1bW4uaGVhZGVyQ2hlY2tib3hhYmxlICYmIHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcclxuICB9XHJcblxyXG4gIHNvcnRGbiA9IHRoaXMub25Tb3J0LmJpbmQodGhpcyk7XHJcbiAgc29ydENsYXNzOiBzdHJpbmc7XHJcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcclxuICBzZWxlY3RGbiA9IHRoaXMuc2VsZWN0LmVtaXQuYmluZCh0aGlzLnNlbGVjdCk7XHJcblxyXG4gIGNlbGxDb250ZXh0OiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XHJcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dCA9IHtcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgc29ydERpcjogdGhpcy5zb3J0RGlyLFxyXG4gICAgICBzb3J0Rm46IHRoaXMuc29ydEZuLFxyXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQ6IHRoaXMuYWxsUm93c1NlbGVjdGVkLFxyXG4gICAgICBzZWxlY3RGbjogdGhpcy5zZWxlY3RGblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBvbkNvbnRleHRtZW51KCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2x1bW5Db250ZXh0bWVudS5lbWl0KHsgZXZlbnQ6ICRldmVudCwgY29sdW1uOiB0aGlzLmNvbHVtbiB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zb3J0Q2xhc3MgPSB0aGlzLmNhbGNTb3J0Q2xhc3ModGhpcy5zb3J0RGlyKTtcclxuICB9XHJcblxyXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XHJcbiAgICBpZiAoc29ydHMgJiYgdGhpcy5jb2x1bW4pIHtcclxuICAgICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU29ydCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb2x1bW4uc29ydGFibGUpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IG5leHRTb3J0RGlyKHRoaXMuc29ydFR5cGUsIHRoaXMuc29ydERpcik7XHJcbiAgICB0aGlzLnNvcnQuZW1pdCh7XHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHByZXZWYWx1ZTogdGhpcy5zb3J0RGlyLFxyXG4gICAgICBuZXdWYWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYWxjU29ydENsYXNzKHNvcnREaXI6IFNvcnREaXJlY3Rpb24pOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLmNlbGxDb250ZXh0LmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xyXG4gICAgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XHJcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1hc2MgJHt0aGlzLnNvcnRBc2NlbmRpbmdJY29ufWA7XHJcbiAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xyXG4gICAgICByZXR1cm4gYHNvcnQtYnRuIHNvcnQtZGVzYyAke3RoaXMuc29ydERlc2NlbmRpbmdJY29ufWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYHNvcnQtYnRuICR7dGhpcy5zb3J0VW5zZXRJY29ufWA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==