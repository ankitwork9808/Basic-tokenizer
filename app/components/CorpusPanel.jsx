"use client";
export default function CorpusPanel({corpus, setCorpus, onTrain, onToggleView, canView, viewing, onDownload, status }) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-medium">1) Train from Custom Corpus (Text)</h2>
        <span className="h-5 text-xs text-emerald-400">{status}</span>
      </div>
      <textarea
        value={corpus}
        onChange={(e)=>setCorpus(e.target.value)}
        placeholder="Paste training text here…"
        className="h-48 w-full resize-y rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={onTrain}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-neutral-950 hover:bg-emerald-500">
          Train Tokenizer
        </button>
        <button onClick={onToggleView} disabled={!canView}
          className={`rounded-md px-3 py-1.5 text-sm font-medium border ${
            canView ? "border-neutral-700 hover:bg-neutral-900"
                    : "border-neutral-900 text-neutral-500 cursor-not-allowed"}`}>
          {viewing ? "Hide Vocab" : "View Vocab"}
        </button>
        <button onClick={onDownload} disabled={!canView}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            canView ? "bg-blue-600 hover:bg-blue-500 text-neutral-950"
                    : "bg-neutral-900 text-neutral-500 cursor-not-allowed"}`}>
          Download vocab.json
        </button>
      </div>
    </section>
  );
}
