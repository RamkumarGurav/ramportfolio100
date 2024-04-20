export function logger(message: any, trace = false) {
  if (
    process.env.APP_ENV === "development" ||
    process.env.NEXT_PUBLIC_APP_ENV === "development"
  ) {
    if (trace) {
      console.trace(message);
    } else {
      console.log(message);
    }
  }
}
