import React from "react";
import PropTypes from "prop-types";
import "./ReviewerStatCard.css";

const Card = ({ title, value, icon, period }) => {
  return (
    <div className="p-4 col-span-6 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded`}
        ></span>
      </div>
      {/* <p className="text-xs text-stone-500">{period}</p> */}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

const ReviewerStatCard = () => {
  return (
    <>
      <Card
        title="Reviews Done"
        value="12"
        // period="+1 from last month"
      />
      <Card title="Pending Reviews" value="32" />
    </>
  );
};

export default ReviewerStatCard;
