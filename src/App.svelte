<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Nav from "./lib/Nav.svelte";
  import Toggles from "./pages/Toggles.svelte";
  import Toggle from "./pages/Toggle.svelte";
  import Profile from "./pages/Profile.svelte";

  export let url = "";
</script>

<Router {url}>
  <Nav />
  <main>
    <Route path="/" component={Toggles} />
    <Route path="toggle/:id" component={Toggle} />
    <Route path="profile" component={Profile} />
  </main>
</Router>

<style global lang="scss">
  @import "../scss/main.scss";
</style>
