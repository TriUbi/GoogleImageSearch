import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

// Nytt interface för IImageSearchData stämde inte överens med datan från api:et
export interface Fav {
  url: string;
  titel: string;
  byteSize: string;
}

export const Favourites = () => {
  const { user } = useAuth0();
  const [favourites, setFavourites] = useState<Fav[]>([]);
  const [showFavourites, setshowFavourites] = useState<boolean>(false);

  return (
    <>
      <button className="favourites-button"
        onClick={async () => {
          setshowFavourites(true);

          let response = await axios.get(
            `http://localhost:3000/favourites/${user?.sub}`
          );
          console.log(response);
          setFavourites(response.data);
        }}
      >
        See my favourites
      </button>

      {/* Map för att gå igenom alla favoriter och visa i ett img element.
          Visas bara om showFavourites är true */}
      {showFavourites && favourites.map((fav, i) => 
      <div key={i}>
      <p>{fav.titel}</p>
      <img src={fav.url} />
      </div>
      )}
    </>
  );
};