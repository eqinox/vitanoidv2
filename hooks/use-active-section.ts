import { useEffect, useState, useRef } from "react";

export function useActiveSection(sectionIds: string[]) {
  // Initialize with first section (about) as default
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || "",
  );
  const sectionDataRef = useRef<
    Map<string, { ratio: number; isIntersecting: boolean }>
  >(new Map());

  useEffect(() => {
    // Find the scroll container - it's the element with overflow-auto that contains the sections
    const findScrollContainer = (): Element | null => {
      const scrollContainer = document.querySelector(
        ".hide-scrollbar.overflow-auto",
      );
      return scrollContainer || null;
    };

    const scrollContainer = findScrollContainer();

    // Function to determine which section should be active
    const determineActiveSection = () => {
      const intersectingSections: Array<{
        id: string;
        ratio: number;
        index: number;
      }> = [];

      sectionIds.forEach((id, index) => {
        const data = sectionDataRef.current.get(id);
        if (data && data.isIntersecting) {
          intersectingSections.push({
            id,
            ratio: data.ratio,
            index,
          });
        }
      });

      if (intersectingSections.length === 0) {
        // If no sections are intersecting, check scroll position
        if (!scrollContainer) return;

        const container = scrollContainer as HTMLElement;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        // If at the bottom, select last section
        if (scrollHeight - scrollTop - clientHeight < 50) {
          const lastSectionId = sectionIds[sectionIds.length - 1];
          setActiveSection(lastSectionId);
          return;
        }

        // If at the top, select first section
        if (scrollTop < 50) {
          setActiveSection(sectionIds[0]);
          return;
        }
        return;
      }

      // Sort by ratio (highest first), then by index (earlier first if ratios are close)
      intersectingSections.sort((a, b) => {
        const ratioDiff = b.ratio - a.ratio;
        if (Math.abs(ratioDiff) < 0.15) {
          // If ratios are very close, prefer the section that appears first
          return a.index - b.index;
        }
        return ratioDiff;
      });

      setActiveSection(intersectingSections[0].id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          sectionDataRef.current.set(id, {
            ratio: entry.intersectionRatio,
            isIntersecting: entry.isIntersecting,
          });
        });

        // Determine active section after updating all entries
        determineActiveSection();
      },
      {
        root: scrollContainer,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -10% 0px", // Smaller margins for more reliable detection
      },
    );

    // Handle scroll events for edge cases (top/bottom)
    const handleScroll = () => {
      if (!scrollContainer) return;
      determineActiveSection();
    };

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Add scroll listener
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    // Check initial state after DOM is ready
    const timeoutId = setTimeout(() => {
      determineActiveSection();
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      sectionDataRef.current.clear();
    };
  }, [sectionIds]);

  return activeSection;
}
