import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
import * as i0 from "@angular/core";
export class DatatableGroupHeaderDirective {
    constructor() {
        /**
         * Row height is required when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Track toggling of group visibility
         */
        this.toggle = new EventEmitter();
    }
    get template() {
        return this._templateInput || this._templateQuery;
    }
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    }
    /**
     * Expand all groups
     */
    expandAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * Collapse all groups
     */
    collapseAllGroups() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
}
DatatableGroupHeaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableGroupHeaderDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
DatatableGroupHeaderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: DatatableGroupHeaderDirective, selector: "ngx-datatable-group-header", inputs: { rowHeight: "rowHeight", _templateInput: ["template", "_templateInput"] }, outputs: { toggle: "toggle" }, queries: [{ propertyName: "_templateQuery", first: true, predicate: DatatableGroupHeaderTemplateDirective, descendants: true, read: TemplateRef, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableGroupHeaderDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ngx-datatable-group-header' }]
        }], propDecorators: { rowHeight: [{
                type: Input
            }], _templateInput: [{
                type: Input,
                args: ['template']
            }], _templateQuery: [{
                type: ContentChild,
                args: [DatatableGroupHeaderTemplateDirective, { read: TemplateRef, static: true }]
            }], toggle: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQUcvRixNQUFNLE9BQU8sNkJBQTZCO0lBRDFDO1FBRUU7O1dBRUc7UUFDTSxjQUFTLEdBQXVELENBQUMsQ0FBQztRQVkzRTs7V0FFRztRQUNPLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQStCMUQ7SUF0Q0MsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQsQ0FBQztJQU9EOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsS0FBVTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MEhBakRVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLGlPQVMxQixxQ0FBcUMsMkJBQVUsV0FBVzsyRkFUN0QsNkJBQTZCO2tCQUR6QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFOzhCQUsxQyxTQUFTO3NCQUFqQixLQUFLO2dCQUdOLGNBQWM7c0JBRGIsS0FBSzt1QkFBQyxVQUFVO2dCQUlqQixjQUFjO3NCQURiLFlBQVk7dUJBQUMscUNBQXFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBVTlFLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2JvZHktZ3JvdXAtaGVhZGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlLWdyb3VwLWhlYWRlcicgfSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBSb3cgaGVpZ2h0IGlzIHJlcXVpcmVkIHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICgoZ3JvdXA/OiBhbnksIGluZGV4PzogbnVtYmVyKSA9PiBudW1iZXIpID0gMDtcclxuXHJcbiAgQElucHV0KCd0ZW1wbGF0ZScpXHJcbiAgX3RlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgX3RlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCB0ZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUlucHV0IHx8IHRoaXMuX3RlbXBsYXRlUXVlcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFjayB0b2dnbGluZyBvZiBncm91cCB2aXNpYmlsaXR5XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSB0aGUgZXhwYW5zaW9uIG9mIGEgZ3JvdXBcclxuICAgKi9cclxuICB0b2dnbGVFeHBhbmRHcm91cChncm91cDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2dyb3VwJyxcclxuICAgICAgdmFsdWU6IGdyb3VwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGFuZCBhbGwgZ3JvdXBzXHJcbiAgICovXHJcbiAgZXhwYW5kQWxsR3JvdXBzKCk6IHZvaWQge1xyXG4gICAgdGhpcy50b2dnbGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdhbGwnLFxyXG4gICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsYXBzZSBhbGwgZ3JvdXBzXHJcbiAgICovXHJcbiAgY29sbGFwc2VBbGxHcm91cHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2FsbCcsXHJcbiAgICAgIHZhbHVlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==