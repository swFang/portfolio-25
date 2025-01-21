import { useState, useCallback } from "react";
import "./TableOfContents.css";

export interface Section {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections?: Section[];
  onSelect: (sectionId: string) => void;
  selectedId?: string;
  animate?: boolean;
  variant?: "default" | "career";
}

const defaultSections: Section[] = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  // { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
];

const TableOfContents = ({
  sections = defaultSections,
  onSelect,
  selectedId,
  animate = true,
  variant = "default",
}: TableOfContentsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = useCallback(
    (sectionId: string) => {
      if (animate) {
        setIsExiting(true);
        setTimeout(() => {
          onSelect(sectionId);
        }, 250);
      } else {
        onSelect(sectionId);
      }
    },
    [onSelect, animate]
  );

  return (
    <div className={`table-of-contents ${isExiting ? "exiting" : ""}`}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`toc-item ${hoveredIndex === index ? "hovered" : ""} ${
            section.id === selectedId ? "selected" : ""
          } ${variant === "career" ? "career-item" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleSelect(section.id)}
        >
          {section.label}
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
