import TableOfContents from "../TableOfContents";
import { APP_MARKDOWN_CONTENT } from "../../constants/apps";
import { APP_SECTIONS } from "../../constants/navigation";
import type { AppSectionId } from "../../constants/navigation";
import "./Apps.css";

interface AppsProps {
  selectedApp?: AppSectionId;
  onAppSelect: (appId: AppSectionId) => void;
}

interface PolicyBlock {
  type: "heading" | "paragraph";
  content: string;
}

const parsePolicyBlocks = (content: string): PolicyBlock[] =>
  content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const headingMatch = block.match(/^\*\*(.+)\*\*$/s);

      if (headingMatch) {
        return { type: "heading", content: headingMatch[1].trim() };
      }

      return {
        type: "paragraph",
        content: block.replace(/\n+/g, " ").trim(),
      };
    });

const Apps = ({ selectedApp, onAppSelect }: AppsProps) => {
  const handleSelect = (appId: string) => {
    onAppSelect(appId as AppSectionId);
  };

  const policyBlocks = selectedApp
    ? parsePolicyBlocks(APP_MARKDOWN_CONTENT[selectedApp])
    : [];

  return (
    <div className='apps-container'>
      <div className='apps-menu-container'>
        <TableOfContents
          sections={APP_SECTIONS.map(({ id, label }) => ({ id, label }))}
          onSelect={handleSelect}
          selectedId={selectedApp}
          animate={false}
          variant='career'
        />
      </div>
      {selectedApp && (
        <div className='apps-details'>
          <article className='policy-document'>
            {policyBlocks.map((block, index) => {
              if (block.type === "heading") {
                if (index === 0) {
                  return (
                    <h1 className='policy-title' key={`title-${index}`}>
                      {block.content}
                    </h1>
                  );
                }

                return (
                  <h2 className='policy-subheading' key={`heading-${index}`}>
                    {block.content}
                  </h2>
                );
              }

              return (
                <p className='policy-paragraph' key={`paragraph-${index}`}>
                  {block.content}
                </p>
              );
            })}
          </article>
        </div>
      )}
    </div>
  );
};

export default Apps;
