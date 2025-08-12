// lib/tokenizers/char.js

export function trainChar(corpus) {
  const freqs = {};
  for (const ch of corpus) freqs[ch] = (freqs[ch] ?? 0) + 1;

  const chars = Object.keys(freqs).sort(
    (a, b) => (freqs[b] - freqs[a]) || (a < b ? -1 : a > b ? 1 : 0)
  );

  const token2id = {};
  const id2token = [];
  let id = 0;
  for (const ch of chars) {
    token2id[ch] = id;
    id2token[id] = ch;
    id++;
  }

  return {
    method: "char",
    token2id,
    id2token,
    freqs,
    size: id2token.length,
    corpusLength: corpus.length,
    meta: { trainedAt: new Date().toISOString() }
  };
}

export function encodeChar(text, vocab) {
  const tokens = [];
  const ids = [];
  for (const ch of text) {
    tokens.push(ch);
    ids.push(vocab.token2id[ch] ?? -1);
  }
  return { tokens, ids };
}

export function decodeChar(ids, vocab) {
  return ids.map(id => (vocab.id2token[id] ?? "<UKN>")).join("");
}

export function parseIdList(input) {
    return input?.trim() ? 
        input.split(/[\s,]+/).map(n => parseInt(n)).filter(Number.isFinite) : 
        [];
}
