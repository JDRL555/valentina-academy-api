import "../styles/HeaderCard.css"
export default function HeaderCard({presentation, img}) {
  return (
    <div className="card">
      <div className="img" style={{ backgroundImage: `url('${img}')` }}></div>
      <div className="presentation">
        <h1>{presentation}</h1>
      </div>
    </div>
  )
}