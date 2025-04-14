import React, { useState } from "react";
import "./PaperSubmissionForm.css";
import NavBar from "../../NavBar/NavBar";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

const PaperSubmissionForm = () => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [numAuthors, setNumAuthors] = useState(1);

  const [fileName, setFileName] = useState("Upload File");

  const handleFileName = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Upload File");
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "36px",
      height: "36px",
      backgroundColor: "#f0f0f0",
      borderColor: state.isFocused ? "#575757" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(87, 87, 87, 0.5)" : "none",
      "&:hover": {
        borderColor: "#575757",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "36px",
      paddingTop: "0px",
      paddingBottom: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "36px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
    }),
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const onSubmit = async (data) => {
    const file = data["uploaded-document"][0];

    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("title", data["title-of-paper"]);
    formData.append("noAuthors", data["no-authors"]);
    formData.append(
      "authors",
      JSON.stringify(
        Array.from({ length: numAuthors }).map((_, index) => ({
          name: data[`authorName-${index}`],
          email: data[`authorEmail-${index}`],
          institute: data[`authorInstitute-${index}`],
        }))
      )
    );
    formData.append("documentType", data["document-name"]);
    formData.append("abstract", data["abstract"]);
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload-paper", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      alert("Submission successful!");
      reset();
      setNumAuthors(1);
      setSelectedOptions(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const options = [
    { value: "research-paper", label: "Research Paper" },
    { value: "review-paper", label: "Review Paper" },
    { value: "case-studies", label: "Case Studies" },
    { value: "conceptual-papers", label: "Conceptual Paper" },
  ];

  return (
    <>
      <NavBar />
      <form
        className="u-container ppr-sub-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="ppr-sub-title">Submit your paper</h1>

        <p className="sub-container-title">Paper Information*</p>
        <div className="top-container">
          <div className="submit-ppr-type">
            <label>What are you submitting*:</label>

            <Controller
              name="document-name"
              control={control}
              rules={{ required: "Document type is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={customStyles}
                  value={options.find((option) => option.value === field.value)}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value);
                    handleSelectChange(selectedOption);
                  }}
                  className="w-[200px]"
                />
              )}
            />
          </div>

          <div className="title-container">
            <label>Title of {selectedOptions?.label || "Paper"}*: </label>
            <input
              type="text"
              // className="border"
              {...register("title-of-paper", { required: true })}
            />
          </div>

          <div className="abstract-container">
            <label className="inline mb-1">Abstract*: </label>
            <textarea
              className="border rounded p-2 w-[50%]"
              rows={4}
              {...register("abstract", { required: true })}
            />
          </div>
        </div>

        <p className="sub-container-title">Author Information*</p>

        <div className="author-main-container">
          <div className="author-number-container">
            <label>Number of authors: </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              {...register("no-authors", {
                required: true,
                onChange: (e) => {
                  const value = parseInt(e.target.value);
                  setNumAuthors(isNaN(value) || value <= 0 ? 1 : value);
                },
              })}
            />
          </div>
          {Array.from({ length: numAuthors }).map((_, index) => (
            <div key={index} className="author-sub-container">
              <h3 className="author-number">Author {index + 1}</h3>
              <div className="author-info-container">
                <div className="author-name-container">
                  <label>Name of author: </label>
                  <input
                    type="text"
                    {...register(`authorName-${index}`, { required: true })}
                  />
                </div>

                <div className="author-name-container">
                  <label>Email of author: </label>
                  <input
                    type="email"
                    {...register(`authorEmail-${index}`, { required: true })}
                  />
                </div>

                <div className="author-name-container">
                  <label>Institute Name: </label>
                  <input
                    type="text"
                    {...register(`authorInstitute-${index}`, {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="sub-container-title">Files*</p>
        <div className="file-upload-container">
          <label>Upload your {selectedOptions?.label || "paper"}:</label>
          <input
            type="file"
            className="hidden"
            id="file-upload-btn"
            accept="application/pdf"
            {...register("uploaded-document", {
              required: true,
              onChange: handleFileName,
            })}
          />
          <label htmlFor="file-upload-btn" className="fileName-btn">
            {" "}
            {fileName === "Upload File" && <FaUpload />}
            {fileName}{" "}
          </label>
        </div>

        <div className="ppr-form-center-btn">
          <button className="ppr-form-submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default PaperSubmissionForm;
