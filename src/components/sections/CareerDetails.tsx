import { CAREER_DESCRIPTIONS } from "../../constants/descriptions";
import TypeWriter from "../TypeWriter";
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
          <li key={index}>
            <TypeWriter
              text={point}
              speed={0.5}
              delay={index * 0.2} // Stagger the start of each line
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerDetails;
