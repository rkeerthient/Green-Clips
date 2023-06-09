import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { PinComponent } from "@yext/search-ui-react";
import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiTacos } from "react-icons/gi";
import { Result } from "@yext/search-headless-react";
import { ScissorsIcon } from "@heroicons/react/20/solid";
import { BsScissors } from "react-icons/bs";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: any) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold">{location.neighborhood || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return ReactDOM.renderToString(html);
};

const MapPin: PinComponent<Location> = ({
  index,
  mapbox,
  result,
}: {
  index: number;
  mapbox: Map;
  result: Result<Location>;
}) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick}>
      <div
        className="bg-gray-200 rounded-full p-4 mx-auto  "
        style={{ border: "1px solid" }}
      >
        <BsScissors size={20} color="#089f45" />
      </div>
    </button>
  );
};

export default MapPin;
