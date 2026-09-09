import React from "react";
import Link from "next/link";
import { Terminal, Home, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">curl</span>
        <span className="ml-1 text-[var(--terminal-rose)]">/requested-resource</span>
      </div>

      {/* Terminal Error Panel */}
      <div className="bg-[var(--terminal-bg-panel)] border border-[var(--terminal-border)] rounded-md p-5 sm:p-7 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--terminal-rose)]">
          <Terminal className="w-4 h-4" />
          <span>HTTP/1.1 404 Not Found — No such file, route, or directory</span>
        </div>

        <pre className="text-[var(--terminal-rose)] text-[8px] sm:text-[10px] md:text-[11px] leading-[1.15] font-mono overflow-x-auto whitespace-pre select-none py-1">
{`  _  _    ___  _  _   
 | || |  / _ \\| || |  
 | || |_| | | | || |_ 
 |__   _| | | |__   _|
    | | | |_| |  | |  
    |_|  \\___/   |_|  `}
        </pre>

        <div className="flex flex-col gap-1.5 text-xs sm:text-[13px] leading-relaxed text-[var(--terminal-text)]">
          <p>
            <span className="text-[var(--terminal-amber)] font-semibold">bash: 404:</span> Rute atau dokumen studi kasus yang Anda minta tidak ditemukan dalam sistem file portofolio.
          </p>
          <p className="text-[var(--terminal-text-dim)]">
            Periksa kembali URL Anda, atau gunakan navigasi berikut untuk kembali ke direktori yang valid.
          </p>
        </div>

        {/* Navigation Action Links */}
        <div className="pt-3 border-t border-[var(--terminal-border)]/60 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-[var(--terminal-bg-selection)] hover:bg-[var(--terminal-accent-dim)] text-[var(--terminal-accent)] border border-[var(--terminal-border)] px-3.5 py-1.5 rounded text-xs font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            cd ~ (Kembali ke Beranda)
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] font-medium transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            ls ~/projects/ (Daftar Proyek)
          </Link>
        </div>
      </div>
    </div>
  );
}

