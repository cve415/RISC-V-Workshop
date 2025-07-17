import { useState, useEffect, useRef, useCallback } from "react";
import { slideData, SlideData, SlideContent } from "@/lib/slide-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ArrowRight,
  Menu,
  X
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
  const [activeSection, setActiveSection] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalSections = slideData.length;

  const scrollToSection = useCallback((sectionIndex: number) => {
    const element = sectionRefs.current[sectionIndex];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionIndex);
    }
  }, []);

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
      const element = sectionRefs.current[i];
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(i);
        break;
      }
    }
  }, []);

  // Intersection Observer for better scroll performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (activeSection < totalSections - 1) {
          scrollToSection(activeSection + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(totalSections - 1);
      } else if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsSidebarOpen(!isSidebarOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, totalSections, isSidebarOpen, scrollToSection]);

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
              <div key={index} className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-6 border-l-4 border-[color:var(--riscv-primary)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[color:var(--riscv-secondary)]">
                    {item.title}
                  </h3>
                  <span className="text-[color:var(--riscv-accent)] font-bold bg-[color:var(--riscv-accent)] bg-opacity-10 px-3 py-1 rounded-full text-sm">
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
          <div className={`grid lg:grid-cols-${content.data.columns} gap-6`}>
            {content.data.items.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-[color:var(--riscv-secondary)] mb-4">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-gray-700 mb-4">{item.subtitle}</p>
                )}
                {item.content && (
                  <div className="space-y-2 font-mono text-sm">
                    {item.content.map((line: string, lineIndex: number) => (
                      <div key={lineIndex} className="bg-white p-3 rounded border">
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
                      <div key={instrIndex} className="bg-white p-2 rounded border">
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
                            <div key={instrIndex} className="bg-white p-2 rounded border">
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

  return (
    <div className="bg-[color:var(--riscv-slide-bg)] font-inter min-h-screen flex document-reader">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[color:var(--riscv-primary)]">RISC-V Workshop</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 py-2 border-b bg-gray-50">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[color:var(--riscv-primary)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
        <ScrollArea className="flex-1 h-full sidebar-nav">
          <div className="p-4">
            <nav className="space-y-2">
              {slideData.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-gray-100 sidebar-item ${
                    activeSection === index ? 'bg-blue-50 border-l-4 border-blue-500 active' : ''
                  }`}
                >
                  <div className="font-medium text-[color:var(--riscv-primary)] text-sm">
                    {slide.title}
                  </div>
                  {slide.subtitle && (
                    <div className="text-xs text-gray-600 mt-1">
                      {slide.subtitle}
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm p-4 lg:hidden">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-4 w-4 mr-2" />
              Table of Contents
            </Button>
            <div className="text-xs text-gray-500">
              Press 'M' to toggle menu
            </div>
          </div>
        </div>

        {/* Document content */}
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16 smooth-scroll">
          {/* Title Section */}
          <div 
            ref={el => sectionRefs.current[0] = el}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-[color:var(--riscv-primary)] mb-4">
                "NU4YOU"
              </h1>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[color:var(--riscv-secondary)] mb-8">
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
          </div>

          {/* Content sections */}
          {slideData.slice(1).map((section, index) => (
            <div 
              key={index + 1}
              ref={el => sectionRefs.current[index + 1] = el}
              className="mb-16 content-section"
            >
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-[color:var(--riscv-primary)] mb-4">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-xl lg:text-2xl font-semibold text-[color:var(--riscv-secondary)] mb-6">
                    {section.subtitle}
                  </h3>
                )}
              </div>
              <div className="space-y-6">
                {section.content.map((contentItem, contentIndex) => (
                  <div 
                    key={contentIndex} 
                    className="content-card fade-in stagger-animation"
                    style={{ '--stagger-delay': `${contentIndex * 100}ms` } as React.CSSProperties}
                  >
                    {renderSlideContent(contentItem)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
