import { action } from "mobx";
import first from "lodash/first";

import Store from "./Store";

abstract class ArrayStore<T extends { id: string }> extends Store<T[]> {
  @action public push(newItem: T) {
    const newData = [...(this.data || []), newItem];

    this.data = newData;
  }

  public getById(id: string): T {
    if (!this.isDataExist) return null;

    return this.data.find((el) => el.id === id);
  }

  @action public removeById(id: string): T {
    if (!this.isDataExist) return null;

    const index = this.data.findIndex((el) => el.id === id);
    if (index !== -1) {
      const newData = [...this.data];

      const deletedElement = first(newData.splice(index, 1));

      this.data = newData;

      return deletedElement;
    }
  }
}

export default ArrayStore;
