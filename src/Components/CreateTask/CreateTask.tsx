import { TaskToCreate } from "../../types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Category, Assignee } from "../../constants";
import FormInput from "../FormInput/FormInput";
import { useEffect, useRef, useState } from "react";

interface CreateTaskProps {
  onSubmit: (props: TaskToCreate) => void;
}

const Container = styled.div<{ $isExpended: boolean }>`
  position: absolute;
  z-index: 2;
  top: 20%;
  left: 0;
  align-items: center;
  /* height: 20vh; */
  max-width: ${(props) =>
    props.$isExpended ? `calc(20vw + 12px)` : `calc(10vw + 12px)`};
  margin: 20px auto 10px auto;
  /* border: 1px solid #cccccc; */
  background-color: var(--primary-color-light);
  box-shadow: 0 0 12px 0 var(--primary-color-dark);
  opacity: 0.85;
  padding: 12px;
  text-align: left;
  border-radius: 0 12px 12px 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(7, 1fr [col-start]);
  padding: 12px;
  column-gap: 6px;
  row-gap: 12px;
  align-items: flex-start;
  & > * > input {
    padding: 12px;
  }
`;
const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: calc(6px + 2vmin);
  color: var(--primary-color-dark);
`;

const SubmitWrapper = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 7;
  padding: 0 30%;
`;

const Submit = styled.input`
  display: inline-block;
  outline: 0;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 13px;
  background-color: var(--secondary-color);
  color: white;
  &:hover {
    background-color: var(--secondary-color-dark);
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight: 800;
    transform: scale(1.2);
  }
`;

function CreateTask(props: CreateTaskProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<TaskToCreate>({
    defaultValues: {
      title: "",
      content: "",
      category: Category.lessThan15Minutes,
      assignee: Assignee.unassigned,
      isUrgent: false,
    },
  });

  const [isExpended, setIsExpended] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpended) {
      setFocus("title");
    }
  }, [setFocus, isExpended]);

  const toggleExpend = () => {
    setIsExpended(!isExpended);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (isExpended && !ref.current?.contains(document.activeElement))
        setIsExpended(false);
    }, 0);
  };

  const onSubmit = (data: TaskToCreate) => {
    reset();
    setIsExpended(false);
    props.onSubmit(data);
  };

  return (
    <Container
      ref={ref}
      $isExpended={isExpended}
      onBlur={handleOnBlur}
      tabIndex={-1}
    >
      {!isExpended && <Title onClick={toggleExpend}>+ Create</Title>}
      {isExpended && (
        <>
          <Title> Create Task</Title>
          <CloseButton onClick={toggleExpend}> X </CloseButton>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              inputType="input"
              displayName="title"
              placeholder="What needs to be done"
              lineNumber={1}
              required={true}
              register={register}
              errorMessage={errors.title?.message}
            />
            <FormInput
              inputType="textarea"
              displayName="content"
              placeholder="The deets..."
              lineNumber={2}
              required={true}
              register={register}
              errorMessage={errors.content?.message}
            />
            <FormInput
              inputType="select"
              displayName="category"
              lineNumber={3}
              required={true}
              register={register}
              errorMessage={errors.category?.message}
            >
              <option value={Category.lessThan15Minutes}>
                {Category.lessThan15Minutes} Minutes
              </option>
              <option value={Category.moreThan15Minutes}>
                {Category.moreThan15Minutes} Minutes
              </option>
              <option value={Category.done}>{Category.done}</option>
            </FormInput>
            <FormInput
              inputType="select"
              displayName="assignee"
              lineNumber={4}
              required={true}
              register={register}
              errorMessage={errors.category?.message}
            >
              <option value={Assignee.tomer}>{Assignee.tomer}</option>
              <option value={Assignee.nofar}>{Assignee.nofar}</option>
              <option value={Assignee.both}>{Assignee.both}</option>
              <option value={Assignee.either}>{Assignee.either}</option>
              <option value={Assignee.unassigned}>{Assignee.unassigned}</option>

              {/* different colors */}
            </FormInput>
            <FormInput
              inputType="date"
              displayName="completeBy"
              register={register}
              errorMessage={errors.completeBy?.message}
              lineNumber={5}
            ></FormInput>
            <FormInput
              inputType="checkbox"
              displayName="isUrgent"
              register={register}
              errorMessage={errors.isUrgent?.message}
              lineNumber={6}
            />

            {/* add isUrgent flag */}
            <SubmitWrapper>
              <Submit type="submit" />
            </SubmitWrapper>
          </Form>
        </>
      )}
    </Container>
  );
}

export default styled(CreateTask)``;
