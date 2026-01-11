import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import client from "../../api/client";
import styles from "./AskQuestion.module.css";

export default function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      await client.post("/questions", { title, description });
      navigate("/home");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to post question");
    }
  }

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FaArrowLeft /> Back
      </button>
      <div className={styles.steps}>
        <h2 className={styles.h2}>Steps to write a good question</h2>
        <ul className={styles.ul}>
          <li>
            <FaArrowRight className={styles.icon} /> Summarize your problem in a
            one-line title.
          </li>
          <li>
            <FaArrowRight className={styles.icon} /> Describe your problem in
            more detail.
          </li>
          <li>
            <FaArrowRight className={styles.icon} /> Describe what you tried and
            what you expected to happen.
          </li>
          <li>
            <FaArrowRight className={styles.icon} /> Review your question and
            post it to the site.
          </li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3 className={styles.h3}>Ask a public question</h3>
        <div className={styles.sub}>Go to Question page</div>

        {err && <div className={styles.alert}>{err}</div>}

        <form onSubmit={submit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
          />

          <button className={styles.btn} type="submit">
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
}
