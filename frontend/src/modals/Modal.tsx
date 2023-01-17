import { Component, JSX, Show } from "solid-js";

type ModalProps = {
  title: string
  onCancelClick: () => {}
  onSaveClick?: () => {}
  children: JSX.Element
}

const Modal: Component<ModalProps> = (props) => {
  return (
    <div class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
        <div class="modal-action">
          <div class="btn-group">
            <Show when={props.onSaveClick}>
              <button onclick={props.onSaveClick} class="btn btn-primary">Save</button>
            </Show>
            <button onclick={props.onCancelClick} class="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
