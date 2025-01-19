import { useEffect, useState } from "react";
import { Typography, Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./App.css";
import { Cloud } from "./components/Cloud";
import Career from "./components/Career";
import Projects from "./components/Projects";
import Photos from "./components/Photos";

const { Title } = Typography;

function App(): JSX.Element {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Update active tab based on scroll position
      if (position < 300) {
        setActiveTab("");
      } else if (position < window.innerHeight) {
        setActiveTab("career");
      } else if (position < window.innerHeight * 2) {
        setActiveTab("projects");
      } else {
        setActiveTab("photos");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = (key: string) => {
    let scrollTarget = 0;

    switch (key) {
      case "career":
        scrollTarget = 400; // Just past the initial scroll threshold
        break;
      case "projects":
        scrollTarget = window.innerHeight;
        break;
      case "photos":
        scrollTarget = window.innerHeight * 2;
        break;
    }

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  };

  const cloudOpacity = Math.max(0, 1 - scrollPosition / 1000);
  const careerOpacity = Math.min(1, Math.max(0, (scrollPosition - 300) / 500));

  const items = [
    {
      key: "career",
      label: "Career",
      children: <Career />,
    },
    {
      key: "projects",
      label: "Projects",
      children: <Projects />,
    },
    {
      key: "photos",
      label: "Photos",
      children: <Photos />,
    },
  ];

  return (
    <div className='app-container'>
      <header className='header'>
        <Title className='name-title'>Daniel Fang</Title>
        <Tabs
          className='navigation-tabs'
          items={items}
          activeKey={activeTab}
          onChange={handleTabClick}
        />
      </header>

      <div className='content'>
        <div className='tab-sections'>
          <section
            className='tab-section'
            style={{
              opacity: careerOpacity,
              visibility: careerOpacity === 0 ? "hidden" : "visible",
              pointerEvents: careerOpacity === 0 ? "none" : "auto",
            }}
          >
            <Career />
          </section>
          <section
            className='tab-section'
            style={{
              opacity: activeTab === "projects" ? 1 : 0,
              visibility: activeTab === "projects" ? "visible" : "hidden",
              pointerEvents: activeTab === "projects" ? "auto" : "none",
            }}
          >
            <Projects />
          </section>
          <section
            className='tab-section'
            style={{
              opacity: activeTab === "photos" ? 1 : 0,
              visibility: activeTab === "photos" ? "visible" : "hidden",
              pointerEvents: activeTab === "photos" ? "auto" : "none",
            }}
          >
            <Photos />
          </section>
        </div>
      </div>

      <div className='scroll-indicator' style={{ opacity: cloudOpacity }}>
        <DownOutlined />
      </div>

      <div className='clouds-container'>
        <div
          className='clouds-left'
          style={{
            transform: `translateX(${-scrollPosition * 2}px)`,
            opacity: cloudOpacity,
          }}
        >
          <Cloud className='cloud-1' />
          <Cloud className='cloud-2' />
          <Cloud className='cloud-5' />
        </div>
        <div
          className='clouds-right'
          style={{
            transform: `translateX(${scrollPosition * 2}px)`,
            opacity: cloudOpacity,
          }}
        >
          <Cloud className='cloud-3' flipped />
          <Cloud className='cloud-4' flipped />
          <Cloud className='cloud-6' flipped />
        </div>
      </div>
    </div>
  );
}

export default App;
