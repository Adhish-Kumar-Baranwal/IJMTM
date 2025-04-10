import React, { useState } from "react";
import "./PaperSubmissionForm.css";
import NavBar from "../../NavBar/NavBar";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";


const PaperSubmissionForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numAuthors, setNumAuthors] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset
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
    formData.append("authors", JSON.stringify(
      Array.from({ length: numAuthors }).map((_, index) => ({
        name: data[`authorName-${index}`],
        email: data[`authorEmail-${index}`],
        institute: data[`authorInstitute-${index}`],
      }))
    ));
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
      setSelectedOptions([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  

  const handleNumAuthorsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumAuthors(value);
    } else {
      setNumAuthors(1);
    }
  };

  const options = [
    { value: "research-paper", label: "Research Paper" },
    { value: "review-paper", label: "Review Paper" },
    { value: "case-studies", label: "Case Studies" },
    { value: "conceptual-papers", label: "Conceptual Papers" }
  ];

  return (
    <>
      <NavBar />
      <form
        className="u-container ppr-sub-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="ppr-sub-title">Submit your paper</h1>

        <div>
          <label>Title of Paper: </label>
          <input
            type="text"
            className="border"
            {...register("title-of-paper", { required: true })}
          />
        </div>

        <br />

        <div>
          <label>Number of authors: </label>
          <input
            type="number"
            className="border w-15"
            min="1"
            value={numAuthors}
            onChange={handleNumAuthorsChange}
            {...register("no-authors", { required: true })}
          />
        </div>

        <br />

        {Array.from({ length: numAuthors }).map((_, index) => (
          <div key={index} className="mb-4">
            <h3>Author {index + 1}</h3>
            <div>
              <label>Name of author: </label>
              <input
                type="text"
                className="border"
                {...register(`authorName-${index}`, { required: true })}
              />
            </div>
            <br />
            <div>
              <label>Email of author: </label>
              <input
                type="email"
                className="border"
                {...register(`authorEmail-${index}`, { required: true })}
              />
            </div>
            <br />
            <div>
              <label>Institute Name: </label>
              <input
                type="text"
                className="border"
                {...register(`authorInstitute-${index}`, { required: true })}
              />
            </div>
            <br />
          </div>
        ))}

        <div>
          <label>What are you submitting: </label>
          <Controller
            name="document-name"
            control={control}
            rules={{ required: "Document type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                value={options.find((option) => option.value === field.value)}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                  handleSelectChange(selectedOption);
                }}
                className="w-[200px]"
              />
            )}
          />
          {errors["document-name"] && (
            <p className="error-msg">{errors["document-name"].message}</p>
          )}
        </div>

        <br />

        <div>
          <label>Abstract: </label>
          <input
            type="text"
            className="border"
            {...register("abstract", { required: true })}
          />
        </div>

        <br />

        <div>
          <label>Upload your {selectedOptions.label || "paper"}: </label>
          <input
            type="file"
            className="border"
            accept="application/pdf"
            {...register("uploaded-document", { required: true })}
          />
        </div>

        <button className="border cursor-pointer mt-4" type="submit">
          Submitttt
        </button>
      </form>
    </>
  );
};

export default PaperSubmissionForm;
