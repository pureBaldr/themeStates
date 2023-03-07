/* 
  get deep by path
*/
export const deepSet = (obj: any, path: string, val: any) => {
  const keys = path.split("."),
    lastKey = keys.pop(),
    lastObj = keys.reduce(
      (obj: any, key: any) => (obj[key] = obj[key] || {}),
      obj
    );
  lastObj[lastKey!] = val;
};

/* 
  set deep by path
*/
export const deepGet = (obj: any, path: string) => {
  if (typeof obj === "object" && path) {
    let e = Array.isArray(path)
        ? path
        : typeof path === "string"
        ? path.split(".")
        : path,
      v,
      i;
    for (v = obj, i = 0; v && i < e.length; ++i) v = v[e[i]];
    return v;
  } else {
    // if form dont have data (resolved it by ts)
    // console.log('catch deepGet error, ',obj,path)
  }
};

/* 
  outside click event
*/
export const useOutsideAlerter:any = (
  ref: any,
  useThemeStore: any,
  useEffect: any
) => {
  const setAttr = useThemeStore((state: any) => state.setAttr);
  useEffect(() => {
    function handle(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAttr({
          path: "theme.dropdown",
          value: null,
        });
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handle);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handle);
    };
  }, [ref]);
};
