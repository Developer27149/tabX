import { TChromeGroup } from "~types/common"

export const generateGroupListByTabs = async (tabs: chrome.tabs.Tab[]) => {
  const groups = await chrome.tabGroups.query({})
  const groupList: TChromeGroup[] = groups.map((group) => {
    const tabsInGroup = tabs.filter((tab) => tab.groupId === group.id)
    return {
      ...group,
      tabs: tabsInGroup
    }
  })
  return groupList
}
