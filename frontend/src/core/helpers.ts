import { UpdateMessage } from "./types";

export function combineUrl(path_part: string, base_url: string): string {
  return base_url.replace(/\/$/, "") + "/" + path_part.replace(/^\//, "");
}

export function liveUpdatesConnect(url: string, onMessage: Function, onError: Function | null = null): VoidFunction {
  const sse = new EventSource(url);
  sse.addEventListener("message", event => {
    let data: UpdateMessage = JSON.parse(event.data);
    onMessage(data);
  });
  sse.addEventListener("error", _event => {
    if (onError !== null) {
      onError();
    }
    sse.close();
  });
  return () => { sse.close() };
}
