# 🇭🇺 MagyarGrammar - 匈牙利語文法學習系統

一套專為中文母語學習者精心打造的現代化、互動式匈牙利語文法與語音學習系統（Magyar Nyelvtan Tanuló Rendszer）。

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=flat&logo=github)](https://totorolin1999.github.io/hungarian-grammar-app/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

👉 **立即體驗線上版本：[https://totorolin1999.github.io/hungarian-grammar-app/](https://totorolin1999.github.io/hungarian-grammar-app/)**

---

## 📖 專案緣起

匈牙利語（Magyar nyelv）屬於烏拉爾語系（Finno-Ugric），與大部分印歐語系的歐洲語言截然不同。其核心特徵包括：
- **高度黏著性（Agglutination）**：單字透過層層堆疊後綴表達文法意義；
- **母音和諧律（Vowel Harmony）**：詞幹母音音性決定後綴變化；
- **雙軌動詞變位體系**：依受詞的定指性分為「不定變位（Alanyi）」與「定變位（Tárgyas）」；
- **精密空間方位系統**：內部、表面、身邊與三態移動構成 9 大方位格；
- **子音完全同化**：工具格等後綴與詞尾子音的音變現象。

**MagyarGrammar** 旨在將這些複雜抽象的語法規則轉換為**直觀可視、即時互動、支援語音發音**的現代化 Web 應用，協助學習者系統化攻克匈牙利語文法痛點。

---

## ✨ 核心特色與教學模組

### 1. 🎵 母音和諧律實驗室 (Magánhangzó-harmónia Explorer)
- **14 個匈牙利語母音完整圖譜**：依「前母音（Magas）/ 後母音（Mély）」、「圓唇（Kerekített）/ 扁唇（Réses）」及長短音完整矩陣化展示。
- **即時和諧律推導演算法**：輸入任意詞幹，即時分析母音屬性，自動展示二選一（如 `-ban/-ben`）與三選一（如 `-hoz/-hez/-höz`）的精準詞綴。
- **特殊變音解析**：詞尾短母音長音化規則（*alma* → *almát*、*kefe* → *kefét*）與歷史特殊例外辨析。
- **🔊 語音示範**：支援單字與例句即時發音。

### 2. 🗺️ 3 × 3 空間方位格矩陣 (Térbeli Viszonyok)
- **匈牙利語 9 大空間格位視覺化九宮格**：
  - 三種空間維度：內部（📦 Belső）、表面（📄 Felületi）、身邊（👤 Közelében）
  - 三種運動狀態：朝向哪裡（*Hová?*）、在何處（*Hol?*）、從哪裡離開（*Honnan?*）
- **動態例詞實測**：可自訂或切換名詞詞幹（如 *ház*, *Budapest*, *asztal*, *orvos* 等），即時觀察格位詞形變化。
- **🔊 朗讀發音**：點擊各格位即可聆聽標準發音。

### 3. ⚡ 動詞雙軌變位器 (Igeragozás Engine)
- **不定變位 (Alanyi) vs 定變位 (Tárgyas)**：清楚對比及物動詞雙軌體系，並提供六大人稱完整動詞變位對照表。
- **定變位 6 大黃金觸發法則**：
  1. 定冠詞（*a / az*）修飾之名詞
  2. 指示代名詞（*ezt, azt*）
  3. 專有名詞 / 人名
  4. 領屬名詞（如 *a könyvemet*）
  5. 全稱代名詞（*mindenkit* 等）
  6. 子句引導詞 *hogy*
- **特殊後綴解析**：浪漫的主賓合一專屬後綴 `-lak / -lek`（例如 *Szeretlek!* 我愛你）與 `-ik` 動詞特徵。

### 4. 🔀 工具格同化與核心語法格 (Hasonulás & Esetek)
- **工具/伴隨格完全同化動態推導**：
  - 母音結尾：`-val / -vel`（如 *kocsi* + *val* → *kocsival*）
  - 子音結尾：`v` 完全同化為詞尾子音（如 *busz* + *val* → *busszal*、*ház* + *val* → *házzal*）
- **核心格位精析**：
  - 賓格（Tárgyrag `-t`）與連接母音規律
  - 與格（Részeshatározó `-nak / -nek`）以及「擁有句（*Nekem van...*）」架構

### 5. 👑 名詞領屬後綴系統 (Birtokos Személyjelek)
- **六大人稱領屬後綴總覽**：我的（-m）、你的（-d）、他的（-ja/-je）、我們的（-nk）、你們的（-tok/-tek/-tök）、他們的（-juk/-jük）。
- **後母音、前母音扁唇、前母音圓唇**三類詞幹對照矩陣。
- **單數所屬物 vs 複數所屬物**變化與擁有關係句子解析。

### 6. 🎯 文法闖關演練場 (Nyelvtani Kvíz)
- **全方位文法題庫**：涵蓋母音和諧律、方位格位、雙軌變位、同化現象與焦點語序。
- **遊戲化激勵機制**：連擊加分（Combo Streak）、即時答案回饋與音效視覺回饋。
- **慶祝特效**：測驗完成獲得彩帶效果（Canvas-confetti）。
- **繁體中文深度詳解**：每道題目均附有詳細文法剖析與中文翻譯。

### 7. 📖 語法精華速查手冊 (Nyelvtani Kalauz)
- **烏拉爾語系核心思維**：無語法性別（第三人稱 *ő* 不分男女）、詞序高度依賴焦點（Topic-Focus）。
- **特殊子音發音防雷**：cs, gy, ly, ny, sz, s, ty, zs 雙字母及三字母子音發音規則。
- **動詞前綴（Igekötők）**：方向改變、完成態標記與否定句/強調句的前綴分離語序。
- **18 格位全覽速查表**：名稱、問句、詞綴與例句一覽。

### 8. 🔊 Web Speech 語音發音朗讀 (Text-to-Speech)
- 整合瀏覽器原生的 Web Speech Synthesis API（`hu-HU` 匈牙利語語系）。
- 針對非母語學習者調校適當語速（0.85x），點擊揚聲器圖示即可隨時聽取道地讀音。

---

## 🛠️ 技術棧

| 領域 | 技術 / 套件 | 說明 |
| :--- | :--- | :--- |
| **前端框架** | [React 18](https://react.dev/) | 現代化組件架構與狀態管理 |
| **開發語言** | [TypeScript 5](https://www.typescriptlang.org/) | 強型別支援，保證程式碼健壯度 |
| **建置工具** | [Vite 6](https://vitejs.dev/) | 極速 HMR 與現代化打包體驗 |
| **樣式與設計** | [Tailwind CSS 3](https://tailwindcss.com/) | 輕量化、具響應式設計的原子化 CSS |
| **圖標庫** | [Lucide React](https://lucide.dev/) | 現代簡約美觀的 SVG 圖標 |
| **互動特效** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | 測驗通關慶祝紙花特效 |
| **語音技術** | Web Speech Synthesis API | 原生瀏覽器匈牙利語發音支援 |
| **CI / CD** | GitHub Actions | 提交至 `main` 分支自動建置部署至 GitHub Pages |

---

## 📁 專案目錄結構

```text
hungarian-grammar-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自動化部屬工作流
├── src/
│   ├── components/             # 7 大核心教學功能組件
│   │   ├── CasesAssimilation.tsx    # 工具格同化與核心語法格
│   │   ├── GrammarHandbook.tsx      # 語法精華速查手冊
│   │   ├── PossessionExplorer.tsx   # 名詞領屬後綴系統
│   │   ├── QuizArena.tsx            # 文法闖關演練場
│   │   ├── SpatialMatrix3x3.tsx     # 3×3 空間方位格矩陣
│   │   ├── VerbConjugator.tsx       # 動詞雙軌變位器
│   │   └── VowelHarmonyExplorer.tsx # 母音和諧律實驗室
│   ├── data/
│   │   └── quizData.ts         # 測驗題目與深度詳解資料庫
│   ├── lib/
│   │   ├── hungarian.ts        # 匈牙利語和諧律與格位演算引擎
│   │   └── speechUtils.ts      # Web Speech TTS 匈牙利語發音工具
│   ├── App.tsx                 # 主應用程式骨幹與導航列
│   ├── index.css               # Tailwind CSS 全域樣式定義
│   └── main.tsx                # 應用程式入口
├── index.html                  # 靜態 HTML 模板
├── package.json                # 專案相依性與 Scripts 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 編譯配置
└── vite.config.ts              # Vite 設定檔 (Base URL 與打包分割)
```

---

## 🚀 本地開發與快速上手

### 環境需求
- [Node.js](https://nodejs.org/) (建議 v18 或更高版本)
- npm / pnpm / yarn

### 安裝與啟動

1. **複製專案庫**
   ```bash
   git clone https://github.com/totorolin1999/hungarian-grammar-app.git
   cd hungarian-grammar-app
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

3. **啟動本機開發伺服器**
   ```bash
   npm run dev
   ```
   瀏覽器開啟 `http://localhost:5173` 即可開始使用！

4. **建置正式發行版本**
   ```bash
   npm run build
   ```

5. **預覽正式建置結果**
   ```bash
   npm run preview
   ```

---

## 🚢 部署與維護

本專案配置了自動化 GitHub Actions 流程：
- 每當程式碼推送到 `main` 分支時，`.github/workflows/deploy.yml` 會自動執行 TypeScript 檢查、建置生產包並部署至 GitHub Pages。
- 專案在 `vite.config.ts` 中配置了 `base: '/hungarian-grammar-app/'`，確保資源在 GitHub Pages 二級子路徑下能正常載入。

---

## 🤝 貢獻與反饋

歡迎對匈牙利語學習、語言學或前端互動開發有興趣的開發者一同參與：
- 發現文法解說或例句有誤？歡迎開立 [Issue](https://github.com/totorolin1999/hungarian-grammar-app/issues)！
- 想擴充測驗題庫或加入新模組？歡迎提交 [Pull Request](https://github.com/totorolin1999/hungarian-grammar-app/pulls)！

---

## 📄 授權條款 (License)

本專案基於 [MIT License](LICENSE) 條款開放原始碼。
