import { JSX, useEffect, useState } from "react";
import "./homepage.style.scss";
import Search from "../../shared/search/search.component";
import Table from "../../shared/table/table.component";
import { IArtifactsResponse } from "../../shared/table/table.interface";
import { useMediaQuery } from "react-responsive";
import { pageClasses } from "../../utils/classes.utils";
import { useNavigate } from "react-router-dom";

const Homepage = (): JSX.Element => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [artifacts, setArtifacts] = useState<IArtifactsResponse[]>([]);
  const [artifactRes, setArtifactRes] = useState<IArtifactsResponse[]>([]);

  const navigate = useNavigate();

  const getArtworks = async () => {
    try {
      const response = await fetch("https://api.artic.edu/api/v1/artworks");
      if (!response.ok)
        throw new Error("Error during data loading. Please refresh");
      const result = await response.json();

      if (!result.data) throw new Error("No data. Please refresh");
      const data = result.data.map((artifact: any) => ({
        id: artifact.id,
        title: artifact.title,
      }));
      setArtifacts(data);
      setArtifactRes(data);
    } catch (err) {
      console.error("Error:", err);
      setArtifacts([])
      setArtifactRes([]);
    }
  };

  useEffect(() => {
    getArtworks();
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

  const handleRowClick = (id: number) => {
    navigate(`/artwork/${id}`);
  };

  return (
    <div className="container">
      <div className={pageClasses("page-content", isDesktopOrLaptop)}>
        <p className="page-content__title">Artworks</p>
        <div className="page-content__filters">
          <p>List of Artworks</p>
          <Search onChange={handleSearch} placeholder="Search Artworks" />
        </div>
        <Table
          data={artifacts}
          handleArrowClick={handleRowClick}
          hasPagination
        />
      </div>
    </div>
  );
};

export default Homepage;
