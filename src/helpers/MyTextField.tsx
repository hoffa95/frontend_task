import React from 'react';
import { FieldAttributes, useField } from 'formik';
import MuiTextField, {TextFieldProps as MuiTextFieldProps}from '@material-ui/core/TextField';

export type TextFieldProps = FieldAttributes<{}> &
  Omit<MuiTextFieldProps, 'error' | 'name' | 'onChange' | 'value'> & {
    variant: 'standard' | 'filled' | 'outlined' | undefined;
  };

const MyTextField: React.FC<TextFieldProps> = ({
  type,
  placeholder,
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <MuiTextField
      placeholder={placeholder}
      type={type}
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
      variant = "outlined"
      className = "mytextfield"
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default MyTextField;