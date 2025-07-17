import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenToc: () => void;
  disabled?: boolean;
}

export function SlideNavigation({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext, 
  onOpenToc,
  disabled = false
}: SlideNavigationProps) {
  const canGoPrevious = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-[color:var(--riscv-primary)]">RISC-V Workshop</h1>
            <span className="text-sm text-gray-600">NU4YOU - JCSSE2023</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious || disabled}
              size="sm"
              className="p-2 rounded-full bg-[color:var(--riscv-primary)] text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-16 text-center">
              {currentSlide + 1} / {totalSlides}
            </span>
            <Button
              onClick={onNext}
              disabled={!canGoNext || disabled}
              size="sm"
              className="p-2 rounded-full bg-[color:var(--riscv-primary)] text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={onOpenToc}
              size="sm"
              className="p-2 rounded-full bg-[color:var(--riscv-secondary)] text-white hover:bg-gray-700 transition-colors"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-[color:var(--riscv-primary)] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </nav>
  );
}
