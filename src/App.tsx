import { Row, Col } from "antd";
import { useState, useCallback } from "react";
import "./App.css";
import TableOfContents from "./components/TableOfContents";
import ContentPresenter from "./components/ContentPresenter";
import About from "./components/sections/About";
import Career from "./components/sections/Career";
import Projects from "./components/sections/Projects";
import Photography from "./components/sections/Photography";
import Contact from "./components/sections/Contact";

function App(): JSX.Element {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionSelect = useCallback((sectionId: string) => {
    setIsTransitioning(true);
    setSelectedSection(sectionId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  }, []);

  const handleBack = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSection(null);
      setIsTransitioning(false);
    }, 250);
  }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case "about":
        return <About />;
      case "career":
        return <Career />;
      case "projects":
        return <Projects />;
      case "photography":
        return <Photography />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className='app-container'>
      <Row>
        <Col span={24}>
          <div className='name-container'>
            <h1>Daniel</h1>
            <h1>Fang</h1>
          </div>
        </Col>
      </Row>
      <div className='content-container'>
        <div className='content-container-inner'>
          {(selectedSection || isTransitioning) && (
            <ContentPresenter onBack={handleBack}>
              {renderContent()}
            </ContentPresenter>
          )}
          {(!selectedSection || isTransitioning) && (
            <TableOfContents onSelect={handleSectionSelect} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
