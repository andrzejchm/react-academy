export default function wrap(result, error = null, errorCode = 0) {
  let errorObj;
  if(errorCode !== 0) {
    errorObj = { message: error, code: errorCode };
  } else {
    errorObj = null;
  }
  return { result, error: errorObj };
}
