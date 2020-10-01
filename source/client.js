// Code splitting would occur from this layout parent component.
import Layout from "../components/layout.svelte";

// Where Svelte will mount...
const target = document.getElementById("site-main");
// Might need this later: target.innerHTML = '';

// Export the layout instance.
export default new Layout({
  target,
  hydrate: true,
  props: { route: location.pathname }
});
