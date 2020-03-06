import React, { useState, useCallback } from "react";
import { Accordion, Menu } from "semantic-ui-react";

const AccordionInfo = ({ title, value }) => (
  <p>
    <b style={{ textTransform: "uppercase" }}>{title}:</b> {value}
  </p>
);

const UserAccordion = ({ personalInfo, address, company }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = useCallback(
    (_, { index }) => setActiveIndex(activeIndex === index ? -1 : index),
    [activeIndex]
  );

  const titleStyles = {
    padding: "0.5rem 0",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textTransform: "uppercase"
  };

  return (
    <Accordion
      style={{ width: "calc(1127px + 2rem)", margin: "14px" }}
      as={Menu}
      vertical
    >
      <Menu.Item>
        <Accordion.Title
          style={titleStyles}
          active={activeIndex === 0}
          content="Personal Information"
          index={0}
          onClick={handleClick}
        />
        {Object.keys(personalInfo).map((key, i) => (
          <Accordion.Content
            key={i}
            active={activeIndex === 0}
            content={<AccordionInfo title={key} value={personalInfo[key]} />}
          />
        ))}
      </Menu.Item>

      <Menu.Item>
        <Accordion.Title
          style={titleStyles}
          active={activeIndex === 1}
          content="Address"
          index={1}
          onClick={handleClick}
        />
        {Object.keys(address).map(
          (key, i) =>
            typeof address[key] === "string" && (
              <Accordion.Content
                key={i}
                active={activeIndex === 1}
                content={<AccordionInfo title={key} value={address[key]} />}
              />
            )
        )}
      </Menu.Item>

      <Menu.Item>
        <Accordion.Title
          style={titleStyles}
          active={activeIndex === 2}
          content="Company"
          index={2}
          onClick={handleClick}
        />
        {Object.keys(company).map((key, i) => (
          <Accordion.Content
            key={i}
            active={activeIndex === 2}
            content={<AccordionInfo title={key} value={company[key]} />}
          />
        ))}
      </Menu.Item>
    </Accordion>
  );
};

export default UserAccordion;
