import TableOfContents from "../TableOfContents";
import CareerDetails from "./CareerDetails";
import { CAREER_SECTIONS } from "../../constants/navigation";
import type { CareerSectionId } from "../../constants/navigation";
import "./Career.css";

interface CareerProps {
  selectedRole?: CareerSectionId;
  onRoleSelect: (roleId: CareerSectionId) => void;
}

const Career = ({ selectedRole, onRoleSelect }: CareerProps) => {
  const handleSelect = (roleId: string) => {
    onRoleSelect(roleId as CareerSectionId);
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
          sections={CAREER_SECTIONS.map(({ id, label }) => ({ id, label }))}
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
