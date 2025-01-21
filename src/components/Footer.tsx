import {
  GithubOutlined,
  LinkedinOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { EXTERNAL_LINKS } from "../constants/links";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-links'>
        <a
          href={EXTERNAL_LINKS.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className='footer-link'
        >
          <LinkedinOutlined />
        </a>
        <a
          href={EXTERNAL_LINKS.github}
          target='_blank'
          rel='noopener noreferrer'
          className='footer-link'
        >
          <GithubOutlined />
        </a>
        <a
          href={EXTERNAL_LINKS.resume}
          target='_blank'
          rel='noopener noreferrer'
          className='footer-link'
        >
          <FilePdfOutlined />
        </a>
      </div>
    </div>
  );
};

export default Footer;
