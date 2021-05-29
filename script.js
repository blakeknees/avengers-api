// NOTE: The Marvel API I used had a lot of missing information, especially with character descriptions. I did my best!

// NAMESPACE:
const avengersApp = {};


// marvel img size object:
const imageSizes = {
    standardSmall: "standard_small",
    standardMedium: "standard_medium",
    standardLarge: "standard_large",
    standardXlarge: "standard_xlarge",
    standardFantastic: "standard_fantastic",
    standardAmazing: "standard_amazing",
  };

// function to build thumbnail img
const buildImageURL = (url, size, path) => {
  return `${url}/${size}.${path}`;
};

// DELIVERING INFO TO CARD:
avengersApp.displayAvengers = (name, img, info) => {
    console.log('name', name)
    
    const htmlString = 
    `<div class="avengers-card-active">
      <h3 class="avenger-title">Name:</h3>
      <p class="name">${name}</p>
        <div class="image-container">
          <img class="avenger-image" src="${img}">
        </div>
      <h4>Info:</h4>
      <p class="info">${info}</p>     
    </div>`
    
    $(".avengers-container").html(htmlString)

   
};

// FLIP TRANSITION:
avengersApp.flipCard = () => {
  $(".flip-container .flipper").toggleClass("flipped");
};


// INNIT!!!!
avengersApp.init = () => {

    const buildUrl = (characterName) => {
        let url = `http://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=b4c2b02346b5895ca2d6abe8d203415a`;
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(
          ts + "ec74e168466fc856897459d40246f2f364d83846" + "b4c2b02346b5895ca2d6abe8d203415a"
        );
        return (url += "&ts=" + ts + "&hash=" + hash);
      };

    // grabs the LI tag and save it as a variable in namespace:  
    avengersApp.liCharacterTag = $("li"); 

    // EVENT LISTENER:
    avengersApp.liCharacterTag.on("click", (selectAvenger) => {
      const marvelURL = buildUrl(selectAvenger.target.innerText);
      console.log(marvelURL, "marvel URL");
      $.ajax({
        url: marvelURL,
      })
        .then((res) => {
          const dataObj = res.data.results[0];
          
          const avengerName = dataObj.name;
          const avengerBio = dataObj.description;
          const avengerImg = dataObj.thumbnail;
          
          const newImageUrl = buildImageURL(
            avengerImg.path,
            imageSizes.standardFantastic,
            avengerImg.extension
          );
          avengersApp.displayAvengers(avengerName, newImageUrl, avengerBio);

          avengersApp.flipCard();
        })
        .catch((err) => {
          console.log("err", err);
        });
    });

        
  
};

// DOCUMENT READY:
$(function() {
    avengersApp.init()
});

