"use client";
// import MouseFollower from "@/components/mouse-effect/mouse-follower";
import Header from "@/components/shared/header";
import { useEffect, useRef, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollHeight, setScrollHeight] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);

  const [showMouseEffect, setShowMouseEffect] = useState(true);

  // ✅ Handles showing/hiding mouse effect based on screen width
  useEffect(() => {
    const handleResize = () => {
      setShowMouseEffect(window.innerWidth >= 1024); // Enable effect only on large screens
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Updates the scrollHeight state whenever the content resizes
  useEffect(() => {
    const updateScrollHeight = () => {
      if (scrollRef.current) {
        setScrollHeight(scrollRef.current.scrollHeight);
      }
    };

    updateScrollHeight(); // Initial calculation

    window.addEventListener("resize", updateScrollHeight);
    return () => {
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, []);

  // ✅ Ensures the scroll container has the correct height
  useEffect(() => {
    const fixScrollHeight = () => {
      if (!scrollRef.current) return;

      const contentHeight = scrollRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;

      // If the content is taller than the viewport, allow scrolling
      if (contentHeight > viewportHeight) {
        scrollRef.current.style.height = `${viewportHeight}px`;
        scrollRef.current.style.overflowY = "auto"; // Enables scrolling
      }
    };

    fixScrollHeight(); // Initial fix

    window.addEventListener("resize", fixScrollHeight);
    return () => window.removeEventListener("resize", fixScrollHeight);
  }, []);

  // ✅ Handles custom scrolling logic with the right scrollbar
  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      if (!scrollRef.current || !scrollbarRef.current) return;

      event.preventDefault(); // Prevent default page scroll behavior

      const maxScrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

      // Prevent overscrolling
      if (
        (event.deltaY > 0 && scrollRef.current.scrollTop >= maxScrollTop) ||
        (event.deltaY < 0 && scrollRef.current.scrollTop <= 0)
      ) {
        return;
      }

      scrollRef.current.scrollTop += event.deltaY; // Scroll content
      scrollbarRef.current.scrollTop = scrollRef.current.scrollTop; // Sync scrollbar position
    };

    const syncScrollFromScrollbar = () => {
      if (scrollRef.current && scrollbarRef.current) {
        scrollRef.current.scrollTop = scrollbarRef.current.scrollTop;
      }
    };

    window.addEventListener("wheel", handleWheelScroll, { passive: false });

    if (scrollbarRef.current) {
      scrollbarRef.current.addEventListener("scroll", syncScrollFromScrollbar);
    }

    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
      if (scrollbarRef.current) {
        scrollbarRef.current.removeEventListener(
          "scroll",
          syncScrollFromScrollbar,
        );
      }
    };
  }, []);

  // ✅ Tracks the user's mouse movement for the radial gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ Ensures that the content fills the full viewport on mobile screens
  useEffect(() => {
    const adjustHeight = () => {
      if (!scrollRef.current) return;

      const contentHeight = scrollRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;

      // If content is shorter than the viewport, ensure it takes full height
      if (contentHeight < viewportHeight) {
        scrollRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    adjustHeight(); // Initial adjustment

    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <>
      {/* Radial Mouse Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
        style={{
          background: `${
            showMouseEffect
              ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
              : ""
          } `,
        }}
      />

      {/* Main Wrapper */}
      <div
        ref={scrollRef}
        className="relative z-10 hide-scrollbar overflow-auto max-md:p-5 lg:flex lg:justify-between lg:gap-4"
        // className="relative z-10 hide-scrollbar overflow-auto overflow-x-hidden max-md:p-5 lg:flex lg:justify-between lg:gap-4"
        style={{
          overscrollBehavior: "contain", // Prevents scrolling past the content
        }}
      >
        <Header />

        {/* {showMouseEffect && <MouseFollower />} */}
        {/* The only scrollable area */}
        <div className="relative h-screen lg:w-[52%]">
          <main className="overflow-visible pt-14 lg:py-24">{children}</main>
        </div>

        {/* Right Scrollbar (Only this one is visible) */}
        <div
          ref={scrollbarRef}
          className="fixed right-0 top-0 h-screen w-4 overflow-y-auto"
          style={{
            pointerEvents: "auto",
            scrollbarWidth: "auto",
          }}
        >
          {/* Dynamically adjust height to match content */}
          <div className="w-full" style={{ height: scrollHeight }}></div>

          {/* Custom Scrollbar for Webkit Browsers */}
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 12px;
              background: transparent;
            }

            div::-webkit-scrollbar-thumb {
              background-color: #4b5563;
              border-radius: 6px;
              border: 3px solid transparent;
            }

            div::-webkit-scrollbar-thumb:hover {
              background-color: #6b7280;
            }

            div {
              scrollbar-color: #4b5563 transparent;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
