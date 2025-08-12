"use client";
import { useMemo, useState } from "react";
import { encodeChar } from "../../lib/tokenizers/char";

export default function EncodePanel({ vocab }) {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState(null);

  const canEncode = !!vocab && vocab.size > 0;

  const pretty = useMemo(() => {
    if (!encoded) return { tokens: "", ids: "" };
    return {
      tokens: encoded.tokens.join(" "),
      ids: encoded.ids.join(", ")
    };
  }, [encoded]);

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-neutral-900 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">2) Encode</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text to encode…"
          className="w-full h-40 bg-neutral-950 rounded-lg p-3 outline-none"
        />

        <div className="mt-3 flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setEncoded(encodeChar(text, vocab))}
            disabled={!canEncode}
          >
            Encode
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-neutral-400">
            {encoded ? `${encoded.tokens.length} tokens` : ""}
          </span>
          {encoded && (
            <button
              className="px-3 py-1 rounded bg-neutral-800 text-sm cursor-pointer hover:bg-neutral-700"
              onClick={() => navigator.clipboard.writeText(pretty.ids)}
            >
              Copy IDs
            </button>
          )}
        </div>

        <div className="text-sm font-mono whitespace-pre-wrap flex-1">
          {encoded ? (
            <>
              <div className="text-neutral-400 mb-1">TOKENS:</div>
              {pretty.tokens}
              <div className="text-neutral-400 mt-4 mb-1">IDS:</div>
              {pretty.ids}
            </>
          ) : (
            <span className="text-neutral-500">
              Encoded output will appear here…
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
