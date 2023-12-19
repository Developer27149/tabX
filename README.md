# tabX

这是一个 [Plasmo 扩展插件](https://docs.plasmo.com/) 项目,使用 [`plasmo init`](https://www.npmjs.com/package/plasmo) 脚手架生成。

A amazing chrome extension for manage all tabs

## 开始

首先,运行开发服务器:

```
copy codepnpm dev
# 或
npm run dev
```

打开浏览器访问相应的开发版本。例如,如果你正在为 Chrome 浏览器开发基于manifest v3 的插件,使用:`build/chrome-mv3-dev`。

你可以修改 `popup.tsx` 来编辑弹出窗口。代码修改后会自动更新。要添加选项页面,只需在项目根目录添加 `options.tsx` 文件,默认导出一个 React 组件即可。同样地,要添加内容页,只需在项目根目录添加 `content.ts` 文件,导入一些模块并进行一些逻辑,然后重新加载扩展。

如需详细指南,[参考我们的文档](https://docs.plasmo.com/)。

## 打包发布版本

运行:

```
copy codepnpm build 
# 或 
npm run build
```

这会生成你的扩展的生产版本,准备好打包和发布到商店。



## 提交到商店

使用内置的 [bpp](https://bpp.browser.market/) Github 动作部署 Plasmo 扩展非常方便。在使用此操作之前,请首先构建你的扩展并上传第一版到商店以建立基本凭据。然后,只需遵循[此设置说明](https://docs.plasmo.com/framework/workflows/submit),你就可以启动自动提交!

## 基础功能
- [x] 全局标签搜索
- [x] 单标签操作：打开、关闭、复制链接、固定和取消固定和更多操作
- [x] 分组管理
- [x] 常用工具：AI 分组、重复项清理
- [x] 稍后阅读标签


## 需求补充
- [ ] 重复页面查找
- [ ] 固定页面查找
- [ ] 页面恢复
- [ ] i18n
- [ ] 键盘操作(Quick Delete、Open)
- [ ] 分组颜色
- [ ] 工作区: 保存用户工作区，做云同步(tab添加到工作区)，快速恢复
- [ ] 配置导出导入
- [ ] 复制、隐私模式转换
- [ ] 分组、窗口、移动
- [ ] 撤销上一次关闭
- [ ] 选项卡音频指示
- [ ] 静音和开启声音
- [ ] 窗口合并
- [ ] 保存到书签
- [ ] 页面标签，标签筛选
- [ ] 去重当前打开页面的历史页面恢复
- [ ] 常见功能
  - 打开上次关闭的 tab
  - 恢复上次关闭的 window
  - 打开新页面（普通 or 隐私）

## Pro
- [ ] 云同步
- [ ] 支持多商店
- [ ] Dark or light


## 注意避免的点
- 避免花哨，打断用户注意力
- 不把用户的傻子，操作极简化即可
- 添加关于作者，建议用户支持和留下交流方式