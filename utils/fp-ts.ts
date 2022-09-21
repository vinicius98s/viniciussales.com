import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { AxiosError } from "axios";

function isAxiosError(e: unknown | AxiosError): e is AxiosError {
  return (e as AxiosError).isAxiosError ?? false;
}

export function getFromTaskEither<T>(
  task: TE.TaskEither<unknown, T>,
  defaultValue: T
) {
  return pipe(
    task,
    TE.getOrElse((e) => {
      if (isAxiosError(e)) {
        console.error("Request failed:", e.response?.data);
      }

      return T.of(defaultValue);
    })
  )();
}
