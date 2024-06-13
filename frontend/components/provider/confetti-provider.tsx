"use client"
import ReactConfetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
export const ConfettiProvider = () => {

  const dispatch = useDispatch();
  const {isOpen} = useSelector((state:any) => state.confetti);

  if (isOpen === false) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      width={window.innerWidth-20}
      recycle={false}
      onConfettiComplete={() => {
        dispatch({
            type:"CONFETTI_CLOSE"
        })
      }}
    />
  );
};
