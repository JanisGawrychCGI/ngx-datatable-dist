import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SelectionType } from '../../types/selection.type';
import { selectRowsBetween, selectRows } from '../../utils/selection';
import { Keys } from '../../utils/keys';
import * as i0 from "@angular/core";
export class DataTableSelectionComponent {
    constructor() {
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
    }
    selectRow(event, index, row) {
        if (!this.selectEnabled)
            return;
        const chkbox = this.selectionType === SelectionType.checkbox;
        const multi = this.selectionType === SelectionType.multi;
        const multiClick = this.selectionType === SelectionType.multiClick;
        let selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        this.prevIndex = index;
        this.select.emit({
            selected
        });
    }
    onActivate(model, index) {
        const { type, event, row } = model;
        const chkbox = this.selectionType === SelectionType.checkbox;
        const select = (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    }
    onKeyboardFocus(model) {
        const { keyCode } = model.event;
        const shouldFocus = keyCode === Keys.up || keyCode === Keys.down || keyCode === Keys.right || keyCode === Keys.left;
        if (shouldFocus) {
            const isCellSelection = this.selectionType === SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    }
    focusRow(rowElement, keyCode) {
        const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    }
    getPrevNextRow(rowElement, keyCode) {
        const parentElement = rowElement.parentElement;
        if (parentElement) {
            let focusElement;
            if (keyCode === Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    }
    focusCell(cellElement, rowElement, keyCode, cellIndex) {
        let nextCellElement;
        if (keyCode === Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === Keys.up || keyCode === Keys.down) {
            const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                const children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    }
    getRowSelected(row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    }
    getRowSelectedIdx(row, selected) {
        if (!selected || !selected.length)
            return -1;
        const rowId = this.rowIdentity(row);
        return selected.findIndex(r => {
            const id = this.rowIdentity(r);
            return id === rowId;
        });
    }
}
DataTableSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableSelectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataTableSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: DataTableSelectionComponent, selector: "datatable-selection", inputs: { rows: "rows", selected: "selected", selectEnabled: "selectEnabled", selectionType: "selectionType", rowIdentity: "rowIdentity", selectCheck: "selectCheck" }, outputs: { activate: "activate", select: "select" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: DataTableSelectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'datatable-selection',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { rows: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectEnabled: [{
                type: Input
            }], selectionType: [{
                type: Input
            }], rowIdentity: [{
                type: Input
            }], selectCheck: [{
                type: Input
            }], activate: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2JvZHkvc2VsZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQWdCeEMsTUFBTSxPQUFPLDJCQUEyQjtJQUx4QztRQWFZLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7S0EySDFEO0lBdkhDLFNBQVMsQ0FBQyxLQUFpQyxFQUFFLEtBQWEsRUFBRSxHQUFRO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87UUFFaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzdELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLEtBQUssQ0FBQztRQUN6RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDbkUsSUFBSSxRQUFRLEdBQVUsRUFBRSxDQUFDO1FBRXpCLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxVQUFVLEVBQUU7WUFDakMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFF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U0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7d0hBbklVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLHdSQUg1Qiw2QkFBNkI7MkZBRzVCLDJCQUEyQjtrQkFMdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFFSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBzZWxlY3RSb3dzQmV0d2Vlbiwgc2VsZWN0Um93cyB9IGZyb20gJy4uLy4uL3V0aWxzL3NlbGVjdGlvbic7XHJcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWwge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgcm93OiBhbnk7XHJcbiAgcm93RWxlbWVudDogYW55O1xyXG4gIGNlbGxFbGVtZW50OiBhbnk7XHJcbiAgY2VsbEluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXNlbGVjdGlvbicsXHJcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVTZWxlY3Rpb25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHJvd3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXTtcclxuICBASW5wdXQoKSBzZWxlY3RFbmFibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGU7XHJcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6IGFueTtcclxuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcmV2SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgc2VsZWN0Um93KGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgaW5kZXg6IG51bWJlciwgcm93OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RFbmFibGVkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2hrYm94ID0gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xyXG4gICAgY29uc3QgbXVsdGkgPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XHJcbiAgICBjb25zdCBtdWx0aUNsaWNrID0gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLm11bHRpQ2xpY2s7XHJcbiAgICBsZXQgc2VsZWN0ZWQ6IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKG11bHRpIHx8IGNoa2JveCB8fCBtdWx0aUNsaWNrKSB7XHJcbiAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93c0JldHdlZW4oW10sIHRoaXMucm93cywgaW5kZXgsIHRoaXMucHJldkluZGV4LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xyXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fCBtdWx0aUNsaWNrIHx8IGNoa2JveCkge1xyXG4gICAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93cyhbLi4udGhpcy5zZWxlY3RlZF0sIHJvdywgdGhpcy5nZXRSb3dTZWxlY3RlZElkeC5iaW5kKHRoaXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdFJvd3MoW10sIHJvdywgdGhpcy5nZXRSb3dTZWxlY3RlZElkeC5iaW5kKHRoaXMpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RSb3dzKFtdLCByb3csIHRoaXMuZ2V0Um93U2VsZWN0ZWRJZHguYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNlbGVjdENoZWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQuZmlsdGVyKHRoaXMuc2VsZWN0Q2hlY2suYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZC5sZW5ndGgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcclxuXHJcbiAgICB0aGlzLnByZXZJbmRleCA9IGluZGV4O1xyXG5cclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICBzZWxlY3RlZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKG1vZGVsOiBNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgeyB0eXBlLCBldmVudCwgcm93IH0gPSBtb2RlbDtcclxuICAgIGNvbnN0IGNoa2JveCA9IHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jaGVja2JveDtcclxuICAgIGNvbnN0IHNlbGVjdCA9ICghY2hrYm94ICYmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUgPT09ICdkYmxjbGljaycpKSB8fCAoY2hrYm94ICYmIHR5cGUgPT09ICdjaGVja2JveCcpO1xyXG5cclxuICAgIGlmIChzZWxlY3QpIHtcclxuICAgICAgdGhpcy5zZWxlY3RSb3coZXZlbnQsIGluZGV4LCByb3cpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAna2V5ZG93bicpIHtcclxuICAgICAgaWYgKCg8S2V5Ym9hcmRFdmVudD5ldmVudCkua2V5Q29kZSA9PT0gS2V5cy5yZXR1cm4pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFJvdyhldmVudCwgaW5kZXgsIHJvdyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vbktleWJvYXJkRm9jdXMobW9kZWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQobW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlib2FyZEZvY3VzKG1vZGVsOiBNb2RlbCk6IHZvaWQge1xyXG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSA8S2V5Ym9hcmRFdmVudD5tb2RlbC5ldmVudDtcclxuICAgIGNvbnN0IHNob3VsZEZvY3VzID0ga2V5Q29kZSA9PT0gS2V5cy51cCB8fCBrZXlDb2RlID09PSBLZXlzLmRvd24gfHwga2V5Q29kZSA9PT0gS2V5cy5yaWdodCB8fCBrZXlDb2RlID09PSBLZXlzLmxlZnQ7XHJcblxyXG4gICAgaWYgKHNob3VsZEZvY3VzKSB7XHJcbiAgICAgIGNvbnN0IGlzQ2VsbFNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5jZWxsO1xyXG5cclxuICAgICAgaWYgKCFtb2RlbC5jZWxsRWxlbWVudCB8fCAhaXNDZWxsU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c1Jvdyhtb2RlbC5yb3dFbGVtZW50LCBrZXlDb2RlKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NlbGxTZWxlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZvY3VzQ2VsbChtb2RlbC5jZWxsRWxlbWVudCwgbW9kZWwucm93RWxlbWVudCwga2V5Q29kZSwgbW9kZWwuY2VsbEluZGV4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXNSb3cocm93RWxlbWVudDogYW55LCBrZXlDb2RlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5leHRSb3dFbGVtZW50ID0gdGhpcy5nZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50LCBrZXlDb2RlKTtcclxuICAgIGlmIChuZXh0Um93RWxlbWVudCkgbmV4dFJvd0VsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldFByZXZOZXh0Um93KHJvd0VsZW1lbnQ6IGFueSwga2V5Q29kZTogbnVtYmVyKTogYW55IHtcclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSByb3dFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgbGV0IGZvY3VzRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlzLnVwKSB7XHJcbiAgICAgICAgZm9jdXNFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEtleXMuZG93bikge1xyXG4gICAgICAgIGZvY3VzRWxlbWVudCA9IHBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZm9jdXNFbGVtZW50ICYmIGZvY3VzRWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZm9jdXNFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c0NlbGwoY2VsbEVsZW1lbnQ6IGFueSwgcm93RWxlbWVudDogYW55LCBrZXlDb2RlOiBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgbmV4dENlbGxFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoa2V5Q29kZSA9PT0gS2V5cy5sZWZ0KSB7XHJcbiAgICAgIG5leHRDZWxsRWxlbWVudCA9IGNlbGxFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEtleXMucmlnaHQpIHtcclxuICAgICAgbmV4dENlbGxFbGVtZW50ID0gY2VsbEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBLZXlzLnVwIHx8IGtleUNvZGUgPT09IEtleXMuZG93bikge1xyXG4gICAgICBjb25zdCBuZXh0Um93RWxlbWVudCA9IHRoaXMuZ2V0UHJldk5leHRSb3cocm93RWxlbWVudCwga2V5Q29kZSk7XHJcbiAgICAgIGlmIChuZXh0Um93RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbmV4dFJvd0VsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YXRhYmxlLWJvZHktY2VsbCcpO1xyXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIG5leHRDZWxsRWxlbWVudCA9IGNoaWxkcmVuW2NlbGxJbmRleF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobmV4dENlbGxFbGVtZW50KSBuZXh0Q2VsbEVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldFJvd1NlbGVjdGVkKHJvdzogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRSb3dTZWxlY3RlZElkeChyb3csIHRoaXMuc2VsZWN0ZWQpID4gLTE7XHJcbiAgfVxyXG5cclxuICBnZXRSb3dTZWxlY3RlZElkeChyb3c6IGFueSwgc2VsZWN0ZWQ6IGFueVtdKTogbnVtYmVyIHtcclxuICAgIGlmICghc2VsZWN0ZWQgfHwgIXNlbGVjdGVkLmxlbmd0aCkgcmV0dXJuIC0xO1xyXG5cclxuICAgIGNvbnN0IHJvd0lkID0gdGhpcy5yb3dJZGVudGl0eShyb3cpO1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkLmZpbmRJbmRleChyID0+IHtcclxuICAgICAgY29uc3QgaWQgPSB0aGlzLnJvd0lkZW50aXR5KHIpO1xyXG4gICAgICByZXR1cm4gaWQgPT09IHJvd0lkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==