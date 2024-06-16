/* eslint-disable react/prop-types */
import "../styles/Survey.css"

export default function Survey({ survey }) {

  const onClickAnswer = e => {
    const answers = e.target.parentNode.querySelectorAll("li")
    answers.forEach(answer => answer.style.border = "none")
    e.target.style.border = "5px solid white"
  }

  return (
    <section className='questionContainer'>
      <form>
        {
          survey.questions.map((question, index) => (
            <div className="question" key={index}>
              <h2>{question.question}</h2>
              <ul>
                {
                  question.answers.map((answer, indexAnswer) => (
                    <li className="answer" key={indexAnswer} onClick={onClickAnswer}>
                      {answer.answer}
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </form>
    </section>
  )
}
