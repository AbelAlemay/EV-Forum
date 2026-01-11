import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ApiDocs.module.css";

export default function ApiDocs() {
  const navigate = useNavigate();
  const endpoints = [
    {
      category: "User Authentication",
      items: [
        {
          method: "GET",
          url: "/user/checkUser",
          desc: "Checks the current authenticated user's information.",
          headers: ["Authorization: Bearer token"],
          success: {
            status: "200 OK",
            body: {
              message: "Valid user",
              username: "Kebede",
              userid: "123",
            },
          },
          errors: [
            {
              status: "401 Unauthorized",
              desc: "Authentication credentials were missing or incorrect.",
              body: {
                error: "Unauthorized",
                message: "Authentication invalid",
              },
            },
          ],
        },
        {
          method: "POST",
          url: "/user/register",
          desc: "Registers a new user.",
          requestBody: [
            { name: "username", type: "string", desc: "The username of the user." },
            { name: "first_name", type: "string", desc: "The first name of the user." },
            { name: "last_name", type: "string", desc: "The last name of the user." },
            { name: "email", type: "string", desc: "The email of the user." },
            { name: "password", type: "string", desc: "The password of the user." },
          ],
          success: {
            status: "201 Created",
            body: { message: "User registered successfully" },
          },
          errors: [
            {
              status: "400 Bad Request",
              desc: "Missing or invalid fields.",
              body: { error: "Bad Request", message: "Please provide all required fields" },
            },
            {
              status: "400 Bad Request",
              desc: "Password too short.",
              body: { error: "Bad Request", message: "Password must be at least 8 characters" },
            },
            {
              status: "409 Conflict",
              desc: "A user with the provided username or email already exists.",
              body: { error: "Conflict", message: "User already existed" },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
        {
          method: "POST",
          url: "/user/login",
          desc: "Authenticates a user and returns a JWT token.",
          requestBody: [
            { name: "email", type: "string", desc: "The email of the user." },
            { name: "password", type: "string", desc: "The password of the user." },
          ],
          success: {
            status: "200 OK",
            body: {
              message: "User login successful",
              token: "jwt_token",
            },
          },
          errors: [
            {
              status: "401 Unauthorized",
              desc: "Invalid credentials.",
              body: { error: "Unauthorized", message: "Invalid username or password" },
            },
            {
              status: "400 Bad Request",
              desc: "Missing or invalid fields.",
              body: { error: "Bad Request", message: "Please provide all required fields" },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
      ],
    },
    {
      category: "Questions",
      items: [
        {
          method: "GET",
          url: "/questions",
          desc: "Fetches all questions.",
          success: {
            status: "200 OK",
            body: {
              questions: [
                {
                  question_id: 1,
                  title: "First Question",
                  content: "This is the first question.",
                  user_name: "Sisay",
                  created_at: "2023-06-30T12:00:00Z",
                },
                {
                  question_id: 2,
                  title: "Second Question",
                  content: "This is the second question.",
                  user_name: "Sara",
                  created_at: "2023-06-30T13:00:00Z",
                },
              ],
            },
          },
          errors: [
            {
              status: "404 Not Found",
              desc: "No questions found.",
              body: { error: "Not Found", message: "No questions found." },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
        {
          method: "GET",
          url: "/questions/:question_id",
          desc: "Retrieves details of a specific question.",
          urlParams: [
            { name: "question_id", type: "integer", desc: "The unique identifier of the question." },
          ],
          success: {
            status: "200 OK",
            body: {
              question: {
                question_id: 1,
                title: "First Question",
                content: "This is the first question.",
                user_id: 123,
                created_at: "2023-06-30T12:00:00Z",
              },
            },
          },
          errors: [
            {
              status: "404 Not Found",
              desc: "The specified question was not found.",
              body: { error: "Not Found", message: "The requested question could not be found." },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
        {
          method: "POST",
          url: "/questions",
          desc: "Creates a new question.",
          requestBody: [
            { name: "title", type: "string", desc: "The title of the question." },
            { name: "description", type: "string", desc: "The description of the question." },
          ],
          success: {
            status: "201 Created",
            body: { message: "Question created successfully" },
          },
          errors: [
            {
              status: "400 Bad Request",
              desc: "Missing or invalid fields.",
              body: { error: "Bad Request", message: "Please provide all required fields" },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
      ],
    },
    {
      category: "Answers",
      items: [
        {
          method: "GET",
          url: "/answers/:question_id",
          desc: "Retrieves answers for a specific question.",
          urlParams: [
            { name: "question_id", type: "integer", desc: "The unique identifier of the question." },
          ],
          success: {
            status: "200 OK",
            body: {
              answers: [
                {
                  answer_id: 1,
                  content: "This is an answer.",
                  user_name: "Abebe",
                  created_at: "2023-06-30T12:00:00Z",
                },
                {
                  answer_id: 2,
                  content: "This is another answer.",
                  user_name: "Almaz",
                  created_at: "2023-06-30T13:00:00Z",
                },
              ],
            },
          },
          errors: [
            {
              status: "404 Not Found",
              desc: "The specified question was not found.",
              body: { error: "Not Found", message: "The requested question could not be found." },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
        {
          method: "POST",
          url: "/answers",
          desc: "Submits an answer for a specific question.",
          requestBody: [
            { name: "questionid", type: "number", desc: "The id for a specific question." },
            { name: "answer", type: "string", desc: "The answer for a specific question." },
          ],
          success: {
            status: "201 Created",
            body: { message: "Answer posted successfully" },
          },
          errors: [
            {
              status: "400 Bad Request",
              desc: "Missing or invalid fields.",
              body: { error: "Bad Request", message: "Please provide answer" },
            },
            {
              status: "500 Internal Server Error",
              desc: "An unexpected error occurred.",
              body: { error: "Internal Server Error", message: "An unexpected error occurred." },
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FaArrowLeft /> Back
      </button>
      <h2 className={styles.h2}>API Documentation</h2>

      {endpoints.map((section, idx) => (
        <div key={idx} className={styles.section}>
          <h3 className={styles.h3}>{section.category}</h3>
          {section.items.map((item, i) => (
            <div key={i} className={styles.endpoint}>
              <div className={styles.header}>
                <span className={`${styles.method} ${styles[item.method.toLowerCase()]}`}>
                  {item.method}
                </span>
                <span className={styles.url}>{item.url}</span>
              </div>
              <p className={styles.desc}>{item.desc}</p>

              {item.headers && (
                <div className={styles.block}>
                  <div className={styles.label}>Request Headers:</div>
                  <ul className={styles.list}>
                    {item.headers.map((h, k) => (
                      <li key={k}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.urlParams && (
                <div className={styles.block}>
                  <div className={styles.label}>URL Parameters:</div>
                  <ul className={styles.list}>
                    {item.urlParams.map((p, k) => (
                      <li key={k}>
                        <span className={styles.paramName}>{p.name}</span> ({p.type}): {p.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.requestBody && (
                <div className={styles.block}>
                  <div className={styles.label}>Request Body:</div>
                  <ul className={styles.list}>
                    {item.requestBody.map((p, k) => (
                      <li key={k}>
                        <span className={styles.paramName}>{p.name}</span> ({p.type}): {p.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.success && (
                <div className={styles.block}>
                  <div className={styles.label}>Successful Response:</div>
                  <div className={styles.status}>{item.success.status}</div>
                  <pre className={styles.json}>{JSON.stringify(item.success.body, null, 2)}</pre>
                </div>
              )}

              {item.errors && (
                <div className={styles.block}>
                  <div className={styles.label}>Error Responses:</div>
                  {item.errors.map((err, k) => (
                    <div key={k} className={styles.errorItem}>
                      <div className={styles.status}>{err.status}</div>
                      <div className={styles.subDesc}>{err.desc}</div>
                      <pre className={styles.json}>{JSON.stringify(err.body, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
