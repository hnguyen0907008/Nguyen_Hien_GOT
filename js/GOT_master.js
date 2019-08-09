(() => {
  console.log('fired!');

  const sigils = document.querySelectorAll('.sigilContainer'),
        lightBox = document.querySelector('.lightbox'),
        closeButton = document.querySelector('.close-lightbox'),
        houseVideo = document.querySelector('.house-video'),
        bannerImages = document.querySelector("#houseImages"),
        houseName = document.querySelector("#house-name"),
        houseInfo = document.querySelector(".house-info"),
        playButton = document.querySelector(".fa-play-circle"),
        pauseButton = document.querySelector(".fa-pause-circle"),
        rewindButton = document.querySelector(".fa-backward");

  //houseData[0],[1]
  const houseData = [
    ["stark", `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.
`],
    ['baratheon', `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.
`],
    ['lannister', `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],
    ['tully', `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],
    ['greyjoy', `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`],
    ['arryn', `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority. `]
  ];

  function playVideo(){
    houseVideo.play();
  }

  //pause the video on a click
  function pauseVideo(){
    houseVideo.pause();
  }

  function rewindVideo(){
    houseVideo.pause();
    houseVideo.currentTime = 0;
    houseVideo.load();
    houseVideo.play();
  }

  function popLightBox() {
    // make the lightbox show up
    lightBox.classList.add('show-lightbox');

    //grab a reference to the current video via the className object
    //get the className property, split it into its separate words (an array) and get the last word =>
    //[1] that will always be the house name
    let houseName = this.className.split(" ")[1];
    houseName = houseName.charAt(0).toUpperCase() + houseName.slice(1);
    //use JS string interpolation to build the path to the target video
    let videoPath = `video/House-${houseName}.mp4`;
    //load this new video path
    houseVideo.src = videoPath;
    houseVideo.load();

    houseVideo.play();
  }

  function closeLightBox(event) {
    event.preventDefault();

    // make the lightbox close
    lightBox.classList.remove('show-lightbox');
    houseVideo.currentTime = 0; // rewind the video
    houseVideo.pause();
  }

  function animateBanners() {
    let offset = 600,
        multiplier = this.dataset.offset;
        // this is the data-offset custom data attribute
        // on each of the sigils
    console.log((offset * multiplier) + "px");

    // move the banners to the left using the product of our math
    bannerImages.style.right = `${offset * multiplier + "px"}`;

    // `House ${houseData[multiplier]}`; => the more modern way
    houseName.textContent = "House " + houseData[multiplier][0];
    houseInfo.textContent = houseData[this.dataset.offset][1];
  }

  sigils.forEach(sigil => sigil.addEventListener("click", popLightBox));

  closeButton.addEventListener("click", closeLightBox);
  houseVideo.addEventListener('ended', closeLightBox);
  playButton.addEventListener("click", playVideo);
  pauseButton.addEventListener("click", pauseVideo);
  rewindButton.addEventListener("click", rewindVideo);
})();
