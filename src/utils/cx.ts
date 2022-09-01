function separate(...strings: string[]) {
  return strings.join(" ");
}

function compactObj(obj: any) {
  return Object.keys(obj).filter((key) => !!obj[key]);
}

export default function classNames(...args: any) {
  return args.reduce((memo: string, arg: any) => {
    if (arg === undefined) return memo.trim();

    if (typeof arg === "string") {
      return separate(memo, arg).trim();
    }

    const keys = compactObj(arg);
    return separate(memo, ...keys).trim();
  }, "");
}
