import React, { useEffect, useState } from "react";
import "./VolumesCreateForm.css";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FiSave } from "react-icons/fi";

const VolumesCreateForm = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      status: "Draft", // ✅ Add this
    },
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const selectedYear = useWatch({ control, name: "year" });
  const selectedMonth = useWatch({ control, name: "month" });

  const [daysInMonth, setDaysInMonth] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const selectedDay = useWatch({ control, name: "day" });

  // Update months based on selected year
  useEffect(() => {
    const maxMonth = selectedYear === currentYear ? currentMonth : 12;
    const months = Array.from({ length: maxMonth }, (_, i) => i + 1);
    setAvailableMonths(months);

    // Reset month if out of new range
    if (selectedMonth > maxMonth) {
      setValue("month", maxMonth);
    }
  }, [selectedYear, currentYear, currentMonth, selectedMonth, setValue]);

  // Update days based on selected year and month
  useEffect(() => {
    const totalDaysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    const isCurrentYear = selectedYear === currentYear;
    const isCurrentMonth = selectedMonth === currentMonth;

    const maxDay =
      isCurrentYear && isCurrentMonth
        ? currentDate.getDate()
        : totalDaysInMonth;

    setDaysInMonth(Array.from({ length: maxDay }, (_, i) => i + 1));

    if (selectedDay > maxDay) {
      setValue("day", maxDay);
    }
  }, [
    selectedYear,
    selectedMonth,
    selectedDay,
    currentYear,
    currentMonth,
    // currentDate,
    setValue,
  ]);

  const years = Array.from(
    { length: currentYear - 2025 + 1 },
    (_, i) => 2025 + i
  ).reverse();

  return (
    <form className="mb-4">
      <div className="volume-create-title-container">
        <h1 className="volume-create-title">Create New Volume</h1>
        <p className="volume-create-sub-title">
          Create a new volume for the journal with issues and papers.
        </p>
      </div>

      <div className="volume-info-container">
        <h2>Volume Inforamtion</h2>
        <p>Basic Information about the volume</p>
        <div className="info-input-container">
          <div className="info-vol-num">
            <label htmlFor="volumeNo">Volume Number</label>
            <input
              type="number"
              name="volumeNo"
              id="volumeNo"
              placeholder="Example: 01"
            />
          </div>
          <div className="date-month-year-container">
            <div className="date-month-year-select">
              <label htmlFor="year">Select Year</label>
              <Controller
                name="year"
                id="year"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="date-month-year-select">
              <label htmlFor="month">Select Month</label>
              <Controller
                name="month"
                id = "month"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                  >
                    {availableMonths.map((m) => (
                      <option key={m} value={m}>
                        {m.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="date-month-year-select">
              <label htmlFor="day">Select Day</label>
              <Controller
                name="day"
                id="day"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                  >
                    {daysInMonth.map((d) => (
                      <option key={d} value={d}>
                        {d.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="info-vol-title">
          <label htmlFor="title">Volume Title (Optional)</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title of this volume"
          />
          <p>
            If left blank, the title will default to "Volume [Number] ([Year])"
          </p>
        </div>

        <div className="info-vol-description">
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter a brief description of this volume"
          ></textarea>
        </div>
      </div>

      <div className="volume-info-container">
        <h2>Volume Details</h2>
        <p>Additional information about the volume</p>
        <div className="vol-details-aim">
          <label htmlFor="aim">Aim</label>
          <textarea
            name="aim"
            id="aim"
            placeholder="Enter aim of this volume"
          ></textarea>
        </div>
        <div className="vol-details-aim">
          <label htmlFor="scope">Scope</label>
          <textarea
            name="scope"
            id="scope"
            placeholder="Enter scope of this volume"
          ></textarea>
        </div>
      </div>

      <div className="volume-info-container">
        <h2>Publication Settings</h2>
        <p>Configure publication settings for this volume</p>

        <div className="vol-publication-setting">
          <label htmlFor="status">
            Select Status
          </label>
          <Controller
            name="status"
            id="status"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            )}
          />
          <p>Draft volumes are only visible to editors and administrators</p>
        </div>
      </div>

      <div className="vol-btn-container">
        <button className="vol-create-btn"><FiSave />Create Volume</button>
        <button className="vol-cancel-btn">Cancel</button>
      </div>
    </form>
  );
};

export default VolumesCreateForm;
