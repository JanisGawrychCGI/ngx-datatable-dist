import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class ResizeableDirective {
    constructor(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ngAfterViewInit() {
        const renderer2 = this.renderer;
        this.resizeHandle = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(this.resizeHandle, 'resize-handle');
        }
        else {
            renderer2.addClass(this.resizeHandle, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, this.resizeHandle);
    }
    ngOnDestroy() {
        this._destroySubscription();
        if (this.renderer.destroyNode) {
            this.renderer.destroyNode(this.resizeHandle);
        }
        else if (this.resizeHandle) {
            this.renderer.removeChild(this.renderer.parentNode(this.resizeHandle), this.resizeHandle);
        }
    }
    onMouseup() {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    }
    onMousedown(event) {
        const isHandle = event.target.classList.contains('resize-handle');
        const initialWidth = this.element.clientWidth;
        const mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((ev) => this.onMouseup());
            const mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((e) => this.move(e, initialWidth, mouseDownScreenX));
            this.subscription.add(mouseMoveSub);
        }
    }
    move(event, initialWidth, mouseDownScreenX) {
        const movementX = event.screenX - mouseDownScreenX;
        const newWidth = initialWidth + movementX;
        const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = `${newWidth}px`;
        }
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
ResizeableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ResizeableDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
ResizeableDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: ResizeableDirective, selector: "[resizeable]", inputs: { resizeEnabled: "resizeEnabled", minWidth: "minWidth", maxWidth: "maxWidth" }, outputs: { resize: "resize" }, host: { listeners: { "mousedown": "onMousedown($event)" }, properties: { "class.resizeable": "resizeEnabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ResizeableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[resizeable]',
                    host: {
                        '[class.resizeable]': 'resizeEnabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { resizeEnabled: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], resize: [{
                type: Output
            }], onMousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvZGlyZWN0aXZlcy9yZXNpemVhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFJYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBUTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFZOUIsWUFBWSxPQUFtQixFQUFVLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFYbkQsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFJN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXpELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFJeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0wsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLDhCQUE4QixDQUFDLENBQUM7U0FDdkU7UUFDRCxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxP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LFNBQVMsQ0FBQztTQUMvQjtJQUNILENBQUM7O2dIQW5GVSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQU4vQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsZUFBZTtxQkFDdEM7aUJBQ0Y7eUhBRVUsYUFBYTtzQkFBckIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQXlDUCxXQUFXO3NCQURWLFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcmVzaXplYWJsZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MucmVzaXplYWJsZV0nOiAncmVzaXplRW5hYmxlZCdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSByZXNpemVFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtaW5XaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG1heFdpZHRoOiBudW1iZXI7XHJcblxyXG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICByZXNpemluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgcmVzaXplSGFuZGxlOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCByZW5kZXJlcjIgPSB0aGlzLnJlbmRlcmVyO1xyXG4gICAgdGhpcy5yZXNpemVIYW5kbGUgPSByZW5kZXJlcjIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgaWYgKHRoaXMucmVzaXplRW5hYmxlZCkge1xyXG4gICAgICByZW5kZXJlcjIuYWRkQ2xhc3ModGhpcy5yZXNpemVIYW5kbGUsICdyZXNpemUtaGFuZGxlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZW5kZXJlcjIuYWRkQ2xhc3ModGhpcy5yZXNpemVIYW5kbGUsICdyZXNpemUtaGFuZGxlLS1ub3QtcmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJlcjIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50LCB0aGlzLnJlc2l6ZUhhbmRsZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcclxuICAgIGlmICh0aGlzLnJlbmRlcmVyLmRlc3Ryb3lOb2RlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuZGVzdHJveU5vZGUodGhpcy5yZXNpemVIYW5kbGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnJlc2l6ZUhhbmRsZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLnJlc2l6ZUhhbmRsZSksIHRoaXMucmVzaXplSGFuZGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW91c2V1cCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXppbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24gJiYgIXRoaXMuc3Vic2NyaXB0aW9uLmNsb3NlZCkge1xyXG4gICAgICB0aGlzLl9kZXN0cm95U3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVzaXplLmVtaXQodGhpcy5lbGVtZW50LmNsaWVudFdpZHRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25Nb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlzSGFuZGxlID0gKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygncmVzaXplLWhhbmRsZScpO1xyXG4gICAgY29uc3QgaW5pdGlhbFdpZHRoID0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgY29uc3QgbW91c2VEb3duU2NyZWVuWCA9IGV2ZW50LnNjcmVlblg7XHJcblxyXG4gICAgaWYgKGlzSGFuZGxlKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbW91c2V1cC5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2V1cCgpKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdXNlTW92ZVN1YiA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpXHJcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNldXApKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW92ZShlLCBpbml0aWFsV2lkdGgsIG1vdXNlRG93blNjcmVlblgpKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChtb3VzZU1vdmVTdWIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZShldmVudDogTW91c2VFdmVudCwgaW5pdGlhbFdpZHRoOiBudW1iZXIsIG1vdXNlRG93blNjcmVlblg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgbW92ZW1lbnRYID0gZXZlbnQuc2NyZWVuWCAtIG1vdXNlRG93blNjcmVlblg7XHJcbiAgICBjb25zdCBuZXdXaWR0aCA9IGluaXRpYWxXaWR0aCArIG1vdmVtZW50WDtcclxuXHJcbiAgICBjb25zdCBvdmVyTWluV2lkdGggPSAhdGhpcy5taW5XaWR0aCB8fCBuZXdXaWR0aCA+PSB0aGlzLm1pbldpZHRoO1xyXG4gICAgY29uc3QgdW5kZXJNYXhXaWR0aCA9ICF0aGlzLm1heFdpZHRoIHx8IG5ld1dpZHRoIDw9IHRoaXMubWF4V2lkdGg7XHJcblxyXG4gICAgaWYgKG92ZXJNaW5XaWR0aCAmJiB1bmRlck1heFdpZHRoKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IGAke25ld1dpZHRofXB4YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==