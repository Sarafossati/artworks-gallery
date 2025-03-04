import { JSX } from "react";
import { ITextBoxProps } from "./text-box.interface";
import "./text-box.style.scss";
import { pageClasses } from "../../utils/classes.utils";
import { useMediaQuery } from "react-responsive";

const TextBox = ({ icon, title, value }: ITextBoxProps): JSX.Element => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  
  return (
    <div className={pageClasses("text-box", isDesktopOrLaptop)}>
      <div className="text-box__title">
        <p>{title}</p>
        <p>{value}</p>
      </div>
      {icon}
    </div>
  );
};

export default TextBox;
