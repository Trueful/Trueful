# Technical Specification

本ドキュメントは、Truefulのデータ構造、プロセス間通信（IPC）、状態管理を集約した実装仕様書です。

## Schema Definitions

### Workspace Manifest
Workspaceの構成要素を定義するJSONマニフェストです。

```json
{
  "name": "Trueful",
  "version": "1.0.0",
  "securityProfile": "development",
  "gitInfo": {
    "enabled": true,
    "repoPath": "/Users/dev/trueful"
  },
  "tabs": [
    {
      "id": "tab-1",
      "url": "http://localhost:3000",
      "pinned": true
    }
  ],
  "plugins": [
    "json-viewer",
    "network-logger"
  ]
}
```

### Security Profile
実行時のセキュリティ制限を定義するプロファイル。

```json
{
  "profileName": "development",
  "permissions": {
    "allowClipboard": true,
    "allowFileWrite": false,
    "allowCamera": false,
    "allowGeolocation": false
  },
  "corsOverride": true,
  "certificateErrors": "ignore"
}
```

## IPC (Inter-Process Communication)

RendererプロセスとMainプロセス間の通信は `ipcRenderer.invoke` で行い、厳密に型付けされます。

```typescript
// IPC Channels
export enum IpcChannel {
  WORKSPACE_LOAD = 'workspace:load',
  AI_BROKER_ENQUEUE = 'ai-broker:enqueue'
}

// Request & Response Interfaces
export interface WorkspaceLoadRequest {
  workspaceId: string;
}

export interface WorkspaceLoadResponse {
  success: boolean;
  manifest?: WorkspaceManifest;
  error?: ErrorCode;
}

export interface AiEnqueueRequest {
  prompt: string;
  context: Record<string, any>;
}

export interface AiEnqueueResponse {
  jobId: string;
  status: 'queued' | 'executing';
}
```

## Error Codes

エラーコードは `<Domain><3-digit>` 形式で管理し、SeverityとRecoveryのアクションを定義します。

| Code   | Message                      | Severity | Recovery |
|--------|------------------------------|----------|----------|
| SEC001 | 許可されていないOriginの実行 | WARNING  | Ignore   |
| WS001  | Manifestが見つかりません     | ERROR    | Retry    |
| WS002  | 破損したSQLiteデータベース   | FATAL    | Restart  |
| AI001  | ローカルAIの接続タイムアウト | ERROR    | Retry    |

* **Severity**:
  * `INFO`: 通知のみ
  * `WARNING`: ユーザーへの注意喚起。処理は続行可能
  * `ERROR`: 特定の操作が失敗。リカバリが必要
  * `FATAL`: システム全体の継続が困難
* **Recovery**:
  * `Retry`: 再試行を促す
  * `Restart`: アプリの再起動が必要
  * `Ignore`: そのまま無視して進行可能
