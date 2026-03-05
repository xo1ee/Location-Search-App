type Props = {
  placeId: string;
};

export default function MapResult({ placeId }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const link =
    "https://www.google.com/maps/embed/v1/place?key=" +
    apiKey +
    "&q=place_id:" +
    placeId;
  return (
    <div>
      <iframe width="600" height="450" loading="lazy" src={link}></iframe>
    </div>
  );
}
