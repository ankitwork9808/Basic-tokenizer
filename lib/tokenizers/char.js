const SPECIALS = ["<UNK>", "<SPACE>", "<TAB>", "<NL>"];

export function trainChar(corpus) {
  const freqs = {};
  for (const ch of corpus) {
    const key = ch === " " ? "<SPACE>" : ch === "\t" ? "<TAB>" : ch === "\n" ? "<NL>" : ch;
    freqs[key] = (freqs[key] ?? 0) + 1;
  }

  const learned = Object.keys(freqs)
    .filter(t => !SPECIALS.includes(t))
    .sort((a, b) => (freqs[b] - freqs[a]) || (a < b ? -1 : a > b ? 1 : 0));

  const token2id = {};
  const id2token = [];

  for (const tok of SPECIALS) {
    token2id[tok] = id2token.length;
    id2token.push(tok);
    if (freqs[tok] == null) freqs[tok] = 0;
  }

  for (const tok of learned) {
    token2id[tok] = id2token.length;
    id2token.push(tok);
  }

  return {
    method: "char",
    token2id,
    id2token,
    freqs,
    size: id2token.length,
    corpusLength: corpus.length,
    meta: { trainedAt: new Date().toISOString(), specials: SPECIALS }
  };
}

export function encodeChar(text, vocab) {
  const tokens = [];
  const ids = [];
  const idUNK = vocab.token2id["<UNK>"];

  for (const ch of text) {
    const tok = ch === " " ? "<SPACE>" : ch === "\t" ? "<TAB>" : ch === "\n" ? "<NL>" : ch;
    const id = vocab.token2id[tok];
    if (id != null) {
      tokens.push(tok);
      ids.push(id);
    } else {
      tokens.push("<UNK>");
      ids.push(idUNK);
    }
  }
  return { tokens, ids };
}

export function decodeChar(ids, vocab) {
  if (!Array.isArray(ids)) return "";
  let out = "";
  for (const id of ids) {
    const tok = vocab.id2token[id];
    if (tok === "<SPACE>") out += " ";
    else if (tok === "<TAB>") out += "\t";
    else if (tok === "<NL>") out += "\n";
    else if (tok === "<UNK>") out += "<UKN>";
    else if (typeof tok === "string") out += tok;
  }
  return out;
}

export function parseIdList(input) {
    return input?.trim() ? 
        input.split(/[\s,]+/).map(n => parseInt(n)).filter(Number.isFinite) : 
        [];
}
