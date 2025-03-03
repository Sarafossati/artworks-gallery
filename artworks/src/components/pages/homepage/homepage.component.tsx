import { JSX, useEffect, useState } from "react";
import "./homepage.style.scss";
import Search from "../../shared/search/search.component";
import Table from "../../shared/table/table.component";
import { IArtifactsResponse } from "../../shared/table/table.interface";
import { useMediaQuery } from "react-responsive";
import { pageClasses } from "../../utils/classes.utils";

const Homepage = (): JSX.Element => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  const [artifacts, setArtifacts] = useState<IArtifactsResponse[]>([]);
  const [artifactRes, setArtifactRes] = useState<IArtifactsResponse[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("https://api.artic.edu/api/v1/artworks");
      if (!response.ok) throw new Error("Errore nel caricamento dei dati");
      const result = await response.json();
      const data = result.data.map((artifact: any) => ({
        id: artifact.id,
        title: artifact.title,
      }));
      setArtifacts(data);
      setArtifactRes(data);
    } catch (err) {
      console.log("ERRORE");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (searchedText: string) => {
    if (searchedText === "") {
      setArtifacts(artifactRes);
    } else {
      const filteredData = artifactRes.filter((artifact) =>
        artifact.title.toUpperCase().includes(searchedText.toUpperCase())
      );
      setArtifacts(filteredData);
    }
  };

  return (
    <div className="container">
      <div className={pageClasses("page-content", isBigScreen)}>
        <p className="page-content__title">Artworks</p>
        <div className="page-content__filters">
          <p>List of Artworks</p>
          <Search onChange={handleSearch} placeholder="Search Artworks" />
        </div>
        <Table
          data={artifacts}
          handleArrowClick={(id) => console.log(id)}
          hasPagination
        />
      </div>
    </div>
  );
};

export default Homepage;
