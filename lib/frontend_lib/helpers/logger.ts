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

export const customLogger = (data: any) => {
  const enableLogging = process.env.ENABLE_LOGGING === "true";
  const trace = process.env.ENABLE_LOGGING_TRACE === "true";

  if (enableLogging) {
    if (typeof data === "object") {
      if (trace) {
        console.trace(JSON.stringify(data, null, 2)); // Use JSON.stringify to log objects
      } else {
        console.log(JSON.stringify(data, null, 2)); // Use JSON.stringify to log objects
      }
    } else {
      if (trace) {
        console.trace(data); // Use JSON.stringify to log objects
      } else {
        console.log(data); // Log other types of data directly
      }
    }
  }
};
