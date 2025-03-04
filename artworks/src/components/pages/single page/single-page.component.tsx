import { JSX, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams, useNavigate } from "react-router-dom";
import { IArtworkDetailRes } from "./single-page.interface";
import { ReactComponent as ArrowBack } from "../../icons/arrow_back.svg";
import { ReactComponent as ExploreNearby } from "../../icons/explore_nearby.svg";
import { ReactComponent as FullScreen } from "../../icons/fullscreen.svg";
import { ReactComponent as Calendar } from "../../icons/calendar_today.svg";
import { ReactComponent as Schedule } from "../../icons/schedule.svg";
import { ReactComponent as HistoryToggle } from "../../icons/history_toggle_off.svg";
import { pageClasses } from "../../utils/classes.utils";
import "./single-page.style.scss";
import TextBox from "../../shared/text-box/text-box.component";

const SinglePage = (): JSX.Element => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const [artworkDetail, setArtworkDetail] = useState<IArtworkDetailRes | null>(
    null
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getArtworkDetail = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`
        );
        if (!response.ok) throw new Error("Error during data loading. Please refresh");
        const result = await response.json();

        if (!result.data)
          throw new Error("No data. Please refresh");

        const data = {
          title: result.data.title,
          thumbnail:
            result.data.thumbnail?.lqip ||
            `https://www.artic.edu/iiif/2/${result.data.image_id}/full/843,/0/default.jpg`,
          referenceNumber: result.data.main_reference_number || "-",
          artist: result.data.artist_title || "-",
          origin: result.data.place_of_origin || "-",
          dateDisplay: result.data.date_display || "-",
          dateStart: result.data.date_start || "-",
          dateEnd: result.data.date_end || "-",
          dimensions: result.data.dimensions.split("cm")[0] + "cm" || "-",
          description: result.data.description || "-",
        };

        setArtworkDetail(data);
      } catch (err) {
        console.error("Error:", err);
        setArtworkDetail(null);
      }
    };

    getArtworkDetail();
  }, [id]);

  if (!artworkDetail) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className={pageClasses("single-page", isDesktopOrLaptop)}>
        <div>
          <div className="single-page-title-container">
            <ArrowBack onClick={() => navigate("/")} className="back-button" />
            <p className="single-page-title-container__title">
              {artworkDetail.title} (Ref. Nr. {artworkDetail.referenceNumber})
            </p>
          </div>
          <div className="single-page-infos">
            <img
              src={artworkDetail.thumbnail}
              alt={artworkDetail.title}
            />
            <div className="single-page-infos-block">
              <div className="single-page-infos-block__titles">
                <h3>{artworkDetail.artist}</h3>
                <h2>{artworkDetail.title}</h2>
              </div>
              <div className="single-page-infos-block__box">
                <TextBox
                  title="Place of origin"
                  value={artworkDetail.origin}
                  icon={<ExploreNearby />}
                />
                <TextBox
                  title="Dimensions"
                  value={artworkDetail.dimensions}
                  icon={<FullScreen />}
                />
                <TextBox
                  title="Display date"
                  value={artworkDetail.dateDisplay.toString()}
                  icon={<Calendar />}
                />
                <TextBox
                  title="Start date"
                  value={artworkDetail.dateStart.toString()}
                  icon={<Schedule />}
                />
                <TextBox
                  title="End date"
                  value={artworkDetail.dateEnd.toString()}
                  icon={<HistoryToggle />}
                />
              </div>
            </div>
          </div>{" "}
        </div>
        <div
          className={pageClasses("single-page-description", isDesktopOrLaptop)}
        >
          <p className="single-page-description__title">Desciption</p>
          <p
            className="single-page-description__description"
            dangerouslySetInnerHTML={{ __html: artworkDetail.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
