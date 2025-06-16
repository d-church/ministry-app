import { observable, action } from "mobx";

class LayoutState {
  @observable public accessor isSidebarOpen = true;
  @observable public accessor isSidebarUnfoldable = true;

  @action public setSideBarState(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  @action public toggleSidebarState() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @action public setSidebarUnfoldableState(isUnfoldable: boolean) {
    this.isSidebarUnfoldable = isUnfoldable;
  }

  @action public toggleSidebarUnfoldableState() {
    this.isSidebarUnfoldable = !this.isSidebarUnfoldable;
  }
}

const layoutState = new LayoutState();

export { layoutState as LayoutState };
