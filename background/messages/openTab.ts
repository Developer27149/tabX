import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler<{
  windowId: number
  id: number
}> = async (req, res) => {
  const { windowId, id } = req.body
  await chrome.windows.update(windowId, { focused: true })
  await chrome.tabs.update(id, { active: true })
  res.send({})
}

export default handler
