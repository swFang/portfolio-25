import { ABOUT_DESCRIPTION } from "../../constants/descriptions";
import TypeWriter from "../TypeWriter";
import "./About.css";

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-content'>
        <TypeWriter text={ABOUT_DESCRIPTION} />
      </div>
    </div>
  );
};

export default About;
