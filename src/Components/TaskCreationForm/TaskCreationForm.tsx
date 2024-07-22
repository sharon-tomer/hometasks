import { TaskToCreate } from "../../types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Category, Assignee } from "../../constants";
import FormInput from "../FormInput/FormInput";
import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { AppDispatchContext } from "../../Contexts/AppContext";
import { actions } from "../../Actions/TaskActions";
import {
  Container,
  Title,
  CloseButton,
  SubmitWrapper,
  Submit,
  Form,
} from "./styles";

const TaskCreationForm = () => {
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
      completeBy: moment().add(7, "day").format("yyyy-MM-DD"),
      isUrgent: false,
    },
  });
  const dispatch = useContext(AppDispatchContext);
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
      if (isExpended && !ref.current?.contains(document.activeElement)) {
        setIsExpended(false);
        reset();
      }
    }, 0);
  };

  const onSubmit = (data: TaskToCreate) => {
    reset();
    setIsExpended(false);
    dispatch(actions.addTask(data));
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
              field="title"
              displayName="Title"
              placeholder="What needs to be done"
              lineNumber={1}
              required={true}
              register={register}
              errorMessage={errors.title?.message}
            />
            <FormInput
              inputType="textarea"
              field="content"
              displayName="Content"
              placeholder="The deets..."
              lineNumber={2}
              required={true}
              register={register}
              errorMessage={errors.content?.message}
            />
            <FormInput
              inputType="select"
              field="category"
              displayName="Category"
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
              field="assignee"
              displayName="Assignee"
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
            </FormInput>
            <FormInput
              inputType="date"
              field="completeBy"
              displayName="Complete By"
              register={register}
              errorMessage={errors.completeBy?.message}
              lineNumber={5}
            ></FormInput>
            <FormInput
              inputType="checkbox"
              field="isUrgent"
              displayName="Is Urgent?"
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
};

export default styled(TaskCreationForm)``;
