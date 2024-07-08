import styled from "styled-components";
import { TaskToCreate } from "../../types";
import { UseFormRegister } from "react-hook-form";

interface CommonInputProps {
  register: UseFormRegister<TaskToCreate>;
  lineNumber: number;
  placeholder?: string;
  displayName: ValidField;
  errorMessage?: string;
  inputType: "input" | "select" | "textarea" | "checkbox" | "date";
  children?: React.ReactNode;
}

interface InputProps
  extends CommonInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

interface SelectProps
  extends CommonInputProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {}

interface TextAreaProps
  extends CommonInputProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

type Props = InputProps | SelectProps | TextAreaProps;

type ValidField =
  | "title"
  | "content"
  | "category"
  | "assignee"
  | "completeBy"
  | "isUrgent";

const Label = styled.label<{ $lineNumber: number; $hasError: boolean }>`
  font-size: calc(6px + 1vmin);
  font-weight: 500;
  grid-column: 1;
  grid-row: ${(props) => props.$lineNumber};
  &::first-letter {
    text-transform: capitalize;
  }
`;

const Input = styled.input<{ $lineNumber: number; $hasError: boolean }>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  padding: 3px 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
`;

const TextArea = styled.textarea<{ $lineNumber: number; $hasError: boolean }>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  padding: 3px 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
  resize: none;
`;

const Select = styled.select<{ $lineNumber: number; $hasError: boolean }>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  justify-self: left;
  padding: 0 6px;
  border-width: ${(props) => (props.$hasError ? "thin" : "0px")};
  border-color: ${(props) => (props.$hasError ? "red" : "black")};
`;

const Checkbox = styled.input<{ $lineNumber: number; $hasError: boolean }>`
  grid-column: 2;
  grid-row: ${(props) => props.$lineNumber};
  justify-self: left;
  border-width: thin;
  border-color: var(--primary-color);
  height: 18px;
  width: 18px;
  &:checked {
    accent-color: var(--secondary-color);
  }
`;

const Date = styled.input<{ $lineNumber: number; $hasError: boolean }>``;

const FormInput: React.FC<Props> = (props) => {
  const {
    inputType,
    displayName,
    register,
    placeholder,
    errorMessage,
    lineNumber,
    children,
    ...otherProps
  } = props;

  let hasError = !!props.errorMessage;

  return (
    <>
      <Label
        $lineNumber={props.lineNumber}
        $hasError={hasError}
        htmlFor={props.displayName}
      >
        {props.displayName}
      </Label>
      {props.inputType === "input" && (
        <Input
          placeholder={props.placeholder || ""}
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.displayName}
          autoFocus
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.displayName, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "select" && (
        <Select
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.displayName}
          {...(otherProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
          {...props.register(props.displayName, {
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
          id={props.displayName}
          autoFocus
          {...(otherProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...props.register(props.displayName, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "checkbox" && (
        <Checkbox
          type="checkbox"
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.displayName}
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.displayName, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
      {props.inputType === "date" && (
        <Date
          type="date"
          aria-label="date"
          $lineNumber={props.lineNumber}
          $hasError={hasError}
          id={props.displayName}
          {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
          {...props.register(props.displayName, {
            required: props.required ? "this is required" : false,
          })}
        />
      )}
    </>
  );
};

export default FormInput;
