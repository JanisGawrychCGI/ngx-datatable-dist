import { Directive, Output, EventEmitter, ContentChildren, Inject } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class OrderableDirective {
    constructor(differs, document) {
        this.document = document;
        this.reorder = new EventEmitter();
        this.targetChanged = new EventEmitter();
        this.differ = differs.find({}).create();
    }
    ngAfterContentInit() {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    }
    ngOnDestroy() {
        this.draggables.forEach(d => {
            d.dragStart.unsubscribe();
            d.dragging.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    }
    updateSubscriptions() {
        const diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            const subscribe = ({ currentValue, previousValue }) => {
                unsubscribe({ previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(this.onDragStart.bind(this));
                    currentValue.dragging.subscribe(this.onDragging.bind(this));
                    currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
                }
            };
            const unsubscribe = ({ previousValue }) => {
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragging.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe);
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe);
        }
    }
    onDragStart() {
        this.positions = {};
        let i = 0;
        for (const dragger of this.draggables.toArray()) {
            const elm = dragger.element;
            const left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    }
    onDragging({ element, model, event }) {
        const prevPos = this.positions[model.prop];
        const target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.targetChanged.emit({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.targetChanged.emit({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    }
    onDragEnd({ element, model, event }) {
        const prevPos = this.positions[model.prop];
        const target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    }
    isTarget(model, event) {
        let i = 0;
        const x = event.x || event.clientX;
        const y = event.y || event.clientY;
        const targets = this.document.elementsFromPoint(x, y);
        for (const prop in this.positions) {
            // current column position which throws event.
            const pos = this.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find((el) => el === pos.element)) {
                return {
                    pos,
                    i
                };
            }
            i++;
        }
    }
    createMapDiffs() {
        return this.draggables.toArray().reduce((acc, curr) => {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    }
}
OrderableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: OrderableDirective, deps: [{ token: i0.KeyValueDiffers }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
OrderableDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: OrderableDirective, selector: "[orderable]", outputs: { reorder: "reorder", targetChanged: "targetChanged" }, queries: [{ propertyName: "draggables", predicate: DraggableDirective, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: OrderableDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[orderable]' }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { reorder: [{
                type: Output
            }], targetChanged: [{
                type: Output
            }], draggables: [{
                type: ContentChildren,
                args: [DraggableDirective, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9kaXJlY3RpdmVzL29yZGVyYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLGVBQWUsRUFLZixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUczQyxNQUFNLE9BQU8sa0JBQWtCO0lBVzdCLFlBQVksT0FBd0IsRUFBNEIsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFWbkUsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFVOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFF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QUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBRdWVyeUxpc3QsXHJcbiAgS2V5VmFsdWVEaWZmZXJzLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEluamVjdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbb3JkZXJhYmxlXScgfSlcclxuZXhwb3J0IGNsYXNzIE9yZGVyYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQE91dHB1dCgpIHJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSB0YXJnZXRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihEcmFnZ2FibGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcclxuICBkcmFnZ2FibGVzOiBRdWVyeUxpc3Q8RHJhZ2dhYmxlRGlyZWN0aXZlPjtcclxuXHJcbiAgcG9zaXRpb25zOiBhbnk7XHJcbiAgZGlmZmVyOiBhbnk7XHJcbiAgbGFzdERyYWdnaW5nSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIEhBQ0s6IEludmVzdGlnYXRlIEJldHRlciBXYXlcclxuICAgIHRoaXMudXBkYXRlU3Vic2NyaXB0aW9ucygpO1xyXG4gICAgdGhpcy5kcmFnZ2FibGVzLmNoYW5nZXMuc3Vic2NyaWJlKHRoaXMudXBkYXRlU3Vic2NyaXB0aW9ucy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZCA9PiB7XHJcbiAgICAgIGQuZHJhZ1N0YXJ0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIGQuZHJhZ2dpbmcudW5zdWJzY3JpYmUoKTtcclxuICAgICAgZC5kcmFnRW5kLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBkaWZmcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5jcmVhdGVNYXBEaWZmcygpKTtcclxuXHJcbiAgICBpZiAoZGlmZnMpIHtcclxuICAgICAgY29uc3Qgc3Vic2NyaWJlID0gKHsgY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlIH06IGFueSkgPT4ge1xyXG4gICAgICAgIHVuc3Vic2NyaWJlKHsgcHJldmlvdXNWYWx1ZSB9KTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgY3VycmVudFZhbHVlLmRyYWdTdGFydC5zdWJzY3JpYmUodGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZS5kcmFnZ2luZy5zdWJzY3JpYmUodGhpcy5vbkRyYWdnaW5nLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgY3VycmVudFZhbHVlLmRyYWdFbmQuc3Vic2NyaWJlKHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gKHsgcHJldmlvdXNWYWx1ZSB9OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZS5kcmFnU3RhcnQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWUuZHJhZ2dpbmcudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWUuZHJhZ0VuZC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGRpZmZzLmZvckVhY2hBZGRlZEl0ZW0oc3Vic2NyaWJlKTtcclxuICAgICAgLy8gZGlmZnMuZm9yRWFjaENoYW5nZWRJdGVtKHN1YnNjcmliZS5iaW5kKHRoaXMpKTtcclxuICAgICAgZGlmZnMuZm9yRWFjaFJlbW92ZWRJdGVtKHVuc3Vic2NyaWJlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJhZ1N0YXJ0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7fTtcclxuXHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGRyYWdnZXIgb2YgdGhpcy5kcmFnZ2FibGVzLnRvQXJyYXkoKSkge1xyXG4gICAgICBjb25zdCBlbG0gPSBkcmFnZ2VyLmVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUludChlbG0ub2Zmc2V0TGVmdC50b1N0cmluZygpLCAwKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbnNbZHJhZ2dlci5kcmFnTW9kZWwucHJvcF0gPSB7XHJcbiAgICAgICAgbGVmdCxcclxuICAgICAgICByaWdodDogbGVmdCArIHBhcnNlSW50KGVsbS5vZmZzZXRXaWR0aC50b1N0cmluZygpLCAwKSxcclxuICAgICAgICBpbmRleDogaSsrLFxyXG4gICAgICAgIGVsZW1lbnQ6IGVsbVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnZ2luZyh7IGVsZW1lbnQsIG1vZGVsLCBldmVudCB9OiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByZXZQb3MgPSB0aGlzLnBvc2l0aW9uc1ttb2RlbC5wcm9wXTtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuaXNUYXJnZXQobW9kZWwsIGV2ZW50KTtcclxuXHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgIGlmICh0aGlzLmxhc3REcmFnZ2luZ0luZGV4ICE9PSB0YXJnZXQuaSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0Q2hhbmdlZC5lbWl0KHtcclxuICAgICAgICAgIHByZXZJbmRleDogdGhpcy5sYXN0RHJhZ2dpbmdJbmRleCxcclxuICAgICAgICAgIG5ld0luZGV4OiB0YXJnZXQuaSxcclxuICAgICAgICAgIGluaXRpYWxJbmRleDogcHJldlBvcy5pbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGFzdERyYWdnaW5nSW5kZXggPSB0YXJnZXQuaTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmxhc3REcmFnZ2luZ0luZGV4ICE9PSBwcmV2UG9zLmluZGV4KSB7XHJcbiAgICAgIHRoaXMudGFyZ2V0Q2hhbmdlZC5lbWl0KHtcclxuICAgICAgICBwcmV2SW5kZXg6IHRoaXMubGFzdERyYWdnaW5nSW5kZXgsXHJcbiAgICAgICAgaW5pdGlhbEluZGV4OiBwcmV2UG9zLmluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxhc3REcmFnZ2luZ0luZGV4ID0gcHJldlBvcy5pbmRleDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJhZ0VuZCh7IGVsZW1lbnQsIG1vZGVsLCBldmVudCB9OiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByZXZQb3MgPSB0aGlzLnBvc2l0aW9uc1ttb2RlbC5wcm9wXTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmlzVGFyZ2V0KG1vZGVsLCBldmVudCk7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgIHRoaXMucmVvcmRlci5lbWl0KHtcclxuICAgICAgICBwcmV2SW5kZXg6IHByZXZQb3MuaW5kZXgsXHJcbiAgICAgICAgbmV3SW5kZXg6IHRhcmdldC5pLFxyXG4gICAgICAgIG1vZGVsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGFzdERyYWdnaW5nSW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnYXV0byc7XHJcbiAgfVxyXG5cclxuICBpc1RhcmdldChtb2RlbDogYW55LCBldmVudDogYW55KTogYW55IHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGNvbnN0IHggPSBldmVudC54IHx8IGV2ZW50LmNsaWVudFg7XHJcbiAgICBjb25zdCB5ID0gZXZlbnQueSB8fCBldmVudC5jbGllbnRZO1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9IHRoaXMuZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoeCwgeSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHRoaXMucG9zaXRpb25zKSB7XHJcbiAgICAgIC8vIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uIHdoaWNoIHRocm93cyBldmVudC5cclxuICAgICAgY29uc3QgcG9zID0gdGhpcy5wb3NpdGlvbnNbcHJvcF07XHJcblxyXG4gICAgICAvLyBzaW5jZSB3ZSBkcmFnIHRoZSBpbm5lciBzcGFuLCB3ZSBuZWVkIHRvIGZpbmQgaXQgaW4gdGhlIGVsZW1lbnRzIGF0IHRoZSBjdXJzb3JcclxuICAgICAgaWYgKG1vZGVsLnByb3AgIT09IHByb3AgJiYgdGFyZ2V0cy5maW5kKChlbDogYW55KSA9PiBlbCA9PT0gcG9zLmVsZW1lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHBvcyxcclxuICAgICAgICAgIGlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpKys7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU1hcERpZmZzKCk6IHsgW2tleTogc3RyaW5nXTogRHJhZ2dhYmxlRGlyZWN0aXZlIH0ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy50b0FycmF5KCkucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcclxuICAgICAgYWNjW2N1cnIuZHJhZ01vZGVsLiQkaWRdID0gY3VycjtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICB9XHJcbn1cclxuIl19