export enum ETabType {
  "all" = "全部",
  "windowId" = "窗口",
  "domain" = "域名",
  "status" = "活跃状态",
  "audible" = "声音",
  "group" = "分组"
}

export type TTabType = keyof typeof ETabType

export enum ETabMode {
  "pagePreview",
  "listView"
}
