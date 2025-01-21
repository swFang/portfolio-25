import { useState } from "react";
import TableOfContents from "../TableOfContents";
import CareerDetails from "./CareerDetails";
import "./Career.css";

const careerSections = [
  { id: "arista", label: "Arista Networks" },
  { id: "arista-intern", label: "Arista Networks - Intern" },
  { id: "sap-intern", label: "SAP - Intern" },
];

const Career = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  return (
    <div className='career-container'>
      <div
        style={{
          // height: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <TableOfContents
          sections={careerSections}
          onSelect={handleSelect}
          selectedId={selectedRole}
          animate={false}
          variant='career'
        />
      </div>
      {selectedRole && <CareerDetails roleId={selectedRole} />}
    </div>
  );
};

export default Career;
