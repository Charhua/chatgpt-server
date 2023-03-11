export interface GptMainToKey {
  key: string;
  content: string;
  isFollow: boolean;
  parentMessageId?: string;
  opts?: any;
}

export interface GptMainToToken {
  key: string;
  content: string;
  isFollow: boolean;
  parentMessageId?: string;
  opts?: any;
}

export interface GptMain {
  mode: string;
  type: string;
  opts: GptMainToKey;
}
