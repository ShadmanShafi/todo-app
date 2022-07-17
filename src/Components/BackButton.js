import "../App.css";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  let navigate = useNavigate();

  function handleBackBtn() {
    navigate("/dashboard");
  }

  return (
    <>
      <button className="back-btn" onClick={handleBackBtn}>
        ← Back
      </button>
    </>
  );
}
