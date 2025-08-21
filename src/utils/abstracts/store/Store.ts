import { observable, action } from "mobx";

abstract class Store<T> {
  @observable public accessor data: T;

  public constructor(data?: T) {
    this.data = data;
  }

  @action public setData(data: T) {
    this.data = data;
  }

  @action public removeData() {
    this.data = undefined;
  }

  public get isDataExist(): boolean {
    return Boolean(this.data);
  }
}

export default Store;
