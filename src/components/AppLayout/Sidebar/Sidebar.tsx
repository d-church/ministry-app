import { observer } from "mobx-react-lite";
import cn from "clsx";
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

import "./style.scss";

const Sidebar = observer(() => {
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
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          <img
            src={logoFull}
            alt="Logo"
            className={cn("logo", "full", "scale-75", {
              "d-none": LayoutState.isSidebarUnfoldable,
            })}
          />
          <img
            src={logoMain}
            alt="Logo"
            className={cn("logo", "main", "scale-75", {
              "d-none": !LayoutState.isSidebarUnfoldable,
            })}
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
