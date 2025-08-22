import { action, observable } from "mobx";

import type Store from "../utils/abstracts/store/Store";

class GlobalStore {
  @observable private static accessor stores: Set<Store> = new Set();

  @action public static registerStore(store: Store): void {
    this.stores.add(store);
  }

  @action public static unregisterStore(store: Store): void {
    this.stores.delete(store);
  }

  @action public static clearAllStores(): void {
    this.stores.forEach((store) => {
      store.removeData();
    });
  }
}

export default GlobalStore;
