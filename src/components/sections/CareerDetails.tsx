import { CAREER_DESCRIPTIONS } from "../../constants/descriptions";
import "./CareerDetails.css";

interface CareerDetailsProps {
  roleId: string;
}

// Define the type for career descriptions
type CareerDescriptionType = {
  [key in "arista" | "arista-intern" | "sap-intern"]: string[];
};

const CareerDetails = ({ roleId }: CareerDetailsProps) => {
  const details = CAREER_DESCRIPTIONS[roleId as keyof CareerDescriptionType];

  if (!details) return null;

  return (
    <div className='career-details'>
      <ul>
        {details.map((point: string, index: number) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default CareerDetails;
