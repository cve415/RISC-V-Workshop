import { Button } from "@/components/ui/button";
import { tableOfContents } from "@/lib/slide-data";

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSlideSelect: (slideIndex: number) => void;
  currentSlide: number;
}

export function TableOfContents({ isOpen, onClose, onSlideSelect, currentSlide }: TableOfContentsProps) {
  if (!isOpen) return null;

  const handleSlideClick = (slideIndex: number) => {
    onSlideSelect(slideIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 no-print">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Table of Contents</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-3">
              {tableOfContents.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(item.slide)}
                  className={`text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    currentSlide === item.slide ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="font-medium text-[color:var(--riscv-primary)]">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 border-t">
            <Button
              onClick={onClose}
              className="w-full bg-[color:var(--riscv-primary)] text-white hover:bg-blue-700 transition-colors"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
