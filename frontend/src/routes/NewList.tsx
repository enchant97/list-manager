import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginProvider";
import { newList } from "../core/api";
import styles from "../styles/Core.module.css";

export type NewListState = {
  title: string;
  description: string;
}

function NewList() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [new_list, setNewList] = useState<NewListState>({ title: "", description: "" });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewList({ title: event.target.value, description: new_list.description });
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewList({ title: new_list.title, description: event.target.value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login) {
      let created_list = await newList(login, new_list);
      navigate(`/lists/${created_list.id}`);
    }
  };

  useEffect(() => { if (login === null) { navigate("/login"); } })

  return (
    <form className={styles.twoCol} onSubmit={handleSubmit}>
      <h1 className={styles.fillBoth}>New List</h1>
      <label htmlFor="new-list-title">Title</label>
      <input type="text" name="new-list-title" id="new-list-title" value={new_list.title} onChange={handleTitleChange} maxLength={80} autoFocus required />
      <label htmlFor="new-list-desc">Description</label>
      <input type="text" name="new-list-desc" id="new-list-desc" value={new_list.description} onChange={handleDescriptionChange} maxLength={255} />
      <button className={styles.fillBoth} type="submit">Create</button>
      <button className={styles.fillBoth} type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  );
}

export default NewList;
