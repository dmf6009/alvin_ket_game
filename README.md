# KET守护小队

一个可直接部署到 Cloudflare Pages 的纯静态站点，围绕“学单词/做题赚金币 -> 塔防闯关 -> 掉落装备图鉴”设计，适合二年级小学生做 KET 入门练习。

## 文件结构

```txt
index.html
styles.css
script.js
README.md
```

## 本地运行

直接双击 `index.html` 即可打开，或者用任意静态服务器预览。

## Cloudflare Pages 部署

这是一个无构建步骤的静态站，推荐配置：

```txt
Framework preset: None
Production branch: main
Build command: exit 0
Build output directory: .
```

如果使用 Direct Upload，确保上传的是仓库根目录里的文件，让 `index.html` 保持在最外层。

## 当前实现范围

- 首页总览与四大入口
- KET 单词背诵与单词考核
- KET 专项答题：随机刷题、错题重练
- 简化版塔防闯关
- 装备图鉴与本地存储

## 数据说明

- 词库当前对齐 `Cambridge A2 Key Vocabulary List · August 2025`，已切换为完整官方词表版，站内当前载入 `1711` 个官方 headwords
- 题库当前为 100 题：60 道 `Part 1` 风格看图选词 + 40 道 `Part 4` 风格基础单选，词汇范围限制在官方 A2 Key 词表内，题型按 KET/A2 Key 常见形式改编
- 页面未直接复刻官方样题原文；如果需要进一步精确到某一套真题或某一册 Trainer 的改编风格，可继续在 [script.js](/Users/yingnanli/code/forguagua/ket_word/script.js) 深化
