// import React from 'react'
// import './StatCard.css'

// /*
//     1. Card component to render all the cards
//     2. Info to show in the cards:
//         - Total Submissions
//         - Pending Reviews
//         - Papers Published
//         - Active Reviewers
// */

// const StatCard = () => {
//   return (<div></div>);
// }

// export default StatCard

import React from "react";
import PropTypes from "prop-types";
import "./StatCard.css";

const Card = ({ title, value, icon, period }) => {
  return (
    <div className="p-4 col-span-3 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded`}
        ></span>
      </div>
      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

const StatCards = () => {
  return (
    <>
      <Card
        title="Total Submissions"
        value="245"
        period="+12% from last month"
      />
      <Card title="Pending Reviews" value="32" period="-4% from last month" />
      <Card title="Papers Published" value="68" period="+8% from last month" />
      <Card title="Active Reviewers" value="124" period="+6% from last month" />
    </>
  );
};

export default StatCards;
