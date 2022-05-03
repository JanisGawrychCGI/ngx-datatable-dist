import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
import * as i0 from "@angular/core";
export class DatatableRowDetailDirective {
    constructor() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         */
        this.toggle = new EventEmitter();
    }
    get template() {
        return this._templateInput || this._templateQuery;
    }
    /**
     * Toggle the expansion of the row
     */
    toggleExpandRow(row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    }
    /**
     * API method to expand all the rows.
     */
    expandAllRows() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * API method to collapse all the rows.
     */
    collapseAllRows() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
}
DatatableRowDetailDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableRowDetailDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
DatatableRowDetailDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: DatatableRowDetailDirective, selector: "ngx-datatable-row-detail", inputs: { rowHeight: "rowHeight", _templateInput: ["template", "_templateInput"] }, outputs: { toggle: "toggle" }, queries: [{ propertyName: "_templateQuery", first: true, predicate: DatatableRowDetailTemplateDirective, descendants: true, read: TemplateRef, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableRowDetailDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ngx-datatable-row-detail' }]
        }], propDecorators: { rowHeight: [{
                type: Input
            }], _templateInput: [{
                type: Input,
                args: ['template']
            }], _templateQuery: [{
                type: ContentChild,
                args: [DatatableRowDetailTemplateDirective, { read: TemplateRef, static: true }]
            }], toggle: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWRldGFpbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFHdEYsTUFBTSxPQUFPLDJCQUEyQjtJQUR4QztRQUVFOzs7V0FHRztRQUNNLGNBQVMsR0FBcUQsQ0FBQyxDQUFDO1FBWXpFOztXQUVHO1FBQ08sV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0tBK0IxRDtJQXRDQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNwRCxDQUFDO0lBT0Q7O09BRUc7SUFDSCxlQUFlLENBQUMsR0FBUTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7O3dIQWxEVSwyQkFBMkI7NEdBQTNCLDJCQUEyQiwrTkFVeEIsbUNBQW1DLDJCQUFVLFdBQVc7MkZBVjNELDJCQUEyQjtrQkFEdkMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTs4QkFNeEMsU0FBUztzQkFBakIsS0FBSztnQkFHTixjQUFjO3NCQURiLEtBQUs7dUJBQUMsVUFBVTtnQkFJakIsY0FBYztzQkFEYixZQUFZO3VCQUFDLG1DQUFtQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQVU1RSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vcm93LWRldGFpbC10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmd4LWRhdGF0YWJsZS1yb3ctZGV0YWlsJyB9KVxyXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBUaGUgZGV0YWlsIHJvdyBoZWlnaHQgaXMgcmVxdWlyZWQgZXNwZWNpYWxseVxyXG4gICAqIHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICgocm93PzogYW55LCBpbmRleD86IG51bWJlcikgPT4gbnVtYmVyKSA9IDA7XHJcblxyXG4gIEBJbnB1dCgndGVtcGxhdGUnKVxyXG4gIF90ZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAQ29udGVudENoaWxkKERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBfdGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlSW5wdXQgfHwgdGhpcy5fdGVtcGxhdGVRdWVyeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdyBkZXRhaWwgcm93IHZpc2JpbGl0eSB3YXMgdG9nZ2xlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIHRoZSBleHBhbnNpb24gb2YgdGhlIHJvd1xyXG4gICAqL1xyXG4gIHRvZ2dsZUV4cGFuZFJvdyhyb3c6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy50b2dnbGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdyb3cnLFxyXG4gICAgICB2YWx1ZTogcm93XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFQSSBtZXRob2QgdG8gZXhwYW5kIGFsbCB0aGUgcm93cy5cclxuICAgKi9cclxuICBleHBhbmRBbGxSb3dzKCk6IHZvaWQge1xyXG4gICAgdGhpcy50b2dnbGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdhbGwnLFxyXG4gICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBUEkgbWV0aG9kIHRvIGNvbGxhcHNlIGFsbCB0aGUgcm93cy5cclxuICAgKi9cclxuICBjb2xsYXBzZUFsbFJvd3MoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2FsbCcsXHJcbiAgICAgIHZhbHVlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==