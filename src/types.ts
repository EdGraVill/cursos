export interface KV<K = string, V = string> {
  key: K;
  value: V;
}

export interface Content {
  audience: string;
  aurthor: string;
  content: string;
  course: string;
  grade: string;
  id: number;
  summary: string;
  title: string;
}
