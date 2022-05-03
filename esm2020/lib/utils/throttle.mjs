/**
 * Throttle a function
 */
export function throttle(func, wait, options) {
    options = options || {};
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        const now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvdXRpbHMvdGhyb3R0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsT0FBYTtJQUM3RCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLE9BQVksQ0FBQztJQUNqQixJQUFJLElBQVMsQ0FBQztJQUNkLElBQUksTUFBVyxDQUFDO0lBQ2hCLElBQUksT0FBTyxHQUFRLElBQUksQ0FBQztJQUN4QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFakIsU0FBUyxLQUFLO1FBQ1osUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2RCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDMUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUMxQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUVqQixJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDbEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ2YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUNqRCxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxRQUFnQixFQUFFLE9BQWE7SUFDMUQsT0FBTyxTQUFTLGNBQWMsQ0FBQyxNQUFXLEVBQUUsR0FBZ0IsRUFBRSxVQUE4QjtRQUMxRixPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVO1lBQ2pDLEdBQUcsRUFBRSxTQUFTLE1BQU07Z0JBQ2xCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDL0IsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVTtvQkFDakMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7aUJBQ3JELENBQUMsQ0FBQztnQkFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhyb3R0bGUgYSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmM6IGFueSwgd2FpdDogbnVtYmVyLCBvcHRpb25zPzogYW55KSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgbGV0IGNvbnRleHQ6IGFueTtcclxuICBsZXQgYXJnczogYW55O1xyXG4gIGxldCByZXN1bHQ6IGFueTtcclxuICBsZXQgdGltZW91dDogYW55ID0gbnVsbDtcclxuICBsZXQgcHJldmlvdXMgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBsYXRlcigpIHtcclxuICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiArbmV3IERhdGUoKTtcclxuICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogYW55KSB7XHJcbiAgICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcclxuXHJcbiAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcbiAgICBjb250ZXh0ID0gdGhpcztcclxuICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgIHByZXZpb3VzID0gbm93O1xyXG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcclxuICpcclxuICogIGNsYXNzIE15Q2xhc3Mge1xyXG4gKiAgICB0aHJvdHRsZWFibGUoMTApXHJcbiAqICAgIG15Rm4oKSB7IC4uLiB9XHJcbiAqICB9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGVhYmxlKGR1cmF0aW9uOiBudW1iZXIsIG9wdGlvbnM/OiBhbnkpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gaW5uZXJEZWNvcmF0b3IodGFyZ2V0OiBhbnksIGtleTogUHJvcGVydHlLZXksIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGUsXHJcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0dGVyKCkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcclxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGVudW1lcmFibGU6IGRlc2NyaXB0b3IuZW51bWVyYWJsZSxcclxuICAgICAgICAgIHZhbHVlOiB0aHJvdHRsZShkZXNjcmlwdG9yLnZhbHVlLCBkdXJhdGlvbiwgb3B0aW9ucylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG59XHJcbiJdfQ==