import { LeftOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import "./ContentPresenter.css";
import { Col, Row } from "antd";

interface ContentPresenterProps {
  onBack: () => void;
  children: React.ReactNode;
}

const ContentPresenter = ({ onBack, children }: ContentPresenterProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleBack = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 250);
  }, [onBack]);

  return (
    <div className={`content-presenter ${isExiting ? "exiting" : ""}`}>
      <Row>
        <Col>
          <button className='back-button' onClick={handleBack}>
            <LeftOutlined />
          </button>
        </Col>
      </Row>
      <div className='presenter-content'>{children}</div>
    </div>
  );
};

export default ContentPresenter;
