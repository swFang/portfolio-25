import { useState, useCallback } from "react";
import "./TableOfContents.css";

export interface Section {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections?: Section[];
  onSelect: (sectionId: string) => void;
}

const defaultSections: Section[] = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
];

const TableOfContents = ({
  sections = defaultSections,
  onSelect,
}: TableOfContentsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = useCallback(
    (sectionId: string) => {
      setIsExiting(true);
      // Total animation time: 0.25s (0.15s duration + 0.05s * 2 max delay)
      setTimeout(() => {
        onSelect(sectionId);
      }, 250);
    },
    [onSelect]
  );

  return (
    <div className={`table-of-contents ${isExiting ? "exiting" : ""}`}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`toc-item ${hoveredIndex === index ? "hovered" : ""}`}
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
