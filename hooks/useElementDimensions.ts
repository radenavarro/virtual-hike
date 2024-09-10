import { MutableRefObject, useEffect, useMemo, useState } from "react";

export const useElementDimensions = (elementRef: MutableRefObject<any>) => {
  const [elementWidth, setElementWidth] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    setElementWidth(elementRef.current?.clientWidth);
    setElementHeight(elementRef.current?.clientHeight);
    console.log("width en hook: " + elementRef.current?.clientWidth);
  }, [elementRef?.current?.clientWidth, elementRef?.current?.clientHeight]);

  return useMemo(() => ({ elementWidth, elementHeight }), [elementWidth, elementHeight]);
}