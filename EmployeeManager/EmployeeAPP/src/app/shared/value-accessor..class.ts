import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export abstract class ValueAccessor<T> implements ControlValueAccessor {
  _value: any = '';
  get value(): T {
    return this._value;
  }
  set value(v: T) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: T) {
    this._value = value;
    this.onChange(value);
  }

  onChange = (_: T) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
