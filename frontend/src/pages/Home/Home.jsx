import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../api/client";
import { useAuth } from "../../auth/AuthContext";
import styles from "./Home.module.css";
import { FaUserAstronaut } from "react-icons/fa";

export default function Home() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await client.get("/questions");
        setQuestions(data.questions || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load questions");
      }
    })();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <Link className={styles.askBtn} to="/ask">
          Ask Question
        </Link>
        <div className={styles.welcome}>Welcome: {user?.username}</div>
      </div>

      <input
        className={styles.search}
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2 className={styles.h2}>Questions</h2>
      {err && <div className={styles.alert}>{err}</div>}

      <div className={styles.list}>
        {filteredQuestions.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            No questions found.
          </div>
        ) : (
          filteredQuestions.slice(0, 8).map((q) => (
            <Link key={q.id} className={styles.item} to={`/question/${q.id}`}>
              <div className={styles.avatar}>
                <FaUserAstronaut />
              </div>
              <div className={styles.meta}>
                <div className={styles.user}>{q.username}</div>
                <div className={styles.title}>{q.title}</div>
              </div>
              <div className={styles.arrow}>›</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
