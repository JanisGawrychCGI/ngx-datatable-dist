import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DataTableRowWrapperComponent {
    constructor(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new EventEmitter(false);
        this._expanded = false;
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowDiffer = differs.find({}).create();
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.rowContext.rowIndex = val;
        this.groupContext.rowIndex = val;
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set expanded(val) {
        this._expanded = val;
        this.groupContext.expanded = val;
        this.rowContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    }
    onContextmenu($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    }
    getGroupHeaderStyle() {
        const styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    }
}
DataTableRowWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableRowWrapperComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Component });
DataTableRowWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTableRowWrapperComponent, selector: "datatable-row-wrapper", inputs: { innerWidth: "innerWidth", rowDetail: "rowDetail", groupHeader: "groupHeader", offsetX: "offsetX", detailRowHeight: "detailRowHeight", row: "row", groupedRows: "groupedRows", rowIndex: "rowIndex", expanded: "expanded" }, outputs: { rowContextmenu: "rowContextmenu" }, host: { listeners: { "contextmenu": "onContextmenu($event)" }, classAttribute: "datatable-row-wrapper" }, ngImport: i0, template: `
    <div *ngIf="groupHeader && groupHeader.template" class="datatable-group-header" [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="groupContext"
      >
      </ng-template>
    </div>
    <ng-content *ngIf="(groupHeader && groupHeader.template && expanded) || !groupHeader || !groupHeader.template">
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail"
    >
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext"
      >
      </ng-template>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableRowWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-row-wrapper',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div *ngIf="groupHeader && groupHeader.template" class="datatable-group-header" [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="groupContext"
      >
      </ng-template>
    </div>
    <ng-content *ngIf="(groupHeader && groupHeader.template && expanded) || !groupHeader || !groupHeader.template">
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail"
    >
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext"
      >
      </ng-template>
    </div>
  `,
                    host: {
                        class: 'datatable-row-wrapper'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.KeyValueDiffers }]; }, propDecorators: { innerWidth: [{
                type: Input
            }], rowDetail: [{
                type: Input
            }], groupHeader: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], detailRowHeight: [{
                type: Input
            }], row: [{
                type: Input
            }], groupedRows: [{
                type: Input
            }], rowContextmenu: [{
                type: Output
            }], rowIndex: [{
                type: Input
            }], expanded: [{
                type: Input
            }], onContextmenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3ctd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUVaLHVCQUF1QixFQUl4QixNQUFNLGVBQWUsQ0FBQzs7O0FBaUN2QixNQUFNLE9BQU8sNEJBQTRCO0lBdUN2QyxZQUFvQixFQUFxQixFQUFVLE9BQXdCO1FBQXZELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUEvQmpFLG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQWtDLEtBQUssQ0FBQyxDQUFDO1FBNEI1RSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBSWpDLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQTNDRCxJQUFhLFFBQVEsQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFhLFFBQVEsQ0FBQyxHQUFZO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUF5QkQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUdELGFBQWEsQ0FBQyxNQUFrQjtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdEUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O3lIQTVFVSw0QkFBNEI7NkdBQTVCLDRCQUE0Qiw0YkE1QjdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDsyRkFLVSw0QkFBNEI7a0JBL0J4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsdUJBQXVCO3FCQUMvQjtpQkFDRjtzSUFFVSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDSSxjQUFjO3NCQUF2QixNQUFNO2dCQUVNLFFBQVE7c0JBQXBCLEtBQUs7Z0JBV08sUUFBUTtzQkFBcEIsS0FBSztnQkEyQ04sYUFBYTtzQkFEWixZQUFZO3VCQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIERvQ2hlY2ssXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgS2V5VmFsdWVEaWZmZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgS2V5VmFsdWVEaWZmZXJzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1yb3ctd3JhcHBlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJncm91cEhlYWRlciAmJiBncm91cEhlYWRlci50ZW1wbGF0ZVwiIGNsYXNzPVwiZGF0YXRhYmxlLWdyb3VwLWhlYWRlclwiIFtuZ1N0eWxlXT1cImdldEdyb3VwSGVhZGVyU3R5bGUoKVwiPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAqbmdJZj1cImdyb3VwSGVhZGVyICYmIGdyb3VwSGVhZGVyLnRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJncm91cEhlYWRlci50ZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImdyb3VwQ29udGV4dFwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIoZ3JvdXBIZWFkZXIgJiYgZ3JvdXBIZWFkZXIudGVtcGxhdGUgJiYgZXhwYW5kZWQpIHx8ICFncm91cEhlYWRlciB8fCAhZ3JvdXBIZWFkZXIudGVtcGxhdGVcIj5cclxuICAgIDwvbmctY29udGVudD5cclxuICAgIDxkaXZcclxuICAgICAgKm5nSWY9XCJyb3dEZXRhaWwgJiYgcm93RGV0YWlsLnRlbXBsYXRlICYmIGV4cGFuZGVkXCJcclxuICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJkZXRhaWxSb3dIZWlnaHRcIlxyXG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1yb3ctZGV0YWlsXCJcclxuICAgID5cclxuICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgKm5nSWY9XCJyb3dEZXRhaWwgJiYgcm93RGV0YWlsLnRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJyb3dEZXRhaWwudGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJyb3dDb250ZXh0XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1yb3ctd3JhcHBlcidcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVSb3dXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XHJcbiAgQElucHV0KCkgaW5uZXJXaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJvd0RldGFpbDogYW55O1xyXG4gIEBJbnB1dCgpIGdyb3VwSGVhZGVyOiBhbnk7XHJcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRldGFpbFJvd0hlaWdodDogYW55O1xyXG4gIEBJbnB1dCgpIHJvdzogYW55O1xyXG4gIEBJbnB1dCgpIGdyb3VwZWRSb3dzOiBhbnk7XHJcbiAgQE91dHB1dCgpIHJvd0NvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyByb3c6IGFueSB9PihmYWxzZSk7XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dJbmRleCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcm93SW5kZXggPSB2YWw7XHJcbiAgICB0aGlzLnJvd0NvbnRleHQucm93SW5kZXggPSB2YWw7XHJcbiAgICB0aGlzLmdyb3VwQ29udGV4dC5yb3dJbmRleCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dJbmRleDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBleHBhbmRlZCh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsO1xyXG4gICAgdGhpcy5ncm91cENvbnRleHQuZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLnJvd0NvbnRleHQuZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xyXG4gIH1cclxuXHJcbiAgZ3JvdXBDb250ZXh0OiBhbnk7XHJcbiAgcm93Q29udGV4dDogYW55O1xyXG5cclxuICBwcml2YXRlIHJvd0RpZmZlcjogS2V5VmFsdWVEaWZmZXI8e30sIHt9PjtcclxuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3Jvd0luZGV4OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycykge1xyXG4gICAgdGhpcy5ncm91cENvbnRleHQgPSB7XHJcbiAgICAgIGdyb3VwOiB0aGlzLnJvdyxcclxuICAgICAgZXhwYW5kZWQ6IHRoaXMuZXhwYW5kZWQsXHJcbiAgICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucm93Q29udGV4dCA9IHtcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgZXhwYW5kZWQ6IHRoaXMuZXhwYW5kZWQsXHJcbiAgICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJvd0RpZmZlci5kaWZmKHRoaXMucm93KSkge1xyXG4gICAgICB0aGlzLnJvd0NvbnRleHQucm93ID0gdGhpcy5yb3c7XHJcbiAgICAgIHRoaXMuZ3JvdXBDb250ZXh0Lmdyb3VwID0gdGhpcy5yb3c7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgb25Db250ZXh0bWVudSgkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMucm93Q29udGV4dG1lbnUuZW1pdCh7IGV2ZW50OiAkZXZlbnQsIHJvdzogdGhpcy5yb3cgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRHcm91cEhlYWRlclN0eWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB7fTtcclxuXHJcbiAgICBzdHlsZXNbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyB0aGlzLm9mZnNldFggKyAncHgsIDBweCwgMHB4KSc7XHJcbiAgICBzdHlsZXNbJ2JhY2tmYWNlLXZpc2liaWxpdHknXSA9ICdoaWRkZW4nO1xyXG4gICAgc3R5bGVzWyd3aWR0aCddID0gdGhpcy5pbm5lcldpZHRoO1xyXG5cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==