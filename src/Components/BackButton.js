import "../App.css";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  let navigate = useNavigate();

  function handleBackBtn() {
    navigate(-1);
  }

  return (
    <>
      <button className="back-btn" onClick={handleBackBtn}>
        ← Back
      </button>
    </>
  );
}
