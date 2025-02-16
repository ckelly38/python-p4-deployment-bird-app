import { useEffect, useState } from "react";
import NewBirdForm from "./NewBirdForm";
import BirdList from "./BirdList";
import Search from "./Search";

function BirdPage() {
  const [birds, setBirds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/birds")
      .then((r) => r.json())
      .then((birdsArray) => {
        //console.log("birdsArray = ", birdsArray);
        setBirds(birdsArray);
      });
  }, []);

  function handleAddBird(newBird) {
    const updatedBirdsArray = [...birds, newBird];
    setBirds(updatedBirdsArray);
  }
  //console.log("birds = ", birds);

  const displayedBirds = birds.filter((bird) => {
    return bird.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if(!birds) return <h1>...loading</h1>

  return (
    <main>
      <NewBirdForm onAddBird={handleAddBird} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <BirdList birds={displayedBirds} />
    </main>
  );
}

export default BirdPage;
