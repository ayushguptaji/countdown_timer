import './Card.css';

function Card({ val, type }) {
  return (
    <div className="Card">
      <div>{val}</div>
      <div className='type'>{type}</div>
    </div>
  );
}

export default Card;