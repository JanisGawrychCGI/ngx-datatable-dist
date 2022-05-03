import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class LongPressDirective {
    constructor() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new EventEmitter();
        this.longPressing = new EventEmitter();
        this.longPressEnd = new EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    get press() {
        return this.pressing;
    }
    get isLongPress() {
        return this.isLongPressing;
    }
    onMouseDown(event) {
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        const target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        const mouseup = fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe((ev) => this.onMouseup());
        this.timeout = setTimeout(() => {
            this.isLongPressing = true;
            this.longPressStart.emit({
                event,
                model: this.pressModel
            });
            this.subscription.add(fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((mouseEvent) => this.onMouseMove(mouseEvent)));
            this.loop(event);
        }, this.duration);
        this.loop(event);
    }
    onMouseMove(event) {
        if (this.pressing && !this.isLongPressing) {
            const xThres = Math.abs(event.clientX - this.mouseX) > 10;
            const yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }
    loop(event) {
        if (this.isLongPressing) {
            this.timeout = setTimeout(() => {
                this.longPressing.emit({
                    event,
                    model: this.pressModel
                });
                this.loop(event);
            }, 50);
        }
    }
    endPress() {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    }
    onMouseup() {
        this.endPress();
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
LongPressDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: LongPressDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
LongPressDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: LongPressDirective, selector: "[long-press]", inputs: { pressEnabled: "pressEnabled", pressModel: "pressModel", duration: "duration" }, outputs: { longPressStart: "longPressStart", longPressing: "longPressing", longPressEnd: "longPressEnd" }, host: { listeners: { "mousedown": "onMouseDown($event)" }, properties: { "class.press": "this.press", "class.longpress": "this.isLongPress" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: LongPressDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[long-press]' }]
        }], propDecorators: { pressEnabled: [{
                type: Input
            }], pressModel: [{
                type: Input
            }], duration: [{
                type: Input
            }], longPressStart: [{
                type: Output
            }], longPressing: [{
                type: Output
            }], longPressEnd: [{
                type: Output
            }], press: [{
                type: HostBinding,
                args: ['class.press']
            }], isLongPress: [{
                type: HostBinding,
                args: ['class.longpress']
            }], onMouseDown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZy1wcmVzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvZGlyZWN0aXZlcy9sb25nLXByZXNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUE0QixTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUkzQyxNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBRVcsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUV0QixtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUsvRCxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7S0FtR3BCO0lBL0ZDLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFHRCxXQUFXLENBQUMsS0FBaUI7UUFDM0IsK0JBQStCO1FBQy9CLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFFcEQsMkNBQTJDO1FBQzNDLE1BQU0sTUFBTSxHQUFnQixLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3pD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RSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUMvQjtJQUNILENBQUM7OytHQS9HVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTs4QkFFNUIsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBV0gsS0FBSztzQkFEUixXQUFXO3VCQUFDLGFBQWE7Z0JBTXRCLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBTTlCLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL2V2ZW50cyc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbG9uZy1wcmVzc10nIH0pXHJcbmV4cG9ydCBjbGFzcyBMb25nUHJlc3NEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHByZXNzRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgcHJlc3NNb2RlbDogYW55O1xyXG4gIEBJbnB1dCgpIGR1cmF0aW9uOiBudW1iZXIgPSA1MDA7XHJcblxyXG4gIEBPdXRwdXQoKSBsb25nUHJlc3NTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxvbmdQcmVzc2luZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxvbmdQcmVzc0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByZXNzaW5nOiBib29sZWFuO1xyXG4gIGlzTG9uZ1ByZXNzaW5nOiBib29sZWFuO1xyXG4gIHRpbWVvdXQ6IGFueTtcclxuICBtb3VzZVg6IG51bWJlciA9IDA7XHJcbiAgbW91c2VZOiBudW1iZXIgPSAwO1xyXG5cclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wcmVzcycpXHJcbiAgZ2V0IHByZXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucHJlc3Npbmc7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvbmdwcmVzcycpXHJcbiAgZ2V0IGlzTG9uZ1ByZXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNMb25nUHJlc3Npbmc7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAvLyBkb24ndCBkbyByaWdodC9taWRkbGUgY2xpY2tzXHJcbiAgICBpZiAoZXZlbnQud2hpY2ggIT09IDEgfHwgIXRoaXMucHJlc3NFbmFibGVkKSByZXR1cm47XHJcblxyXG4gICAgLy8gZG9uJ3Qgc3RhcnQgZHJhZyBpZiBpdHMgb24gcmVzaXplIGhhbmRsZVxyXG4gICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXNpemUtaGFuZGxlJykpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XHJcblxyXG4gICAgdGhpcy5wcmVzc2luZyA9IHRydWU7XHJcbiAgICB0aGlzLmlzTG9uZ1ByZXNzaW5nID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgbW91c2V1cCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbW91c2V1cC5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2V1cCgpKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pc0xvbmdQcmVzc2luZyA9IHRydWU7XHJcbiAgICAgIHRoaXMubG9uZ1ByZXNzU3RhcnQuZW1pdCh7XHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgbW9kZWw6IHRoaXMucHJlc3NNb2RlbFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxyXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNldXApKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSgobW91c2VFdmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShtb3VzZUV2ZW50KSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMubG9vcChldmVudCk7XHJcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcclxuXHJcbiAgICB0aGlzLmxvb3AoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnByZXNzaW5nICYmICF0aGlzLmlzTG9uZ1ByZXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IHhUaHJlcyA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSB0aGlzLm1vdXNlWCkgPiAxMDtcclxuICAgICAgY29uc3QgeVRocmVzID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHRoaXMubW91c2VZKSA+IDEwO1xyXG5cclxuICAgICAgaWYgKHhUaHJlcyB8fCB5VGhyZXMpIHtcclxuICAgICAgICB0aGlzLmVuZFByZXNzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvb3AoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzTG9uZ1ByZXNzaW5nKSB7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9uZ1ByZXNzaW5nLmVtaXQoe1xyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBtb2RlbDogdGhpcy5wcmVzc01vZGVsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sb29wKGV2ZW50KTtcclxuICAgICAgfSwgNTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5kUHJlc3MoKTogdm9pZCB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuaXNMb25nUHJlc3NpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMucHJlc3NpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICB0aGlzLmxvbmdQcmVzc0VuZC5lbWl0KHtcclxuICAgICAgbW9kZWw6IHRoaXMucHJlc3NNb2RlbFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNldXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVuZFByZXNzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rlc3Ryb3lTdWJzY3JpcHRpb24oKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==