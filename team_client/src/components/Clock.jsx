import React from 'react';

function Clock() {
  return (
    <div className="clock dark:border-white">
      <div className="hour-hand dark:bg-white" />
      <div className="min-hand dark:bg-white" />
      <div className="dot dark:bg-white" />
      <div className="line line1 dark:bg-white" />
      <div className="line line2 dark:bg-white" />
      <div className="line line3 dark:bg-white" />
      <div className="line line4 dark:bg-white" />
    </div>
  );
}

export default Clock;
