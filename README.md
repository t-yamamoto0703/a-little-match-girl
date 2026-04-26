# A Little Match Girl!

---

# English

> **Note**  
> This README was drafted using **Microsoft Copilot**, intentionally instructed to write in a  
> **“Google‑engineer‑style” technical tone** as an experiment in cross‑style documentation.  
> The content reflects the project accurately, while the writing style is part of the experiment.

## Overview

This project is a browser-based game that provides three modes of cognitive training:  
**numeric memory**, **card memory**, and **calendar (day-of-week) calculation**.

## Live Demo

- https://t-yamamoto0703.github.io/a-little-match-girl/

## Development Goals

The project was developed as part of a personal learning workflow with the following objectives:

- Strengthen foundational programming skills  
- Practice structured reasoning and decomposition  
- Make the development process observable and reviewable  
- Explore the use of generative AI in iterative development

## Code Structure

This project reuses code from earlier prototypes and incorporates additional features.  
As a result, the current implementation includes several known structural issues:

- Numerous HTML elements use `id` attributes, which are exposed as properties on `window` due to browser behavior  
- Naming conventions across HTML and JavaScript files are inconsistent  
- Several top-level variables remain unorganized (the overall script is wrapped in an IIFE)  
- Multiple functions have unclear or overlapping responsibilities  
- UI logic and computational logic are tightly coupled  
- These factors increase the likelihood of unintended variable collisions or accidental cross-references

These issues are understood and documented.  
Due to time constraints, the project is currently frozen in this state.  
Future refactoring may be considered if the need arises.

## Card Design

The cards use a simplified visual format such as  
**♠[A,2,3,4,5,6,7,8,9,10,J,Q,K].**  
This is only a visual design choice and does not represent the internal card numbering.  

Notes:

- The ordering differs from standard playing-card notation (e.g., A♠, 3♣)  
- Card information is simplified, which may make memorization more difficult than with real playing cards  
- For competitive training (e.g., memory sports), real cards or specialized tools are recommended

## Day-of-Week Algorithm

The day-of-week calculation is based on the developer’s own mental strategy for identifying weekday positions.  
The method combines four inputs — **century, year, month, and date** — in a flexible, non-sequential manner, reflecting an intuitive rather than procedural approach.

Implementation details:

- Intuitive steps were decomposed into explicit, ordered operations  
- The resulting algorithm is a **structured approximation** of the original mental process  
- The design prioritizes transparency and reproducibility over replicating the exact cognitive workflow

## Consistency Model

- Correctness is verified using a standard Julian Day–based formula  
- This verification logic is independent of the internal algorithm and serves as a stable reference baseline

## Auxiliary Cards

Auxiliary cards represent the forward movement of dates on a calendar — effectively, the weekday offset.

Key properties:

- The sum of card values aligns with the computed weekday index  
- Cards are optional; users may rely on the **Month Adjust** control or answer directly  
- For January and February in leap years, a **−1 adjustment** is applied to maintain consistency

## Tested Environments

The project has been validated in the following environments:

- Lubuntu 24.04.4 LTS / Chromium  
- Windows 11 / Microsoft Edge, Firefox

## Assets and Licensing

- Some images and audio assets are based on materials from the **RPG Maker** series  
  and are included in accordance with their license terms  
- These assets are not redistributed in standalone form  
- The source code is released under the MIT License  
- Redistribution or secondary use of the included images or audio is not permitted

## Additional Notes

- During development, structural complexity increased due to design changes and feature additions  
  The project is currently frozen in a functional but not fully optimized state  
- If future work in JavaScript becomes relevant, the project may be rebuilt or refactored from scratch  
- With the rapid evolution of generative AI, more efficient refactoring workflows are expected to become available  
  For now, freezing the project in its current working state is considered the most practical choice  
- While AI can reduce development overhead, human reasoning and design judgment remain essential

---

# 日本語

> **注記**  
> 本 README は、**Microsoft Copilot** に対して  
> **「Google のエンジニア文体で書いてほしい」** と指示して作成したものです。  
> 文体は実験的なものですが、内容は本プロジェクトを正確に反映しています。

## 概要

本作品は、**数値記憶・カード記憶・カレンダー計算**の3つのモードを備えたブラウザゲームです。

## 公開ページ

- https://t-yamamoto0703.github.io/a-little-match-girl/

## 開発目的

本作品は、基礎的なプログラミングスキルや論理的思考の訓練、  
および技術的理解の可視化を目的として作成しています。

## コード構造について

本作品は過去のコードを再利用しつつ機能追加を行った経緯があり、  
以下のような課題を抱えた状態で一旦凍結しています。

- 多数の HTML 要素に id が付与されており、ブラウザ仕様により `window` 直下のプロパティとして公開されてしまう  
- HTML / JS ファイル間で命名規則の一貫性が崩れている  
- トップレベルで宣言された変数が整理されずに残っている（全体は IIFE で閉じている）  
- 責務境界が曖昧な関数が複数存在する  
- UI ロジックと計算ロジックが密結合している  
- その結果、意図しない変数衝突や偶発的な参照が発生しやすい構造になっている

これらの課題は把握していますが、時間的制約のため現時点では現状維持としています。  
今後、必要性や機会があればリファクタリングを行う可能性があります。

## カード仕様

本ゲームのカードは、  
**♠[A,2,3,4,5,6,7,8,9,10,J,Q,K]**  
のように、直感的な見た目を優先したデザインとなっています。

- 一般的なトランプ表記（A♠、3♣ など）とは順序が異なります  
- 本ゲームのカード記憶は情報を簡略化しているため、実物のトランプより記憶が定着しにくい場合があります  
- 競技的な訓練（メモリースポーツ等）には実物のトランプや専用ツールの利用を推奨します

## 曜日計算アルゴリズム

本ゲームの曜日算出方式は、開発者が実際に行っている  
「世紀・年・月・日の4要素を順不同で直感的に組み合わせて曜日位置を特定する」  
という思考プロセスをコード化したものです。

- 脳内では“計算”というより“検索”に近い処理を、あえて論理的な計算手順へと分解し実装しています  
- そのため、実際の思考過程とコード上の処理には一定の差があります

## 整合性

- 曜日の正誤判定には、ユリウス日を用いた標準的な数式を採用しています  
- この検証ロジックは内部アルゴリズムとは独立しており、基準値として機能します

## 補助カードの役割

補助カードは、カレンダー上での日付の右方向（曜日の進み）を数値化したものです。

- 合計値が算出される曜日インデックスと一致するよう設計しています  
- 直感に合わない場合は **Month Adjust** ボタンを使用するか、補助カードを無視して直接解答してください  
- 補助カードの使用は任意です  
- うるう年の 1 月・2 月のみ、整合性維持のため **−1 の補正** を適用しています

## 動作確認環境

以下の環境で動作確認を行っています。

- Lubuntu 24.04.4 LTS / Chromium  
- Windows 11 / Microsoft Edge, Firefox

## 注意事項・ライセンス

- 本作品には、RPG Maker シリーズの素材を元にした画像・音源が含まれています  
  ライセンス条件に従い、素材単体での再配布は行っていません  
- ソースコードは MIT ライセンスで公開しています  
  ただしカード画像の再配布・二次利用は許可していません

## 補足

- 本作品は設計変更の過程で複雑化した部分があり、結果として一部の構造が最適化されていません  
  現時点では動作が安定しているため、この状態で凍結しています  
- 今後、再び JavaScript を扱う機会があれば、より整理された形で再構築する可能性があります  
- 生成 AI の進化により、将来的にはより効率的なリファクタリングが可能になると考えており、  
  現段階では「動作する形での凍結」が最適と判断しました  
- AI の進化が開発・リファクタリングの負荷を下げてくれる未来を期待しつつ、  
  人間の思考力もまた重要な役割を果たすと考えています
