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
      if (element.name == "Rick Sanchez") {
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
        const charDesc = document.createElement("main");
        charDesc.innerHTML = `
       <div class="centered">
        <div class="card">
          <figure>
            <img src = "${element.image}" alt="image of the Character"/>
          </figure>

          <div class="content">
            <h1 class="charName">${element.name}</h1>
            <h2 class="numEp">${numOfEpisodes}</h2>
            <h3 class="role">${element.charRole}</h3>
          </div>
        </div>
      </div>
        `;

        char.appendChild(charDesc);
        console.log(charDesc);

        // console.log(
        //   element.name +
        //     " " +
        //     "has been in" +
        //     " " +
        //     numOfEpisodes +
        //     " " +
        //     "Episode(s) and is a" +
        //     " " +
        //     element.charRole
        // );
      }
    });
  } catch (Error) {
    console.error(`Could not get products: ${Error}`);
  }
}

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
