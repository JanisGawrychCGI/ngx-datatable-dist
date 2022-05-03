import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
import * as i0 from "@angular/core";
export class NgxDatatableModule {
    /**
     * Configure global configuration via INgxDatatableConfig
     * @param configuration
     */
    static forRoot(configuration) {
        return {
            ngModule: NgxDatatableModule,
            providers: [{ provide: 'configuration', useValue: configuration }]
        };
    }
}
NgxDatatableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatatableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxDatatableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatatableModule, declarations: [DataTableFooterTemplateDirective,
        VisibilityDirective,
        DraggableDirective,
        ResizeableDirective,
        OrderableDirective,
        LongPressDirective,
        ScrollerComponent,
        DatatableComponent,
        DataTableColumnDirective,
        DataTableHeaderComponent,
        DataTableHeaderCellComponent,
        DataTableBodyComponent,
        DataTableFooterComponent,
        DataTablePagerComponent,
        ProgressBarComponent,
        DataTableBodyRowComponent,
        DataTableRowWrapperComponent,
        DatatableRowDetailDirective,
        DatatableGroupHeaderDirective,
        DatatableRowDetailTemplateDirective,
        DataTableBodyCellComponent,
        DataTableSelectionComponent,
        DataTableColumnHeaderDirective,
        DataTableColumnCellDirective,
        DataTableColumnCellTreeToggle,
        DatatableFooterDirective,
        DatatableGroupHeaderTemplateDirective,
        DataTableSummaryRowComponent], imports: [CommonModule], exports: [DatatableComponent,
        DatatableRowDetailDirective,
        DatatableGroupHeaderDirective,
        DatatableRowDetailTemplateDirective,
        DataTableColumnDirective,
        DataTableColumnHeaderDirective,
        DataTableColumnCellDirective,
        DataTableColumnCellTreeToggle,
        DataTableFooterTemplateDirective,
        DatatableFooterDirective,
        DataTablePagerComponent,
        DatatableGroupHeaderTemplateDirective] });
NgxDatatableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatatableModule, providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDatatableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
                    declarations: [
                        DataTableFooterTemplateDirective,
                        VisibilityDirective,
                        DraggableDirective,
                        ResizeableDirective,
                        OrderableDirective,
                        LongPressDirective,
                        ScrollerComponent,
                        DatatableComponent,
                        DataTableColumnDirective,
                        DataTableHeaderComponent,
                        DataTableHeaderCellComponent,
                        DataTableBodyComponent,
                        DataTableFooterComponent,
                        DataTablePagerComponent,
                        ProgressBarComponent,
                        DataTableBodyRowComponent,
                        DataTableRowWrapperComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableBodyCellComponent,
                        DataTableSelectionComponent,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DatatableFooterDirective,
                        DatatableGroupHeaderTemplateDirective,
                        DataTableSummaryRowComponent
                    ],
                    exports: [
                        DatatableComponent,
                        DatatableRowDetailDirective,
                        DatatableGroupHeaderDirective,
                        DatatableRowDetailTemplateDirective,
                        DataTableColumnDirective,
                        DataTableColumnHeaderDirective,
                        DataTableColumnCellDirective,
                        DataTableColumnCellTreeToggle,
                        DataTableFooterTemplateDirective,
                        DatatableFooterDirective,
                        DataTablePagerComponent,
                        DatatableGroupHeaderTemplateDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvbmd4LWRhdGF0YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFP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QkFDbEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLGtCQUFrQjt3QkFDbEIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLDRCQUE0Qjt3QkFDNUIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiwyQkFBMkI7d0JBQzNCLDhCQUE4Qjt3QkFDOUIsNEJBQTRCO3dCQUM1Qiw2QkFBNkI7d0JBQzdCLHdCQUF3Qjt3QkFDeEIscUNBQXFDO3dCQUNyQyw0QkFBNEI7cUJBQzdCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLDJCQUEyQjt3QkFDM0IsNkJBQTZCO3dCQUM3QixtQ0FBbUM7d0JBQ25DLHdCQUF3Qjt3QkFDeEIsOEJBQThCO3dCQUM5Qiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0IsZ0NBQWdDO3dCQUNoQyx3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIscUNBQXFDO3FCQUN0QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4vc2VydmljZXMvc2Nyb2xsYmFyLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGltZW5zaW9uc0hlbHBlciB9IGZyb20gJy4vc2VydmljZXMvZGltZW5zaW9ucy1oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBWaXNpYmlsaXR5RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Zpc2liaWxpdHkuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBSZXNpemVhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2l6ZWFibGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT3JkZXJhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL29yZGVyYWJsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMb25nUHJlc3NEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Njcm9sbGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kYXRhdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9wYWdlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcm9ncmVzc0JhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Byb2dyZXNzLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1yb3cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlUm93V3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktcm93LXdyYXBwZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhdGFibGVHcm91cEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVTZWxlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zZWxlY3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLWhlYWRlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLWNlbGwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy90cmVlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LWdyb3VwLWhlYWRlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvc3VtbWFyeS9zdW1tYXJ5LXJvdy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtTY3JvbGxiYXJIZWxwZXIsIERpbWVuc2lvbnNIZWxwZXIsIENvbHVtbkNoYW5nZXNTZXJ2aWNlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFUYWJsZUZvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxyXG4gICAgVmlzaWJpbGl0eURpcmVjdGl2ZSxcclxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcclxuICAgIFJlc2l6ZWFibGVEaXJlY3RpdmUsXHJcbiAgICBPcmRlcmFibGVEaXJlY3RpdmUsXHJcbiAgICBMb25nUHJlc3NEaXJlY3RpdmUsXHJcbiAgICBTY3JvbGxlckNvbXBvbmVudCxcclxuICAgIERhdGF0YWJsZUNvbXBvbmVudCxcclxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCxcclxuICAgIERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQsXHJcbiAgICBEYXRhVGFibGVCb2R5Q29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlRm9vdGVyQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQsXHJcbiAgICBQcm9ncmVzc0JhckNvbXBvbmVudCxcclxuICAgIERhdGFUYWJsZUJvZHlSb3dDb21wb25lbnQsXHJcbiAgICBEYXRhVGFibGVSb3dXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUsXHJcbiAgICBEYXRhdGFibGVSb3dEZXRhaWxUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50LFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLFxyXG4gICAgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIERhdGF0YWJsZUNvbXBvbmVudCxcclxuICAgIERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSxcclxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxyXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXHJcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLFxyXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUsXHJcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcclxuICAgIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSxcclxuICAgIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50LFxyXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhdGF0YWJsZU1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogQ29uZmlndXJlIGdsb2JhbCBjb25maWd1cmF0aW9uIHZpYSBJTmd4RGF0YXRhYmxlQ29uZmlnXHJcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uOiBJTmd4RGF0YXRhYmxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hEYXRhdGFibGVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hEYXRhdGFibGVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogJ2NvbmZpZ3VyYXRpb24nLCB1c2VWYWx1ZTogY29uZmlndXJhdGlvbiB9XVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZGVmaW5pdGlvbiBmb3IgSU5neERhdGF0YWJsZUNvbmZpZyBnbG9iYWwgY29uZmlndXJhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJTmd4RGF0YXRhYmxlQ29uZmlnIHtcclxuICBtZXNzYWdlczoge1xyXG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmc7IC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZCwgYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xyXG4gICAgdG90YWxNZXNzYWdlOiBzdHJpbmc7IC8vIEZvb3RlciB0b3RhbCBtZXNzYWdlXHJcbiAgICBzZWxlY3RlZE1lc3NhZ2U6IHN0cmluZzsgLy8gRm9vdGVyIHNlbGVjdGVkIG1lc3NhZ2VcclxuICB9O1xyXG59XHJcbiJdfQ==