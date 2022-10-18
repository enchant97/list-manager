import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js"
import { useLogin } from "../contexts/LoginProvider";
import { newList } from "../core/api";

type NewListSignal = {
  title: string;
  description: string;
}

const NewList: Component = () => {
  const navigate = useNavigate();
  const [login] = useLogin();
  const [getNewList, setNewList] = createSignal<NewListSignal>({ title: "", description: "" });

  const handleTitleChange = (event: any) => {
    setNewList({ title: event.target.value, description: getNewList().description });
  };
  const handleDescriptionChange = (event: any) => {
    setNewList({ title: getNewList().title, description: event.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currLogin = login();
    if (currLogin) {
      let created_list = await newList(currLogin, getNewList());
      navigate(`/lists/${created_list.id}`);
    }
  };

  createEffect(() => { if (!login()) { navigate("/login"); } })

  return (
    <form class="card w-96 bg-base-100 shadow-xl mx-auto" onSubmit={handleSubmit}>
      <div class="card-body">
        <h1 class="card-title text-3xl mb-3">New List</h1>
        <div class="form-control">
          <label for="new-list-title">Title</label>
          <input
            class="input input-bordered"
            type="text" name="new-list-title" id="new-list-title"
            value={getNewList().title}
            onChange={handleTitleChange}
            maxLength={80} autofocus required
          />
        </div>
        <div class="form-control">
          <label for="new-list-desc">Description</label>
          <input
            class="input input-bordered"
            type="text" name="new-list-desc" id="new-list-desc"
            value={getNewList().description}
            onChange={handleDescriptionChange}
            maxLength={255}
          />
        </div>
        <div class="form-control gap-2">
          <button class="btn btn-outline btn-success" type="submit">Create</button>
          <button class="btn btn-outline" type="button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </form>
  );
};

export default NewList;
