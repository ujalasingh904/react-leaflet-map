import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
    { position: [28.6139, 77.209], label: "New Delhi" },
    { position: [19.076, 72.8777], label: "Mumbai" },
    { position: [13.0827, 80.2707], label: "Chennai" },
    { position: [22.5726, 88.3639], label: "Kolkata" },
    { position: [12.9716, 77.5946], label: "Bangalore" },
];

const MapComponent = () => {
    const mapRef = useRef();

    const handleMarkerClick = (position) => {
        if (mapRef.current) {
            const map = mapRef.current;
            const currentZoom = map.getZoom();
            map.setView(position, currentZoom, { animate: true });
        }
    };

    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100vh", width: "100%" }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((markerData, index) => (
                <Marker
                    key={index}
                    position={markerData.position}
                    eventHandlers={{
                        click: () => {
                            handleMarkerClick(markerData.position);
                        },
                        mouseover: (e) => {
                            e.target.openPopup();
                        },
                        mouseout: (e) => {
                            e.target.openPopup();
                        },
                    }}
                >
                    <Popup>{markerData.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
