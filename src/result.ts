export type Ok<T> = {
  type: "ok";
  val: T;
};

export type Err<E> = {
  type: "err";
  val: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function isOk<T, E>(res: Result<T, E>): boolean {
  return res.type === "ok";
}

export function isErr<T, E>(res: Result<T, E>): boolean {
  return !isOk(res);
}

export function ok<T>(val: T): Ok<T> {
  return {
    type: "ok",
    val,
  };
}

export function err<E>(val: E): Err<E> {
  return {
    type: "err",
    val,
  };
}

export function unwrap<T, E>(res: Result<T, E>): T {
  switch (res.type) {
    case "ok":
      return res.val;
    case "err":
      throw new Error("tried to unwrap Err value");
  }
}
