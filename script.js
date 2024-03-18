//Carousel
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
} 

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//parte de entrar e sair do pop out e adicionar as informações de cada peixe
const dialog = document.getElementById('dialog');

document.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

const openDialog = (fishId) => {
  const dialog = document.getElementById(`dialog${fishId}`);
  const dialogDescription = document.getElementById(`dialog-description${fishId}`);
  
  // Obtenha os detalhes do peixe com base no ID
  const fishDetails = getFishDetailsById(fishId);

  // Atualize o conteúdo do diálogo com os detalhes do peixe
  dialogDescription.innerHTML = `
    <h2>${fishDetails.name}</h2>
    <p><strong class="nome">Nome Científico:</strong> ${fishDetails.scientificName}</p>
    <p><strong class="nome">Habitat:</strong> ${fishDetails.habitat}</p>
    <p><strong class="nome">Origem:</strong> ${fishDetails.origin}</p>
    <p><strong class="nome">Alimentação:</strong> ${fishDetails.feeding}</p>
    <p><strong class="nome">Tamanho Máximo:</strong> ${fishDetails.size}</p>
    <p><strong class="nome">Família:</strong> ${fishDetails.family}</p>
  `;

  dialog.showModal();
};

function getFishDetailsById(fishId) {
  // Substitua isso pela lógica real para obter os detalhes do peixe com base no ID
  // Aqui você pode usar um objeto, uma API, ou de onde quer que venham os detalhes.
  // Certifique-se de retornar detalhes válidos com base no ID do peixe.
  switch (fishId) {
    case '1':
      return {
        name: 'Barbo-comum',
        scientificName: '<strong>Luciobarbus bocagei</strong>',
        habitat: 'Prefere zonas de temperatura moderada e com pouca corrente',
        origin: 'Endemismo ibérico',
        feeding: 'Alimenta-se de invertebrados bentónicos, material vegetal e detritos',
        size: '100 cm',
        family: 'Cyprinidae',
        // Adicione outros detalhes conforme necessário
      };
    case '2':
      return {
        name: 'Boga-do-norte',
        scientificName: '<strong>Pseudochondrostoma Duriense</strong>',
        habitat: 'Troço médio dos rios com corrente forte, albufeiras e zonas de corrente fraca no caso dos juvenis',
        origin: 'Endemismo Ibérico',
        feeding: 'Material vegetal, pequenos invertebrados e detritos',
        size: '45 cm',
        family: 'Cyprinidae'
        // Adicione outros detalhes conforme necessário
      };
    case '3':
      return {
        name: 'Escalo-do-norte',
        scientificName: '<strong>Squalius Carolitertii</strong>',
        habitat: 'Troços superiores e médios dos rios',
        origin: 'Endemismo Ibérico',
        feeding: 'Alimenta-se de macroinvertebrados bentónicos e detritos vegetais',
        size: '25 cm',
        family: 'Leuciscidae'
      };
    case '4':
      return {
        name: 'Esgana-gata',
        scientificName: '<strong>Gasterosteus Aculeatus</strong>',
        habitat: 'Pode ocorrer em albufeiras',
        origin: 'Not founded',
        feeding: 'Alimenta-se de pequenos invertebrados aquáticos, especialmente insetos e crustáceos',
        size: '7 cm',
        family: 'Gasterosteidae'
      };
      case '5':
        return {
          name: 'Lampreia',
          scientificName: '<strong>Petromyzon marinus</strong>',
          habitat: 'Reproduz-se nos rios e cresce no mar',
          origin: 'Nativo',
          feeding: 'Alimentam-se do sangue, fluídos e músculo do hospedeiro',
          size: '150 cm',
          family: 'Petromyzontidae'
        };
        case '6':
          return {
            name: 'Tainha',
            scientificName: '<strong>Chelon ramada</strong>',
            habitat: 'Zonas costeiras, estuarinas e de água doce',
            origin: 'Atlântico Este, Mar Mediterrâneo e parte do Mar Negro',
            feeding: 'Alimenta-se de pequenos invertebrados e algas',
            size: '70 cm',
            family: 'Mugilidae'
          };
          case '7':
            return {
              name: 'Peixe-rei',
              scientificName: '<strong>Atherina boyeri</strong>',
              habitat: 'Águas salobras ou marinhas, mas pode ocorrer em água doce',
              origin: 'Not founded',
              feeding: 'Alimenta-se de pequenos curstáceos, analídeos, moluscos e larvas de peixe',
              size: '15 cm',
              family: 'Atherinidae'
            };
            case '8':
              return {
                name: 'Ruivaco',
                scientificName: '<strong>Achondrostoma oligolepis</strong>',
                habitat: 'Troço inferior do rio, corrente fraca a moderada, fundo arenoso e vegetação aquática abundante',
                origin: 'Endemismo lusitânico',
                feeding: 'Alimenta-se de pequenos invertebrados e outros itens alimentares',
                size: '18 cm',
                family: 'Leuciscidae'
              };
              case '9':
                return {
                  name: 'Truta-de-rio',
                  scientificName: '<strong>Salmo trutta</strong>',
                  habitat: 'Rios de águas frias e bem oxigenadas com corrente moderada a forte, o ecótipo migrador também ocorre nas zonas estuarinas e costeiras',
                  origin: 'Espécie nativa que ocorre em bacias hidrográficas Euroasiáticas',
                  feeding: 'Juvenil - insetos aquáticos e terrestres<br>Adulto - moluscos, crustáceos e pequenos peixes',
                  size: '100 cm',
                  family: 'Salmonidae'
                };
                case '10':
                  return {
                    name: 'Verdemã-comum',
                    scientificName: '<strong>Cobitis paludica</strong>',
                    habitat: 'Lótico. Espécie bentónica',
                    origin: 'Endemismo Ibérico, espécie autóctone',
                    feeding: 'Alimenta-se de larvas de insetos, invertebrados, algas e detritos',
                    size: '15 cm(F)    7 cm(M)',
                    family: 'Cobitidae'
                  };
    default:
      return {
        name: `Nome do Peixe ${fishId.substring(4)}`,
        scientificName: 'Nome Científico não disponível',
        habitat: 'Habitat não disponível',
        origin: 'Origem não disponível',
        feeding: 'Alimentação não disponível',
        size: 'Tamanho não disponível',
        family: 'Família não disponível',
        // Adicione outros detalhes conforme necessário
      };
  }
}

const closeDialog = (dialogId) => {
  const dialog = document.getElementById(dialogId);
  dialog.close();
};

document.addEventListener('click', (event) => {
  const dialog1 = document.getElementById('dialog1');
  const dialog2 = document.getElementById('dialog2');
  const dialog3 = document.getElementById('dialog3');
  const dialog4 = document.getElementById('dialog4');
  const dialog5 = document.getElementById('dialog5');
  const dialog6 = document.getElementById('dialog6');
  const dialog7 = document.getElementById('dialog7');
  const dialog8 = document.getElementById('dialog8');
  const dialog9 = document.getElementById('dialog9');
  const dialog10 = document.getElementById('dialog10');

  if (event.target === dialog1) {
    closeDialog('dialog1');
  } else if (event.target === dialog2) {
    closeDialog('dialog2');
  } else if (event.target === dialog3) {
    closeDialog('dialog3');
  } else if (event.target === dialog4) {
    closeDialog('dialog4');
  } else if (event.target === dialog5) {
    closeDialog('dialog5');
  } else if (event.target === dialog6) {
    closeDialog('dialog6');
  } else if (event.target === dialog7) {
    closeDialog('dialog7');
  } else if (event.target === dialog8) {
    closeDialog('dialog8');
  } else if (event.target === dialog9) {
    closeDialog('dialog9');
  } else if (event.target === dialog10){
    closeDialog('dialog10');
  }
});

//bolhas teste  
function removeBubblesFromPopOutBackground() {
  const popOutBackground = document.getElementById('popOutBackground');
  popOutBackground.innerHTML = ''; // Remove todas as bolhas
}

// Chame addBubblesToPopOutBackground() quando o pop-out é aberto
// Chame removeBubblesFromPopOutBackground() quando o pop-out é fechado

function showBubbles() {
  var bolhas = document.querySelector('.bolhas');
  bolhas.style.display = 'block'; // Exibir as bolhas ao clicar na imagem do peixe
}


//Tradução Teste
// Objeto contendo as traduções dos nomes dos peixes
const translations = {
  'Barbo-comum': {
    name: 'Common Barbel',
    scientificName: '<strong>Luciobarbus bocagei</strong>',
    habitat: 'Prefers moderate temperature zones with little current',
    origin: 'Iberian endemism',
    feeding: 'Feeds on benthic invertebrates, plant material, and detritus',
    size: '100 cm',
    family: 'Cyprinidae'
  },
  'Boga-do-norte': {
    name: 'Northern Boga',
    scientificName: '<strong>Pseudochondrostoma Duriense</strong>',
    habitat: 'Prefers moderate temperature zones with little current',
    origin: 'Iberian endemism',
    feeding: 'Feeds on benthic invertebrates, plant material, and detritus',
    size: '100 cm',
    family: 'Cyprinidae'
  },
  'Esgana-gata': {
    name: 'Stickleback',
    scientificName: '<strong>Gasterosteus Aculeatus</strong>',
    habitat: 'Can occur in reservoirs',
    origin: 'Abundant in the North and Center, not sure if I can put it that way',
    feeding: 'Feeds on small aquatic invertebrates, especially insects and crustaceans, and detritus',
    size: '7 cm',
    family: 'Gasterosteidae'
  },
  'Lampreia': {
    name: 'Sea Lamprey',
    scientificName: '<strong>Petromyzon marinus</strong>',
    habitat: 'Reproduces in rivers and grows in the sea',
    origin: 'Native',
    feeding: 'Feeds on the blood, fluids, and muscles of the host',
    size: '150 cm',
    family: 'Petromyzontidae'
  },
  'Tainha': {
    name: 'Mullet',
    scientificName: '<strong>Chelon ramada</strong>',
    habitat: 'Coastal, estuarine, and freshwater zones',
    origin: 'Eastern Atlantic, Mediterranean Sea, and part of the Black Sea',
    feeding: 'Feeds on small invertebrates and algae',
    size: '75 cm',
    family: 'Mugilidae'
  },
  'Peixe-rei': {
    name: 'Kingfish',
    scientificName: '<strong>Atherina boyeri</strong>',
    habitat: 'Brackish or marine waters, but can occur in freshwater',
    origin: 'Not Founded',
    feeding: 'Feeds on small crustaceans, annelids, mollusks, and fish larvae',
    size: '15 cm',
    family: 'Atherinidae'
  },
  'Ruivaco': {
    name: 'Portuguese Chub',
    scientificName: '<strong>Achondrostoma oligolepis</strong>',
    habitat: 'Lower river stretches, slow to moderate flow, sandy bottom, and abundant aquatic vegetation',
    origin: 'Lusitanian endemism',
    feeding: 'Feeds on small invertebrates and other food items',
    size: '18 cm',
    family: 'Leuciscidae'
  },
  'Truta-de-rio': {
    name: 'Brown Trout',
    scientificName: '<strong>Salmo trutta</strong>',
    habitat: 'Cold, well-oxygenated river waters with moderate to strong currents; the migratory ecotype also occurs in estuarine and coastal areas',
    origin: 'Native species occurring in Eurasian river basins',
    feeding: 'Juvenile - aquatic and terrestrial insects; Adult - mollusks, crustaceans, and small fish',
    size: '100 cm',
    family: 'Salmonidae'
  },
  'Verdemã-comum': {
    name: 'Spined Loach',
    scientificName: '<strong>Cobitis paludica</strong>',
    habitat: 'Lotic. Benthic species',
    origin: 'Iberian endemism, native species',
    feeding: 'Feeds on insect larvae, invertebrates, algae, and detritus',
    size: '15 cm (F); 7 cm (M)',
    family: 'Cobitidae'
  }
};

// Função para alternar entre os idiomas
const toggleLanguage = (language) => {
  const fishContainers = document.querySelectorAll('.fish-container');

  fishContainers.forEach(container => {
    const fishNameOverlay = container.querySelector('.fish-name-overlay, .aaa, .bbb, .ccc, .ddd, .eee, .fff, .ggg, .hhh'); // Ajuste do seletor
    const fishImg = container.querySelector('img');
    const fishId = fishImg.id.substring(4);
    const dialogDescription = document.getElementById(`dialog-description${fishId}`);

    // Agora, vamos obter o nome do peixe a partir do elemento correto com base na classe específica
    let fishName;
    if (fishNameOverlay.classList.contains('fish-name-overlay')) {
      fishName = fishNameOverlay.textContent.trim();
    } else {
      fishName = fishNameOverlay.textContent.trim(); // Se a classe for diferente de 'fish-name-overlay', vamos usar o texto diretamente
    }

    if (language === 'en') {
      // Se o nome do peixe existir nas traduções, atualize-o
      if (translations[fishName]) {
        fishNameOverlay.innerHTML = `<strong>${translations[fishName].name}</strong>`;
        // Atualize também as informações no pop-out
        dialogDescription.innerHTML = `
          <h2>${translations[fishName].name}</h2>
          <p><strong class="nome">Scientific Name:</strong> ${translations[fishName].scientificName}</p>
          <p><strong class="nome">Habitat:</strong> ${translations[fishName].habitat}</p>
          <p><strong class="nome">Origin:</strong> ${translations[fishName].origin}</p>
          <p><strong class="nome">Feeding:</strong> ${translations[fishName].feeding}</p>
          <p><strong class="nome">Maximum Size:</strong> ${translations[fishName].size}</p>
          <p><strong class="nome">Family:</strong> ${translations[fishName].family}</p>
        `;
      }
    } else {
      // Se o idioma for "pt", restaure o nome original do peixe e suas informações
      const originalName = getFishDetailsById(fishId).name;
      fishNameOverlay.innerHTML = `<strong>${originalName}</strong>`;
      dialogDescription.innerHTML = `
        <h2>${originalName}</h2>
        <p><strong class="nome">Nome Científico:</strong> ${getFishDetailsById(fishId).scientificName}</p>
        <p><strong class="nome">Habitat:</strong> ${getFishDetailsById(fishId).habitat}</p>
        <p><strong class="nome">Origem:</strong> ${getFishDetailsById(fishId).origin}</p>
        <p><strong class="nome">Alimentação:</strong> ${getFishDetailsById(fishId).feeding}</p>
        <p><strong class="nome">Tamanho Máximo:</strong> ${getFishDetailsById(fishId).size}</p>
        <p><strong class="nome">Família:</strong> ${getFishDetailsById(fishId).family}</p>
      `;
    }
  });
};

function togglePopOutLanguage(language) {
  const dialogDescriptions = document.querySelectorAll('.dialog');

  dialogDescriptions.forEach(dialog => {
    const languageElements = dialog.querySelectorAll('.conteudo1'); // Seleciona os elementos de conteúdo que você deseja traduzir

    languageElements.forEach(element => {
      if (language === 'en') {
        // Se o idioma for inglês, traduza o conteúdo
        const originalContent = element.textContent.trim();
        const translatedContent = translations[originalContent];
        if (translatedContent) {
          // Substitua o conteúdo original pelo conteúdo traduzido
          element.textContent = `
            Scientific Name: ${translatedContent.scientificName}
            Habitat: ${translatedContent.habitat}
            Origin: ${translatedContent.origin}
            Feeding: ${translatedContent.feeding}
            Maximum Size: ${translatedContent.size}
            Family: ${translatedContent.family}
          `;
        }
      } else {
        // Se o idioma for português, restaure o conteúdo original
        const fishId = dialog.id.substring(6); // Extrai o ID do diálogo para obter o conteúdo original do peixe
        const originalContent = getFishDetailsById(fishId)[element.dataset.category]; // Usa a função getFishDetailsById para obter o conteúdo original do peixe
        if (originalContent) {
          // Substitua o conteúdo traduzido pelo conteúdo original
          element.textContent = originalContent;
        }
      }
    });
  });
}

document.getElementById('pt-button').addEventListener('click', () => {
  toggleLanguage('pt');
  togglePopOutLanguage('pt');
});

document.getElementById('en-button').addEventListener('click', () => {
  toggleLanguage('en');
  togglePopOutLanguage('en');
});