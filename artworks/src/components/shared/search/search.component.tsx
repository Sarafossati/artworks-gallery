import { ISearchProps } from "./search.interface";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import "./search.style.scss";
import { useMediaQuery } from "react-responsive";
import { pageClasses } from "../../utils/classes.utils";

const Search = (props: ISearchProps) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  
  const { value, onChange, placeholder } = props;

  return (
    <div className={pageClasses("search", isBigScreen)}>
      <label className="search__label"></label>
      <SearchIcon className="search__icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
