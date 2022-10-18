import { Component, Show } from "solid-js";
import { Link } from "@solidjs/router";
import { useLogin } from "../contexts/LoginProvider";

const Header: Component = () => {
  const [login] = useLogin();

  return (
    <header class="navbar bg-base-100">
      <div class="flex-1">
        <span class="btn btn-ghost normal-case text-xl">List Manager</span>
      </div>
      <nav class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><Link href="/">Home</Link></li>
          <Show when={login()} fallback={<li><Link href="/login">Login</Link></li>}>
            <>
              <li><Link href="/lists">Lists</Link></li>
              <li><Link href="/logout">Logout</Link></li>
            </>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
