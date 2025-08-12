import TokenizerClient from "./TokenizerClient";

export default function Page() {
  return (
    <main className="min-h-dvh bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">Custom Tokenizer</h1>
        <TokenizerClient />
      </div>
    </main>
  );
}
