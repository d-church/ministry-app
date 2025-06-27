import { observer } from "mobx-react-lite";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import logoFull from "src/assets/brand/logo-full.svg";
import logoMain from "src/assets/brand/logo-main.svg";

import config from "./config";
import { LayoutState } from "../LayoutState";

import { SidebarNav } from "./SidebarNav";

const Sidebar = observer(() => {
  console.log({
    isSidebarUnfoldable: LayoutState.isSidebarUnfoldable,
    isSidebarOpen: LayoutState.isSidebarOpen,
  });
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={LayoutState.isSidebarUnfoldable}
      visible={LayoutState.isSidebarOpen}
      onVisibleChange={(visible) => {
        LayoutState.setSideBarState(visible);
      }}
      onMouseEnter={() => LayoutState.setSideBarHovered(true)}
      onMouseLeave={() => LayoutState.setSideBarHovered(false)}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          <img
            src={LayoutState.logoType === "full" ? logoFull : logoMain}
            alt="Logo"
            className="d-inline-block align-top scale-75"
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => LayoutState.setSideBarState(false)}
        />
      </CSidebarHeader>
      <SidebarNav items={config} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => LayoutState.toggleSidebarUnfoldableState()} />
      </CSidebarFooter>
    </CSidebar>
  );
});

export default Sidebar;
