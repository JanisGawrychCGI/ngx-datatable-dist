import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class ScrollerComponent {
    constructor(ngZone, element, renderer) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this._scrollEventListener = null;
        this.element = element.nativeElement;
    }
    ngOnInit() {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            const renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this._scrollEventListener = this.onScrolled.bind(this);
            this.parentElement.addEventListener('scroll', this._scrollEventListener);
        }
    }
    ngOnDestroy() {
        if (this._scrollEventListener) {
            this.parentElement.removeEventListener('scroll', this._scrollEventListener);
            this._scrollEventListener = null;
        }
    }
    setOffset(offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    }
    onScrolled(event) {
        const dom = event.currentTarget;
        requestAnimationFrame(() => {
            this.scrollYPos = dom.scrollTop;
            this.scrollXPos = dom.scrollLeft;
            this.updateOffset();
        });
    }
    updateOffset() {
        let direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    }
}
ScrollerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ScrollerComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ScrollerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: ScrollerComponent, selector: "datatable-scroller", inputs: { scrollbarV: "scrollbarV", scrollbarH: "scrollbarH", scrollHeight: "scrollHeight", scrollWidth: "scrollWidth" }, outputs: { scroll: "scroll" }, host: { properties: { "style.height.px": "this.scrollHeight", "style.width.px": "this.scrollWidth" }, classAttribute: "datatable-scroll" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ScrollerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-scroller',
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'datatable-scroll'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { scrollbarV: [{
                type: Input
            }], scrollbarH: [{
                type: Input
            }], scrollHeight: [{
                type: HostBinding,
                args: ['style.height.px']
            }, {
                type: Input
            }], scrollWidth: [{
                type: HostBinding,
                args: ['style.width.px']
            }, {
                type: Input
            }], scroll: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvYm9keS9zY3JvbGxlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFLWixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDOztBQVl2QixNQUFNLE9BQU8saUJBQWlCO0lBd0I1QixZQUFvQixNQUFjLEVBQUUsT0FBbUIsRUFBVSxRQUFtQjtRQUFoRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQStCLGFBQVEsR0FBUixRQUFRLENBQVc7UUF2QjNFLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVUzQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBS25CLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUd2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDTix3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBaUI7UUFDMUIsTUFBTSxHQUFHLEdBQXFCLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbEQscUJBQXFCLENBQUMsR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDekMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUNwQjthQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2hELFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLFNBQVM7WUFDVCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQzs7OEdBNUVVLGlCQUFpQjtrR0FBakIsaUJBQWlCLCtWQU5sQiw2QkFBNkI7MkZBTTVCLGlCQUFpQjtrQkFSN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtxQkFDMUI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhJQUVVLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFJTixZQUFZO3NCQUZYLFdBQVc7dUJBQUMsaUJBQWlCOztzQkFDN0IsS0FBSztnQkFLTixXQUFXO3NCQUZWLFdBQVc7dUJBQUMsZ0JBQWdCOztzQkFDNUIsS0FBSztnQkFHSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBFbGVtZW50UmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIE5nWm9uZSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXNjcm9sbGVyJyxcclxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtc2Nyb2xsJ1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHNjcm9sbGJhclY6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcclxuICBASW5wdXQoKVxyXG4gIHNjcm9sbEhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcclxuICBASW5wdXQoKVxyXG4gIHNjcm9sbFdpZHRoOiBudW1iZXI7XHJcblxyXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBzY3JvbGxZUG9zOiBudW1iZXIgPSAwO1xyXG4gIHNjcm9sbFhQb3M6IG51bWJlciA9IDA7XHJcbiAgcHJldlNjcm9sbFlQb3M6IG51bWJlciA9IDA7XHJcbiAgcHJldlNjcm9sbFhQb3M6IG51bWJlciA9IDA7XHJcbiAgZWxlbWVudDogYW55O1xyXG4gIHBhcmVudEVsZW1lbnQ6IGFueTtcclxuICBvblNjcm9sbExpc3RlbmVyOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX3Njcm9sbEV2ZW50TGlzdGVuZXI6IGFueSA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBtYW51YWwgYmluZCBzbyB3ZSBkb24ndCBhbHdheXMgbGlzdGVuXHJcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWIHx8IHRoaXMuc2Nyb2xsYmFySCkge1xyXG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXI7XHJcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHJlbmRlcmVyLnBhcmVudE5vZGUocmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnQpKTtcclxuICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lciA9IHRoaXMub25TY3JvbGxlZC5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9zY3JvbGxFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxFdmVudExpc3RlbmVyKTtcclxuICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRPZmZzZXQob2Zmc2V0WTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgPSBvZmZzZXRZO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TY3JvbGxlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZG9tOiBFbGVtZW50ID0gPEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsWVBvcyA9IGRvbS5zY3JvbGxUb3A7XHJcbiAgICAgIHRoaXMuc2Nyb2xsWFBvcyA9IGRvbS5zY3JvbGxMZWZ0O1xyXG4gICAgICB0aGlzLnVwZGF0ZU9mZnNldCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPZmZzZXQoKTogdm9pZCB7XHJcbiAgICBsZXQgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgICBpZiAodGhpcy5zY3JvbGxZUG9zIDwgdGhpcy5wcmV2U2Nyb2xsWVBvcykge1xyXG4gICAgICBkaXJlY3Rpb24gPSAnZG93bic7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Nyb2xsWVBvcyA+IHRoaXMucHJldlNjcm9sbFlQb3MpIHtcclxuICAgICAgZGlyZWN0aW9uID0gJ3VwJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbC5lbWl0KHtcclxuICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICBzY3JvbGxZUG9zOiB0aGlzLnNjcm9sbFlQb3MsXHJcbiAgICAgIHNjcm9sbFhQb3M6IHRoaXMuc2Nyb2xsWFBvc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcmV2U2Nyb2xsWVBvcyA9IHRoaXMuc2Nyb2xsWVBvcztcclxuICAgIHRoaXMucHJldlNjcm9sbFhQb3MgPSB0aGlzLnNjcm9sbFhQb3M7XHJcbiAgfVxyXG59XHJcbiJdfQ==