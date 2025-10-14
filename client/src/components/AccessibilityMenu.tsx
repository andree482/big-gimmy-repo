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

type ColorblindnessType = 
  | "normal" 
  | "protanopia" 
  | "deuteranopia" 
  | "tritanopia" 
  | "high-contrast-light" 
  | "high-contrast-dark";

interface AccessibilityOption {
  id: ColorblindnessType;
  label: string;
  description: string;
}

const accessibilityOptions: AccessibilityOption[] = [
  {
    id: "normal",
    label: "Visione normale",
    description: "Colori standard del sito"
  },
  {
    id: "protanopia",
    label: "Protanopia/Protanomalia",
    description: "Correzione Rosso-Verde tipo 1"
  },
  {
    id: "deuteranopia", 
    label: "Deuteranopia/Deuteranomalia",
    description: "Correzione Rosso-Verde tipo 2"
  },
  {
    id: "tritanopia",
    label: "Tritanopia",
    description: "Correzione Blu-Giallo"
  },
  {
    id: "high-contrast-light",
    label: "Alto contrasto (chiaro)",
    description: "Sfondo chiaro, testo nero"
  },
  {
    id: "high-contrast-dark",
    label: "Alto contrasto (scuro)", 
    description: "Sfondo scuro, testo bianco"
  }
];

export default function AccessibilityMenu() {
  const [selectedMode, setSelectedMode] = useState<ColorblindnessType>("normal");

  useEffect(() => {
    // Carica la preferenza salvata
    const saved = localStorage.getItem("accessibility-mode");
    if (saved && accessibilityOptions.find(opt => opt.id === saved)) {
      setSelectedMode(saved as ColorblindnessType);
      applyAccessibilityMode(saved as ColorblindnessType);
    }

    // Observer per applicare stili dinamicamente a nuovi elementi
    const observer = new MutationObserver(() => {
      if (selectedMode !== "normal") {
        applyDynamicStyles(selectedMode);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => observer.disconnect();
  }, [selectedMode]);

  const updateCSSVariables = (mode: ColorblindnessType) => {
    const root = document.documentElement;
    
    if (mode === "normal") {
      // Ripristina i valori originali
      root.style.setProperty('--primary-yellow', '51 100% 50%'); // #FFD100 in HSL
      return;
    }

    // Aggiorna le variabili CSS globali
    const colorMap = {
      'protanopia': '30 100% 60%',     // Arancione
      'deuteranopia': '45 100% 55%',   // Giallo più saturo  
      'tritanopia': '15 95% 60%'       // Arancione scuro
    };

    const newColorHSL = colorMap[mode as keyof typeof colorMap];
    if (newColorHSL) {
      root.style.setProperty('--primary-yellow', newColorHSL);
      root.style.setProperty('--primary', newColorHSL);
    }
  };

  const applyDynamicStyles = (mode: ColorblindnessType) => {
    if (mode === "normal") {
      updateCSSVariables(mode);
      return;
    }

    // Aggiorna le variabili CSS prima di tutto
    updateCSSVariables(mode);

    // Applica stili specifici agli elementi
    const colorMap = {
      'protanopia': 'hsl(30 100% 60%)',
      'deuteranopia': 'hsl(45 100% 55%)', 
      'tritanopia': 'hsl(15 95% 60%)'
    };

    const newColor = colorMap[mode as keyof typeof colorMap];
    if (!newColor) return;

    // Forza l'aggiornamento di tutti gli elementi con il colore giallo
    setTimeout(() => {
      const elementsToUpdate = document.querySelectorAll('*');
      elementsToUpdate.forEach(el => {
        const element = el as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        
        // Controlla il colore di sfondo computed e inline
        if (computedStyle.backgroundColor === 'rgb(255, 209, 0)' || 
            element.style.backgroundColor?.includes('#FFD100') ||
            element.style.backgroundColor?.includes('rgb(255, 209, 0)') ||
            element.style.backgroundColor?.includes('var(--primary-yellow)')) {
          element.style.setProperty('background-color', newColor, 'important');
        }
        
        // Controlla il colore del testo
        if (computedStyle.color === 'rgb(255, 209, 0)' || 
            element.style.color?.includes('#FFD100') ||
            element.style.color?.includes('rgb(255, 209, 0)') ||
            element.style.color?.includes('var(--primary-yellow)')) {
          element.style.setProperty('color', newColor, 'important');
        }
        
        // Controlla classi Tailwind specifiche
        if (element.classList.contains('bg-[--primary-yellow]') ||
            element.classList.contains('bg-yellow-400') ||
            element.classList.contains('text-yellow-400')) {
          element.style.setProperty('background-color', newColor, 'important');
          element.style.setProperty('color', newColor, 'important');
        }
      });
    }, 100);
  };

  const applyAccessibilityMode = (mode: ColorblindnessType) => {
    const root = document.documentElement;
    
    // Rimuovi tutte le classi di accessibilità precedenti
    root.classList.remove(
      "accessibility-protanopia",
      "accessibility-deuteranopia", 
      "accessibility-tritanopia",
      "accessibility-high-contrast-light",
      "accessibility-high-contrast-dark"
    );

    // Applica la nuova modalità
    if (mode !== "normal") {
      root.classList.add(`accessibility-${mode}`);
      
      // Applica immediatamente gli stili dinamici
      setTimeout(() => applyDynamicStyles(mode), 50);
    }

    // Salva la preferenza
    localStorage.setItem("accessibility-mode", mode);
    setSelectedMode(mode);
  };

  const currentOption = accessibilityOptions.find(opt => opt.id === selectedMode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-50 bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Menu accessibilità"
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
        
        {accessibilityOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => applyAccessibilityMode(option.id)}
            className="flex items-start gap-3 p-3 cursor-pointer"
          >
            <div className="flex items-center justify-center w-5 h-5 mt-0.5">
              {selectedMode === option.id && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}