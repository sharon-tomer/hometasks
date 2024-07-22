import { FormInputProps } from "../../types";
import { Label, Input, Select, TextArea, Checkbox, DatePicker } from "./styles";

const FormInput: React.FC<FormInputProps> = (props) => {
  const {
    field,
    inputType,
    displayName,
    register,
    placeholder,
    errorMessage,
    lineNumber,
    children,
    noLabel,
    ...otherProps
  } = props;

  let hasError = !!props.errorMessage;

  return (
    <>
      {!noLabel && (
        <Label
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          htmlFor={props.field}
        >
          {props.displayName}
        </Label>
      )}
      {props.inputType === "input" && (
        <Input
          placeholder={props.placeholder || ""}
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.field}
          autoFocus
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.field, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "select" && (
        <Select
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.field}
          {...(otherProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
          {...props.register(props.field, {
            required: props.required ? "this is required" : false,
          })}
        >
          {props.children}
        </Select>
      )}
      {props.inputType === "textarea" && (
        <TextArea
          placeholder={props.placeholder || ""}
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.field}
          autoFocus
          {...(otherProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...props.register(props.field, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "checkbox" && (
        <Checkbox
          type="checkbox"
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.field}
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.field, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "date" && (
        <DatePicker
          type="date"
          aria-label="date"
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.field}
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.field, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
    </>
  );
};

export default FormInput;
