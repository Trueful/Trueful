# Priority Layers（優先順位レイヤー）

原則同士が衝突する場合、上位レイヤーが常に勝つ。実装判断に迷ったら、まずどのレイヤーの原則同士がぶつかっているかを特定する。

## Layer 0 — Core Values（不変の価値観）

存在理由そのもの。他のいかなる原則にも優先する。

- Developer First
- Purpose First
- Power User First
- Time First

## Layer 1 — Interaction Contract（UXの契約）

ユーザーとブラウザの信頼関係を定義する。Layer 0 に反しない限り、Layer 2・3 に優先。

- No Confusion
- Never Get Lost
- Predictable
- Transparency
- Zero Noise

## Layer 2 — Technical Freedom（技術的自由度）

実装上の自由と拡張性。Layer 1 の契約を破らない範囲で最大化する。

- Everything Configurable
- Security Is a Choice
- Local First
- Keyboard First
- Extensible
- Inspectable
- Failure Friendly
- Open Standards

## Layer 3 — Work Unit Model（作業単位）

情報の組織化方法。他レイヤーを実現するための手段であり、目的ではない。

- Reproducibility
- Workspace First

## サマリーテーブル

| Layer | 性格 | 原則 |
|---|---|---|
| 0: Core Values | 不変の価値観。他の全てに優先 | Developer First / Purpose First / Power User First / Time First |
| 1: Interaction Contract | ユーザーとの信頼関係 | No Confusion / Never Get Lost / Predictable / Transparency / Zero Noise |
| 2: Technical Freedom | 実装上の自由度 | Everything Configurable / Security Is a Choice / Local First / Keyboard First / Extensible / Inspectable / Failure Friendly / Open Standards |
| 3: Work Unit Model | 情報組織化の手段 | Reproducibility / Workspace First |

関連: [解消された内部緊張](./resolved-tensions.md) / [Layer→機能マッピング](../architecture/overview.md)
