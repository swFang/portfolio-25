import {
  GithubOutlined,
  LinkedinOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { EXTERNAL_LINKS } from "../../constants/links";
import "./Links.css";

const Links = () => {
  return (
    <div className='links-container'>
      <a
        href={EXTERNAL_LINKS.linkedin}
        target='_blank'
        rel='noopener noreferrer'
        className='link-item'
      >
        <LinkedinOutlined /> LinkedIn
      </a>
      <a
        href={EXTERNAL_LINKS.github}
        target='_blank'
        rel='noopener noreferrer'
        className='link-item'
      >
        <GithubOutlined /> GitHub
      </a>
      <a
        href={EXTERNAL_LINKS.resume}
        target='_blank'
        rel='noopener noreferrer'
        className='link-item'
      >
        <FilePdfOutlined /> Resume
      </a>
    </div>
  );
};

export default Links;
