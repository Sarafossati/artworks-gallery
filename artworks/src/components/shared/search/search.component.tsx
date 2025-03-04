import { ISearchProps } from "./search.interface";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import "./search.style.scss";
import { useMediaQuery } from "react-responsive";
import { pageClasses } from "../../utils/classes.utils";

const Search = (props: ISearchProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })  
  const { value, onChange, placeholder } = props;

  return (
    <div className={pageClasses("search", isDesktopOrLaptop)}>
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
