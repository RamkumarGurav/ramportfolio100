// middlewares/stackMiddlewares.ts
import { NextMiddleware, NextResponse } from "next/server";

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chainMiddlewares(
  higherOrderMiddlewares: MiddlewareFactory[],
  index: number = 0
): NextMiddleware {
  const current = higherOrderMiddlewares[index];

  if (current) {
    const next = chainMiddlewares(higherOrderMiddlewares, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
