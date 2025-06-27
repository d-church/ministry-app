import { observable, action, reaction } from "mobx";

class LayoutState {
  @observable public accessor isSidebarOpen = true;
  @observable public accessor isSidebarUnfoldable = true;

  private readonly STORAGE_KEY = 'layoutState';

  public constructor() {
    this.loadFromStorage();
    this.setupReactions();
  }

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


  @action public resetToDefaults() {
    this.isSidebarOpen = true;
    this.isSidebarUnfoldable = true;
  }

  private setupReactions() {
    reaction(
      () => ({
        isSidebarOpen: this.isSidebarOpen,
        isSidebarUnfoldable: this.isSidebarUnfoldable,
      }),
      (data) => {
        this.saveToStorage(data);
      },
      { fireImmediately: false }
    );
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data: LayoutStateData = JSON.parse(stored);
        this.isSidebarOpen = data.isSidebarOpen ?? true;
        this.isSidebarUnfoldable = data.isSidebarUnfoldable ?? true;
      }
    } catch (error) {
      console.warn('Failed to load layout state from localStorage:', error);
    }
  }

  private saveToStorage(data: LayoutStateData) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}

interface LayoutStateData {
  isSidebarOpen: boolean;
  isSidebarUnfoldable: boolean;
}

const layoutState = new LayoutState();

export default layoutState;
