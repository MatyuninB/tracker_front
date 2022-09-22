import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { api } from "src/api";
import { useSnack } from "src/controllers/Snackbar/hooks/useSnack";
import { tasksActions } from "src/store/actions/task.actions";
import {
  Autocomplete,
  SelectOption,
} from "../Autocomplete/Autocomplete.component";
import { Card } from "../Card/Card.component";
import { CommonIconBtn } from "../IconButton/variants/commonIconBtn/CommonIconBtn.component";
import { TimeControlBtn } from "../IconButton/variants/timeControl/TimeControl.component";
import { Input } from "../Input/Input.component";
import { Typography } from "../Typography/Typography.component";
import style from "./TaskForm.module.css";

export const TaskForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<{ title: string; description?: string }>();
  const dispatch = useDispatch();
  const [serverTasks, setServerTasks] = useState<
    { label: string; value: string }[]
  >([]);
  const { error } = useSnack();

  const handleSelect = (
    _: BaseSyntheticEvent,
    { value }: SelectOption<string>
  ) => {
    setValue("title", value);
  };

  useEffect(() => {
    dispatch(tasksActions.getAll());
  }, []);

  const onSubmit = async (data: { title: string; desctiption?: string }) => {
    try {
      await api.task.create(data);
      dispatch(tasksActions.create(data));
      reset();
    } catch (e) {
      error("Form Error", (e as Error).message);
    }
  };

  return (
    <Card>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit, (e) =>
          error("Form Error", Object.values(e).join(" "))
        )}
      >
        <Typography className={style.title}>Create Task</Typography>
        <Autocomplete<string>
          placement="bottom"
          onSelect={handleSelect}
          options={serverTasks}
          inputLabel="Task title"
          state={errors.title && "error"}
          value={getValues("title")}
          {...register("title", {
            required: true,
          })}
        />
        <Input label="Task description" {...register("description")} />
        <CommonIconBtn variant="plus" type="submit" />
      </form>
    </Card>
  );
};
