import React, { useEffect, useState } from "react";
import type { RCP } from "types/global";
import style from "./Test.module.css";
import { CommonIconBtn } from "src/components/IconButton/variants/commonIconBtn/CommonIconBtn.component";
import { Timer } from "src/components/Timer/Timer.component";
import { TimerController } from "src/controllers/Timer/Timer.controller";
import { Snackbar } from "src/components/Snackbar/Snackbar.component";
import { useSnack } from "src/controllers/Snackbar/hooks/useSnack";
import { Input } from "src/components/Input/Input.component";
import { Timeline } from "src/components/Timeline/Timeline.component";
import { TimelineController } from "src/controllers/Timeline/Timeline.controller";
import { useDispatch, useSelector } from "react-redux";
import { timeActions } from "src/store/actions/time.actions";
import { Autocomplete } from "src/components/Autocomplete/Autocomplete.component";
import { TaskForm } from "src/components/TaskForm/TaskForm.component";
import { selectAllTasks } from "src/store/selectors/taks.selector";

interface TestPageP extends RCP {}

export const TestPage = () => {
  const { alert, error } = useSnack();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const tasks = useSelector(selectAllTasks);
  useEffect(() => {
    dispatch(timeActions.getTodayTime());
  }, []);

  useEffect(() => {
    alert("avova1", "error");
    error("error", "error1");
    alert("error3", "avovs");
  }, []);

  return (
    <div className={style.wrapper}>
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <TimelineController>
          <Timeline />
        </TimelineController>
      </div>
      {!!tasks.length &&
        tasks.map((task, i) => (
          <TimerController variant="timer" title={task.title}>
            <Timer />
          </TimerController>
        ))}
      <TaskForm />
      <Autocomplete
        width="100px"
        onSelect={(_, { value }) => setValue(value)}
        placement="bottom"
        value={value}
        inputLabel={"title"}
        options={[
          { label: "aboba", value: "aboba" },
          { label: "aboba2", value: "aboba2" },
          { label: "aboba3", value: "aboba3" },
        ]}
      />
      <Input label="Lorem inpuls aboba" width="100px" />
      <Input width="100px" state="error" />
      <Input width="100px" state="success" />
      <TimerController variant="timer" title="main">
        <Timer />
      </TimerController>
      <TimerController variant="timer" title="aboba-1">
        <Timer />
      </TimerController>
      <CommonIconBtn />
      <CommonIconBtn variant="trash" />
    </div>
  );
};
