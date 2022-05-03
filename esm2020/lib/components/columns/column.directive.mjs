import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../services/column-changes.service";
export class DataTableColumnDirective {
    constructor(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    get cellTemplate() {
        return this._cellTemplateInput || this._cellTemplateQuery;
    }
    get headerTemplate() {
        return this._headerTemplateInput || this._headerTemplateQuery;
    }
    get treeToggleTemplate() {
        return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
    }
    ngOnChanges() {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    }
}
DataTableColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableColumnDirective, deps: [{ token: i1.ColumnChangesService }], target: i0.ɵɵFactoryTarget.Directive });
DataTableColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: DataTableColumnDirective, selector: "ngx-datatable-column", inputs: { name: "name", prop: "prop", frozenLeft: "frozenLeft", frozenRight: "frozenRight", flexGrow: "flexGrow", resizeable: "resizeable", comparator: "comparator", pipe: "pipe", sortable: "sortable", draggable: "draggable", canAutoResize: "canAutoResize", minWidth: "minWidth", width: "width", maxWidth: "maxWidth", checkboxable: "checkboxable", headerCheckboxable: "headerCheckboxable", headerClass: "headerClass", cellClass: "cellClass", isTreeColumn: "isTreeColumn", treeLevelIndent: "treeLevelIndent", summaryFunc: "summaryFunc", summaryTemplate: "summaryTemplate", _cellTemplateInput: ["cellTemplate", "_cellTemplateInput"], _headerTemplateInput: ["headerTemplate", "_headerTemplateInput"], _treeToggleTemplateInput: ["treeToggleTemplate", "_treeToggleTemplateInput"] }, queries: [{ propertyName: "_cellTemplateQuery", first: true, predicate: DataTableColumnCellDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "_headerTemplateQuery", first: true, predicate: DataTableColumnHeaderDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "_treeToggleTemplateQuery", first: true, predicate: DataTableColumnCellTreeToggle, descendants: true, read: TemplateRef, static: true }], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableColumnDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ngx-datatable-column' }]
        }], ctorParameters: function () { return [{ type: i1.ColumnChangesService }]; }, propDecorators: { name: [{
                type: Input
            }], prop: [{
                type: Input
            }], frozenLeft: [{
                type: Input
            }], frozenRight: [{
                type: Input
            }], flexGrow: [{
                type: Input
            }], resizeable: [{
                type: Input
            }], comparator: [{
                type: Input
            }], pipe: [{
                type: Input
            }], sortable: [{
                type: Input
            }], draggable: [{
                type: Input
            }], canAutoResize: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], width: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], checkboxable: [{
                type: Input
            }], headerCheckboxable: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], cellClass: [{
                type: Input
            }], isTreeColumn: [{
                type: Input
            }], treeLevelIndent: [{
                type: Input
            }], summaryFunc: [{
                type: Input
            }], summaryTemplate: [{
                type: Input
            }], _cellTemplateInput: [{
                type: Input,
                args: ['cellTemplate']
            }], _cellTemplateQuery: [{
                type: ContentChild,
                args: [DataTableColumnCellDirective, { read: TemplateRef, static: true }]
            }], _headerTemplateInput: [{
                type: Input,
                args: ['headerTemplate']
            }], _headerTemplateQuery: [{
                type: ContentChild,
                args: [DataTableColumnHeaderDirective, { read: TemplateRef, static: true }]
            }], _treeToggleTemplateInput: [{
                type: Input,
                args: ['treeToggleTemplate']
            }], _treeToggleTemplateQuery: [{
                type: ContentChild,
                args: [DataTableColumnCellTreeToggle, { read: TemplateRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBS2pFLE1BQU0sT0FBTyx3QkFBd0I7SUF3RG5DLFlBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRnRELGtCQUFhLEdBQUcsSUFBSSxDQUFDO0lBRW9DLENBQUM7SUExQmxFLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUM1RCxDQUFDO0lBUUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNoRSxDQUFDO0lBUUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDO0lBQ3hFLENBQUM7SUFNRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOztxSEFoRVUsd0JBQXdCO3lHQUF4Qix3QkFBd0IsczNCQTJCckIsNEJBQTRCLDJCQUFVLFdBQVcsa0ZBVWpELDhCQUE4QiwyQkFBVSxXQUFXLHNGQVVuRCw2QkFBNkIsMkJBQVUsV0FBVzsyRkEvQ3JELHdCQUF3QjtrQkFEcEMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTsyR0FFcEMsSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR04sa0JBQWtCO3NCQURqQixLQUFLO3VCQUFDLGNBQWM7Z0JBSXJCLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQyw0QkFBNEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFRL0Usb0JBQW9CO3NCQURuQixLQUFLO3VCQUFDLGdCQUFnQjtnQkFJdkIsb0JBQW9CO3NCQURuQixZQUFZO3VCQUFDLDhCQUE4QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQVFqRix3QkFBd0I7c0JBRHZCLEtBQUs7dUJBQUMsb0JBQW9CO2dCQUkzQix3QkFBd0I7c0JBRHZCLFlBQVk7dUJBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4taGVhZGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1jZWxsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlIH0gZnJvbSAnLi90cmVlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sdW1uLWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uUHJvcCB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUtY29sdW1uJyB9KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHJvcDogVGFibGVDb2x1bW5Qcm9wO1xyXG4gIEBJbnB1dCgpIGZyb3plbkxlZnQ6IGFueTtcclxuICBASW5wdXQoKSBmcm96ZW5SaWdodDogYW55O1xyXG4gIEBJbnB1dCgpIGZsZXhHcm93OiBudW1iZXI7XHJcbiAgQElucHV0KCkgcmVzaXplYWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBjb21wYXJhdG9yOiBhbnk7XHJcbiAgQElucHV0KCkgcGlwZTogYW55O1xyXG4gIEBJbnB1dCgpIHNvcnRhYmxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBjYW5BdXRvUmVzaXplOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1pbldpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGNoZWNrYm94YWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoZWFkZXJDaGVja2JveGFibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGVhZGVyQ2xhc3M6IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xyXG4gIEBJbnB1dCgpIGNlbGxDbGFzczogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XHJcbiAgQElucHV0KCkgaXNUcmVlQ29sdW1uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHRyZWVMZXZlbEluZGVudDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlGdW5jOiAoY2VsbHM6IGFueVtdKSA9PiBhbnk7XHJcbiAgQElucHV0KCkgc3VtbWFyeVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoJ2NlbGxUZW1wbGF0ZScpXHJcbiAgX2NlbGxUZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxyXG4gIF9jZWxsVGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IGNlbGxUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLl9jZWxsVGVtcGxhdGVJbnB1dCB8fCB0aGlzLl9jZWxsVGVtcGxhdGVRdWVyeTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgnaGVhZGVyVGVtcGxhdGUnKVxyXG4gIF9oZWFkZXJUZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgX2hlYWRlclRlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCBoZWFkZXJUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLl9oZWFkZXJUZW1wbGF0ZUlucHV0IHx8IHRoaXMuX2hlYWRlclRlbXBsYXRlUXVlcnk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ3RyZWVUb2dnbGVUZW1wbGF0ZScpXHJcbiAgX3RyZWVUb2dnbGVUZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBfdHJlZVRvZ2dsZVRlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCB0cmVlVG9nZ2xlVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHJlZVRvZ2dsZVRlbXBsYXRlSW5wdXQgfHwgdGhpcy5fdHJlZVRvZ2dsZVRlbXBsYXRlUXVlcnk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzRmlyc3RDaGFuZ2UgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbkNoYW5nZXNTZXJ2aWNlOiBDb2x1bW5DaGFuZ2VzU2VydmljZSkge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICBpZiAodGhpcy5pc0ZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuaXNGaXJzdENoYW5nZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb2x1bW5DaGFuZ2VzU2VydmljZS5vbklucHV0Q2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==