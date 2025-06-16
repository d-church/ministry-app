import { observer } from "mobx-react-lite";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logo } from "src/assets/brand/logo";
import { sygnet } from "src/assets/brand/sygnet";
import navigation from "../_nav";

import { LayoutState } from "src/layout/LayoutState";

const AppSidebar = observer(() => {
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
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => LayoutState.setSideBarState(false)}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => LayoutState.toggleSidebarUnfoldableState()} />
      </CSidebarFooter>
    </CSidebar>
  );
});

export default AppSidebar;
