import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authMiddleware from "../middlewares/authMiddleware";
import "./pdfCard.css";

const PdfCard = () => {
  const [pdfs, setPdfs] = useState([]);
  const { user } = useContext(authMiddleware);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/pdf", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setPdfs(data);
      } catch (err) {
        alert("Error fetching PDFs: " + err.response?.data || err.message);
      }
    };
    if (user) {
      fetchPdfs();
    }
  }, [user]);

  return (
    <div className="pdf-viewer">
      <h2>Your Uploaded PDFs</h2>
      {pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <div className="pdf-list">
          {pdfs.map((pdf) => (
            <div key={pdf._id} className="pdf-box">
              <div>
                <img
                  src="https://cdn.discordapp.com/attachments/939781014430056451/1250400277861761084/pngwing.com.png?ex=666acd81&is=66697c01&hm=d104b4ae81c9e092526215d8c8e0cab328ccd3542ed9a2d05628d0597ed2989b&"
                  alt="pdf-icon"
                  width="50px"
                  height="50px"
                />
              </div>
              <Link to={`/pdf/${pdf._id}`}>{pdf.fileName}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PdfCard;
