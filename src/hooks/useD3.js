import React from "react";
import * as d3 from "d3";

const useD3 = (renderChartFn) => {
  const ref = React.useRef();
  //UseRef
  //Een ref lijkt op een state, 
  //maar ref laat je component niet opnieuw update als je component rendert zoals je dat wel bij state hebt.
  //een ref returnt maar 1 value



  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  });
  return ref;
};

export default useD3;