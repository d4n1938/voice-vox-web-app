
# voice-vox-web-app

## アプリについて

このアプリは[VOICEVOX](https://voicevox.hiroshiba.jp/)のソフトウェアを使ってwebアプリを作りました。
現在はアプリ単体では動かず、ローカルでVOICEVOXのソフトウェアをダウンロードして起動している状態でのみ動きます。

## 動作方法
### 事前準備
[VOICEVOX](https://voicevox.hiroshiba.jp/)ここから公式ページでソフトウェアのダウンロード、起動状態にしておいてください

### 実行
以下のコマンドをターミナル、シェルで実行してください
```bash
yarn dev
```

yarnをインストールしてない場合は先にインストールを済ませてください

ブラウザの(http://localhost:3000/)[http://localhost:3000/]からアプリが開けます

## プロジェクト作成環境
[Next.js](https://nextjs.org/) の [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)を使って作成されています.