import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../../api/client";
import styles from "./QuestionDetail.module.css";
import { FaUserAstronaut, FaArrowLeft } from "react-icons/fa";

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const qRes = await client.get(`/questions/${id}`);
      setQuestion(qRes.data.question);

      const aRes = await client.get(`/answers/${id}`);
      setAnswers(aRes.data.answers || []);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load question");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function postAnswer(e) {
    e.preventDefault();
    setErr("");

    if (!answerText.trim()) {
      setErr("Please provide answer");
      return;
    }

    try {
      await client.post("/answers", {
        questionId: Number(id),
        answer: answerText,
      });
      setAnswerText("");
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to post answer");
    }
  }

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FaArrowLeft /> Back
      </button>
      {err && <div className={styles.alert}>{err}</div>}

      {question && (
        <div className={styles.questionBox}>
          <h2 className={styles.h2}>Question</h2>
          <h3 className={styles.title}>{question.title}</h3>
          <p className={styles.content}>{question.description}</p>
        </div>
      )}

      <h2 className={styles.h2}>Answer From The Community</h2>
      <div className={styles.list}>
        {answers.map((a) => (
          <div key={a.id} className={styles.item}>
            <div className={styles.avatar}>
              <FaUserAstronaut />
            </div>
            <div className={styles.meta}>
              <div className={styles.user}>{a.username}</div>
              <div className={styles.answer}>{a.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h3 className={styles.h3}>Answer The Top Question</h3>
        <div className={styles.sub}>Go to Question page</div>

        <form onSubmit={postAnswer} className={styles.form}>
          <textarea
            className={styles.textarea}
            placeholder="Your Answer..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={6}
          />
          <button className={styles.btn} type="submit">
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
}
