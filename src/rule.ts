// This file is currently oversimplified and only
// supports binary operations connecting metadata
// keys to hardcoded values
export enum LogicOp {
  And = "&&",
  Or = "||",
}

export enum BinOp {
  Eq = "==",
  NotEq = "!=",
  Gt = ">",
  GtEq = ">=",
  Lt = "<",
  LtEq = "<=",
}

export enum UnaryOp {
  Not = "!",
  Exists = "exists",
}

export type Unary = {
  type: "unary";
  op: UnaryOp;
};

export type Ident = {
  type: "ident";
  value: string;
};

export type String = {
  type: "string";
  value: string;
};

export type Binary = {
  type: "binary";
  left: Ident;
  op: BinOp | LogicOp;
  right: String;
};

export type Expression = Binary;

export interface Rule {
  id: string;
  op: LogicOp;
  expression: Expression;
}

export function newRule(): Rule {
  return {
    id: "",
    op: LogicOp.And,
    expression: {
      type: "binary",
      left: {
        type: "ident",
        value: "",
      },
      op: BinOp.Eq,
      right: {
        type: "string",
        value: "",
      },
    },
  };
}

export function binOpFromString(str: string): BinOp | undefined {
  const key = Object.keys(BinOp).find((op) => BinOp[op] === str);
  return BinOp[key];
}

export function logicOpFromString(str: string): LogicOp | undefined {
  const key = Object.keys(LogicOp).find((op) => LogicOp[op] === str);
  return LogicOp[key];
}

export function getBinOps(): string[] {
  return Object.values(BinOp);
}

export function getLogicOps(): string[] {
  return Object.values(LogicOp);
}
