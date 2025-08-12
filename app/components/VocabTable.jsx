"use client";
export default function VocabTable({ vocab }) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-medium">Vocabulary</h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 px-2 py-0.5 text-xs">
            tokens: <span className="ml-1 text-neutral-200">{vocab.size}</span>
          </span>
          <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 px-2 py-0.5 text-xs">
            corpus chars: <span className="ml-1 text-neutral-200">{vocab.corpusLength}</span>
          </span>
          <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 px-2 py-0.5 text-xs">
            Trained At: <span className="ml-1 text-neutral-200">{vocab.meta.trainedAt}</span>
          </span>
        </div>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
            <tr>
              <th className="p-2 text-left font-semibold">ID</th>
              <th className="p-2 text-left font-semibold">Token</th>
              <th className="p-2 text-left font-semibold">Freq</th>
            </tr>
          </thead>
          <tbody>
            {vocab.id2token.map((tok, id) => (
              <tr key={id} className="border-b border-neutral-900">
                <td className="p-2">{id}</td>
                <td className="p-2 font-mono">
                  {tok === " " ? <span className="rounded bg-neutral-800 px-1">space</span> : tok}
                </td>
                <td className="p-2">{vocab.freqs[tok] ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
