export default function ElementList({ elements, activeEl, setActiveEl }) {
  console.log(elements)
    let els = elements.map(el =>
      <li
        key={el}
        className={el === activeEl ? 'active' : ''}
        onClick={() => setActiveEl(el)}
      >
        {el}
      </li>
    );
    return (
      <ul className="ElementList">
        {els}
      </ul>
    );
}