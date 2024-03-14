import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Favourites = () => {
    const {user} = useAuth0();
    return(
        <>
        <button onClick={async ()=> { 
          let response = await axios.get(`http://localhost:3000/favourites/${user?.sub}`);
          console.log(response);
           }}>
         See my favourites
         </button></>
    )
}