import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DataTablePagerComponent {
    constructor() {
        this.change = new EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    set size(val) {
        this._size = val;
        this.pages = this.calcPages();
    }
    get size() {
        return this._size;
    }
    set count(val) {
        this._count = val;
        this.pages = this.calcPages();
    }
    get count() {
        return this._count;
    }
    set page(val) {
        this._page = val;
        this.pages = this.calcPages();
    }
    get page() {
        return this._page;
    }
    get totalPages() {
        const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
        return Math.max(count || 0, 1);
    }
    canPrevious() {
        return this.page > 1;
    }
    canNext() {
        return this.page < this.totalPages;
    }
    prevPage() {
        this.selectPage(this.page - 1);
    }
    nextPage() {
        this.selectPage(this.page + 1);
    }
    selectPage(page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page
            });
        }
    }
    calcPages(page) {
        const pages = [];
        let startPage = 1;
        let endPage = this.totalPages;
        const maxSize = 5;
        const isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (let num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    }
}
DataTablePagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTablePagerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataTablePagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTablePagerComponent, selector: "datatable-pager", inputs: { pagerLeftArrowIcon: "pagerLeftArrowIcon", pagerRightArrowIcon: "pagerRightArrowIcon", pagerPreviousIcon: "pagerPreviousIcon", pagerNextIcon: "pagerNextIcon", size: "size", count: "count", page: "page" }, outputs: { change: "change" }, host: { classAttribute: "datatable-pager" }, ngImport: i0, template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTablePagerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-pager',
                    template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `,
                    host: {
                        class: 'datatable-pager'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { pagerLeftArrowIcon: [{
                type: Input
            }], pagerRightArrowIcon: [{
                type: Input
            }], pagerPreviousIcon: [{
                type: Input
            }], pagerNextIcon: [{
                type: Input
            }], size: [{
                type: Input
            }], count: [{
                type: Input
            }], page: [{
                type: Input
            }], change: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvZm9vdGVyL3BhZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUE0Q2hHLE1BQU0sT0FBTyx1QkFBdUI7SUExQ3BDO1FBbUZZLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFXLENBQUMsQ0FBQztLQTREbkI7SUFuR0MsSUFDSSxJQUFJLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUNJLEtBQUssQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUOzJGQU1VLHVCQUF1QjtrQkExQ25DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3FCQUN6QjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFHRixJQUFJO3NCQURQLEtBQUs7Z0JBV0YsS0FBSztzQkFEUixLQUFLO2dCQVdGLElBQUk7c0JBRFAsS0FBSztnQkFlSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXBhZ2VyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHVsIGNsYXNzPVwicGFnZXJcIj5cclxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gZmlyc3QgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwic2VsZWN0UGFnZSgxKVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7eyBwYWdlclByZXZpb3VzSWNvbiB9fVwiPjwvaT5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhblByZXZpb3VzKClcIj5cclxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIHByZXZpb3VzIHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInByZXZQYWdlKClcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJMZWZ0QXJyb3dJY29uIH19XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpXHJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIncGFnZSAnICsgcGcubnVtYmVyXCJcclxuICAgICAgICBjbGFzcz1cInBhZ2VzXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgcGcgb2YgcGFnZXNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicGcubnVtYmVyID09PSBwYWdlXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwic2VsZWN0UGFnZShwZy5udW1iZXIpXCI+XHJcbiAgICAgICAgICB7eyBwZy50ZXh0IH19XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5OZXh0KClcIj5cclxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIG5leHQgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwibmV4dFBhZ2UoKVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7eyBwYWdlclJpZ2h0QXJyb3dJY29uIH19XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuTmV4dCgpXCI+XHJcbiAgICAgICAgPGEgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJnbyB0byBsYXN0IHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UodG90YWxQYWdlcylcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJOZXh0SWNvbiB9fVwiPjwvaT5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtcGFnZXInXHJcbiAgfSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHBhZ2VyTGVmdEFycm93SWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyUmlnaHRBcnJvd0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlclByZXZpb3VzSWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyTmV4dEljb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc2l6ZSh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbDtcclxuICAgIHRoaXMucGFnZXMgPSB0aGlzLmNhbGNQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY291bnQodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2NvdW50ID0gdmFsO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHBhZ2UodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3BhZ2UgPSB2YWw7XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcclxuICB9XHJcblxyXG4gIGdldCB0b3RhbFBhZ2VzKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuc2l6ZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMuY291bnQgLyB0aGlzLnNpemUpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KGNvdW50IHx8IDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb3VudDogbnVtYmVyID0gMDtcclxuICBfcGFnZTogbnVtYmVyID0gMTtcclxuICBfc2l6ZTogbnVtYmVyID0gMDtcclxuICBwYWdlczogYW55O1xyXG5cclxuICBjYW5QcmV2aW91cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPiAxO1xyXG4gIH1cclxuXHJcbiAgY2FuTmV4dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnRvdGFsUGFnZXM7XHJcbiAgfVxyXG5cclxuICBwcmV2UGFnZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0UGFnZSh0aGlzLnBhZ2UgLSAxKTtcclxuICB9XHJcblxyXG4gIG5leHRQYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSArIDEpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFnZShwYWdlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmIChwYWdlID4gMCAmJiBwYWdlIDw9IHRoaXMudG90YWxQYWdlcyAmJiBwYWdlICE9PSB0aGlzLnBhZ2UpIHtcclxuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xyXG4gICAgICAgIHBhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxjUGFnZXMocGFnZT86IG51bWJlcik6IGFueVtdIHtcclxuICAgIGNvbnN0IHBhZ2VzID0gW107XHJcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcclxuICAgIGxldCBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xyXG4gICAgY29uc3QgbWF4U2l6ZSA9IDU7XHJcbiAgICBjb25zdCBpc01heFNpemVkID0gbWF4U2l6ZSA8IHRoaXMudG90YWxQYWdlcztcclxuXHJcbiAgICBwYWdlID0gcGFnZSB8fCB0aGlzLnBhZ2U7XHJcblxyXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcclxuICAgICAgc3RhcnRQYWdlID0gcGFnZSAtIE1hdGguZmxvb3IobWF4U2l6ZSAvIDIpO1xyXG4gICAgICBlbmRQYWdlID0gcGFnZSArIE1hdGguZmxvb3IobWF4U2l6ZSAvIDIpO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0UGFnZSA8IDEpIHtcclxuICAgICAgICBzdGFydFBhZ2UgPSAxO1xyXG4gICAgICAgIGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBtYXhTaXplIC0gMSwgdGhpcy50b3RhbFBhZ2VzKTtcclxuICAgICAgfSBlbHNlIGlmIChlbmRQYWdlID4gdGhpcy50b3RhbFBhZ2VzKSB7XHJcbiAgICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgodGhpcy50b3RhbFBhZ2VzIC0gbWF4U2l6ZSArIDEsIDEpO1xyXG4gICAgICAgIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xyXG4gICAgICBwYWdlcy5wdXNoKHtcclxuICAgICAgICBudW1iZXI6IG51bSxcclxuICAgICAgICB0ZXh0OiA8c3RyaW5nPig8YW55Pm51bSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhZ2VzO1xyXG4gIH1cclxufVxyXG4iXX0=