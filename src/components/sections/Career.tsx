import { useState } from "react";
import TableOfContents from "../TableOfContents";
import "./Career.css";

const careerSections = [
  { id: "arista", label: "Arista Networks" },
  { id: "arista-intern", label: "Arista Networks - Intern" },
  { id: "sap", label: "SAP - Intern" },
];

const Career = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // TODO: Show role details
  };

  return <TableOfContents sections={careerSections} onSelect={handleSelect} />;
};

export default Career;
