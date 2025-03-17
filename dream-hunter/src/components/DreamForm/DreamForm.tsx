import { FormEvent, ReactNode, useContext, useEffect, useState } from "react";

import Button from "../Button/Button.tsx";
import DateInput from "../DateInput/DateInput.tsx";
import Select from "../Select/Select.tsx";
import TextArea from "../TextArea/TextArea.tsx";
import TextInput from "../TextInput/TextInput.tsx";

import { DreamsContext } from "../../contexts/DreamsContext.ts";

import { Dream } from "../../types/dream.ts";
import { Vibe } from "../../types/vibe.ts";

import styles from "./DreamForm.module.css";

type Props = {
  editingDream?: Dream;
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
};

function DreamForm({ editingDream, onCancel, onSubmit }: Props): ReactNode {
  const { createDream, editDream } = useContext(DreamsContext);

  const [dream, setDream] = useState<Dream>(generateEmptyDream);

  useEffect(() => {
    setDream(editingDream ? { ...editingDream } : generateEmptyDream());
  }, [editingDream]);

  const cancelButtonClickHandler = (): void => {
    onCancel();
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (editingDream) {
      editDream(dream);
    } else {
      createDream(dream);
    }

    setDream(generateEmptyDream());

    onSubmit();
  };

  return (
    <form className={styles["create-form"]} onSubmit={formSubmitHandler}>
      <div className={styles.title}>
        {editingDream ? `Edit ${editingDream.title}` : "Create a New Dream"}
      </div>
      <TextInput
        name="title"
        placeholder="Input your title..."
        value={dream.title}
        onChange={(e) => setDream((old) => ({ ...old, title: e.target.value }))}
      />
      <TextArea
        name="description"
        placeholder="Input your description..."
        value={dream.description}
        onChange={(e) =>
          setDream((old) => ({ ...old, description: e.target.value }))
        }
      />
      <DateInput
        name="date"
        value={dream.date}
        onChange={(e) => setDream((old) => ({ ...old, date: e.target.value }))}
      />
      <Select
        name="vibe"
        variant="outlined"
        options={[
          { value: "good", label: "🥰 Good" },
          { value: "bad", label: "😭 Bad" },
        ]}
        value={dream.vibe}
        onChange={(e) =>
          setDream((old) => ({ ...old, vibe: e.target.value as Vibe }))
        }
      />
      <div className={styles.actions}>
        <Button
          type="button"
          variant="outlined"
          onClick={cancelButtonClickHandler}
        >
          Cancel
        </Button>
        <Button>{editingDream ? "Edit" : "Apply"}</Button>
      </div>
    </form>
  );
}

function generateEmptyDream(): Dream {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    date: "",
    vibe: "good",
  };
}

export default DreamForm;
