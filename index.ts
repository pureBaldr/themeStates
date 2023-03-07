import create from "zustand";
import produce from "immer";
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
    let elements = Array.isArray(path)
        ? path
        : typeof path === "string"
        ? path.split(".")
        : path,
      val,
      i;
    for (val = obj, i = 0; val && i < elements.length; ++i)
      val = val[elements[i]];
    return val;
  } else {
    // todo:
    // if form dont have data (resolved it by ts)
    // console.log('catch deepGet error, ',obj,path)
  }
};

/* 
  outside click event
*/
export const useOutsideAlerter = (
  ref: any,
  // useThemeStore: any,
  useEffect: any
) => {
  const setDropdown = useCoreStore((state: any) => state.setDropdown);
  useEffect(() => {
    function handle(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(null);
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

/* 
  core store
*/
export const useCoreStore = create((set) => ({
  core: {
    formMessage: {
      text: "",
      status: "success",
    },
    dropdown: false,
  },
  setDropdown: (_ref: string | null) =>
    set(
      produce((_: any) => {
        _["core"]["dropdown"] = _ref;
      })
    ),
}));
