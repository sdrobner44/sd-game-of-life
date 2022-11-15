// https://javascript.plainenglish.io/implementing-debouncing-in-react-f3316ef344f5
// https://stackoverflow.com/questions/55875342/where-a-function-is-required-typescript-allows-me-to-pass-an-object-with-an-inc

type func = (param1: string) => void;

function sdDebounce(fn: func, arg: string, delay: number) {
  let timer: string | number | NodeJS.Timeout;
  return function () {
    // const context: any = this,
    // eslint-disable-next-line prefer-rest-params
    // args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(arg);
    }, delay);
  };
}

export default sdDebounce;