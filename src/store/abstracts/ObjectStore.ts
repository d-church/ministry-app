import { action } from "mobx";

import Store from "./Store";

abstract class ObjectStore<T> extends Store<T> {
  @action public updateData(data: Partial<T>): T {
    const currentData = this.data || ({} as T);

    this.data = {
      ...currentData,
      ...data,
    };

    return this.data;
  }
}

export default ObjectStore;
