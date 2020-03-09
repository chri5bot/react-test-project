import React, { useState, useCallback } from "react";
import { Checkbox } from "semantic-ui-react";

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

export default TaskItem;
