import { TaskToCreate } from '../../types';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { complexity, assignee } from '../../constants';

interface CreateTaskProps {
    onSubmit: (props: TaskToCreate) => void;
}

interface InputProps {
    lineNumber: number;
    placeholder?: string;
    name: ValidField;
    type: 'input' | 'select' | 'textarea';
    isRequired?: boolean;
    children?: React.ReactNode
}

type ValidField = "title" | "content" | "complexity" | "assignee"; 

const Container = styled.div`
    align-items: center;
    /* height: 20vh; */
    max-width: calc(20vw + 12px);
    margin: 20px auto 10px auto;
    /* border: 1px solid #cccccc; */
    background-color: rgba(255, 255, 255, 0.8);
    padding: 12px;
    text-align: left;
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(6, 1fr [col-start]);
    padding: 12px;
    column-gap: 6px;
    row-gap: 6px;
`
const Title = styled.div`
    padding: 12px;
    text-align: center;
    font-weight: bold;
`;

const Label = styled.label<{ $lineNumber: number; $hasError: boolean; }>`
    font-size: calc(6px + 1vmin);
    font-weight: 500;
    grid-column: 1;
    grid-row: ${props => props.$lineNumber};
    &::first-letter {
        text-transform: capitalize;
    }
`;

const Input = styled.input<{ $lineNumber: number; $hasError: boolean; }>`
    grid-column: 2;
    grid-row: ${props => props.$lineNumber};
    padding: 3px 6px;
    border-width: ${props => props.$hasError ? 'thin' : '0px'};
    border-color: ${props => props.$hasError ? 'red' : 'black'};
`;

const TextArea = styled.textarea<{ $lineNumber: number; $hasError: boolean; }>`
    grid-column: 2;
    grid-row: ${props => props.$lineNumber};
    padding: 3px 6px;
    border-width: ${props => props.$hasError ? 'thin' : '0px'};
    border-color: ${props => props.$hasError ? 'red' : 'black'};
    resize: none;
`;

const Select = styled.select<{ $lineNumber: number; $hasError: boolean; }>`
    grid-column: 2;
    grid-row: ${props => props.$lineNumber};
    justify-self: left;
    padding: 0 6px;
    border-width: ${props => props.$hasError ? 'thin' : '0px'};
    border-color: ${props => props.$hasError ? 'red' : 'black'};
`;

const Submit = styled.div`
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 6;
    padding: 0 30%;
`;

function CreateTask(props: CreateTaskProps, ref: React.LegacyRef<HTMLDivElement>) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            content: '',
            complexity: complexity.lessThan15Minutes,
            assignee: assignee.both
        }
    });

    const FormInput: React.FC<InputProps> = (props: {type: 'input' | 'select' | 'textarea', name: ValidField, placeholder?: string, lineNumber: number, isRequired?: boolean, children?: React.ReactNode}) => {
        let hasError = !!errors[props.name];

        return (
            <>
                <Label 
                    $lineNumber={props.lineNumber} 
                    $hasError={hasError} 
                    htmlFor={props.name}
                >
                    {props.name}
                </Label>
                { props.type === 'input' ? 
                    <Input 
                        placeholder={props.placeholder || ''} 
                        $lineNumber={props.lineNumber} 
                        $hasError={hasError} id={props.name} 
                        {...register(props.name, {required: props.isRequired ? "this is required" : false})} 
                    /> : 
                    ''
                }
                { props.type === 'select' ? 
                    <Select 
                        $lineNumber={props.lineNumber} 
                        $hasError={hasError} 
                        id={props.name} 
                        {...register(props.name, {required: props.isRequired ? "this is required" : false})}
                    >
                        {props.children}
                    </Select> : 
                    ''
                }
                { props.type === 'textarea' ? 
                    <TextArea 
                        placeholder={props.placeholder || ''} 
                        $lineNumber={props.lineNumber} 
                        $hasError={hasError} 
                        id={props.name} 
                        {...register(props.name, {required: props.isRequired ? "this is required" : false})}
                    >
                        {props.children}
                    </TextArea> : 
                    ''
                }
            </>
        )
    }

    return (
        <Container>
            <Title>Create Task</Title>
            <Form onSubmit={handleSubmit(props.onSubmit)}>
                <FormInput type="input" name="title" placeholder="What needs to be done" lineNumber={1} isRequired={true}/>
                <FormInput type="textarea" name="content" placeholder="The deets..." lineNumber={2} isRequired={true}/>
                <FormInput type="select" name="complexity" lineNumber={3} isRequired={true}>
                    <option value={complexity.lessThan15Minutes} selected>{complexity.lessThan15Minutes} Minutes</option>
                    <option value={complexity.lessThan1Hour}>{complexity.lessThan1Hour} Minutes</option>
                    <option value={complexity.moreThan1Hour}>{complexity.moreThan1Hour} Minutes</option>
                </FormInput>
                <FormInput type="select" name="assignee" lineNumber={4} isRequired={true}>
                    <option value={assignee.tomer}>{assignee.tomer}</option>
                    <option value={assignee.nofar}>{assignee.nofar}</option>
                    <option value={assignee.both}>{assignee.both}</option>
                </FormInput>
                <Submit>
                    <input type="submit" />
                </Submit>
            </Form>
        </Container>

    );
}

export default styled(CreateTask)``;