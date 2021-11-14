import { FaHeart } from "react-icons/fa";

type Props = {
  count?: number;
  onClick: Function;
};

const ClapButton = ({ count = 0, onClick }: Props) => {
  //   const [count, setCount] = useState(0);

  const triggerConfetti = (e: any) => {
    e.preventDefault();
    e.target.classList.remove("confettis-on");
    // triggering reflow, so that the CSS animation restarts
    void e.target.offsetWidth;
    e.target.classList.add("confettis-on");
    onClick();
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btnd btnd-round btnd-danger"
        data-confettis
        onClick={(e) => triggerConfetti(e)}
      >
        <FaHeart /> {count}
      </button>
    </div>
  );
};

export default ClapButton;
