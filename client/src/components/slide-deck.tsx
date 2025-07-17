import { useState, useEffect } from "react";
import { SlideNavigation } from "./slide-navigation";
import { TableOfContents } from "./table-of-contents";
import { slideData, SlideData, SlideContent } from "@/lib/slide-data";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Cpu, 
  Code, 
  ClipboardList, 
  Settings, 
  Table, 
  CheckCircle, 
  GraduationCap, 
  List, 
  Database,
  ArrowRight
} from "lucide-react";

const iconMap = {
  Brain,
  Cpu,
  Code,
  ClipboardList,
  Settings,
  Table,
  CheckCircle,
  GraduationCap,
  List,
  Database,
  ArrowRight
};

export function SlideDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const totalSlides = slideData.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsTocOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch/swipe support
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
          nextSlide();
        } else if (diffX < -50) {
          prevSlide();
        }
      }

      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide]);

  const renderSlideContent = (content: SlideContent) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[color:var(--riscv-secondary)] mb-4">
              {content.data.text}
            </h3>
            {content.data.subtext && (
              <p className="text-lg text-gray-700 whitespace-pre-line">{content.data.subtext}</p>
            )}
            {content.data.items && (
              <div className="space-y-4 mt-6">
                {content.data.items.map((item: any, index: number) => (
                  <div key={index} className="border-l-4 border-[color:var(--riscv-accent)] pl-4">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-gray-700">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            )}
            {content.data.codes && (
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {content.data.codes.map((code: string, index: number) => (
                  <div key={index} className="code-block">
                    <code className="text-white font-mono">{code}</code>
                  </div>
                ))}
              </div>
            )}
            {content.data.title && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-[color:var(--riscv-accent)] mb-4">
                  {content.data.title}
                </h3>
                <p className="text-lg mb-4">{content.data.text}</p>
                {content.data.codes && (
                  <div className="grid gap-4">
                    {content.data.codes.map((code: string, index: number) => (
                      <div key={index} className="code-block">
                        <code className="text-white font-mono">{code}</code>
                      </div>
                    ))}
                  </div>
                )}
                {content.data.extras && (
                  <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <p className="text-sm text-gray-600">Extra Questions:</p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      {content.data.extras.map((extra: string, index: number) => (
                        <li key={index}>• {extra}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {content.data.extensions && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {content.data.extensions.map((ext: any, index: number) => (
                  <div key={index} className="border-l-4 border-[color:var(--riscv-accent)] pl-4">
                    <h4 className="font-bold text-[color:var(--riscv-accent)] text-xl">
                      "{ext.letter}" {ext.name}
                    </h4>
                    <p className="text-sm text-gray-700">{ext.description}</p>
                  </div>
                ))}
              </div>
            )}
            {content.data.additionalExtensions && (
              <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">
                {content.data.additionalExtensions.map((ext: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <span className="font-bold text-[color:var(--riscv-accent)] w-8">
                      "{ext.letter}"
                    </span>
                    <span>{ext.name}</span>
                  </div>
                ))}
              </div>
            )}
            {content.data.docs && (
              <div className="grid md:grid-cols-2 gap-4 text-sm mt-6">
                {content.data.docs.map((doc: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-3 rounded">
                    <h5 className="font-medium text-[color:var(--riscv-accent)]">{doc.title}</h5>
                    <p className="text-gray-600">{doc.file}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4 text-lg">
            {content.data.items.map((item: any, index: number) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div key={index} className="flex items-start">
                  {IconComponent && (
                    <IconComponent className="text-[color:var(--riscv-accent)] mr-3 mt-1 h-5 w-5" />
                  )}
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            {content.data.items.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[color:var(--riscv-secondary)]">
                    {item.title}
                  </h3>
                  <span className="text-[color:var(--riscv-accent)] font-medium">
                    {item.year}
                  </span>
                </div>
                {item.description && (
                  <p className="text-gray-700">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'grid':
        return (
          <div className={`grid lg:grid-cols-${content.data.columns} gap-8`}>
            {content.data.items.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-[color:var(--riscv-secondary)] mb-4">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-lg text-gray-700 mb-4">{item.subtitle}</p>
                )}
                {item.content && (
                  <div className="space-y-3 font-mono text-sm">
                    {item.content.map((line: string, lineIndex: number) => (
                      <div key={lineIndex} className="bg-gray-100 p-3 rounded">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
                {item.code && (
                  <div className="code-block mt-4">
                    <code className="text-white font-mono">{item.code}</code>
                  </div>
                )}
                {item.description && (
                  <p className="text-gray-700">{item.description}</p>
                )}
                {item.memoryMap && (
                  <div className="font-mono text-xs space-y-1 mt-4">
                    {item.memoryMap.map((line: string, lineIndex: number) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                  </div>
                )}
                {item.instructions && (
                  <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {item.instructions.map((instruction: string, instrIndex: number) => (
                      <div key={instrIndex} className="bg-gray-100 p-2 rounded">
                        {instruction}
                      </div>
                    ))}
                  </div>
                )}
                {item.sections && (
                  <div className="space-y-3">
                    {item.sections.map((section: any, sectionIndex: number) => (
                      <div key={sectionIndex}>
                        <h4 className="font-medium text-sm">{section.title}</h4>
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                          {section.instructions.map((instruction: string, instrIndex: number) => (
                            <div key={instrIndex} className="bg-gray-100 p-2 rounded">
                              {instruction}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'steps':
        return (
          <div className="space-y-4">
            {content.data.steps.map((step: any, index: number) => (
              <div key={index} className="flex items-start">
                <div className="bg-[color:var(--riscv-accent)] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <p className="text-sm text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'code':
        return (
          <div className="space-y-6">
            {content.data.examples.map((example: any, index: number) => (
              <div key={index} className="space-y-3">
                <div className="code-block">
                  <code className="text-white font-mono">{example.code}</code>
                </div>
                <p className="text-sm text-gray-600">{example.description}</p>
              </div>
            ))}
          </div>
        );

      case 'quote':
        return (
          <div className="bg-[color:var(--riscv-accent)] bg-opacity-10 rounded-lg p-6 text-center">
            <p className="text-lg font-medium text-[color:var(--riscv-accent)] mb-2">
              {content.data.text}
            </p>
            {content.data.subtitle && (
              <p className="text-sm text-gray-600">{content.data.subtitle}</p>
            )}
            {content.data.links && (
              <div className="flex justify-center space-x-4 text-sm mt-4">
                {content.data.links.map((link: string, index: number) => (
                  <a key={index} href={link} className="text-[color:var(--riscv-primary)] hover:underline">
                    {link}
                  </a>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const currentSlideData = slideData[currentSlide];

  return (
    <div className="bg-[color:var(--riscv-slide-bg)] font-inter min-h-screen">
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onOpenToc={() => setIsTocOpen(true)}
      />

      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onSlideSelect={goToSlide}
        currentSlide={currentSlide}
      />

      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="slide-container">
            <div className="slide min-h-screen flex items-center justify-center">
              <div className="w-full max-w-5xl">
                {currentSlide === 0 ? (
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-[color:var(--riscv-primary)] mb-4">
                      "NU4YOU"
                    </h1>
                    <h2 className="text-4xl font-semibold text-[color:var(--riscv-secondary)] mb-8">
                      RISC-V HANDS-ON WORKSHOP
                    </h2>
                    <Card className="max-w-2xl mx-auto">
                      <CardContent className="pt-6">
                        <div className="mb-6">
                          <p className="text-lg text-gray-700 mb-2">Presenters:</p>
                          <p className="text-xl font-medium text-[color:var(--riscv-primary)]">
                            Naruemon Rattanakunakorn
                          </p>
                          <p className="text-xl font-medium text-[color:var(--riscv-primary)]">
                            Paul Sherman
                          </p>
                        </div>
                        <div className="border-t pt-6">
                          <p className="text-gray-600">
                            20th International Joint Conference on Computer Science and Software Engineering
                          </p>
                          <p className="text-gray-600">28th June – 1st July 2023</p>
                          <p className="text-gray-600">Naresuan University, Pitsanulok, THAILAND</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-4xl font-bold text-[color:var(--riscv-primary)] mb-8 text-center">
                      {currentSlideData.title}
                    </h2>
                    {currentSlideData.subtitle && (
                      <h3 className="text-2xl font-semibold text-[color:var(--riscv-secondary)] mb-8 text-center">
                        {currentSlideData.subtitle}
                      </h3>
                    )}
                    <div className="space-y-8">
                      {currentSlideData.content.map((content, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                          {renderSlideContent(content)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 no-print">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[color:var(--riscv-primary)] transform scale-125'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
