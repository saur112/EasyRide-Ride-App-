"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  MarkerF,
  OverlayView,
} from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

// Helper to position the label above the marker
const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -height - 40,
});

const GoogleMapSection = () => {
  const containerStyle = {
    width: "100%",
    height: "450px",
  };

  const { Source } = useContext(SourceContext);
  const { Destination } = useContext(DestinationContext);

  const defaultCenter = Source?.lat
    ? { lat: Source.lat, lng: Source.lng }
    : Destination?.lat
    ? { lat: Destination.lat, lng: Destination.lng }
    : { lat: -3.745, lng: -38.523 };

  const [center, setCenter] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (map) {
      if (Source?.lat && Destination?.lat) {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: { lat: Source.lat, lng: Source.lng },
            destination: { lat: Destination.lat, lng: Destination.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
              const leg = result.routes[0].legs[0];
              setDistance(leg.distance.text);
              setDuration(leg.duration.text);

              const bounds = new window.google.maps.LatLngBounds();
              result.routes[0].overview_path.forEach((point) =>
                bounds.extend(point)
              );
              map.fitBounds(bounds);
            } else {
              console.error("Directions request failed:", status);
            }
          }
        );
      } else if (Source?.lat) {
        const newCenter = { lat: Source.lat, lng: Source.lng };
        setCenter(newCenter);
        map.panTo(newCenter);
      } else if (Destination?.lat) {
        const newCenter = { lat: Destination.lat, lng: Destination.lng };
        setCenter(newCenter);
        map.panTo(newCenter);
      }
    }
  }, [Source, Destination, map]);

  const onLoad = useCallback(
    (mapInstance) => {
      if (mapInstance && center) {
        const bounds = new window.google.maps.LatLngBounds(center);
        mapInstance.fitBounds(bounds);
        setMap(mapInstance);
      }
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: "8f2ec0e27e692b3c" }}
      >
        {map && (
          <>
            {/* 🔲 Source Marker & Label */}
            {Source?.lat && (
              <>
                <MarkerF
                  position={{ lat: Source.lat, lng: Source.lng }}
                  icon={{
                    url: "/blackPinIcon.png",
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  title={Source?.label || "Pickup"}
                />

                <OverlayView
                  position={{ lat: Source.lat, lng: Source.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <div>
                    <span className="inline-block bg-black text-white text-sm font-bold px-2 py-1 rounded shadow">
                      Pickup
                    </span>
                  </div>
                </OverlayView>
              </>
            )}

            {/* 🔲 Destination Marker & Label */}
            {Destination?.lat && (
              <>
                <MarkerF
                  position={{ lat: Destination.lat, lng: Destination.lng }}
                  icon={{
                    url: "/blackPinIcon.png",
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  title={Destination?.label || "Dropoff"}
                />
                <OverlayView
                  position={{ lat: Destination.lat, lng: Destination.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <div>
                    <span className="inline-block bg-black text-white text-sm font-bold px-2 py-1 rounded shadow">
                      Dropoff
                    </span>
                  </div>
                </OverlayView>
              </>
            )}

            {/* 🛣️ Route with thinner black line */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#000000",
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                  },
                  suppressMarkers: true,
                }}
              />
            )}
          </>
        )}
      </GoogleMap>

      {/* 📏 Distance & Duration */}
      {distance && duration && (
        <div className="text-sm bg-white p-3 rounded shadow max-w-sm border">
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Estimated Time:</strong> {duration}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapSection;
