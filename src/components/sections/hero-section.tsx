import React from "react";
import { profileData } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="hero" className="flex flex-col gap-2">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">cat</span>
        <span className="ml-1 text-[var(--terminal-green)]">welcome.txt</span>
      </div>

      {/* Output block */}
      <div className="flex flex-col gap-3 pt-1">
        <pre className="text-[var(--terminal-accent)] text-[7px] sm:text-[9px] md:text-[10px] leading-[1.1] font-normal overflow-x-auto whitespace-pre">
{` █████╗ ██████╗ ██╗███████╗    ███████╗ █████╗ ██╗███████╗██╗  ██╗ █████╗ ██╗         ███╗   ██╗
██╔══██╗██╔══██╗██║██╔════╝    ██╔════╝██╔══██╗██║██╔════╝██║  ██║██╔══██╗██║         ████╗  ██║
███████║██████╔╝██║█████╗      █████╗  ███████║██║███████╗███████║███████║██║         ██╔██╗ ██║
██╔══██║██╔══██╗██║██╔══╝      ██╔══╝  ██╔══██║██║╚════██║██╔══██║██╔══██║██║         ██║╚██╗██║
██║  ██║██║  ██║██║██║         ██║     ██║  ██║██║███████║██║  ██║██║  ██║███████╗    ██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝         ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═══╝`}
        </pre>

        <div className="text-[13.5px] leading-relaxed text-[var(--terminal-text)]">
          Halo! Saya{" "}
          <span className="text-[var(--terminal-accent)] font-semibold">
            {profileData.name}
          </span>{" "}
          — {profileData.role}.
          <br />
          {profileData.headline}
        </div>

        <div className="text-xs text-[var(--terminal-text-dim)] italic">
          &quot;Write clean code. Build real things.&quot;
        </div>
      </div>
    </section>
  );
}
