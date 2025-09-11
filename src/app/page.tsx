// This is your main homepage content for the root route ("/").

import BackToSeaButton from "rt/components/BackToSeaButton";
import MyBoat from "rt/components/MyBoat";
import NavTabs from "rt/components/NavTabs";
import WaveBackground from "rt/components/WaveBackground";
import WeatherInfo from "rt/components/WeatherInfo";
import BoatStateURLManager from "rt/managers/BoatURLManager";
import WeatherURLManager from "rt/managers/WeatherURLManager";

/**
 * HomePage component serves as the main entry point for the root route.
 * It's a Server Component that receives URL search parameters from Next.js.
 * It's responsible for orchestrating the main interactive elements of the page.
 *
 * @param {object} props - The component props.
 * @param {object} props.searchParams - An object containing the URL search parameters.
 * These are automatically provided by Next.js for Page Components.
 * @returns {JSX.Element} The JSX for the main page content.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <>
      {/*
        WeatherURLManager is a Client Component that controls the 'weather'
        search parameter in the URL over time. It doesn't render any visible UI.
        It needs to be a Client Component because it uses client-side hooks like useRouter and useEffect.
      */}
      <WeatherURLManager />
      <BoatStateURLManager />
      <WeatherInfo searchParams={await searchParams} />
      <NavTabs />
      <BackToSeaButton searchParams={await searchParams} />
      {/*
        WaveBackground is configured as a Server Component.
        It receives "searchParams" as a prop from this Server Component (HomePage)
        to determine the wave's appearance based on the URL's 'weather' parameter.
        The actual "Wave" rendering from 'react-wavify' occurs client-side.
      */}
      <WaveBackground searchParams={await searchParams} />

      {/*
        MyBoat is a Client Component that renders and animates the boat.
        It also receives "searchParams" as a prop to determine its animation
        based on the URL's 'weather' parameter.
      */}
      <MyBoat searchParams={await searchParams} />
    </>
  );
}
