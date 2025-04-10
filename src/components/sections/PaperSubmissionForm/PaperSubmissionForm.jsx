import React, { useState } from "react";
import "./PaperSubmissionForm.css";
import NavBar from "../../NavBar/NavBar";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const PaperSubmissionForm = () => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [numAuthors, setNumAuthors] = useState(1);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "36px",
      height: "36px",
      backgroundColor: "#f0f0f0",
      borderColor: state.isFocused ? "#4f46e5" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(79,70,229,0.5)" : "none",
      "&:hover": {
        borderColor: "#4f46e5",
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
    { value: "conceptual-papers", label: "Conceptual Papers" },
  ];

  return (
    <>
      <NavBar />
      <form
        className="u-container ppr-sub-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="ppr-sub-title">Submit your paper</h1>

        <div className="top-container">
          <div className="title-container">
            <label>Title of Paper: </label>
            <input
              type="text"
              className="border"
              {...register("title-of-paper", { required: true })}
            />
          </div>

          <br />

          <div className="title-container">
            <label>Number of authors: </label>
            <input
              type="number"
              className="border w-15"
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
        </div>

        <br />

        {Array.from({ length: numAuthors }).map((_, index) => (
          <div key={index} className="mb-4">
            <h3>Author {index + 1}</h3>
            <div className="author-container">
              <div className="author-name-container">
                <label>Name of author: </label>
                <input
                  type="text"
                  className="border"
                  {...register(`authorName-${index}`, { required: true })}
                />
              </div>

              <br />

              <div className="author-name-container">
                <label>Email of author: </label>
                <input
                  type="email"
                  className="border"
                  {...register(`authorEmail-${index}`, { required: true })}
                />
              </div>

              <br />

              <div className="author-name-container">
                <label>Institute Name: </label>
                <input
                  type="text"
                  className="border"
                  {...register(`authorInstitute-${index}`, { required: true })}
                />
              </div>

              <br />
            </div>
          </div>
        ))}

        <div className="submit-ppr-type flex items-center gap-2">
          <label className="text-sm font-medium">
            What are you submitting:
          </label>

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

        <br />

        <div className="mb-4">
          <label className="block mb-1">Abstract:</label>
          <textarea
            className="border rounded p-2 w-full"
            rows={4}
            {...register("abstract", { required: true })}
          />
        </div>

        <br />

        <div>
          <label>Upload your {selectedOptions?.label || "paper"}: </label>
          <input
            type="file"
            className="border"
            accept="application/pdf"
            {...register("uploaded-document", { required: true })}
          />
        </div>

        <button className="border cursor-pointer mt-4" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default PaperSubmissionForm;
