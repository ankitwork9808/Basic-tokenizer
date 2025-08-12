"use client";

import { useState } from "react";
import MethodSelector from "./components/MethodSelector";
import CorpusPanel from "./components/CorpusPanel";
import VocabTable from "./components/VocabTable";
import EncodePanel from "./components/EncodePanel";
import DecodePanel from "./components/DecodePanel"; 
import { trainChar } from "../lib/tokenizers/char";
import { downloadJSON } from "../lib/utils/download";

export default function TokenizerClient() {
  const [method, setMethod] = useState("char");
  const [corpus, setCorpus] = useState("");
  const [vocab, setVocab] = useState(null);
  const [showVocab, setShowVocab] = useState(false);
  const [status, setStatus] = useState("");

  function handleTrain() {
    if (!corpus.trim()) { 
        setStatus("Provide a corpus before training.");
        return; 
    }

    if (method !== "char") { 
        setStatus(`${method.toUpperCase()} coming soon`); 
        return; 
    }

    const p0 = performance.now();
    const vocab = trainChar(corpus);
    const ms = Math.max(1, Math.round(performance.now() - p0));
    setVocab(vocab);
    setShowVocab(true);
    setStatus(`Trained ${vocab.size} tokens in ${ms} ms`);
  }

  return (
    <div className="space-y-6">
      <MethodSelector method={method} onChange={setMethod} />
      <CorpusPanel
        corpus={corpus}
        setCorpus={setCorpus}
        onTrain={handleTrain}
        onToggleView={() => setShowVocab(v => !v)}
        canView={!!vocab}
        viewing={showVocab}
        onDownload={()=>vocab && downloadJSON("vocab.json", vocab)}
        status={status}
      />
      {showVocab && vocab && <VocabTable vocab={vocab} />}
      {vocab && (
        <>
          <EncodePanel vocab={vocab} />
          <DecodePanel vocab={vocab} />
        </>
      )}
    </div>
  );
}
