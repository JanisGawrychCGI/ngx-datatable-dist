import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';
import * as i0 from "@angular/core";
export class DatatableFooterDirective {
    get template() {
        return this._templateInput || this._templateQuery;
    }
}
DatatableFooterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableFooterDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
DatatableFooterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: DatatableFooterDirective, selector: "ngx-datatable-footer", inputs: { footerHeight: "footerHeight", totalMessage: "totalMessage", selectedMessage: "selectedMessage", pagerLeftArrowIcon: "pagerLeftArrowIcon", pagerRightArrowIcon: "pagerRightArrowIcon", pagerPreviousIcon: "pagerPreviousIcon", pagerNextIcon: "pagerNextIcon", _templateInput: ["template", "_templateInput"] }, queries: [{ propertyName: "_templateQuery", first: true, predicate: DataTableFooterTemplateDirective, descendants: true, read: TemplateRef }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DatatableFooterDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ngx-datatable-footer' }]
        }], propDecorators: { footerHeight: [{
                type: Input
            }], totalMessage: [{
                type: Input
            }], selectedMessage: [{
                type: Input
            }], pagerLeftArrowIcon: [{
                type: Input
            }], pagerRightArrowIcon: [{
                type: Input
            }], pagerPreviousIcon: [{
                type: Input
            }], pagerNextIcon: [{
                type: Input
            }], _templateInput: [{
                type: Input,
                args: ['template']
            }], _templateQuery: [{
                type: ContentChild,
                args: [DataTableFooterTemplateDirective, { read: TemplateRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBRy9FLE1BQU0sT0FBTyx3QkFBd0I7SUFlbkMsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQsQ0FBQzs7cUhBakJVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLGthQVlyQixnQ0FBZ0MsMkJBQVUsV0FBVzsyRkFaeEQsd0JBQXdCO2tCQURwQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzhCQUVwQyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUdOLGNBQWM7c0JBRGIsS0FBSzt1QkFBQyxVQUFVO2dCQUlqQixjQUFjO3NCQURiLFlBQVk7dUJBQUMsZ0NBQWdDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlLWZvb3RlcicgfSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCkgZm9vdGVySGVpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KCkgdG90YWxNZXNzYWdlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRNZXNzYWdlOiBzdHJpbmcgfCBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHBhZ2VyTGVmdEFycm93SWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyUmlnaHRBcnJvd0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlclByZXZpb3VzSWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyTmV4dEljb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KCd0ZW1wbGF0ZScpXHJcbiAgX3RlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSlcclxuICBfdGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlSW5wdXQgfHwgdGhpcy5fdGVtcGxhdGVRdWVyeTtcclxuICB9XHJcbn1cclxuIl19