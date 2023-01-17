import { Component, createContext, createSignal, JSX, Show, useContext } from "solid-js"
import { Portal } from "solid-js/web";

const makeModalContext = () => {
  const [getModal, setModal] = createSignal<JSX.Element | null>(null);
  return {
    getModal,
    setModal,
  } as const;
}

export const ModalProvider = (props: any) => {
  let accessor = makeModalContext();
  return (
    <ModalContext.Provider value={accessor}>
      {props.children}
    </ModalContext.Provider>
  );
}

type ModalContextType = ReturnType<typeof makeModalContext>;
export const ModalContext = createContext<ModalContextType>();
export const useModal = () => useContext(ModalContext)!;

export const ModalController: Component = () => {
  const { getModal } = useModal();
  return (
    <Show when={getModal() !== null} fallback={<></>}>
      <Portal>{getModal()}</Portal>
    </Show>
  );
};