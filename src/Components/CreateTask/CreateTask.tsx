import { TaskToCreate } from "../../types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Category, Assignee } from "../../constants";
import FormInput from "../FormInput/FormInput";
import { useState } from "react";

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
  background-color: rgba(255, 255, 255, 0.8);
  padding: 12px;
  text-align: left;
  border-radius: 0 12px 12px 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(6, 1fr [col-start]);
  padding: 12px;
  column-gap: 6px;
  row-gap: 12px;
`;
const Title = styled.div`
  padding: 12px;
  text-align: center;
  font-weight: bold;
  font-size: calc(6px + 2vmin);
  color: var(--primary-color-dark);
`;

const SubmitWrapper = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 6;
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
  background-color: #9147ff;
  color: white;
  padding: 0 10px;
  :hover {
    background-color: #772ce8;
  }
`;

const Plus = styled.div`
  display: inline-block;
  font-weight: 800;
`;

function CreateTask(
  props: CreateTaskProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskToCreate>({
    defaultValues: {
      title: "",
      content: "",
      category: Category.lessThan15Minutes,
      assignee: Assignee.both,
      isUrgent: false,
    },
  });

  const [isExpended, setIsExpended] = useState(false);

  const toggleExpend = () => {
    if (isExpended) return;
    setIsExpended(!isExpended);
  };

  const onSubmit = (data: TaskToCreate) => {
    setIsExpended(false);
    props.onSubmit(data);
  };

  return (
    <Container $isExpended={isExpended} onClick={toggleExpend}>
      <Title>
        {!isExpended && <Plus>+</Plus>} Create {isExpended && "Task"}{" "}
      </Title>
      {isExpended && (
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
            defaultValue={Category.lessThan15Minutes}
          >
            <option value={Category.lessThan15Minutes}>
              {Category.lessThan15Minutes} Minutes
            </option>
            <option value={Category.unassigned}>
              {Category.unassigned} Minutes
            </option>
            <option value={Category.done}>{Category.done} Minutes</option>
          </FormInput>
          <FormInput
            inputType="select"
            displayName="assignee"
            lineNumber={4}
            required={true}
            register={register}
            errorMessage={errors.category?.message}
            defaultValue={Assignee.either}
          >
            <option value={Assignee.tomer}>{Assignee.tomer}</option>
            <option value={Assignee.nofar}>{Assignee.nofar}</option>
            <option value={Assignee.both}>{Assignee.both}</option>
            <option value={Assignee.either}>{Assignee.either}</option>
            {/* different colors */}
          </FormInput>
          <FormInput
            inputType="checkbox"
            displayName="isUrgent"
            register={register}
            errorMessage={errors.isUrgent?.message}
            lineNumber={5}
          />

          {/* add isUrgent flag */}
          <SubmitWrapper>
            <Submit type="submit" />
          </SubmitWrapper>
        </Form>
      )}
    </Container>
  );
}

export default styled(CreateTask)``;
