import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";

export function getFromTaskEither<T>(
  task: TE.TaskEither<unknown, T>,
  defaultValue: T
) {
  return pipe(
    task,
    TE.getOrElse((e) => {
      console.error(e);
      return T.of(defaultValue);
    })
  )();
}
