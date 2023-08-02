import type { TTab } from "./browser";
import type { TTabType } from "./common"

export enum EShowMode {
  loading,
  setting,
  normal,
  login
}

export interface IAppState {
  tabs: TTab[]
  showMode: EShowMode
  tabsType: TTabType
}