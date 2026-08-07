import "./AIAdvisor.css";

function AIAdvisor() {
  return (
    <div className="advisor-container">
      <h1>🤖 AI Financial Advisor</h1>

      <div className="advisor-card">
        <h3>Suggestion 1</h3>

        <p>
          Agar aapki income ka 20% bach raha hai,
          to aap SIP mein investment kar sakte hain.
        </p>
      </div>

      <div className="advisor-card">
        <h3>Suggestion 2</h3>

        <p>
          Anavashyak kharchon ko kam karke aap
          zyada paise bacha sakte hain.
        </p>
      </div>

      <div className="advisor-card">
        <h3>Suggestion 3</h3>

        <p>
          Har mahine ek emergency fund banana
          achchhi financial habit hai.
        </p>
      </div>
    </div>
  );
}

export default AIAdvisor;