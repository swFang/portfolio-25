import { CAREER_DESCRIPTIONS } from "../../constants/descriptions";
import TypeWriter from "../TypeWriter";
import "./CareerDetails.css";

interface CareerDetailsProps {
  roleId: string;
}

const CareerDetails = ({ roleId }: CareerDetailsProps) => {
  const details = CAREER_DESCRIPTIONS[roleId];

  if (!details) return null;

  return (
    <div className='career-details'>
      <ul>
        {details.map((point, index) => (
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
