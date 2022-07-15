import "../App.css";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  let navigate = useNavigate();

  function handleBackBtn() {
    navigate("/dashboard");
  }

  return (
    <>
      <div>
        <button className="create-new back-btn" onClick={handleBackBtn}>
          ← Back
        </button>
      </div>
    </>
  );
}
