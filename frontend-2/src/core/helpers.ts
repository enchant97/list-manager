import { ValidationError, NotFoundError, BadAuthorisationError } from "./exceptions";
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

export function throwRequestErrors(response: Response) {
  if (response.ok) { return }
  switch (response.status) {
    case 401:
      throw new BadAuthorisationError(response.statusText);
    case 403:
      throw new BadAuthorisationError(response.statusText);
    case 404:
      throw new NotFoundError(response.statusText);
    case 422:
      throw new ValidationError(response.statusText);
  }
}

export function isCompatibleWithApi(apiVersion: string): boolean {
  // TODO: implement better version checking
  if (apiVersion === "0.1.0") { return true; }
  return false;
}
