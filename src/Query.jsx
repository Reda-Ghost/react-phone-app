import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchData(userInput) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + userInput,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

function UserDetails() {
  const [inputValue, setInputValue] = useState(null);
  const [submittedId, setSubmittedId] = useState(null);
  const [validationError, setValidationError] = useState("");

  const {
    data: user,
    isPending,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["users", submittedId],
    queryFn: () => fetchData(submittedId),
    staleTime: 2 * 60000,
    gcTime: 5 * 60000,
    enabled: submittedId !== null,
  });

  if (isError) {
    return (
      <p className="text-center text-danger fw-semibold">
        Error: {error.message}
      </p>
    );
  }

  function isValid(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      setValidationError("User ID cannot be empty.");

      return false;
    }

    const numericValue = Number(value);
    if (Number.isNaN(numericValue) || numericValue <= 0 || numericValue > 10) {
      setValidationError("Please enter a valid positive number from 1 to 10.");
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setValidationError(""); // Clear previous errors

    if (isValid(inputValue)) {
      setSubmittedId(Number(inputValue));
    }
  }

  return (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      {isFetching && (
        <p className=" text-warning fw-semibold">Fetching in progress</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <label
          htmlFor="user"
          className="form-label mb-0"
        >
          User Id
        </label>
        <input
          type="number"
          id="user"
          className="form-control"
          onChange={(event) => setInputValue(event.target.value)}
          // max={10}
          // min={1}
        />
        <button
          onSubmit={handleSubmit}
          className="btn btn-primary mt-1 d-block ms-auto"
        >
          Submit
        </button>
      </form>

      {/* Local UI validation errors */}
      {validationError && (
        <p className="text-danger fw-semibold">{validationError}</p>
      )}

      {/* Network API errors */}
      {isError && (
        <p className="text-danger fw-semibold">Error: {error.message}</p>
      )}

      {isPending && submittedId !== null && (
        <p className="text-info fw-semibold">Loading...</p>
      )}

      {user && (
        <div
          key={user?.id}
          className="p-4 shadow rounded"
        >
          <h4>{user?.name}</h4>
          <p>{user?.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
