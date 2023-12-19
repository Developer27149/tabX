export enum EMenuTip {
  "all" = "全部",
  "windowId" = "窗口",
  "domain" = "域名",
  "status" = "活跃状态",
  "audible" = "声音",
  "analysis" = "访问分析",
  "group" = "分组",
  "robot" = "AI 辅助",
  "unread" = "未读"
}

export type TMenuId = keyof typeof EMenuTip

export enum ETabMode {
  "pagePreview",
  "listView"
}

export type TChromeGroup = chrome.tabGroups.TabGroup & {
  tabs: chrome.tabs.Tab[]
}
