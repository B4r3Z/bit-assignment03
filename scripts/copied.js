fetchRAM();
async function fetchRAM() {
  try {
    const fetchRickAndMorty = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    if (!fetchRickAndMorty.ok) {
      throw new Error(`HTTP ERROR: ${fetchRickAndMorty.status}`);
    }
    const finalData = await fetchRickAndMorty.json();
    let filteredChar = finalData.results.filter((element) => {
      if (element.status == "Alive") {
        return element;
      }
    });
    console.log(filteredChar);

    finalData.results.forEach((element) => {
      element.episode.forEach((ep) => {
        let numOfEp = ep.slice(-2);
        if (numOfEp.includes("/")) {
          numOfEp = numOfEp.replace("/", "");
        }
      });
      let numOfEpisodes = element.episode.length;
      element.charRole = "";
      if (numOfEpisodes > 25) {
        element.charRole = "Main Character";
      } else {
        element.charRole = "Side Character";
      }
      const char = document.getElementById("castRAM");
      const charDesc = document.createElement("div");

      charDesc.innerHTML = renderCharacterCard(element, numOfEpisodes);

      char.appendChild(charDesc);
      console.log(charDesc);
    });
  } catch (Error) {
    console.error(`Could not get products: ${Error}`);
  }
}

function renderCharacterCard(element, numOfEpisodes) {
  const getOverlayClass = () => {
    if (element.status == "Dead") {
      return "overlay-dead";
    } else if (element.status == "unknown") {
      return "overlay-unknown";
    } else {
      return "";
    }
  };

  const getOverlayImage = () => {
    if (element.status == "Dead") {
      return '<img src="assets/skull.png" height="128px" width="128px" alt="Image of a Skull implying that this character is Dead" /> ';
    } else if (element.status == "unknown") {
      return '<img src="assets/question-mark.png" height="128px" width="128px" alt="Image of a Skull implying that this character is Dead" /> ';
    } else {
      return "";
    }
  };

  // let overlayClass2 = "";
  // if (element.status !== "Alive") {
  //   overlayClass2 = element.status == "Dead" ? "overlay-dead" : "overlay-missing";
  // }
  return `
       <div class="centered">
        <div class="card">
          <figure>
            <img src = "${element.image}" alt="image of the Character"/>
            <div class="overlay ${getOverlayClass()}">
            ${getOverlayImage()}
            </div>
          </figure>

          <div class="content">
            <h1 class="charName">${element.name}</h1>
            <div class="miniTexts">
            <h2 class="numEp"> ${numOfEpisodes} &nbsp; ${
    numOfEpisodes > 1 ? "Episodes" : "Episode"
  }</h2>
            <h2 class="role">${element.charRole}</h2>
            <h2 class="status">${element.status}</h2>
             </div>
          </div>
        </div>
      </div>
        `;
}

const searchInputEl = document.getElementById("search-input");
searchInputEl.addEventListener("change", function name(event) {});

// const fetchRickAndMorty = fetch("https://rickandmortyapi.com/api/character");

// fetchRickAndMorty.then((returned) => {
//   const jsonReturned = returned.json();
//   jsonReturned.then((finalData) => {
//     finalData.results.forEach((element) => {
//       if (element.name == "Morty Smith") {
//         element.episode.forEach((ep) => {
//           let numOfEp = ep.slice(-2);
//           if (numOfEp.includes("/")) {
//             numOfEp = numOfEp.replace("/", "");
//           }
//           console.log(numOfEp);
//         });
//         let numOfEpisodes = element.episode.length;
//         if (numOfEpisodes > 30) {
//           console.log(
//             element.name +
//               " " +
//               "has been in" +
//               " " +
//               numOfEpisodes +
//               " " +
//               "Episode(s) and Is a Main Character"
//           );
//         } else {
//           console.log(
//             element.name +
//               " " +
//               "has been in" +
//               " " +
//               numOfEpisodes +
//               " " +
//               "Episode(s) and Is a Side Character"
//           );
//         }
//       }
//     });
//   });
// });
