import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./pager.component";
import * as i2 from "@angular/common";
export class DataTableFooterComponent {
    constructor() {
        this.selectedCount = 0;
        this.page = new EventEmitter();
    }
    get isVisible() {
        return this.rowCount / this.pageSize > 1;
    }
    get curPage() {
        return this.offset + 1;
    }
}
DataTableFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataTableFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTableFooterComponent, selector: "datatable-footer", inputs: { footerHeight: "footerHeight", rowCount: "rowCount", pageSize: "pageSize", offset: "offset", pagerLeftArrowIcon: "pagerLeftArrowIcon", pagerRightArrowIcon: "pagerRightArrowIcon", pagerPreviousIcon: "pagerPreviousIcon", pagerNextIcon: "pagerNextIcon", totalMessage: "totalMessage", footerTemplate: "footerTemplate", selectedCount: "selectedCount", selectedMessage: "selectedMessage" }, outputs: { page: "page" }, host: { classAttribute: "datatable-footer" }, ngImport: i0, template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      <ng-template
        *ngIf="footerTemplate"
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{
          rowCount: rowCount,
          pageSize: pageSize,
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }"
      >
      </ng-template>
      <div class="page-count" *ngIf="!footerTemplate">
        <span *ngIf="selectedMessage"> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
        {{ rowCount?.toLocaleString() }} {{ totalMessage }}
      </div>
      <datatable-pager
        *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)"
      >
      </datatable-pager>
    </div>
  `, isInline: true, components: [{ type: i1.DataTablePagerComponent, selector: "datatable-pager", inputs: ["pagerLeftArrowIcon", "pagerRightArrowIcon", "pagerPreviousIcon", "pagerNextIcon", "size", "count", "page"], outputs: ["change"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-footer',
                    template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      <ng-template
        *ngIf="footerTemplate"
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{
          rowCount: rowCount,
          pageSize: pageSize,
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }"
      >
      </ng-template>
      <div class="page-count" *ngIf="!footerTemplate">
        <span *ngIf="selectedMessage"> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
        {{ rowCount?.toLocaleString() }} {{ totalMessage }}
      </div>
      <datatable-pager
        *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)"
      >
      </datatable-pager>
    </div>
  `,
                    host: {
                        class: 'datatable-footer'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { footerHeight: [{
                type: Input
            }], rowCount: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], offset: [{
                type: Input
            }], pagerLeftArrowIcon: [{
                type: Input
            }], pagerRightArrowIcon: [{
                type: Input
            }], pagerPreviousIcon: [{
                type: Input
            }], pagerNextIcon: [{
                type: Input
            }], totalMessage: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], selectedCount: [{
                type: Input
            }], selectedMessage: [{
                type: Input
            }], page: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUE4Q2hHLE1BQU0sT0FBTyx3QkFBd0I7SUE1Q3JDO1FBd0RXLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBR3pCLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQVN4RDtJQVBDLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDOztxSEF2QlUsd0JBQXdCO3lHQUF4Qix3QkFBd0IsMmdCQTFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DVDsyRkFNVSx3QkFBd0I7a0JBNUNwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsa0JBQWtCO3FCQUMxQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFFSSxJQUFJO3NCQUFiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9mb290ZXIuZGlyZWN0aXZlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtZm9vdGVyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1mb290ZXItaW5uZXJcIlxyXG4gICAgICBbbmdDbGFzc109XCJ7ICdzZWxlY3RlZC1jb3VudCc6IHNlbGVjdGVkTWVzc2FnZSB9XCJcclxuICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJmb290ZXJIZWlnaHRcIlxyXG4gICAgPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAqbmdJZj1cImZvb3RlclRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZS50ZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICAgIHJvd0NvdW50OiByb3dDb3VudCxcclxuICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcclxuICAgICAgICAgIHNlbGVjdGVkQ291bnQ6IHNlbGVjdGVkQ291bnQsXHJcbiAgICAgICAgICBjdXJQYWdlOiBjdXJQYWdlLFxyXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXRcclxuICAgICAgICB9XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb3VudFwiICpuZ0lmPVwiIWZvb3RlclRlbXBsYXRlXCI+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzZWxlY3RlZE1lc3NhZ2VcIj4ge3sgc2VsZWN0ZWRDb3VudD8udG9Mb2NhbGVTdHJpbmcoKSB9fSB7eyBzZWxlY3RlZE1lc3NhZ2UgfX0gLyA8L3NwYW4+XHJcbiAgICAgICAge3sgcm93Q291bnQ/LnRvTG9jYWxlU3RyaW5nKCkgfX0ge3sgdG90YWxNZXNzYWdlIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGF0YXRhYmxlLXBhZ2VyXHJcbiAgICAgICAgKm5nSWY9XCIhZm9vdGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIFtwYWdlckxlZnRBcnJvd0ljb25dPVwicGFnZXJMZWZ0QXJyb3dJY29uXCJcclxuICAgICAgICBbcGFnZXJSaWdodEFycm93SWNvbl09XCJwYWdlclJpZ2h0QXJyb3dJY29uXCJcclxuICAgICAgICBbcGFnZXJQcmV2aW91c0ljb25dPVwicGFnZXJQcmV2aW91c0ljb25cIlxyXG4gICAgICAgIFtwYWdlck5leHRJY29uXT1cInBhZ2VyTmV4dEljb25cIlxyXG4gICAgICAgIFtwYWdlXT1cImN1clBhZ2VcIlxyXG4gICAgICAgIFtzaXplXT1cInBhZ2VTaXplXCJcclxuICAgICAgICBbY291bnRdPVwicm93Q291bnRcIlxyXG4gICAgICAgIFtoaWRkZW5dPVwiIWlzVmlzaWJsZVwiXHJcbiAgICAgICAgKGNoYW5nZSk9XCJwYWdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgPC9kYXRhdGFibGUtcGFnZXI+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWZvb3RlcidcclxuICB9LFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVGb290ZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGZvb3RlckhlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJvd0NvdW50OiBudW1iZXI7XHJcbiAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlcjtcclxuICBASW5wdXQoKSBvZmZzZXQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBwYWdlckxlZnRBcnJvd0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlclJpZ2h0QXJyb3dJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGFnZXJQcmV2aW91c0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlck5leHRJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdG90YWxNZXNzYWdlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZTtcclxuXHJcbiAgQElucHV0KCkgc2VsZWN0ZWRDb3VudDogbnVtYmVyID0gMDtcclxuICBASW5wdXQoKSBzZWxlY3RlZE1lc3NhZ2U6IHN0cmluZyB8IGJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKSBwYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnJvd0NvdW50IC8gdGhpcy5wYWdlU2l6ZSA+IDE7XHJcbiAgfVxyXG5cclxuICBnZXQgY3VyUGFnZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2Zmc2V0ICsgMTtcclxuICB9XHJcbn1cclxuIl19