import React, { useState, useCallback } from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

import { apiUpdate } from "../../core";

const TaskItem = ({ query, isChecked, title }) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleIsChecked = useCallback(() => {
    apiUpdate(query, { complete: !checked });
    setChecked(val => !val);
  }, [query, checked]);

  return (
    <Checkbox
      style={{
        height: "100%",
        width: "100%",
        textTransform: "capitalize"
      }}
      onChange={toggleIsChecked}
      checked={checked}
      label={title}
    />
  );
};
TaskItem.propTypes = {
  query: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  title: PropTypes.string.isRequired
};
TaskItem.defaultProps = {
  isChecked: false
};

export default TaskItem;
