/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-prop-types */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import CustomOption from './CustomOption';
import CustomSingleValue from './CustomSingleValue';

interface SelectProps {
  placeholder?: string;
  name: string;
  id: string;
  options: Options[];
  control: any;
  hasError?: boolean;
  changeOption?: boolean;
  defaultValue?: Options | Options[];
  disabled?: boolean;
  value?: any;
  isMulti?: boolean;
  onChangeAlt?: any;
  dinamicLabel?: string;
}

export interface Options {
  value: any;
  label: string;
  color?: string;
}

const CustomDropdownIndicator = ({
  selectProps: { menuIsOpen },
  ...props
}: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/img/register/select-arrow.svg"
        alt="arrow"
        className={cn('transition-transform duration-200', {
          'rotate-180': menuIsOpen,
        })}
      />
    </components.DropdownIndicator>
  );
};

const getSelectStyles = (hasError?: boolean) => ({
  control: (base: any, state: any) => ({
    ...base,
    width: '100%',
    height: '2.5rem',
    minHeight: 'unset',
    background: '#FEFEFD',
    borderRadius: state.selectProps.menuIsOpen
      ? '0.625rem 0.625rem 0 0'
      : '0.625rem',
    border: hasError ? '1px solid #DE3737' : '1px solid #DEDEDE',
    borderBottom: state.selectProps.menuIsOpen ? 'none' : '1px solid #DEDEDE',
    boxShadow: 'none !important',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    color: '#747373',
    outline: 'none !important',
    '&:hover': {
      border: hasError ? '1px solid #DE3737' : '1px solid #DEDEDE',
      borderBottom: state.selectProps.menuIsOpen ? 'none' : '1px solid #DEDEDE',
      outline: 'none !important',
    },
    cursor: 'pointer',
    padding: '0',
  }),
  container: (base: any) => ({
    ...base,
    width: '100%',
    height: 'fit-content',
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: '100%',
    padding: '0 1rem',
    textAlign: 'left',
  }),
  input: (base: any) => ({
    ...base,
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    color: '#747373',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: '100%',
  }),
  placeholder: (base: any, state: any) => ({
    ...base,
    color: state.selectProps.menuIsOpen ? '#747373' : 'transparent',
  }),
  menu: (base: any) => ({
    ...base,
    textAlign: 'left',
    backgroundColor: '#FEFEFD',
    borderRadius: '0 0 0.625rem 0.625rem',
    border: hasError ? '1px solid #DE3737' : '1px solid #DEDEDE',
    borderTop: 'none !important',
    outline: 'none !important',
    boxShadow: 'none !important',
    overflowX: 'hidden',
    margin: '0',
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    color: '#1C1C1E',
    padding: '0',
  }),
  option: (base: any) => ({
    ...base,
    backgroundColor: 'transparent !important',
    color: '#1C1C1E',
    border: 'none',
    cursor: 'pointer',
    paddingLeft: '1rem',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    display: state.isDisabled ? 'none' : 'flex',
    color: '#595A5B',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      color: '#595A5B',
    },
  }),
});

const getRelativeSelectStyles = (hasError?: boolean) => ({
  ...getSelectStyles(hasError),
  control: (base: any, state: any) => ({
    ...getSelectStyles(hasError).control(base, state),
    border: hasError ? '1px solid #DE3737' : '1px solid #D1D0D0',
    borderBottom: state.selectProps.menuIsOpen ? 'none' : '',
    fontFamily: 'Lexend',
    fontWeight: 300,
    zIndex: 2,
    position: 'relative',
  }),
  menu: (base: any) => ({
    ...getSelectStyles(hasError).menu(base),
    border: hasError ? '1px solid #DE3737' : '1px solid #D1D0D0',
    borderTop: 'none',
    zIndex: 1,
    position: 'absolute',
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: '1rem',
    fontFamily: 'Lexend',
    fontWeight: 300,
    color: '#454545',
  }),
  option: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    height: '2.5rem',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontFamily: 'Lexend',
    fontWeight: 300,
    color: '#454545',
    padding: '0 1rem',
    cursor: 'pointer',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#747373',
    fontFamily: 'Lexend',
    fontWeight: 300,
  }),
  input: (base: any) => ({
    ...base,
    fontSize: '1rem',
    fontFamily: 'Lexend',
    fontWeight: 300,
    color: '#454545',
  }),
});

export const AnimatedSelect = ({
  name,
  id,
  options,
  control,
  disabled,
  hasError,
  dinamicLabel,
  changeOption,
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => {
          const hasValue =
            value && (Array.isArray(value) ? value.length > 0 : true);
          const shouldAnimateLabel = isFocused || hasValue || menuIsOpen;

          return (
            <>
              <label
                htmlFor={id}
                className="pointer-events-none absolute left-[0.7rem] z-10 origin-left transition-all duration-200 ease-in-out"
                style={{
                  top: shouldAnimateLabel ? '-1rem' : '0.625rem',
                  fontSize: shouldAnimateLabel ? '0.625rem' : '1rem',
                  backgroundColor: shouldAnimateLabel
                    ? '#ffffff'
                    : 'transparent',
                  padding: shouldAnimateLabel ? '0.25rem 0.375rem' : '0',
                  borderRadius: '0.5rem 0.5rem 0 0',
                }}
              >
                {dinamicLabel}
              </label>

              <Select
                onChange={(event: any) => {
                  if (event && value && event.value === value.value) {
                    onChange(null);
                  } else {
                    onChange(event);
                  }
                }}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => {
                  setMenuIsOpen(false);
                  setIsFocused(false);
                }}
                components={{
                  IndicatorSeparator: () => null,
                  Option: changeOption ? CustomOption : components.Option,
                  SingleValue: changeOption
                    ? CustomSingleValue
                    : components.SingleValue,
                }}
                noOptionsMessage={() => 'Sem opções'}
                maxMenuHeight={168}
                placeholder="Selecione"
                isSearchable={false}
                value={value}
                name={name}
                options={options}
                id={id}
                isDisabled={disabled}
                styles={getSelectStyles(hasError)}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export const AnimatedRelativeSelect = ({
  name,
  id,
  options,
  control,
  disabled,
  hasError,
  dinamicLabel,
  onChangeAlt,
  changeOption,
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => {
          const hasValue =
            value && (Array.isArray(value) ? value.length > 0 : true);
          const shouldAnimateLabel = isFocused || hasValue || menuIsOpen;

          return (
            <>
              <label
                htmlFor={id}
                className="pointer-events-none absolute left-[0.7rem] z-10 origin-left transition-all duration-200 ease-in-out"
                style={{
                  top: shouldAnimateLabel ? '-1rem' : '0.625rem',
                  fontSize: shouldAnimateLabel ? '0.625rem' : '1rem',
                  backgroundColor: shouldAnimateLabel
                    ? '#ffffff'
                    : 'transparent',
                  padding: shouldAnimateLabel ? '0.25rem 0.375rem' : '0',
                  borderRadius: '0.5rem 0.5rem 0 0',
                }}
              >
                {dinamicLabel}
              </label>

              <Select
                onChange={(event: any) => {
                  if (
                    event &&
                    value &&
                    event.value === value.value &&
                    onChangeAlt
                  ) {
                    onChangeAlt(null);
                  } else if (onChangeAlt) {
                    onChangeAlt(event);
                  }
                  if (event && value && event.value === value.value) {
                    onChange(null);
                  } else {
                    onChange(event);
                  }
                }}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => {
                  setMenuIsOpen(false);
                  setIsFocused(false);
                }}
                components={{
                  IndicatorSeparator: () => null,
                  Option: changeOption ? CustomOption : components.Option,
                  SingleValue: changeOption
                    ? CustomSingleValue
                    : components.SingleValue,
                }}
                noOptionsMessage={() => 'Sem opções'}
                maxMenuHeight={168}
                placeholder="Selecione"
                isSearchable={false}
                value={value}
                name={name}
                options={options}
                id={id}
                isDisabled={disabled}
                styles={{
                  ...getSelectStyles(hasError),
                  menu: (base: any) => ({
                    ...getSelectStyles(hasError).menu(base),
                    position: 'relative',
                  }),
                }}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export const RelativeSelect = ({
  placeholder,
  name,
  id,
  options,
  control,
  disabled,
  hasError,
}: SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => {
        return (
          <Select
            onChange={onChange}
            onBlur={onBlur}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: CustomDropdownIndicator,
            }}
            noOptionsMessage={() => 'Sem opções'}
            maxMenuHeight={188}
            placeholder={placeholder}
            isDisabled={disabled}
            value={value}
            name={name}
            options={options}
            id={id}
            styles={getRelativeSelectStyles(hasError)}
          />
        );
      }}
    />
  );
};
