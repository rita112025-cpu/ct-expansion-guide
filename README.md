# CT Expansion Guide

**電纜槽伸縮節族製作與專案使用指南｜Revit 2027**

> **狀態：文件核對版／待實機驗收**
> 內容已對照 Autodesk 官方文件，但尚未在 Revit 2027 繁中版實機操作確認。所有數值為示意，以廠商型錄為準。

給要在 Revit 2027 建立「電纜槽伸縮節」配件族的新手工程人員看的操作指南：8 個步驟，每步都寫「操作 → 完成後應該看到什麼 → 卡住時怎麼辦」，照著點就能做完族製作、載入專案、接線架、驗證連通性、建立明細表。還沒在繁中 2027 介面實機確認過的地方（介面字樣、廠商實際尺寸等）會在該步驟直接提醒，不會假裝已經驗證過。

大字、單欄、手機可讀的靜態網頁，純 HTML／CSS／JavaScript，不需要建置工具，可以直接部署到 GitHub Pages。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 主頁面 |
| `styles.css` | 樣式（大字、深淺色、列印） |
| `app.js` | 字級 A−／A＋、深淺色切換、檢查清單勾選記憶（只存在本機瀏覽器） |
| `README.md` | 本說明 |

外部資源：Google Fonts（Noto Sans TC）、jsDelivr 上的 Mermaid（繪製流程圖）。無法連線時，流程圖會顯示原始碼，其餘內容不受影響。

## 部署到 GitHub Pages

1. 建立新的 repository，把四個檔案上傳到根目錄。
2. Settings → Pages → Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`。
3. 儲存後等待部署完成，網址會顯示在同一頁。

> repository 設為 Public 時，網頁任何人都能看到。內容若有公司資料，請先確認再公開。

## 內容大綱

0. 開始前：連接器間距（本體總長度）跟允許位移量是兩個不同的數字
1. 準備族或範本
2. 設定族類別與零件類型（Ladder Union／Channel Union）
3. 建立必要尺寸參數
4. 畫參考平面與外形，設定尺寸控制
5. 放置兩端連接器，設定寬、高及方向
6. 切換尺寸測試，存成 .rfa
7. 載入專案並連接兩段線架
8. 檢查是否接通，建立電纜槽配件明細表
9. 流程圖／疑難排解
10. 最低驗收清單
11. 尚未確認事項
12. 資料來源（頁面底部可展開）

## 流程

### 族製作（步驟 1–6）

```mermaid
flowchart TD
  A["1 準備族或範本"] --> B["2 設定族類別／零件類型"]
  B --> C["3 建立尺寸參數"]
  C --> D["4 畫參考平面、鎖定幾何"]
  D --> E["5 放置兩端連接器"]
  E --> F{"6 切換型式測試"}
  F -->|有警告或破圖| D
  F -->|沒有警告| G["存成 .rfa"]
```

### 專案使用（步驟 7–8）

```mermaid
flowchart TD
  A["7 插入 → 載入族"] --> B["確認位於<br>族 → 電纜槽配件"]
  B --> C["確認左右線架<br>寬、高、中心線、高程一致"]
  C --> D["系統 → 電氣 → 電纜槽配件<br>點第一段線架端點放置"]
  D --> E["拖曳第二段線架端點<br>接到伸縮節另一端連接器"]
  E --> F{"8 分析 → 檢查系統<br>顯示斷開連接"}
  F -->|有斷開標記| G["檢查連接器設定<br>不要改成一般模型"]
  G --> D
  F -->|沒有標記| H["建立電纜槽配件明細表"]
```

## 尚未確認

- 繁中 2027 介面的零件類型名稱、「顯示斷開連接」的位置與字樣（目前依 2016 版文件）
- 廠商實際尺寸
- 聯結類配件夾在兩段線架中間時的實際放置行為
- 網格式線架的零件類型歸屬
- 製造商、型號在繁中 2027 是否為「識別資料」內建參數

## 資料來源

- [Part Types – Revit 2027 Help](https://help.autodesk.com/cloudhelp/2027/ENU/Revit-Customize/files/GUID-54F9DD0A-6F46-4B52-8F58-B8FA630F14EA.htm)
- [Add Cable Tray Fittings – Revit 2027 Help](https://help.autodesk.com/cloudhelp/2027/ENU/Revit-MEPEng/files/GUID-F88D8921-5F1E-4FE2-B2A8-1ACBFCC6286A.htm)
- [Load Families in Context – Revit 2027 Help](https://help.autodesk.com/cloudhelp/2027/ENU/Revit-Model/files/GUID-C3A489CA-9FD2-408D-80CA-DCE0E42FACF8.htm)
- [Specify Family Category and Parameters – Revit 2026 Help](https://help.autodesk.com/cloudhelp/2026/ENU/Revit-Customize/files/GUID-68EFCA67-4913-4E00-AB9E-F2E6A7BEF8C6.htm)
- [Place a Connector – Revit 2022 Help](https://help.autodesk.com/cloudhelp/2022/ENU/Revit-Customize/files/GUID-BE4F1954-1049-46EC-BCB2-D03D27B4C77A.htm)
- [About Check Duct Systems – Revit 2016 Help](https://help.autodesk.com/cloudhelp/2016/ENU/Revit-Model/files/GUID-F70AE6D6-8AF4-496F-8175-1BBD737FF8C2.htm)
- [PartType Enumeration – Revit API 2015](https://www.revitapidocs.com/2015/4182a378-a3cc-7f0c-87b3-d230c2540267.htm)
- [How to set Fitting of Union like a cable tray – Autodesk Community](https://forums.autodesk.com/t5/revit-api-forum/how-to-set-fitting-of-union-like-a-cable-tray-by/td-p/10159799)
- [How to install Revit project and family templates – Autodesk](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-install-Revit-project-and-family-templates.html)
