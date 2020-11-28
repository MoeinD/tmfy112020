<template>
  <div class="project-section">
    <div id="sidebar" class="sidebar" @mouseenter="sidebarEnter" @mouseleave="sidebarLeave">
      <div class="collapse-toggle" @click="toggleSidebar">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="avatar-section">
        <div class="img-section"></div>
        <div class="main-secion">
          <h4>TMFY</h4>

          <p>classic business project</p>
        </div>
      </div>
      <div class="sidebar-section">
        <ul>
          <li>
            <router-link to="summary">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <path
                      d="M19.004 17C19 17 19 7.006 19 7.006 19 7 4.996 7 4.996 7 5 7 5 16.994 5 16.994 5 17 19.004 17 19.004 17zM3 7.006A2 2 0 0 1 4.995 5h14.01A2 2 0 0 1 21 7.006v9.988A2 2 0 0 1 19.005 19H4.995A2 2 0 0 1 3 16.994V7.006z"
                      fill-rule="nonzero"
                    />
                    <path
                      d="M4 6h16v5H4V6zm5 2c0 .556.446 1 .995 1h8.01c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1h-8.01C9.455 7 9 7.448 9 8zM5 8c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1z"
                    />
                  </g>
                </svg>
              </span>
              <span>Summary</span>
            </router-link>
          </li>
          <li v-if="(getCommonInformation().currentProject||{}).type==='scrum'">
            <router-link to="backlog">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor">
                    <path
                      d="M5 19.002C5 19 17 19 17 19v-2.002C17 17 5 17 5 17v2.002zm-2-2.004C3 15.894 3.895 15 4.994 15h12.012c1.101 0 1.994.898 1.994 1.998v2.004A1.997 1.997 0 0 1 17.006 21H4.994A1.998 1.998 0 0 1 3 19.002v-2.004z"
                    />
                    <path d="M5 15h12v-2H5v2zm-2-4h16v6H3v-6z" />
                    <path
                      d="M7 11.002C7 11 19 11 19 11V8.998C19 9 7 9 7 9v2.002zM5 8.998C5 7.894 5.895 7 6.994 7h12.012C20.107 7 21 7.898 21 8.998v2.004A1.997 1.997 0 0 1 19.006 13H6.994A1.998 1.998 0 0 1 5 11.002V8.998z"
                    />
                    <path
                      d="M5 5v2h12V5H5zm-2-.002C3 3.894 3.895 3 4.994 3h12.012C18.107 3 19 3.898 19 4.998V9H3V4.998z"
                    />
                  </g>
                </svg>
              </span>
              <span>Backlog</span>
            </router-link>
          </li>
          <li>
            <router-link to="board">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor">
                    <path
                      d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006V5.994z"
                    />
                    <path d="M8 6v12h2V6zm6 0v12h2V6z" />
                  </g>
                </svg>
              </span>
              <span>{{(getCommonInformation().currentProject||{}).type==='scrum' ? 'Active sprints': 'Board'}}</span>
            </router-link>
          </li>
          <li>
            <router-link to="Issues">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <path
                      d="M5 12.991c0 .007 14.005.009 14.005.009C18.999 13 19 5.009 19 5.009 19 5.002 4.995 5 4.995 5 5.001 5 5 12.991 5 12.991zM3 5.01C3 3.899 3.893 3 4.995 3h14.01C20.107 3 21 3.902 21 5.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 12.991V5.01zM19 19c-.005 1.105-.9 2-2.006 2H7.006A2.009 2.009 0 0 1 5 19h14zm1-3a2.002 2.002 0 0 1-1.994 2H5.994A2.003 2.003 0 0 1 4 16h16z"
                      fill-rule="nonzero"
                    />
                    <path
                      d="M10.674 11.331c.36.36.941.36 1.3 0l2.758-2.763a.92.92 0 0 0-1.301-1.298l-2.108 2.11-.755-.754a.92.92 0 0 0-1.3 1.3l1.406 1.405z"
                    />
                  </g>
                </svg>
              </span>
              <span>Issues</span>
            </router-link>
          </li>
          <li>
            <router-link to="components">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <path
                      d="M5 17.991c0 .007 14.005.009 14.005.009-.006 0-.005-7.991-.005-7.991C19 10.002 4.995 10 4.995 10 5.001 10 5 17.991 5 17.991zM3 10.01C3 8.899 3.893 8 4.995 8h14.01C20.107 8 21 8.902 21 10.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 17.991V10.01z"
                    />
                    <path
                      d="M7 8.335c0-.002 2.002-.002 2.002-.002C9 8.333 9 6.665 9 6.665c0 .002-2.002.002-2.002.002C7 6.667 7 8.335 7 8.335zm-2-1.67C5 5.745 5.898 5 6.998 5h2.004C10.106 5 11 5.749 11 6.665v1.67C11 9.255 10.102 10 9.002 10H6.998C5.894 10 5 9.251 5 8.335v-1.67zm10 1.67c0-.002 2.002-.002 2.002-.002C17 8.333 17 6.665 17 6.665c0 .002-2.002.002-2.002.002.002 0 .002 1.668.002 1.668zm-2-1.67C13 5.745 13.898 5 14.998 5h2.004C18.106 5 19 5.749 19 6.665v1.67c0 .92-.898 1.665-1.998 1.665h-2.004C13.894 10 13 9.251 13 8.335v-1.67z"
                    />
                  </g>
                </svg>
              </span>
              <span>Components</span>
            </router-link>
          </li>
          <li>
            <a href>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor">
                    <path
                      d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2zm-3-8v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3z"
                    />
                    <path
                      d="M13.293 13.707a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L14 11.586l-2.293-2.293a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 1.414 1.414L11 11.414l2.293 2.293z"
                    />
                  </g>
                </svg>
              </span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor">
                    <path
                      d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0 1 19.005 21H4.995A1.996 1.996 0 0 1 3 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0 1 19.005 21H4.995A1.996 1.996 0 0 1 3 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3z"
                    />
                    <path d="M12.707 12.707l8-8a1 1 0 1 0-1.414-1.414l-8 8a1 1 0 0 0 1.414 1.414z" />
                  </g>
                </svg>
              </span>
              <span>Business projects</span>
            </a>
          </li>
          <li>
            <a href>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor">
                    <path
                      d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0 1 19.005 21H4.995A1.996 1.996 0 0 1 3 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0 1 19.005 21H4.995A1.996 1.996 0 0 1 3 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3z"
                    />
                    <path d="M12.707 12.707l8-8a1 1 0 1 0-1.414-1.414l-8 8a1 1 0 0 0 1.414 1.414z" />
                  </g>
                </svg>
              </span>
              <span>Project management</span>
            </a>
          </li>
          <li>
            <a href>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <path
                      d="M16.002 3H4.995A1.995 1.995 0 0 0 3 4.995v14.01C3 20.107 3.893 21 4.995 21h14.01A1.995 1.995 0 0 0 21 19.005V7.998 11h-2v8H5V5h8V3h3.002z"
                      fill-rule="nonzero"
                    />
                    <path
                      d="M19 5V3.99A1 1 0 0 0 18 3c-.556 0-1 .444-1 .99V5h-1a1 1 0 0 0 0 2h1v1.01A1 1 0 0 0 18 9c.556 0 1-.444 1-.99V7h1a1 1 0 0 0 0-2h-1z"
                    />
                  </g>
                </svg>
              </span>

              <span>Add item</span>
            </a>
          </li>
          <li>
            <a href>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  focusable="false"
                  role="presentation"
                >
                  <path
                    d="M11.701 16.7a5.002 5.002 0 1 1 0-10.003 5.002 5.002 0 0 1 0 10.004m8.368-3.117a1.995 1.995 0 0 1-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 0 0 .315-.574 8.947 8.947 0 0 0-.836-1.993.477.477 0 0 0-.598-.195 2.04 2.04 0 0 1-1.29.08 1.988 1.988 0 0 1-1.404-1.395 2.04 2.04 0 0 1 .076-1.297.478.478 0 0 0-.196-.597 8.98 8.98 0 0 0-1.975-.826.479.479 0 0 0-.574.314 1.995 1.995 0 0 1-1.885 1.346 1.994 1.994 0 0 1-1.884-1.345.482.482 0 0 0-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 0 0-.198.582A2.002 2.002 0 0 1 4.445 7.06a.478.478 0 0 0-.595.196 8.946 8.946 0 0 0-.833 1.994.48.48 0 0 0 .308.572 1.995 1.995 0 0 1 1.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 0 0-.308.57 8.99 8.99 0 0 0 .723 1.79.477.477 0 0 0 .624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 0 0 .168.628 8.946 8.946 0 0 0 2.11.897.474.474 0 0 0 .57-.313 1.995 1.995 0 0 1 1.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 0 0 .57.313 8.964 8.964 0 0 0 2.084-.883.473.473 0 0 0 .167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 0 0 .628-.19 8.925 8.925 0 0 0 .728-1.793.478.478 0 0 0-.314-.573"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Project settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from "vue";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  methods: {
    /**toggling the sidebar
     * and make it flaoting or static
     */
    toggleSidebar() {
      const sidebar = this._id("sidebar");
      if (sidebar.classList.contains("floating"))
        sidebar.classList.remove("floating");
      else {
        sidebar.classList.add("floating");
        sidebar.style.left = "-16rem";
      }
    },
    /**entering the mouse */
    sidebarEnter(event) {
      if (event.target.classList.contains("floating")) {
        event.target.style.left = "0rem";
      }
    },
    /**leaving the mouse */
    sidebarLeave(event) {
      if (event.target.classList.contains("floating")) {
        event.target.style.left = "-16rem";
      }
    }
  }
});
</script>
<style lang="sass" scoped>
</style>