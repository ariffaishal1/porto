"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { playKeyClick } from "@/lib/sound";

interface TerminalCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function TerminalCodeBlock({ children, ...props }: TerminalCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children for copying
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
      // @ts-expect-error props children extraction
      return extractText(node.props?.children);
    }
    return "";
  };

  // Detect language if nested inside <code> with className="language-xyz"
  let detectedLanguage = "text";
  if (React.isValidElement(children)) {
    // @ts-expect-error check className of code element
    const className = children.props?.className || "";
    const match = className.match(/language-([a-zA-Z0-9_-]+)/);
    if (match) {
      detectedLanguage = match[1];
    }
  }

  const handleCopy = async () => {
    playKeyClick();
    const rawCode = extractText(children).trim();
    if (!rawCode) return;

    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="relative my-4 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-bg-panel)] overflow-hidden shadow-sm group">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--terminal-bg-elevated)] border-b border-[var(--terminal-border)] select-none text-xs">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block shadow-sm" />
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--terminal-text-dim)]">
            <Terminal className="w-3 h-3 text-[var(--terminal-accent)]" />
            <span>code.{detectedLanguage}</span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Salin kode ke clipboard"
          className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--terminal-bg)]/80 hover:bg-[var(--terminal-bg-selection)] border border-[var(--terminal-border)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-accent)] transition-all duration-150 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[var(--terminal-green)]" />
              <span className="text-[var(--terminal-green)] font-semibold">Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-[var(--terminal-text-dim)] group-hover:text-[var(--terminal-accent)]" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-3 overflow-x-auto text-[13px] font-mono leading-relaxed bg-[var(--terminal-bg)]">
        <pre {...props} className="!m-0 !p-0 !bg-transparent !border-0 text-[var(--terminal-text-bright)]">
          {children}
        </pre>
      </div>
    </div>
  );
}
