import { Row, Col } from "antd";
import { useState, useCallback, useEffect } from "react";
import "./App.css";
import TableOfContents from "./components/TableOfContents";
import ContentPresenter from "./components/ContentPresenter";
import About from "./components/sections/About";
import Career from "./components/sections/Career";
import Photography from "./components/sections/Photography";
import Contact from "./components/sections/Contact";
import Apps from "./components/sections/Apps";
import Footer from "./components/Footer";
import {
  HOME_PATH,
  getHashPath,
  parsePath,
  isMainSectionId,
  getSectionPath,
  getCareerPath,
  getAppsPath,
} from "./constants/navigation";
import type {
  RouteState,
  CareerSectionId,
  AppSectionId,
} from "./constants/navigation";

const getRouteFromHash = (): RouteState => parsePath(getHashPath(window.location.hash));

function App(): JSX.Element {
  const [route, setRoute] = useState<RouteState>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateToPath = useCallback((path: string) => {
    const currentPath = getHashPath(window.location.hash);

    if (currentPath === path) {
      return;
    }

    window.location.hash = path;
  }, []);

  const handleSectionSelect = useCallback((sectionId: string) => {
    if (!isMainSectionId(sectionId)) {
      return;
    }

    navigateToPath(getSectionPath(sectionId));
  }, [navigateToPath]);

  const handleCareerSelect = useCallback((roleId: CareerSectionId) => {
    navigateToPath(getCareerPath(roleId));
  }, [navigateToPath]);

  const handleAppSelect = useCallback((appId: AppSectionId) => {
    navigateToPath(getAppsPath(appId));
  }, [navigateToPath]);

  const handleBack = useCallback(() => {
    navigateToPath(HOME_PATH);
  }, [navigateToPath]);

  const selectedSection = route.section;

  const renderContent = () => {
    switch (selectedSection) {
      case "about":
        return <About />;
      case "career":
        return (
          <Career
            selectedRole={route.careerRole}
            onRoleSelect={handleCareerSelect}
          />
        );
      case "photography":
        return <Photography />;
      case "contact":
        return <Contact />;
      case "apps":
        return <Apps selectedApp={route.appId} onAppSelect={handleAppSelect} />;
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
          {selectedSection && (
            <ContentPresenter onBack={handleBack}>
              {renderContent()}
            </ContentPresenter>
          )}
          {!selectedSection && (
            <TableOfContents onSelect={handleSectionSelect} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
