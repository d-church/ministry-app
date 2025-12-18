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

  @action public updateById(id: string, updatedItem: T): T | null {
    if (!this.isDataExist) return null;

    const index = this.data.findIndex((el) => el.id === id);
    if (index !== -1) {
      const newData = [...this.data];
      newData[index] = updatedItem;
      this.data = newData;
      return updatedItem;
    }
    return null;
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

  @action public reorder(start: number | string, end: number | string): void {
    if (!this.isDataExist) return;

    let startIndex: number;
    let endIndex: number;

    if (typeof start === "string" && typeof end === "string") {
      // Both are IDs
      startIndex = this.data.findIndex((el) => el.id === start);
      endIndex = this.data.findIndex((el) => el.id === end);
    } else if (typeof start === "number" && typeof end === "number") {
      // Both are indices
      startIndex = start;
      endIndex = end;
    } else {
      // Mixed types - not supported
      return;
    }

    if (startIndex === -1 || endIndex === -1) return;

    const result = Array.from(this.data);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    this.data = result;
  }
}

export default ArrayStore;
