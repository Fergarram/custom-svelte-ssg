import Layout from "./components/layout.svelte";

const target = document.getElementById("site-main");
// target.innerHTML = '';

const layout = new Layout({
  target,
  hydrate: true,
  props: { route: location.pathname }
});

export default layout;
