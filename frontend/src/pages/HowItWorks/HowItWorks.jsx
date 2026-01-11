import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaPencilAlt,
  FaReply,
  FaRocket,
  FaArrowLeft,
} from "react-icons/fa";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const navigate = useNavigate();
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Join the Community",
      desc: "Create an account or sign in to become part of our growing network.",
    },
    {
      icon: <FaPencilAlt />,
      title: "Ask Questions",
      desc: "Post your programming questions with clear titles and descriptions.",
    },
    {
      icon: <FaReply />,
      title: "Get Answers",
      desc: "Receive help from other students and experienced developers.",
    },
    {
      icon: <FaRocket />,
      title: "Learn Faster",
      desc: "Share knowledge, collaborate, and accelerate your learning journey.",
    },
  ];

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FaArrowLeft /> Back
      </button>
      <h2 className={styles.h2}>How it Works</h2>

      <div className={styles.container}>
        {steps.map((step, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
