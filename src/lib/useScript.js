import React from "react";

const loadScriptByURL = (id, url, callback) => {
  const isScriptExist = document.getElementById(id);

  if (!isScriptExist) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    script.onload = function () {
      if (callback) callback();
    };
    document.body.appendChild(script);
  }

  if (isScriptExist && callback) callback();
}

export default function useScript(id, url, callback) {
  const didMount = React.useCallback(() => {
    loadScriptByURL(id, url, callback);
  }, [id, url, callback]);
  React.useEffect(didMount, [didMount]);
}
