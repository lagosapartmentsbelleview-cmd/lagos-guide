function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

document.getElementById("btnBack").addEventListener("click", () => {
  const from = getQueryParam("from");

  if (from === "guide") return window.location.href = "/guide";
  if (from === "aima") return window.location.href = "/aima";

  window.location.href = "/";
});
