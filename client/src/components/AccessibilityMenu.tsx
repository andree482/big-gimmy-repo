import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Check } from "lucide-react";

/**
 * Tipi di visione supportati.
 * Usano l'attributo data-vision su <html> per attivare le palette CSS.
 */
type VisionType =
  | "default"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "high-contrast-light"
  | "high-contrast-dark";

interface VisionOption {
  id: VisionType;
  label: string;
  description: string;
}

const visionOptions: VisionOption[] = [
  {
    id: "default",
    label: "Visione normale",
    description: "Colori standard del sito",
  },
  {
    id: "protanopia",
    label: "Protanopia",
    description: "Palette ciano/blu ad alto contrasto",
  },
  {
    id: "deuteranopia",
    label: "Deuteranopia",
    description: "Palette blu/viola ad alto contrasto",
  },
  {
    id: "tritanopia",
    label: "Tritanopia",
    description: "Palette rosa/magenta ad alto contrasto",
  },
  {
    id: "high-contrast-light",
    label: "Alto contrasto (chiaro)",
    description: "Nero su bianco, massimo contrasto",
  },
  {
    id: "high-contrast-dark",
    label: "Alto contrasto (scuro)",
    description: "Bianco/giallo su nero, massimo contrasto",
  },
];

const STORAGE_KEY = "vision-mode";

/**
 * Applica la modalità visiva impostando data-vision su <html>.
 * Tutto il resto è gestito via CSS puro in index.css.
 */
function applyVisionMode(mode: VisionType): void {
  const root = document.documentElement;

  // Imposta l'attributo data-vision
  if (mode === "default") {
    root.removeAttribute("data-vision");
  } else {
    root.setAttribute("data-vision", mode);
  }

  // Rimuovi le vecchie classi per retrocompatibilità
  root.classList.remove(
    "accessibility-protanopia",
    "accessibility-deuteranopia",
    "accessibility-tritanopia",
    "accessibility-high-contrast-light",
    "accessibility-high-contrast-dark"
  );

  // Rimuovi eventuali filtri SVG applicati al body
  document.body.style.filter = "";

  // Salva preferenza
  localStorage.setItem(STORAGE_KEY, mode);
}

/**
 * Menu accessibilità per la correzione visiva.
 * Implementa palette "protanopia-friendly" basate su CONTRASTO,
 * non su filtri SVG che possono rendere il testo invisibile.
 */
export default function AccessibilityMenu() {
  const [selectedMode, setSelectedMode] = useState<VisionType>("default");

  // Carica preferenza salvata all'avvio
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as VisionType | null;
    if (saved && visionOptions.find((opt) => opt.id === saved)) {
      setSelectedMode(saved);
      applyVisionMode(saved);
    }
  }, []);

  const handleModeChange = (mode: VisionType) => {
    setSelectedMode(mode);
    applyVisionMode(mode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-50 bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Menu accessibilità visiva"
        >
          <Eye className="h-4 w-4 mr-2" />
          Accessibilità
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-center">
          Correzione Visiva
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {visionOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleModeChange(option.id)}
            className="flex items-start gap-3 p-3 cursor-pointer"
          >
            <div className="flex items-center justify-center w-5 h-5 mt-0.5">
              {selectedMode === option.id && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {option.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
