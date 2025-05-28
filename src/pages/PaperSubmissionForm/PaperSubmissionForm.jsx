//PaperSubmissionForm
import React, { useState } from "react";
import "./PaperSubmissionForm.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";

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
   const authorId =  JSON.parse(localStorage.getItem("user"));
    console.log("🤩",authorId?._id)
  const onSubmit = async (data) => {
    const file = data["uploaded-document"][0];

    if (!file) {
      alert("Please upload a PDF");
      return;
    }
    const formData = new FormData();
    formData.append("title", data["title-of-paper"]);
    formData.append("domain", data["domain-of-paper"]);
    formData.append("documentType", data["document-name"]);
    formData.append("abstract", data["abstract"]);
    formData.append("submissionDate", new Date().toISOString());
    formData.append("noAuthors", numAuthors); 
    formData.append("authorId", authorId?._id); 
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
    formData.append("pdf", file);

    try {
      const response = await fetch(
        "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/upload-paper",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      alert("Submission successful!");
      reset();
      setNumAuthors(1);
      setSelectedOptions(null);
      setFileName("Upload File");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const options = [
    { value: "Research Paper", label: "Research Paper" },
    { value: "Review Paper", label: "Review Paper" },
    { value: "Case Studies", label: "Case Studies" },
    { value: "Conceptual Papers", label: "Conceptual Paper" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form
        className="u-container ppr-sub-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="ppr-sub-title">Submit your paper</h1>

        <div className="rounded-md my-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ppr-sub-guidelines-btn"
          >
            <span>Submission Guidelines</span>
            <FiChevronLeft
              className={`chevron-icon ${isOpen ? "rotate" : ""}`}
            />
          </button>

          <div className={`ppr-sub-guidelines-wrapper ${isOpen ? "open" : ""}`}>
            <div className="space-y-4 p-4 ppr-sub-guidelines">
              <p>
                Before submitting your paper, please ensure that it meets the
                following requirements:
              </p>
              <ul>
                <li>
                  The paper must be original and not previously published or
                  under consideration elsewhere.
                </li>
                <li>
                  The paper should be formatted according to the journal's
                  template (available for download below).
                </li>
                <li>The paper should be submitted as a PDF file.</li>
                <li>The paper should include an abstract of 150-250 words.</li>
                <li>
                  All figures and tables should be properly labeled and
                  referenced in the text.
                </li>
                <li>References should follow the journal's citation style.</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="sub-container-title">Paper Information*</p>
        <div className="top-container">
          <div className="submit-ppr-type">
            <label htmlFor="document-name">What are you submitting*:</label>

            <Controller
              name="document-name"
              id="document-name"
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
          <div className="title-container">
            <label className="inline mb-1">Domain*: </label>
            <input
              type="text"
              // className="border rounded p-2 w-[50%]"
              rows={4}
              {...register("domain-of-paper", { required: true })}
            />
          </div>
          <div className="keyword-container">
            <label className="inline mb-1">Keywords*: </label>
            <input
              type="text"
              rows={4}
              {...register("keywords", { required: true })}
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
              max="6"
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

        <div className="ppr-sub-acknowledgement">
          <input
            type="checkbox"
            id="acknowledgement"
            {...register("acknowledgement", { required: true })}
          />
          <label htmlFor="acknowledgement">
            I confirm that this paper is original, has not been published
            elsewhere, and is not under consideration by another journal
          </label>
        </div>

        <div className="ppr-form-center-btn">
          <button className="ppr-form-submit-btn" type="submit">
            Submit {selectedOptions?.label || "Paper"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PaperSubmissionForm;
