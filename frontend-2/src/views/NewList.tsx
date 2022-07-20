import { useNavigate } from "solid-app-router";
import { Component, createEffect, createSignal, useContext } from "solid-js"
import { LoginContext } from "../contexts/LoginProvider";
import { newList } from "../core/api";
import shared_styles from "../Shared.module.css";

export type NewListSignal = {
  title: string;
  description: string;
}

const NewList: Component = () => {
  const navigate = useNavigate();
  const { isLoggedIn, getLogin } = useContext(LoginContext);
  const [getNewList, setNewList] = createSignal<NewListSignal>({ title: "", description: "" });

  const handleTitleChange = (event: any) => {
    setNewList({ title: event.target.value, description: getNewList().description });
  };
  const handleDescriptionChange = (event: any) => {
    setNewList({ title: getNewList().title, description: event.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isLoggedIn()) {
      let created_list = await newList(getLogin(), getNewList());
      navigate(`/lists/${created_list.id}`);
    }
  };

  createEffect(() => { if (!isLoggedIn()) { navigate("/login"); } })

  return (
    <form class={shared_styles.twoCol} onSubmit={handleSubmit}>
      <h1 class={shared_styles.fillBoth}>New List</h1>
      <label for="new-list-title">Title</label>
      <input type="text" name="new-list-title" id="new-list-title"
        value={getNewList().title}
        onChange={handleTitleChange}
        maxLength={80} autofocus required
      />
      <label for="new-list-desc">Description</label>
      <input type="text" name="new-list-desc" id="new-list-desc"
        value={getNewList().description}
        onChange={handleDescriptionChange}
        maxLength={255}
      />
      <button class={shared_styles.fillBoth} type="submit">Create</button>
      <button class={shared_styles.fillBoth} type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  );
};

export default NewList;
