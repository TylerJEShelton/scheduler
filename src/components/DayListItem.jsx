import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

// Returns the day information for the sidebar that includes the name of the day and the number of spots remaining
export default function DayListItem(props) {
  let dayListItemClass = classNames("day-list__item", {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots === 0});

  // formats how the spots remaining information is presented depending on the spots available
  const formatSpots = spots => {
    if (spots === 0) {
      return `no spots remaining`;
    } else if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  return(
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="test--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}