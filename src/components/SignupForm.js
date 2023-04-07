import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const onSubmit = async (data) => {
    if (!acceptedTerms) {
      setResponseMessage("Error: Please accept the Terms of Service");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        ...data,
        agreement: acceptedTerms,
      });
      console.log("Response data:", response.data);
      setResponseMessage(`Account created: ${response.data.data.id}`);
    } catch (error) {
      setResponseMessage(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className="c-agreement">
        <label htmlFor="agreement">
          <input
            id="agreement"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          I accept the Terms of Service
        </label>
        {!acceptedTerms && <span>Please accept the Terms of Service</span>}
      </div>

      <div>
        <button type="submit">Sign up</button>
      </div>
      {responseMessage && <div>{responseMessage}</div>}
    </form>
  );
}
