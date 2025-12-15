import { observable, action } from "mobx";
import GlobalStore from "../GlobalStore";

abstract class Store<T = any> {
  @observable public accessor data: T;

  @observable public accessor isLoading = false;

  public constructor(data?: T) {
    this.data = data;

    GlobalStore.registerStore(this);
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

  @action public destroy(): void {
    this.removeData();
    GlobalStore.unregisterStore(this);
  }
}

export default Store;
