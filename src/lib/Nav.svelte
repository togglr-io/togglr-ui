<script lang="ts">
  import { link } from "svelte-routing";
  import Icon from "src/lib/Icon.svelte";
  import ToggleCtl from "src/ui/Toggle.svelte";
</script>

<nav>
  <div class="banner"><ToggleCtl checked={true} />Togglr</div>
  <ul>
    <li>
      <a href="/" use:link>
        <Icon name="toggle_on" />&nbsp;Toggles
      </a>
    </li>
    <li>
      <a href="account" use:link> <Icon name="business" />&nbsp;Account</a>
    </li>
    <li>
      <a href="users" use:link>
        <Icon name="manage_accounts" />&nbsp;Users
      </a>
    </li>
    <li>
      <a href="profile" use:link>
        <Icon name="account_circle" />&nbsp;Profile
      </a>
    </li>
    <li>
      <a href="settings" use:link>
        <Icon name="settings" />&nbsp;Settings
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  @import "../../scss/variables.scss";

  nav {
    display: flex;
    flex-direction: column;
    background-color: $foreground;
    color: $primary-text;
    padding: 0 1rem;
    height: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;

    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    a {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      width: 100%;
      height: 100%;
      line-height: 1rem;
    }

    li:hover {
      background-color: $highlight;
    }
  }

  .banner {
    font-weight: 600;
    font-size: 24pt;
  }
</style>
