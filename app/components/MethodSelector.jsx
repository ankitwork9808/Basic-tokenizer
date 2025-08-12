"use client";
export default function MethodSelector({ method, onChange }) {
  const items = ["char", "bpe", "word"];
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <h2 className="mb-3 text-sm font-medium text-neutral-300">Tokenizer Method</h2>
      <div className="inline-flex overflow-hidden rounded-md border border-neutral-800">
        {items.map((m, i) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={[
              "px-3 py-1.5 text-sm transition cursor-pointer",
              i ? "border-l border-neutral-800" : "",
              method === m ? "bg-neutral-800" : "hover:bg-neutral-900",
            ].join(" ")}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-neutral-400">
        Selected: <span className="font-medium text-neutral-200">{method.toUpperCase()}</span>
      </p>
    </section>
  );
}
