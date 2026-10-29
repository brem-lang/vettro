import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, LANG_NAMES, useLang, useSetLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function FlagIT({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true" className={className}>
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  );
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true" className={className}>
      <rect width="3" height="2" fill="#aa151b" />
      <rect y=".5" width="3" height="1" fill="#f1bf00" />
    </svg>
  );
}

function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 3" aria-hidden="true" className={className}>
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#dd0000" />
      <rect y="2" width="5" height="1" fill="#ffce00" />
    </svg>
  );
}

function FlagSA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true" className={className}>
      <rect width="3" height="2" fill="#006c35" />
      <rect x=".9" y=".55" width="1.2" height=".2" rx=".05" fill="#fff" />
      <rect x=".9" y="1.05" width="1.2" height=".08" fill="#fff" />
    </svg>
  );
}

const FLAGS = { it: FlagIT, es: FlagES, de: FlagDE, ar: FlagSA };

// Each language gets its flag; English gets the universal globe.
export function LanguageIcon({ lang, className }: { lang: Lang; className?: string }) {
  if (lang === "en") return <Globe aria-hidden="true" className={cn("size-4", className)} />;
  const Flag = FLAGS[lang];
  return <Flag className={cn("h-3.5 w-5 rounded-[2px] ring-1 ring-foreground/10", className)} />;
}

export function LanguageSwitcher() {
  const lang = useLang();
  const setLang = useSetLang();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`Language: ${LANG_NAMES[lang]}`}
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-border transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-brand/50"
      >
        <LanguageIcon lang={lang} />
        <span className="hidden sm:inline">{lang.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LANGS.map((option) => (
          <DropdownMenuItem
            key={option}
            lang={option}
            onSelect={() => setLang(option)}
            className="gap-2.5"
          >
            <LanguageIcon lang={option} />
            <span>{LANG_NAMES[option]}</span>
            {option === lang && <Check aria-hidden="true" className="ms-auto size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
