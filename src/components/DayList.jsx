import React from 'react';

import DayListItem from './DayListItem';

// Returns a DayListItem component for each day in the props.days array
export default function DayList(props) {
  const displayDays = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return <ul>{displayDays}</ul>;
}
