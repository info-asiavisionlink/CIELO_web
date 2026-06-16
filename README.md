# CIELO Website

CIELO ブランド公式 Web サイト

**Brand:** Street Luxury  
**By:** ASIA VISION LINK — Tokyo · Ginza  
**Deploy:** Vercel

---

## 技術構成

| レイヤー | 技術 |
|---------|------|
| HTML | index.html（単一ページ） |
| CSS | styles.css（CSS Variables + Flexbox/Grid + Responsive） |
| JS | script.js（Vanilla JS / 依存関係なし） |
| 画像管理 | assets/image-config.js |
| デプロイ | Vercel（静的サイト） |

---

## ディレクトリ構成

```
CIELO_WEBSITE/
├── index.html              メインページ（7 セクション）
├── styles.css              全スタイル
├── script.js               画像読み込み・ナビ・フォームなど
├── README.md               本ファイル
└── assets/
    ├── image-config.js     ★ 画像 URL 管理ファイル（ここを更新する）
    │
    ├── IMAGE_001.md        Art — Pop Culture Inspired Art
    ├── IMAGE_002.md        Art — Street Culture Art
    ├── IMAGE_003.md        Art — Hip Hop Inspired Art
    ├── IMAGE_004.md        Art — Neon Inspired Art
    ├── IMAGE_005.md        Art — Original Character Art（横幅2倍）
    │
    ├── IMAGE_006.md        Apparel — T-Shirt Product
    ├── IMAGE_007.md        Apparel — T-Shirt Wearing ★ メイン表示
    ├── IMAGE_008.md        Apparel — Long Sleeve Product
    ├── IMAGE_009.md        Apparel — Long Sleeve Wearing ★ メイン表示
    ├── IMAGE_010.md        Apparel — Moissanite Apparel Product
    ├── IMAGE_011.md        Apparel — Moissanite Apparel Wearing ★ メイン表示
    │
    ├── IMAGE_012.md        Jewelry — Necklace Product
    ├── IMAGE_013.md        Jewelry — Necklace Wearing ★ メイン表示
    ├── IMAGE_014.md        Jewelry — Ring Product
    ├── IMAGE_015.md        Jewelry — Ring Wearing ★ メイン表示
    ├── IMAGE_016.md        Jewelry — Bracelet Product
    ├── IMAGE_017.md        Jewelry — Bracelet Wearing ★ メイン表示
    ├── IMAGE_018.md        Jewelry — Earrings Product
    ├── IMAGE_019.md        Jewelry — Earrings Wearing ★ メイン表示
    ├── IMAGE_020.md        Jewelry — Moissanite Jewelry Product
    ├── IMAGE_021.md        Jewelry — Moissanite Jewelry Wearing ★ メイン表示
    │
    ├── IMAGE_022.md        Brand — Hero Background ★ メイン表示
    ├── IMAGE_023.md        Brand — About CIELO ★ メイン表示
    ├── IMAGE_024.md        Brand — Brand Philosophy Background ★ メイン表示
    └── IMAGE_025.md        Brand — OGP Image（SNS シェア用 / サイト内非表示）
```

### 画像構成の方針

| 区分 | 枚数 | 考え方 |
|------|------|--------|
| Art | 5枚 | 5カテゴリ各1枚 |
| Apparel | 6枚 | 商品3種 × Product + Wearing |
| Jewelry | 10枚 | 商品5種 × Product + Wearing |
| Brand Section | 3枚 | Hero / About / Philosophy |
| OGP | 1枚 | SNSシェア専用（サイト内非表示） |
| **合計** | **25枚** | |

**★ メイン表示** = サイト上のカードに直接表示される画像  
Product 画像はホバー効果・将来の商品詳細ページ等での使用を想定

---

## 画像制作優先順位

ブランドサイトはブランド認知・世界観が最優先。商品画像より先に Hero / About / Philosophy を完成させること。

### Priority A — ブランドセクション（最優先）

| ID | 内容 | 理由 |
|----|------|------|
| IMAGE_022 | Hero Background | サイト第一印象。全訪問者が必ず目にする |
| IMAGE_023 | About CIELO | ブランドストーリーの視覚的補強 |
| IMAGE_024 | Brand Philosophy | 世界観の締めくくり。最も感情に訴えるセクション |

> これら3枚が揃った時点でブランドサイトとして「見られる」状態になる。

---

### Priority B — Jewelry（第2優先）

| ID | 内容 |
|----|------|
| IMAGE_012 | Necklace Product |
| IMAGE_013 | Necklace Wearing ★ |
| IMAGE_014 | Ring Product |
| IMAGE_015 | Ring Wearing ★ |
| IMAGE_016 | Bracelet Product |
| IMAGE_017 | Bracelet Wearing ★ |
| IMAGE_018 | Earrings Product |
| IMAGE_019 | Earrings Wearing ★ |
| IMAGE_020 | Moissanite Jewelry Product |
| IMAGE_021 | Moissanite Jewelry Wearing ★ |

> ★ = サイトメイン表示。Wearing 画像を先に制作してメイン表示を埋めること。

---

### Priority C — Apparel（第3優先）

| ID | 内容 |
|----|------|
| IMAGE_006 | T-Shirt Product |
| IMAGE_007 | T-Shirt Wearing ★ |
| IMAGE_008 | Long Sleeve Product |
| IMAGE_009 | Long Sleeve Wearing ★ |
| IMAGE_010 | Moissanite Apparel Product |
| IMAGE_011 | Moissanite Apparel Wearing ★ |

---

### Priority D — Art（第4優先）

| ID | 内容 |
|----|------|
| IMAGE_001 | Pop Culture Inspired Art |
| IMAGE_002 | Street Culture Art |
| IMAGE_003 | Hip Hop Inspired Art |
| IMAGE_004 | Neon Inspired Art |
| IMAGE_005 | Original Character Art（wide） |

> Art は実際のアートワーク制作が必要なため、Jewelry / Apparel の写真撮影より後でよい。

---

### 優先度まとめ

```
Priority A  IMAGE_022〜024  ブランドセクション 3枚
Priority B  IMAGE_012〜021  Jewelry 10枚（Wearing 先行）
Priority C  IMAGE_006〜011  Apparel 6枚（Wearing 先行）
Priority D  IMAGE_001〜005  Art 5枚
OGP         IMAGE_025       Figma等で別途作成（/ogp.jpg）
```

---

## 画像の追加手順

1. `assets/IMAGE_xxx.md` で対象画像の仕様・Midjourney プロンプトを確認
2. Midjourney で画像を生成 → Cloudinary にアップロード
3. `assets/image-config.js` を開き、該当 ID の `url: ""` に URL を貼り付ける

```js
// 例
IMAGE_013: {
  url: "https://res.cloudinary.com/xxx/image/upload/v000/jewelry_necklace_wearing.jpg",
  alt: "CIELO Necklace — Wearing"
},
```

4. ブラウザをリロード → 自動で表示される

### ロゴ（設定済み）

`LOGO_CIELO` と `WORDMARK_CIELO` は Cloudinary URL が設定済みです。

---

## ブランドカラー

| カラー | CSS 変数 | 意味 |
|--------|---------|------|
| Sapphire Blue | `--sapphire` / `--sapphire-light` | 空・自由・可能性・上昇 |
| Diamond White | `--diamond` | 輝き・純粋性・洗練 |
| Gold | `--gold` | 成功・価値・豊かさ |
| Silver | `--silver` | 精密性・技術力・モダンさ |
| Black (base) | `--black` / `--dark-1〜4` | 高級感の演出 |

---

## セクション構成

| # | セクション | ID | 内容 |
|---|-----------|-----|------|
| 01 | Hero | `#hero` | フルスクリーン × ブランドコピー（IMAGE_022） |
| 02 | About CIELO | `#about` | ブランドストーリー（IMAGE_023） |
| 03 | Jewelry | `#jewelry` | Wearing × 5商品（IMAGE_013, 015, 017, 019, 021） |
| 04 | Apparel | `#apparel` | Wearing × 3商品（IMAGE_007, 009, 011） |
| 05 | Art | `#art` | 5カテゴリ グリッド（IMAGE_001〜005） |
| 06 | Brand Philosophy | `#philosophy` | フルスクリーン + 哲学3項目（IMAGE_024） |
| 07 | Contact | `#contact` | お問い合わせフォーム |

---

## Vercel デプロイ

```bash
# 方法1: Vercel CLI
npm i -g vercel
vercel

# 方法2: vercel.com ダッシュボード
# → "Add New Project" → GitHub リポジトリを接続
# → Framework Preset: Other（静的サイト）
# → Deploy
```

---

## コンタクトフォームの本番連携

`script.js` の `initContactForm()` 内 `setTimeout` を以下に置き換えてください：

```js
// Formspree の例
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
}).then(function(res) {
  if (res.ok) { /* 成功処理 */ }
});
```

---

## OGP 画像の作成

`IMAGE_025.md` を参照し、`/ogp.jpg`（1200 × 630px）を作成してルートに配置してください。  
`index.html` の `og:image` / `twitter:image` の URL を本番 URL に更新することも忘れずに。

---

## 公開準備完了率（2026-06-16 更新）

| 領域 | 完了度 | 状況 |
|------|--------|------|
| HTML構造 | 100% | 7セクション完成 |
| CSS | 100% | ブランドカラー・レスポンシブ完成 |
| JavaScript | 90% | フォームエンドポイント未接続 |
| SEO | 85% | OG画像・faviconの実ファイル未配置 |
| 画像（IMAGE_001〜024） | 100% | Cloudinary URL 設定済み・HTTP 200確認済み |
| 画像（IMAGE_025 / OGP） | 0% | Figma等で別途作成・配置が必要 |
| favicon一式 | 0% | 未作成 |
| フォームエンドポイント | 0% | Formspree等への接続が必要 |
| GitHub | 100% | main ブランチ Push 済み |

**総合公開準備完了率: 約 88%**

### 残課題（公開前に必要）

1. **OGP画像** — `/ogp.jpg`（1200×630px）を作成してルートに配置
2. **favicon** — `/favicon.ico` / `/favicon-32x32.png` / `/apple-touch-icon.png` を作成・配置
3. **フォーム** — `script.js` の `initContactForm()` を Formspree 等に接続
4. **og:image URL** — `index.html` の `https://asiavision.link/ogp.jpg` を実際のCDN URLに更新
5. **Vercel デプロイ** — GitHub連携またはCLI経由でデプロイ

---

**CIELO — by ASIA VISION LINK**  
info@asiavision.link · asiavision.link  
Tokyo · Ginza 1-12-4
