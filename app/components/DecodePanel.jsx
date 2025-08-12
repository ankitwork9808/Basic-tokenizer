"use client";
import { useMemo, useState } from "react";
import { decodeChar, parseIdList } from "../../lib/tokenizers/char";

export default function DecodePanel({ vocab }) {
  const [idsText, setIdsText] = useState("");
  const [decoded, setDecoded] = useState("");

  const ids = useMemo(() => parseIdList(idsText), [idsText]);

  const canDecode = !!vocab && vocab.size > 0 && ids.length > 0;

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-neutral-900 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">3) Decode</h2>
        <textarea
          value={idsText}
          onChange={(e) => setIdsText(e.target.value)}
          placeholder="e.g., 11, 8, 18, 11, 19"
          className="w-full h-40 bg-neutral-950 rounded-lg p-3 outline-none font-mono"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white disabled:opacity-50"
            onClick={() => setDecoded(decodeChar(ids, vocab))}
            disabled={!canDecode}
          >
            Decode
          </button>
          <span className="text-sm text-neutral-400">
            {decoded ? `${[...decoded].length} characters` : ""}
          </span>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="text-sm font-mono whitespace-pre-wrap">
          {decoded ? decoded : <span className="text-neutral-500">Decoded text will appear here…</span>}
        </div>
      </div>
    </section>
  );
}
