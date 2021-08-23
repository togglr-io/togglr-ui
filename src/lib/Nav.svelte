<script lang="ts">
  import { link } from "svelte-routing";
</script>

<nav>
  <div class="banner">Togglr</div>
  <div class="gap" />
  <div class="controls">
    <input type="text" class="dark" placeholder="Search..." />
    <ul>
      <li>
        <a href="/" use:link>Toggles</a>
      </li>
      <li>
        <a href="profile" use:link>Profile</a>
      </li>
    </ul>
  </div>
</nav>

<style lang="scss">
  @import "../../scss/variables.scss";

  nav {
    display: flex;
    background-color: $primary;
    color: $foreground;
    justify-content: space-between;
    padding: 0 1rem;
  }

  ul {
    display: flex;

    li {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: $foreground;
      padding: 1rem;
      width: 100%;
      height: 100%;
      line-height: 1rem;
    }

    li:hover {
      background-color: $highlight;
    }
  }

  input {
    margin: 1rem;
    flex: 2;
  }

  .banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    font-size: 24pt;
  }

  .gap {
    flex: 1;
  }

  .controls {
    flex: 1;
    display: flex;
  }
</style>
