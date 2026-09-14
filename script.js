const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const langToggle = document.querySelector("#langToggle");
const langIcon = document.querySelector("#langIcon");
const welcomeText = document.querySelector("#welcomeText");
const weatherSelect = document.querySelector("#weatherSelect");
const weatherSelected = document.querySelector("#weatherSelected");
const weatherMenu = document.querySelector("#weatherMenu");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherTemp = document.querySelector("#weatherTemp");
const weatherRange = document.querySelector("#weatherRange");
const weatherStatus = document.querySelector("#weatherStatus");
const weatherDays = document.querySelector("#weatherDays");
const wishOpen = document.querySelector("#wishOpen");
const wishModal = document.querySelector("#wishModal");
const wishClose = document.querySelector("#wishClose");
const wishForm = document.querySelector("#wishForm");
const wishThanks = document.querySelector("#wishThanks");
const departureChecklistOpen = document.querySelector("#departureChecklistOpen");
const departureModal = document.querySelector("#departureModal");
const departureChecklistClose = document.querySelector("#departureChecklistClose");
const equipmentModal = document.querySelector("#equipmentModal");
const equipmentClose = document.querySelector("#equipmentClose");
const equipmentModalIcon = document.querySelector("#equipmentModalIcon");
const equipmentModalTitle = document.querySelector("#equipmentModalTitle");
const equipmentModalText = document.querySelector("#equipmentModalText");
const equipmentVideoBox = document.querySelector("#equipmentVideoBox");
const equipmentVideoFrame = document.querySelector("#equipmentVideoFrame");
const equipmentVideoPlayer = document.querySelector("#equipmentVideoPlayer");
const equipmentPdfLink = document.querySelector("#equipmentPdfLink");
const equipmentAppLink = document.querySelector("#equipmentAppLink");
const equipmentAppLogo = document.querySelector("#equipmentAppLogo");
const equipmentGrid = document.querySelector(".equipment-grid");
const equipmentPrev = document.querySelector("#equipmentPrev");
const equipmentNext = document.querySelector("#equipmentNext");
const stayGallery = document.querySelector(".stay-gallery");
const stayFrames = [...document.querySelectorAll(".stay-frame")];
const stayStepNumbers = [...document.querySelectorAll(".stay-step-number")];
const stayPages = [...document.querySelectorAll(".stay-page")];
const stayScrollableCards = [...document.querySelectorAll("[data-stay-scroll]")];
const stayHouseTrack = document.querySelector(".stay-house-track");
const stayJourney = document.querySelector(".stay-journey");
const stayJourneySteps = [...document.querySelectorAll(".stay-journey-step")];
const stayJourneyPages = [...document.querySelectorAll(".stay-journey-page")].sort((a, b) => Number(a.dataset.stayPageStep || 0) - Number(b.dataset.stayPageStep || 0));
const stayAroundExplorer = document.querySelector("#stayAroundExplorer");
const stayAroundMap = document.querySelector("#stayAroundMap");
const stayAroundList = document.querySelector("#stayAroundList");
const stayAroundModeButtons = [...document.querySelectorAll("[data-around-mode]")];
const stayAroundFilterButtons = [...document.querySelectorAll("[data-around-filter]")];
if (stayJourney && stayJourneyPages.length) {
  stayJourneyPages.forEach((page) => stayJourney.appendChild(page));
}
const frameScroll = document.querySelector(".frame-scroll");
const sideNav = document.querySelector("#sideNav");
const bottomNav = document.querySelector(".bottom-nav");
const eventsNearbySection = document.querySelector("#discover-events");
const eventsNearbyList = document.querySelector("#eventsNearbyList");
const eventsNearbyStatus = document.querySelector("#eventsNearbyStatus");
const eventsSpotlight = document.querySelector("#eventsSpotlight");
const eventsSpotlightMeta = document.querySelector("#eventsSpotlightMeta");
const eventsSpotlightTitle = document.querySelector("#eventsSpotlightTitle");
const eventsHeroMeta = document.querySelector("#eventsHeroMeta");
const eventsHeroTitle = document.querySelector("#eventsHeroTitle");
const eventsHeroCta = document.querySelector("#eventsHeroCta");
const eventsHeroImageCurrent = document.querySelector("#eventsHeroImageCurrent");
const eventsHeroImageNext = document.querySelector("#eventsHeroImageNext");
const eventsLocationSelect = document.querySelector("#eventsLocationSelect");
const eventsLocationMenu = document.querySelector("#eventsLocationMenu");
const eventsSelectedLocation = document.querySelector("#eventsSelectedLocation");
const discoverPanel = document.querySelector('.page-content[data-page="discover"]');
const cityGuideSection = document.querySelector("#discover-city-guide");
const cityGuideKicker = document.querySelector("#cityGuideKicker");
const cityGuideTitle = document.querySelector("#cityGuideTitle");
const cityGuideTags = document.querySelector("#cityGuideTags");
const cityGuideBadges = document.querySelector("#cityGuideBadges");
const cityGuideMustSee = document.querySelector("#cityGuideMustSee");
const cityGuideFood = document.querySelector("#cityGuideFood");
const cityGuideCombo = document.querySelector("#cityGuideCombo");
const discoverBlankSection = document.querySelector("#discover-blank");
const discoverHeroImage = document.querySelector("#discoverHeroImage");
const discoverFocusLine = document.querySelector("#discoverFocusLine");
const discoverFocusTitle = document.querySelector("#discoverFocusTitle");
const discoverFocusSubtitle = document.querySelector("#discoverFocusSubtitle");
const discoverFocusNote = document.querySelector("#discoverFocusNote");
const discoverFocusTags = document.querySelector("#discoverFocusTags");
const discoverBlankMustSee = document.querySelector("#discoverBlankMustSee");
const discoverBlankFood = document.querySelector("#discoverBlankFood");
const discoverBlankCombo = document.querySelector("#discoverBlankCombo");
const routesOutdoorsGrid = document.querySelector("#routesOutdoorsGrid");

const wishRecipientEmail = "";
const discoverRefreshHours = [7, 12, 17];

const storageKeys = {
  theme: "airbnbWelcome.theme",
  lang: "airbnbWelcome.lang",
  location: "airbnbWelcome.weatherLocation",
  weatherCache: "airbnbWelcome.weatherCache"
};

const copy = {
  fr: {
    lang: "fr",
    label: "Passer en anglais",
    welcome: "Bienvenue dans\nnotre nid",
    icon: "EN",
    loading: "Meteo en direct...",
    fallback: "Meteo temporairement indisponible",
    rangeHigh: "Haut",
    rangeLow: "Bas",
    houseAction: "Profiter de la maison",
    discoverAction: "Découvrir le quartier",
    stayAction: "Tout savoir sur mon séjour",
    navWelcome: "Bienvenue",
    navHome: "Le logement",
    navStay: "Votre séjour",
    navDiscover: "À découvrir",
    navHelp: "Besoin d'aide ?",
    helpTitle: "Besoin d'aide ?",
    helpLead: "Tout ce dont vous avez besoin, au meme endroit.",
    helpHandNote: "Vous etes entre de bonnes mains",
    helpHandSubnote: "Profitez de votre sejour en bonne compagnie",
    helpEmergencyEurope: "Urgence (Europe)",
    helpPolice: "Police",
    helpFire: "Pompiers",
    helpMedical: "Medical",
    helpAllEmergencies: "Toutes urgences",
    helpMedicalEmergency: "Urgence medicale",
    helpMedicalNote: "(Blessure ou maladie grave)",
    helpFireBrigade: "Pompiers",
    helpFireNote: "Feu, fumee, secours",
    helpPoliceTitle: "Police",
    helpPoliceNote: "Vol, violence, probleme de securite",
    helpSmsTitle: "SMS d'urgence",
    helpSmsNote: "Pour les personnes sourdes ou malentendantes",
    helpQuickTitle: "Probleme courant ? Aide rapide ici.",
    helpElectricityTitle: "Plus d'electricite ?",
    helpElectricityText: "Verifiez le tableau electrique",
    helpWaterTitle: "Fuite d'eau ?",
    helpWaterText: "Fermez l'arrivee d'eau principale",
    helpKeyTitle: "Probleme de cle ?",
    helpKeyText: "Contactez l'hote",
    helpGasTitle: "Feu ou odeur de gaz ?",
    helpGasText: "Sortez et appelez le 112",
    helpContactHost: "Contacter l'hote",
    helpContactHostText: "Nous sommes la pour aider",
    helpCallHost: "Appeler l'hote",
    helpMessageHost: "Ou envoyer un message",
    helpAddressTitle: "Notre adresse",
    helpOpenMaps: "Ouvrir dans Maps",
    helpFirstAidTitle: "Trousse de secours",
    helpFirstAidText: "Dans le placard haut droit de la cuisine",
    eventsKicker: "À découvrir",
    eventsTitle: "Que se passe-t-il autour ?",
    eventsIntro: "Les prochains grands rendez-vous autour de Lille et en Belgique, mis à jour à 07h, 12h et 17h.",
    eventsLoading: "Recherche des prochains événements...",
    eventsUnavailable: "Les événements seront affichés ici dès qu'une donnée valide sera disponible.",
    eventsUpdated: "Mis à jour sur le créneau 07h / 12h / 17h.",
    eventsCached: "Dernière sélection disponible, en attendant le prochain rafraîchissement.",
    eventsDiscover: "Voir l'événement →",
    eventsLocationLabel: "Ville",
    eventsSearch: "Rechercher",
    eventsLocationTitle: "Lille ou Belgique ? Pourquoi choisir ?",
    eventsLocationText: "Lille et la Belgique sont facilement accessibles.",
    sideDiscoverEvents: "Événements autour",
    sideDiscoverCityGuide: "Guide ville",
    sideDiscoverBlank: "Page blanche",
    sideDiscoverRoutes: "Routes & plein air",
    discoverBestFor: "Idéal pour",
    discoverSimpleKicker: "À découvrir",
    discoverSimpleNote: "L'histoire rencontre l'art de vivre",
    discoverSimpleMustSee: "À voir",
    discoverSimpleEatDrink: "Manger & boire",
    discoverSimpleCombo: "Combo parfait",
    discoverSimpleFooter: "Une escapade vivante, idéale pour une journée.",
    discoverRoutesKicker: "Balades à proximité",
    discoverRoutesTitle: "Routes & plein air",
    discoverRoutesLead: "Marcher. Rouler. Explorer.",
    discoverRoutesNote: "De beaux itinéraires, juste à côté.",
    discoverRoutesWalk: "Marche",
    discoverRoutesBike: "Vélo",
    discoverRoutesHike: "Randonnée",
    discoverRoutesBarbieuxText: "Une balade paisible entre jardins, lacs et arbres remarquables.",
    discoverRoutesCanalText: "Une sortie agréable le long du canal, entre nature et patrimoine.",
    discoverRoutesMarqueText: "Un chemin nature entre zones humides et paysages verts.",
    discoverRoutesDistance: "Distance",
    discoverRoutesTime: "Durée",
    discoverRoutesLevel: "Niveau",
    discoverRoutesFormat: "Format",
    discoverRoutesBestFor: "Idéal pour",
    discoverRoutesEasy: "Facile",
    discoverRoutesModerate: "Modéré",
    discoverRoutesLoop: "Boucle",
    discoverRoutesOneWay: "Aller simple",
    discoverRoutesCta: "Voir l'itinéraire →",
    discoverCard2Title: "3 lieux à voir",
    discoverCard2Kicker: "De l'histoire à chaque coin",
    discoverCard2Place1Title: "Grand'Place & Vieille Bourse",
    discoverCard2Place1Text: "Le cœur de Lille : architecture flamande, cafés et l'un des bâtiments les plus iconiques de la ville.",
    discoverCard2Place1Note: "Commencer ici",
    discoverCard2Place2Title: "Palais des Beaux-Arts",
    discoverCard2Place2Text: "L'un des grands musées des beaux-arts en France, directement sur la Place de la République.",
    discoverCard2Place2Note: "Pause musée",
    discoverCard2Place3Title: "Vieux-Lille & Hospice Comtesse",
    discoverCard2Place3Text: "Rues pavées, façades colorées, boutiques et plusieurs siècles d'histoire locale.",
    discoverCard2Place3Note: "Balade photo",
    qrKicker: "Tu veux l'avoir dehors ?",
    qrTitle: "Scanne le QR Code",
    wishTitleInline: "Un vœu pour la prochaine fois ?",
    wishSubtitle: "Si tu reviens ici, qu'est-ce que tu aimerais avoir en plus ou en moins ?",
    wishButton: "Faire un vœu",
    reviewFinalTitle: "Loved your stay ?",
    reviewFinalSubtitle: "Your review helps us keep improving and inspires future travellers.",
    reviewFinalButton: "Leave a review",
    reviewFinalReasonGuests: "Helps\nfuture guests",
    reviewFinalReasonMeans: "Means\na lot to us",
    reviewFinalReasonVibes: "Keeps\nthe good vibes",
    modalTitle: "Faire un vœu",
    firstName: "Prénom",
    lastName: "Nom",
    yourWish: "Ton souhait",
    sendWish: "Envoyer",
    close: "Fermer",
    thanks: "Merci, on va étudier ça ;)",
    mailSubject: "Souhait pour le prochain séjour",
    mailFirstName: "Prénom",
    mailLastName: "Nom",
    mailWish: "Souhait",
    homeEyebrow: "Steven & Nisha",
    homeHello: "Bonjour,",
    homeHosts: "C'est Steven et Nisha",
    homeLeadStrong: "On a",
    homeLeadText: " pensé ce logement pour que vous puissiez profiter d'un séjour simple, confortable et agréable.",
    homeBody: "On espère que vous vous y sentirez bien et que vous apprécierez aussi découvrir cet endroit et ses alentours.",
    homeEnjoy: "Profitez bien, et n'hésitez pas à nous contacter si besoin !",
    homeScrollNote: "Faites défiler pour découvrir davantage la maison.",
    homeModelTitle: "Explorer en 3D",
    homeModelText: "222 rue Delespaul - 59100 - Roubaix",
    surfaceTotal: "Surface totale",
    surfaceLiving: "séjour-cuisine",
    surfaceBath: "salle de bain",
    surfaceBedroom: "chambre",
    rulesTitleStrong: "Quelques règles",
    rulesTitleMuted: "pour votre séjour",
    rulesIntro: "Merci de respecter ces quelques repères pour garder le logement simple, calme et agréable.",
    ruleNoSmoking: "Ne pas fumer",
    ruleNoPets: "On n'est pas encore prêt pour les animaux",
    ruleNoParty: "Pas de fête",
    ruleDamage: "Signaler tout dommage",
    wifiTitle: "Wifi",
    wifiNetwork: "Réseau",
    wifiPassword: "Mot de passe",
    equipmentKicker: "Pour votre confort",
    equipmentTitleStrong: "Les équipements",
    equipmentTitleMuted: "du logement",
    equipmentSubtitle: "Repérez l'essentiel en un coup d'oeil, puis touchez une carte pour ouvrir les détails utiles.",
    equipmentIntro: "Les équipements à votre disposition pour votre confort.",
    equipmentCoffee: "Machine à café",
    equipmentToaster: "Grille-pain",
    equipmentOven: "Four",
    equipmentMicrowave: "Micro-ondes",
    equipmentKeypad: "Digicode",
    equipmentWasher: "Lave-linge",
    equipmentRobotVacuum: "Aspirateur robot",
    equipmentSofa: "Canapé-lit",
    equipmentTv: "TV",
    equipmentPdf: "Fiche technique PDF",
    equipmentVideo: "Mini vidéo officielle",
    equipmentApp: "Ouvrir l'app tablette",
    equipmentToConfigure: "À configurer",
    equipmentPdfReady: "Disponible en PDF",
    equipmentVideoReady: "Voir la vidéo",
    equipmentAppFallback: "Play Store si l'app n'est pas dispo",
    equipmentAppReady: "Ouvrir ou installer",
    equipmentNotesTitle: "Notes",
    equipmentModalIntro: "Les ressources détaillées seront reliées ici : fiche PDF, étape par étape et accès tablette.",
    equipmentSofaNotes: "Dépliez le couchage depuis l’assise et utilisez le coffre de la méridienne pour ranger les coussins ou la literie. Refermez doucement les éléments après usage.",
    equipmentToasterNotes: "Utilisez la molette pour régler le niveau de dorure, puis appuyez sur le levier. Surveillez les viennoiseries et retirez les miettes quand l’appareil est froid.",
    equipmentTvNotes: "La TV se pilote avec la télécommande. La vidéo ci-dessus montre les réglages et l’usage de base.",
    equipmentComfortTitle: "Confort",
    equipmentComfortText: "Les équipements essentiels et les repères d'usage seront ajoutés ici.",
    equipmentKitchenTitle: "Cuisine",
    equipmentKitchenText: "Rangements, électroménager et petites consignes de cuisine.",
    equipmentHelpTitle: "Pratique",
    equipmentHelpText: "Wifi, chauffage, arrivée, départ et gestes utiles.",
    stayFramingKicker: "Votre séjour",
    stayFramingTitle: "6 étapes pour poser le cadre",
    stayFrameKicker: "Étape",
    stayFramePending: "Contenu à poser ensemble.",
    stayArrivalTitle: "Êtes-vous bien arrivé ?",
    stayArrivalPageTitle: "Votre arrivée",
    stayArrivalPageIntro: "Tout ce qu'il vous faut pour entrer facilement.",
    stayCheckInFrom: "Check-in dès",
    stayArrivalFrom: "A partir de",
    stayDoorTitle: "Porte",
    stayDoorCode: "Code : 35343534",
    stayKeyTitle: "Boîte à clé",
    stayKeyStep01: "Entrez le code.",
    stayKeyStep02: "Ouvrez la boîte et prenez la clé.",
    stayKeyStep03: "Refermez la boîte.",
    stayKeyStep04: "Mélangez les chiffres.",
    stayParkingTitle: "Parking",
    stayParkingText: "Dans la rue",
    stayParkingCardTitle: "Se garer",
    stayParkingCardLabel: "Stationnement",
    stayParkingCardText: "Dehors, dans la rue.",
    stayDoorCardTitle: "Porte",
    stayDoorCardCodeLabel: "Code",
    stayMapAction: "Voir sur la carte →",
    stayCopyAction: "Copier",
    stayWifiPasswordLabel: "Code Wi-Fi",
    stayHousePageTitle: "Maison",
    stayHousePageIntro: "Les repères utiles pour profiter du logement.",
    stayLinenTitle: "Linge fourni",
    stayLinenIntro: "Les essentiels sont rangés dans le logement.",
    staySheetsTitle: "Draps",
    staySheetsText: "Dans la chambre, près du couchage.",
    stayThrowTitle: "Plaid salon",
    stayThrowText: "À retrouver côté salon.",
    stayTowelsTitle: "Serviettes",
    stayTowelsText: "Dans la salle de bain.",
    stayKitchenLinenTitle: "Torchons",
    stayKitchenLinenText: "Dans la cuisine.",
    stayCleaningTitle: "Matos nettoyage",
    stayCleaningIntro: "Disponible si besoin pendant le séjour.",
    stayCleaningItem01: "Aspirateur robot",
    stayCleaningItem02: "Lave-linge",
    stayCleaningItem03: "Produits de nettoyage",
    stayCleaningItem04: "Accessoires pratiques",
    stayConsumablesTitle: "Consommables disponibles",
    stayConsumablesIntro: "Servez-vous raisonnablement de ce qui est déjà sur place.",
    stayConsumableCoffee: "Café",
    stayConsumableTea: "Thés",
    stayConsumableOil: "Huile",
    stayConsumableSpices: "Épices",
    stayConsumableHygiene: "Gel et hygiène",
    stayConsumableKitchen: "Autres trucs cuisine",
    stayStepArrival: "Arrivée",
    stayStepGettingAround: "Accès",
    stayStepHouse: "Maison",
    stayStepComfort: "Confort",
    stayStepTogether: "Bien vivre",
    stayStepLastWord: "Dernier mot",
    stayStepDeparture: "Départ",
    stayStepWish: "Avis",
    stayComfortTitle: "Pour votre confort",
    stayComfortIntro: "Les petites attentions et équipements disponibles pendant le séjour.",
    stayComfortCoffeeTitle: "Café & thé",
    stayComfortCoffeeText: "Café, thés, huile, épices et quelques essentiels de cuisine sont à disposition.",
    stayComfortTowelsTitle: "Serviettes",
    stayComfortTowelsText: "Serviettes supplémentaires et gel d'hygiène disponibles si besoin.",
    stayComfortBlanketsTitle: "Couvertures",
    stayComfortBlanketsText: "Couvertures et plaid pour le salon, à utiliser librement puis remettre en place.",
    stayComfortStreamingTitle: "Streaming",
    stayComfortStreamingText: "Connectez-vous à vos comptes si besoin, puis pensez à vous déconnecter au départ.",
    stayComfortGamesTitle: "Jeux & calme",
    stayComfortGamesText: "Quelques jeux et attentions sont là pour profiter tranquillement du logement.",
    stayComfortChargersTitle: "Chargeurs",
    stayComfortChargersText: "Des chargeurs peuvent être laissés sur place : merci de les garder dans le logement.",
    stayTogetherTitle: "Bien vivre ensemble",
    stayTogetherSubtitle: "simplement",
    stayTogetherIntro: "Quelques repères formulés simplement pour que le séjour reste confortable pour vous, le voisinage et les prochains voyageurs.",
    stayTogetherQuiet: "Gardez le calme, surtout le soir.",
    stayTogetherSmoking: "Merci de fumer uniquement dehors.",
    stayTogetherParty: "Préservez l'ambiance sans fête dans le logement.",
    stayTogetherVisitors: "Les visiteurs restent sous votre responsabilité.",
    stayTogetherSafety: "Signalez vite tout dommage ou souci sécurité.",
    stayAfterTitle: "Un dernier mot",
    stayAfterIntro: "Après votre séjour, votre retour aide beaucoup les prochains voyageurs.",
    stayAfterReviewTitle: "Laisser un avis",
    stayAfterReviewText: "Si tout s'est bien passé, un avis sur Airbnb ou Booking aide le logement à rester visible et rassure les prochains voyageurs.",
    stayAfterForgotTitle: "Objet oublié",
    stayAfterForgotText: "Contactez l'hôte rapidement avec une photo ou une description.",
    stayAfterImproveTitle: "Un point à améliorer",
    stayAfterImproveText: "Dites-le simplement : c'est ce qui permet d'ajuster le logement.",
    stayAfterReturnTitle: "Revenir une prochaine fois",
    stayAfterReturnText: "Vous pouvez garder le lien du livret et revenir vers nous pour un prochain passage.",
    stayDepartureTitle: "Votre départ",
    stayDepartureTrashTitle: "Déchets",
    stayDepartureTrashText: "À mettre dans la poubelle à l'entrée.",
    stayDepartureDishesTitle: "Vaisselle",
    stayDepartureDishesText: "Un lave-vaisselle est à disposition. Sinon, mettez la vaisselle propre sur l'étendoire.",
    stayDepartureKeysTitle: "Clés",
    stayDepartureKeysText: "À remettre dans la boîte à clé avant de partir.",
    stayDepartureWindowsTitle: "Fenêtres",
    stayDepartureWindowsText: "Tout fermer avant de quitter le logement.",
    stayDepartureForgotTitle: "Objet oublié",
    stayDepartureForgotText: "S'il y a un oubli, contactez l'hôte dès que possible.",
    stayDepartureChecklistButton: "Je m'en vais, mon départ",
    stayDepartureChecklistTitle: "Checklist départ",
    stayDepartureCheckTrash: "Déchets mis dans la poubelle à l'entrée",
    stayDepartureCheckDishes: "Vaisselle lancée ou mise sur l'étendoire",
    stayDepartureCheckKeys: "Clés remises dans la boîte à clé",
    stayDepartureCheckWindows: "Fenêtres fermées",
    stayDepartureCheckForgot: "Objet oublié vérifié",
    stayPathTitle: "Votre séjour",
    stayPathSubtitle: "Chemin chronologique",
    stayPathArrival: "Arrivée",
    stayPathRules: "Règles",
    stayPathLinen: "Linge fourni",
    stayPathCleaning: "Nettoyage",
    stayPathConsumables: "Consommables",
    stayPathNext: "À compléter",
    stayLineCheckInTime: "Après 16:00",
    stayLineCheckIn: "Arrivée",
    stayLineEntryCode: "Code d'entrée",
    stayLineParkingText: "Dehors, dans l'allée",
    stayLineAroundMapTitle: "Autour de la maison",
    stayLineAroundMapLead: "Explorez ce qui est proche — transports, commerces et essentiels du quotidien.",
    stayLineAroundModeWalk: "À pied",
    stayLineAroundModeDrive: "Voiture",
    stayLineAroundModeTransit: "Transport",
    stayLineAroundFilterAll: "Tout",
    stayLineAroundFilterTransport: "Transport",
    stayLineAroundFilterGroceries: "Courses",
    stayLineAroundFilterEssentials: "Essentiels",
    stayLineAroundFilterBakery: "Boulangerie & food",
    stayLineAroundFilterOther: "Autre",
    stayLineAroundListTitle: "Essentiels proches",
    stayLineAroundListHint: "tri selon le mode choisi",
    stayLineAroundMapNote: "Tout ce qu'il faut, juste au coin de la rue.",
    stayLineAroundUnavailable: "Non direct",
    stayLineAroundTitle: "Getting around",
    stayLineAroundLead: "Accès, commerces et essentiels à proximité du logement.",
    stayLineAroundTransportTitle: "Accès & transports",
    stayLineAroundBusVigneTitle: "Bus — La Vigne",
    stayLineAroundBusVigneText: "Lignes L8, CIT5",
    stayLineAroundBusVigneTime: "5 min",
    stayLineAroundBusMetzTitle: "Bus — Boulevard de Metz",
    stayLineAroundBusMetzText: "Lignes L8, CIT5, Z6",
    stayLineAroundBusMetzTime: "6 min",
    stayLineAroundMetroTitle: "Métro — Alsace ligne 2",
    stayLineAroundMetroText: "Direct Lille, Tourcoing",
    stayLineAroundMetroTime: "13 min",
    stayLineAroundBikeTitle: "V’Lille — De la Vigne",
    stayLineAroundBikeText: "Vélos en libre-service",
    stayLineAroundBikeTime: "7 min",
    stayLineAroundTrainTitle: "Gare de Roubaix",
    stayLineAroundTrainText: "Bus CIT5, TER Lille & Belgique",
    stayLineAroundTrainTime: "21 min",
    stayLineAroundGroceriesTitle: "Courses",
    stayLineAroundAldiTitle: "ALDI",
    stayLineAroundAldiAddress: "6 bis Bd de Metz, 59100 Roubaix",
    stayLineAroundAldiWalk: "9 min",
    stayLineAroundAldiCar: "3 min",
    stayLineAroundAldiTransit: "9 min",
    stayLineAroundLidlTitle: "Lidl",
    stayLineAroundLidlAddress: "43/45 Rue Jules Guesde, 59100 Roubaix",
    stayLineAroundLidlWalk: "13 min",
    stayLineAroundLidlCar: "4 min",
    stayLineAroundLidlTransit: "11 min",
    stayLineAroundCarrefourTitle: "Carrefour City",
    stayLineAroundCarrefourAddress: "77 Bd de Gaulle, 59100 Roubaix",
    stayLineAroundCarrefourWalk: "21 min",
    stayLineAroundCarrefourText: "6 min",
    stayLineAroundCarrefourTransit: "16 min",
    stayLineAroundLeclercTitle: "E.Leclerc",
    stayLineAroundLeclercAddress: "21 Bis Grande Rue, 59100 Roubaix",
    stayLineAroundLeclercWalk: "21 min",
    stayLineAroundLeclercText: "6 min",
    stayLineAroundLeclercTransit: "16 min",
    stayLineAroundAuchanTitle: "Auchan",
    stayLineAroundAuchanAddress: "Rue Fidèle Lehoucq, 59200 Tourcoing",
    stayLineAroundAuchanWalk: "46 min",
    stayLineAroundAuchanText: "11 min",
    stayLineAroundAuchanTransit: "26 min",
    stayLineAroundEssentialsTitle: "Essentiels",
    stayLineAroundPharmacyTitle: "Pharmacie",
    stayLineAroundPharmacyAddress: "52 Rue de Constantine, 59100 Roubaix",
    stayLineAroundPharmacyText: "3 min",
    stayLineAroundPharmacyCar: "2 min",
    stayLineAroundBakeryTitle: "Au Pain Gourmand",
    stayLineAroundBakeryAddress: "198 Rue d’Alger, 59100 Roubaix",
    stayLineAroundBakeryWalk: "7 min",
    stayLineAroundBakeryText: "3 min",
    stayLineAroundBakeryNote: "Boulangerie bien notée",
    stayLineAroundMarieTitle: "Marie Blachère",
    stayLineAroundMarieAddress: "4A Rue Albert Premier, 59150 Wattrelos",
    stayLineAroundMarieWalk: "19 min",
    stayLineAroundMarieCar: "6 min",
    stayLineAroundMarieTransit: "16 min",
    stayLineAroundGasTitle: "TotalEnergies",
    stayLineAroundGasAddress: "660 Av. des Nations Unies, 59100 Roubaix",
    stayLineAroundGasWalk: "",
    stayLineAroundGasText: "6 min",
    stayLineAroundGasTransit: "",
    stayLineAroundChargeTitle: "Iléwatt Charging Station",
    stayLineAroundChargeAddress: "207 Rue Lacroix, 59100 Roubaix",
    stayLineAroundChargeWalk: "",
    stayLineAroundChargeCar: "4 min",
    stayLineAroundChargeTransit: "",
    stayLineAroundRoubaixTitle: "",
    stayLineAroundRoubaixText: "",
    stayLineAroundLilleTitle: "",
    stayLineAroundLilleText: "",
    stayLineAroundBelgiumTitle: "",
    stayLineAroundBelgiumText: "",
    stayLineAroundBannerTitle: "",
    stayLineAroundBannerText: "",
    stayLineRulesTitle: "Règles",
    stayLineRuleNoSmokingTitle: "Ne pas fumer",
    stayLineRuleInsideThanks: "À l'intérieur du logement. Merci",
    stayLineRuleQuietTitle: "23:00 à 06:00",
    stayLineRuleQuietText: "Heures calmes",
    stayLineRulePartyTitle: "Pas de fête/événement",
    stayLineRulePetsTitle: "Pas d'animal",
    stayLineRulePetsText: "Nous ne sommes pas encore prêts pour eux",
    stayLineRuleDamageTitle: "Signaler un dommage",
    stayLineRuleDamageText: "Prévenez-nous rapidement si quelque chose arrive",
    stayLineWasteGeneralTitle: "Déchets & recyclage",
    stayLineWasteGeneralText: "Merci d'utiliser la bonne poubelle quand c'est possible. Les sacs sont disponibles dans le tiroir à côté des poubelles.",
    stayLineWasteKitchenTitle: "Produits de cuisine",
    stayLineWasteKitchenText: "Des produits de nettoyage sont disponibles. Vous trouverez liquide vaisselle, spray, éponge et chiffons.",
    stayLineWasteHouseTitle: "Produits maison",
    stayLineWasteHouseText: "D'autres produits de nettoyage sont disponibles pour le reste du logement.",
    stayLineWasteTitle: "Infos pratiques",
    stayLineComfortKicker: "Votre guide de séjour",
    stayLineComfortTitle: "Tout ce dont vous avez besoin, au même endroit",
    stayLineComfortLead: "Un séjour simple, confortable et inoubliable à Roubaix et ses alentours.",
    stayLineComfortCta: "Découvrir la maison",
    stayLineComfortHero: "Pensé pour vous, profitez du séjour ♡",
    stayLineComfortFootnote: "Tout ce qu'il vous faut, exactement là où il faut ♡",
    stayLineExtrasTitle: "Petits plus",
    stayLineAmenitiesTitle: "Équipements utiles",
    stayLineCoffeeTitle: "Café & thé",
    stayLineCoffeeText: "Sur le plan de travail de la cuisine",
    stayLineTreatTitle: "Petite attention",
    stayLineTreatText: "Quelques snacks sont sur la table du salon",
    stayLineBlanketTitle: "Plaid douillet",
    stayLineBlanketText: "Dans le rangement sous le canapé",
    stayLineBeddingTitle: "Literie en plus",
    stayLineBeddingText: "Dans le rangement sous le lit",
    stayLineKitchenBasicTitle: "Essentiels cuisine",
    stayLineKitchenBasicText: "Dans le deuxième tiroir à gauche",
    stayLineIronTitle: "Fer & table à repasser",
    stayLineIronText: "Dans le rangement xxxx xxxxxx xxx",
    stayLineBathroomTitle: "Essentiels salle de bain",
    stayLineBathroomText: "Dans le tiroir de la salle de bain",
    stayLineCleaningTitle: "Produits de nettoyage",
    stayLineCleaningText: "Dans le tiroir de la salle de bain",
    stayLineDepartureThanks: "Merci d'avoir séjourné chez nous - Bon voyage !",
    stayLineDepartureReview: "si vous avez apprécié votre séjour, merci de nous laisser un avis",
    stayLineDepartureKicker: "Concept parcours",
    stayLineDepartureJourneyTitle: "Départ",
    stayLineDepartureJourneyLead: "Quelques étapes simples avant votre départ.",
    stayLineDepartureNote: "Merci d'avoir été un invité formidable. Nous espérons vous accueillir à nouveau bientôt.",
    stayLineDepartureSafe: "Bon voyage ! Nous espérons vous accueillir à nouveau bientôt ♡",
    stayLineDepartureStep1Title: "Avant 10:00",
    stayLineDepartureStep1Text: "Heure de départ",
    stayLineDepartureStep2Title: "Ranger",
    stayLineDepartureStep2Text: "Vaisselle utilisée",
    stayLineDepartureStep3Title: "Déchets",
    stayLineDepartureStep3Text: "Sortez les déchets dans le placard du couloir",
    stayLineDepartureStep4Title: "Dernier contrôle",
    stayLineDepartureStep4Text: "Chargeurs, vêtements & objets personnels",
    stayLineDepartureStep5Title: "Porte & clés",
    stayLineDepartureStep5Text: "Fermez porte et fenêtre, remettez la clé et mélangez le code",
    sideStayFraming: "Framing",
    sideWelcomeHero: "Accueil",
    sideHomeCover: "Maison",
    sideHomeEquipment: "Équipements"
  },
  en: {
    lang: "en",
    label: "Switch to French",
    welcome: "Welcome to\nour nest",
    icon: "FR",
    loading: "Live weather...",
    fallback: "Weather temporarily unavailable",
    rangeHigh: "High",
    rangeLow: "Low",
    houseAction: "Enjoy the house",
    discoverAction: "Discover the neighbourhood",
    stayAction: "Everything about my stay",
    navWelcome: "Welcome",
    navHome: "The home",
    navStay: "Your stay",
    navDiscover: "Discover",
    navHelp: "Need help?",
    helpTitle: "Need help?",
    helpLead: "Here's everything you need, in one place.",
    helpHandNote: "You're in good hands",
    helpHandSubnote: "Enjoy your stay in good company",
    helpEmergencyEurope: "Emergency (Europe)",
    helpPolice: "Police",
    helpFire: "Fire",
    helpMedical: "Medical",
    helpAllEmergencies: "All emergencies",
    helpMedicalEmergency: "Medical emergency",
    helpMedicalNote: "(Serious injury or illness)",
    helpFireBrigade: "Fire brigade",
    helpFireNote: "Fire, smoke, rescue",
    helpPoliceTitle: "Police",
    helpPoliceNote: "Theft, violence, security issue",
    helpSmsTitle: "Emergency SMS",
    helpSmsNote: "For deaf or hard of hearing people",
    helpQuickTitle: "Common issues? Quick help here.",
    helpElectricityTitle: "No electricity?",
    helpElectricityText: "Check the fuse box",
    helpWaterTitle: "Water leak?",
    helpWaterText: "Turn off the main valve",
    helpKeyTitle: "Key problem?",
    helpKeyText: "Contact the host",
    helpGasTitle: "Fire or gas smell?",
    helpGasText: "Get outside and call 112",
    helpContactHost: "Contact host",
    helpContactHostText: "We're here to help",
    helpCallHost: "Call host",
    helpMessageHost: "Or send a message",
    helpAddressTitle: "Our address",
    helpOpenMaps: "Open in Maps",
    helpFirstAidTitle: "First-aid kit",
    helpFirstAidText: "Located in the kitchen top right cabinet",
    eventsKicker: "To discover",
    eventsTitle: "What's happening nearby",
    eventsIntro: "Upcoming highlights around Lille and Belgium, refreshed at 07:00, 12:00 and 17:00.",
    eventsLoading: "Looking for upcoming events...",
    eventsUnavailable: "Events will appear here as soon as valid data is available.",
    eventsUpdated: "Updated on the 07:00 / 12:00 / 17:00 refresh window.",
    eventsCached: "Last available selection, until the next refresh completes.",
    eventsDiscover: "Discover event →",
    eventsLocationLabel: "Location",
    eventsSearch: "Search",
    eventsLocationTitle: "Lille or Belgium ? Why choose ?",
    eventsLocationText: "Lille and Belgium are all within easy reach.",
    sideDiscoverEvents: "Events nearby",
    sideDiscoverCityGuide: "City guide",
    sideDiscoverBlank: "Blank page",
    sideDiscoverRoutes: "Routes & outdoors",
    discoverBestFor: "Best for",
    discoverSimpleKicker: "To discover",
    discoverSimpleNote: "History meets the good life",
    discoverSimpleMustSee: "Must-see",
    discoverSimpleEatDrink: "Eat & Drink",
    discoverSimpleCombo: "Perfect combo",
    discoverSimpleFooter: "A lively escape, ideal for a day trip.",
    discoverRoutesKicker: "Good walks nearby",
    discoverRoutesTitle: "Routes & Outdoors",
    discoverRoutesLead: "Walk. Ride. Explore.",
    discoverRoutesNote: "Beautiful routes, just around the corner.",
    discoverRoutesWalk: "Walk",
    discoverRoutesBike: "Bike",
    discoverRoutesHike: "Hike",
    discoverRoutesBarbieuxText: "A peaceful walk through gardens, lakes and remarkable trees.",
    discoverRoutesCanalText: "A pleasant ride along the canal, with nature and heritage.",
    discoverRoutesMarqueText: "A nature path through wetlands and green landscapes.",
    discoverRoutesDistance: "Distance",
    discoverRoutesTime: "Time",
    discoverRoutesLevel: "Level",
    discoverRoutesFormat: "Format",
    discoverRoutesBestFor: "Best for",
    discoverRoutesEasy: "Easy",
    discoverRoutesModerate: "Moderate",
    discoverRoutesLoop: "Loop",
    discoverRoutesOneWay: "One way",
    discoverRoutesCta: "View route →",
    discoverCard2Title: "3 must-see places",
    discoverCard2Kicker: "History around every corner",
    discoverCard2Place1Title: "Grand'Place & Vieille Bourse",
    discoverCard2Place1Text: "The heart of Lille: Flemish architecture, cafes and one of the city's most iconic buildings.",
    discoverCard2Place1Note: "Start here",
    discoverCard2Place2Title: "Palais des Beaux-Arts",
    discoverCard2Place2Text: "One of France's major fine-art museums, right on Place de la Republique.",
    discoverCard2Place2Note: "Museum stop",
    discoverCard2Place3Title: "Vieux-Lille & Hospice Comtesse",
    discoverCard2Place3Text: "Cobblestone streets, colourful facades, boutiques and centuries of local history.",
    discoverCard2Place3Note: "Photo walk",
    qrKicker: "Want to have this outside ?",
    qrTitle: "Scan the QR Code",
    wishTitleInline: "One wish for next time?",
    wishSubtitle: "If you come back here, what would you like to have more or less of?",
    wishButton: "Make a wish",
    reviewFinalTitle: "Loved your stay ?",
    reviewFinalSubtitle: "Your review helps us keep improving and inspires future travellers.",
    reviewFinalButton: "Leave a review",
    reviewFinalReasonGuests: "Helps\nfuture guests",
    reviewFinalReasonMeans: "Means\na lot to us",
    reviewFinalReasonVibes: "Keeps\nthe good vibes",
    modalTitle: "Make one wish",
    firstName: "First name",
    lastName: "Last name",
    yourWish: "Your wish",
    sendWish: "Send",
    close: "Close",
    thanks: "Thank you, we will look into it ;)",
    mailSubject: "Wish for next stay",
    mailFirstName: "First name",
    mailLastName: "Last name",
    mailWish: "Wish",
    homeEyebrow: "Steven & Nisha",
    homeHello: "Hello,",
    homeHosts: "It's Steven and Nisha",
    homeLeadStrong: "We",
    homeLeadText: " designed this home so you can enjoy a simple, comfortable and pleasant stay.",
    homeBody: "We hope you feel at home here and enjoy discovering this place and its surroundings.",
    homeEnjoy: "Enjoy your stay, and feel free to contact us if needed!",
    homeScrollNote: "Scroll down to discover more about the house.",
    homeModelTitle: "Spin to explore",
    homeModelText: "222 rue Delespaul - 59100 - Roubaix",
    surfaceTotal: "Total area",
    surfaceLiving: "living room-kitchen",
    surfaceBath: "bathroom",
    surfaceBedroom: "bedroom",
    rulesTitleStrong: "Some rules",
    rulesTitleMuted: "for your stay",
    rulesIntro: "Please follow these simple notes to keep the home quiet, comfortable and pleasant.",
    ruleNoSmoking: "No smoking",
    ruleNoPets: "We're not ready for pets yet",
    ruleNoParty: "No parties",
    ruleDamage: "Report any damage",
    wifiTitle: "Wifi",
    wifiNetwork: "Network",
    wifiPassword: "Password",
    equipmentKicker: "For your comfort",
    equipmentTitleStrong: "Equipment",
    equipmentTitleMuted: "in the home",
    equipmentSubtitle: "Spot the essentials at a glance, then tap a card to open the useful details.",
    equipmentIntro: "Equipment available for your comfort.",
    equipmentCoffee: "Coffee machine",
    equipmentToaster: "Toaster",
    equipmentOven: "Oven",
    equipmentMicrowave: "Microwave",
    equipmentKeypad: "Entry keypad",
    equipmentWasher: "Washing machine",
    equipmentRobotVacuum: "Robot vacuum",
    equipmentSofa: "Sofa bed",
    equipmentTv: "TV",
    equipmentPdf: "Technical PDF sheet",
    equipmentVideo: "Official mini video",
    equipmentApp: "Open tablet app",
    equipmentToConfigure: "To configure",
    equipmentPdfReady: "PDF available",
    equipmentVideoReady: "Watch video",
    equipmentAppFallback: "Play Store if the app is not available",
    equipmentAppReady: "Open or install",
    equipmentNotesTitle: "Notes",
    equipmentModalIntro: "Detailed resources will be linked here: PDF sheet, step-by-step guide and tablet access.",
    equipmentSofaNotes: "Pull the bed out from the seat and use the chaise storage for cushions or bedding. Close each section gently after use.",
    equipmentToasterNotes: "Use the dial to set the browning level, then press the lever. Keep an eye on pastries and empty crumbs only once the appliance is cold.",
    equipmentTvNotes: "Use the remote control for the TV. The video above shows the basic settings and operation.",
    equipmentComfortTitle: "Comfort",
    equipmentComfortText: "Essential equipment and usage notes will be added here.",
    equipmentKitchenTitle: "Kitchen",
    equipmentKitchenText: "Storage, appliances and simple kitchen guidance.",
    equipmentHelpTitle: "Practical",
    equipmentHelpText: "Wifi, heating, arrival, departure and useful gestures.",
    stayFramingKicker: "Your stay",
    stayFramingTitle: "6 steps to frame the stay",
    stayFrameKicker: "Step",
    stayFramePending: "Content to build together.",
    stayArrivalTitle: "Have you arrived safely?",
    stayArrivalPageTitle: "Your arrival",
    stayArrivalPageIntro: "Everything you need to enter easily.",
    stayCheckInFrom: "Check-in from",
    stayArrivalFrom: "From",
    stayDoorTitle: "Door",
    stayDoorCode: "Code: 35343534",
    stayKeyTitle: "Key box",
    stayKeyStep01: "Enter the code.",
    stayKeyStep02: "Open the box and take the key.",
    stayKeyStep03: "Close the box.",
    stayKeyStep04: "Scramble the numbers.",
    stayParkingTitle: "Parking",
    stayParkingText: "On the street",
    stayParkingCardTitle: "Park",
    stayParkingCardLabel: "Parking",
    stayParkingCardText: "Free on the street.",
    stayDoorCardTitle: "Door",
    stayDoorCardCodeLabel: "Code",
    stayMapAction: "View on map →",
    stayCopyAction: "Copy",
    stayWifiPasswordLabel: "Wi-Fi code",
    stayHousePageTitle: "Home",
    stayHousePageIntro: "Useful notes to enjoy the home.",
    stayLinenTitle: "Provided linen",
    stayLinenIntro: "The essentials are stored in the home.",
    staySheetsTitle: "Sheets",
    staySheetsText: "In the bedroom, near the bed.",
    stayThrowTitle: "Living room throw",
    stayThrowText: "Available in the living room area.",
    stayTowelsTitle: "Towels",
    stayTowelsText: "In the bathroom.",
    stayKitchenLinenTitle: "Tea towels",
    stayKitchenLinenText: "In the kitchen.",
    stayCleaningTitle: "Cleaning gear",
    stayCleaningIntro: "Available if needed during the stay.",
    stayCleaningItem01: "Robot vacuum",
    stayCleaningItem02: "Washing machine",
    stayCleaningItem03: "Cleaning products",
    stayCleaningItem04: "Useful accessories",
    stayConsumablesTitle: "Available consumables",
    stayConsumablesIntro: "Use reasonably what is already available.",
    stayConsumableCoffee: "Coffee",
    stayConsumableTea: "Tea",
    stayConsumableOil: "Oil",
    stayConsumableSpices: "Spices",
    stayConsumableHygiene: "Gel and hygiene",
    stayConsumableKitchen: "Other kitchen items",
    stayStepArrival: "Arrival",
    stayStepGettingAround: "Getting around",
    stayStepHouse: "Home",
    stayStepComfort: "Comfort",
    stayStepTogether: "Living well",
    stayStepLastWord: "Last word",
    stayStepDeparture: "Departure",
    stayStepWish: "Review",
    stayComfortTitle: "For your comfort",
    stayComfortIntro: "Small attentions and useful items available during your stay.",
    stayComfortCoffeeTitle: "Coffee & tea",
    stayComfortCoffeeText: "Coffee, tea, oil, spices and a few kitchen essentials are available.",
    stayComfortTowelsTitle: "Towels",
    stayComfortTowelsText: "Extra towels and hygiene gel are available if needed.",
    stayComfortBlanketsTitle: "Blankets",
    stayComfortBlanketsText: "Blankets and a living-room throw are available; please put them back after use.",
    stayComfortStreamingTitle: "Streaming",
    stayComfortStreamingText: "Use your accounts if needed, then remember to sign out before leaving.",
    stayComfortGamesTitle: "Games & calm",
    stayComfortGamesText: "A few games and small touches are there to help you enjoy the home quietly.",
    stayComfortChargersTitle: "Chargers",
    stayComfortChargersText: "Chargers may be available on site; please keep them in the home.",
    stayTogetherTitle: "Living well together",
    stayTogetherSubtitle: "simply",
    stayTogetherIntro: "A few simple notes to keep the stay comfortable for you, the neighbours and the next guests.",
    stayTogetherQuiet: "Keep things calm, especially in the evening.",
    stayTogetherSmoking: "Please smoke outside only.",
    stayTogetherParty: "Keep the atmosphere pleasant without parties in the home.",
    stayTogetherVisitors: "Visitors remain under your responsibility.",
    stayTogetherSafety: "Report any damage or safety issue quickly.",
    stayAfterTitle: "One last note",
    stayAfterIntro: "After your stay, your feedback really helps future guests.",
    stayAfterReviewTitle: "Leave a review",
    stayAfterReviewText: "If everything went well, a review on Airbnb or Booking helps the home stay visible and reassures future guests.",
    stayAfterForgotTitle: "Forgotten item",
    stayAfterForgotText: "Contact the host quickly with a photo or description.",
    stayAfterImproveTitle: "Something to improve",
    stayAfterImproveText: "Tell us simply: it helps us adjust the home.",
    stayAfterReturnTitle: "Come back another time",
    stayAfterReturnText: "You can keep the booklet link and contact us again for a future stay.",
    stayDepartureTitle: "Your departure",
    stayDepartureTrashTitle: "Trash",
    stayDepartureTrashText: "Put it in the bin at the entrance.",
    stayDepartureDishesTitle: "Dishes",
    stayDepartureDishesText: "A dishwasher is available. Otherwise, put clean dishes on the drying rack.",
    stayDepartureKeysTitle: "Keys",
    stayDepartureKeysText: "Put them back in the key box before leaving.",
    stayDepartureWindowsTitle: "Windows",
    stayDepartureWindowsText: "Close everything before leaving the home.",
    stayDepartureForgotTitle: "Forgotten item",
    stayDepartureForgotText: "If you forget something, contact the host as soon as possible.",
    stayDepartureChecklistButton: "I'm leaving, my departure",
    stayDepartureChecklistTitle: "Departure checklist",
    stayDepartureCheckTrash: "Trash placed in the bin at the entrance",
    stayDepartureCheckDishes: "Dishes started or placed on the drying rack",
    stayDepartureCheckKeys: "Keys placed back in the key box",
    stayDepartureCheckWindows: "Windows closed",
    stayDepartureCheckForgot: "Forgotten items checked",
    stayPathTitle: "Your stay",
    stayPathSubtitle: "Chronological path",
    stayPathArrival: "Arrival",
    stayPathRules: "Rules",
    stayPathLinen: "Provided linen",
    stayPathCleaning: "Cleaning",
    stayPathConsumables: "Consumables",
    stayPathNext: "To complete",
    stayLineCheckInTime: "After 04:00 PM",
    stayLineCheckIn: "Check in",
    stayLineEntryCode: "Entry code",
    stayLineParkingText: "Outside in the alley",
    stayLineAroundMapTitle: "Around the house",
    stayLineAroundMapLead: "Explore what's nearby — transport, shops and everyday essentials.",
    stayLineAroundModeWalk: "Walking",
    stayLineAroundModeDrive: "Driving",
    stayLineAroundModeTransit: "Transit",
    stayLineAroundFilterAll: "All",
    stayLineAroundFilterTransport: "Transport",
    stayLineAroundFilterGroceries: "Groceries",
    stayLineAroundFilterEssentials: "Essentials",
    stayLineAroundFilterBakery: "Bakery & Food",
    stayLineAroundFilterOther: "Other",
    stayLineAroundListTitle: "Nearby essentials",
    stayLineAroundListHint: "sorted by selected mode",
    stayLineAroundMapNote: "Everything you need, just around the corner.",
    stayLineAroundUnavailable: "Not direct",
    stayLineAroundTitle: "Getting around",
    stayLineAroundLead: "Access, shops and everyday essentials close to the home.",
    stayLineAroundTransportTitle: "Access & transport",
    stayLineAroundBusVigneTitle: "Bus — La Vigne",
    stayLineAroundBusVigneText: "Lines L8, CIT5",
    stayLineAroundBusVigneTime: "5 min",
    stayLineAroundBusMetzTitle: "Bus — Boulevard de Metz",
    stayLineAroundBusMetzText: "Lines L8, CIT5, Z6",
    stayLineAroundBusMetzTime: "6 min",
    stayLineAroundMetroTitle: "Metro — Alsace line 2",
    stayLineAroundMetroText: "Direct to Lille, Tourcoing",
    stayLineAroundMetroTime: "13 min",
    stayLineAroundBikeTitle: "V’Lille — De la Vigne",
    stayLineAroundBikeText: "Self-service bikes",
    stayLineAroundBikeTime: "7 min",
    stayLineAroundTrainTitle: "Roubaix Train Station",
    stayLineAroundTrainText: "Bus CIT5, TER to Lille & Belgium",
    stayLineAroundTrainTime: "21 min",
    stayLineAroundGroceriesTitle: "Groceries",
    stayLineAroundAldiTitle: "ALDI",
    stayLineAroundAldiAddress: "6 bis Bd de Metz, 59100 Roubaix",
    stayLineAroundAldiWalk: "9 min",
    stayLineAroundAldiCar: "3 min",
    stayLineAroundAldiTransit: "9 min",
    stayLineAroundLidlTitle: "Lidl",
    stayLineAroundLidlAddress: "43/45 Rue Jules Guesde, 59100 Roubaix",
    stayLineAroundLidlWalk: "13 min",
    stayLineAroundLidlCar: "4 min",
    stayLineAroundLidlTransit: "11 min",
    stayLineAroundCarrefourTitle: "Carrefour City",
    stayLineAroundCarrefourAddress: "77 Bd de Gaulle, 59100 Roubaix",
    stayLineAroundCarrefourWalk: "21 min",
    stayLineAroundCarrefourText: "6 min",
    stayLineAroundCarrefourTransit: "16 min",
    stayLineAroundLeclercTitle: "E.Leclerc",
    stayLineAroundLeclercAddress: "21 Bis Grande Rue, 59100 Roubaix",
    stayLineAroundLeclercWalk: "21 min",
    stayLineAroundLeclercText: "6 min",
    stayLineAroundLeclercTransit: "16 min",
    stayLineAroundAuchanTitle: "Auchan",
    stayLineAroundAuchanAddress: "Rue Fidèle Lehoucq, 59200 Tourcoing",
    stayLineAroundAuchanWalk: "46 min",
    stayLineAroundAuchanText: "11 min",
    stayLineAroundAuchanTransit: "26 min",
    stayLineAroundEssentialsTitle: "Daily essentials",
    stayLineAroundPharmacyTitle: "Pharmacie",
    stayLineAroundPharmacyAddress: "52 Rue de Constantine, 59100 Roubaix",
    stayLineAroundPharmacyText: "3 min",
    stayLineAroundPharmacyCar: "2 min",
    stayLineAroundBakeryTitle: "Au Pain Gourmand",
    stayLineAroundBakeryAddress: "198 Rue d’Alger, 59100 Roubaix",
    stayLineAroundBakeryWalk: "7 min",
    stayLineAroundBakeryText: "3 min",
    stayLineAroundBakeryNote: "Best-rated bakery nearby",
    stayLineAroundMarieTitle: "Marie Blachère",
    stayLineAroundMarieAddress: "4A Rue Albert Premier, 59150 Wattrelos",
    stayLineAroundMarieWalk: "19 min",
    stayLineAroundMarieCar: "6 min",
    stayLineAroundMarieTransit: "16 min",
    stayLineAroundGasTitle: "TotalEnergies",
    stayLineAroundGasAddress: "660 Av. des Nations Unies, 59100 Roubaix",
    stayLineAroundGasWalk: "",
    stayLineAroundGasText: "6 min",
    stayLineAroundGasTransit: "",
    stayLineAroundChargeTitle: "Iléwatt Charging Station",
    stayLineAroundChargeAddress: "207 Rue Lacroix, 59100 Roubaix",
    stayLineAroundChargeWalk: "",
    stayLineAroundChargeCar: "4 min",
    stayLineAroundChargeTransit: "",
    stayLineAroundRoubaixTitle: "",
    stayLineAroundRoubaixText: "",
    stayLineAroundLilleTitle: "",
    stayLineAroundLilleText: "",
    stayLineAroundBelgiumTitle: "",
    stayLineAroundBelgiumText: "",
    stayLineAroundBannerTitle: "",
    stayLineAroundBannerText: "",
    stayLineRulesTitle: "Rules",
    stayLineRuleNoSmokingTitle: "No smoking",
    stayLineRuleInsideThanks: "Inside the house. Thank you",
    stayLineRuleQuietTitle: "23:00 to 06:00",
    stayLineRuleQuietText: "Quiet hours",
    stayLineRulePartyTitle: "No party/event",
    stayLineRulePetsTitle: "No pet(s)",
    stayLineRulePetsText: "We are not ready for them yet",
    stayLineRuleDamageTitle: "Report any damage",
    stayLineRuleDamageText: "Tell us quickly if something happens",
    stayLineWasteGeneralTitle: "General waste & recycling",
    stayLineWasteGeneralText: "Please use the correct bin when possible. Bin bags are available in the drawer next to the bins.",
    stayLineWasteKitchenTitle: "Kitchen cleaning supplies",
    stayLineWasteKitchenText: "Cleaning products are available. You'll find dish soap, spray, a sponge and cloths.",
    stayLineWasteHouseTitle: "House cleaning supplies",
    stayLineWasteHouseText: "Other cleaning products are available for the rest of the house.",
    stayLineWasteTitle: "Pratical infos",
    stayLineComfortKicker: "Your stay guide",
    stayLineComfortTitle: "Everything you need, in the same place",
    stayLineComfortLead: "A simple, comfortable and memorable stay in Roubaix and around.",
    stayLineComfortCta: "Discover the home",
    stayLineComfortHero: "Here for you, enjoy your stay ♡",
    stayLineComfortFootnote: "Everything you need, exactly where you need it ♡",
    stayLineExtrasTitle: "Little extras",
    stayLineAmenitiesTitle: "Useful amenities",
    stayLineCoffeeTitle: "Coffee & Tea",
    stayLineCoffeeText: "In the kitchen’s worktop",
    stayLineTreatTitle: "A little treat",
    stayLineTreatText: "A few snacks are in the living room table",
    stayLineBlanketTitle: "A cosy blanket",
    stayLineBlanketText: "In the storage under the sofa",
    stayLineBeddingTitle: "Extra bedding",
    stayLineBeddingText: "In storage under the bed",
    stayLineKitchenBasicTitle: "Kitchen’s basic",
    stayLineKitchenBasicText: "In the second drawer from the left",
    stayLineIronTitle: "Iron & Ironing board",
    stayLineIronText: "In the storage xxxx xxxxxx xxx",
    stayLineBathroomTitle: "Bathroom essential",
    stayLineBathroomText: "In the drawer in the bathroom",
    stayLineCleaningTitle: "Cleaning supplies",
    stayLineCleaningText: "In the drawer in the bathroom",
    stayLineDepartureThanks: "Thank you for staying with us - Safe travels !",
    stayLineDepartureReview: "if you enjoyed your stay, please leave us a review",
    stayLineDepartureKicker: "Journey concept",
    stayLineDepartureJourneyTitle: "Check-out",
    stayLineDepartureJourneyLead: "A few thoughtful steps before you head out.",
    stayLineDepartureNote: "Thank you for being a wonderful guest. We hope to welcome you back soon.",
    stayLineDepartureSafe: "Safe Travels ! We hope to host you again soon ♡",
    stayLineDepartureStep1Title: "Before 10:00 AM",
    stayLineDepartureStep1Text: "Check out time",
    stayLineDepartureStep2Title: "Tidy up",
    stayLineDepartureStep2Text: "Used dishes",
    stayLineDepartureStep3Title: "Waste",
    stayLineDepartureStep3Text: "Take out the trash to the closet in the corridor",
    stayLineDepartureStep4Title: "Final check",
    stayLineDepartureStep4Text: "Check for chargers, clothes & personal items",
    stayLineDepartureStep5Title: "Lock & keys",
    stayLineDepartureStep5Text: "Close the door & window, return the key, and scramble the code",
    sideStayFraming: "Framing",
    sideWelcomeHero: "Welcome",
    sideHomeCover: "Home",
    sideHomeEquipment: "Equipment"
  }
};

const equipmentCatalog = {
  coffee: {
    icon: "Assets/Icon/coffee-beans.svg",
    key: "equipmentCoffee",
    pdf: "aa2487dd-3ec2-4c24-b41a-c5180ec524bc%20(1).pdf",
    video: "https://www.youtube.com/watch?v=NjvgxcH8HLU",
    app: "https://play.google.com/store/search?q=dolce%20gusto&c=apps",
    appLogo: "Dolce_Gusto.png"
  },
  toaster: {
    icon: "Assets/Image/equipment-toaster.png",
    key: "equipmentToaster",
    video: "https://www.youtube.com/watch?v=jGoMVFX26WA",
    notesKey: "equipmentToasterNotes"
  },
  oven: { icon: "Assets/Icon/oven.svg", key: "equipmentOven" },
  microwave: { icon: "Assets/Icon/microwave.svg", key: "equipmentMicrowave" },
  keypad: { icon: "Assets/Icon/data-encryption.svg", key: "equipmentKeypad" },
  washer: { icon: "Assets/Icon/washer.svg", key: "equipmentWasher" },
  robotVacuum: {
    icon: "Assets/Icon/snap.svg",
    key: "equipmentRobotVacuum",
    video: "https://www.youtube.com/watch?v=drandHTuZr8",
    app: "https://play.google.com/store/search?q=dreamehome&c=apps",
    appLogo: "Assets/Image/dreame-logo.png"
  },
  sofa: {
    icon: "Assets/Image/equipment-sofa.png",
    key: "equipmentSofa",
    video: "https://www.youtube.com/watch?v=IuoR1C_yniQ",
    notesKey: "equipmentSofaNotes"
  },
  tv: {
    icon: "Assets/Image/equipment-tv-clean.png",
    key: "equipmentTv",
    video: "https://www.youtube.com/watch?v=luuvIMYqdnc",
    notesKey: "equipmentTvNotes"
  }
};

const pageSections = {
  welcome: [
    { id: "welcome-hero", key: "sideWelcomeHero", icon: "Assets/Icon/Bienvenu.svg" },
    { id: "home-blank", key: "sideHomeCover", icon: "Assets/Icon/La maison.svg" },
    { id: "home-model", key: "homeModelTitle", icon: "Assets/Icon/eye.svg" },
    { id: "home-equipment", key: "sideHomeEquipment", icon: "Assets/Icon/snap.svg" }
  ],
  stay: [
    { id: "stay-blank", key: "stayStepArrival", icon: "Assets/Icon/arrivé.svg", stayStep: 0 },
    { id: "stay-blank", key: "stayStepHouse", icon: "Assets/Icon/rules.svg", stayStep: 1 },
    { id: "stay-blank", key: "stayStepComfort", icon: "Assets/Icon/Bien vivre.svg", stayStep: 2 },
    { id: "stay-blank", key: "stayStepGettingAround", icon: "Assets/Icon/getting arround.png", stayStep: 3 },
    { id: "stay-blank", key: "stayStepDeparture", icon: "Assets/Icon/Départ.svg", stayStep: 4 },
    { id: "stay-blank", key: "stayStepWish", icon: "Assets/Icon/stay-review-spark.png", stayStep: 5 }
  ],
  discover: [
    { id: "discover-events", key: "sideDiscoverEvents", icon: "Assets/Icon/A découvrir.png" },
    { id: "discover-blank", key: "sideDiscoverBlank", icon: "Assets/Icon/leaf.png" },
    { id: "discover-routes-outdoors", key: "sideDiscoverRoutes", icon: "Assets/Icon/footprint.png" }
  ],
  help: []
};

function googleMapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const aroundPlaces = [
  { id: "pharmacy", category: "essentials", titleKey: "stayLineAroundPharmacyTitle", detailKey: "stayLineAroundPharmacyAddress", icon: "Assets/Icon/pharmacy.png", href: googleMapsLink("Pharmacie du Hutin 52 Rue de Constantine 59100 Roubaix"), times: { walk: 3, drive: 2 }, map: { x: 58, y: 32 } },
  { id: "bus-vigne", category: "transport", titleKey: "stayLineAroundBusVigneTitle", detailKey: "stayLineAroundBusVigneText", icon: "Assets/Icon/bus.png", href: googleMapsLink("Arrêt Bus La Vigne Roubaix"), times: { walk: 5 }, map: { x: 25, y: 47 } },
  { id: "bus-metz", category: "transport", titleKey: "stayLineAroundBusMetzTitle", detailKey: "stayLineAroundBusMetzText", icon: "Assets/Icon/bus.png", href: googleMapsLink("Boulevard de Metz Roubaix arrêt bus"), times: { walk: 6 }, map: { x: 22, y: 28 }, listOnly: true },
  { id: "gas", category: "other", titleKey: "stayLineAroundGasTitle", detailKey: "stayLineAroundGasAddress", icon: "Assets/Icon/logo-totalenergies.png", href: googleMapsLink("TotalEnergies 660 Avenue des Nations Unies 59100 Roubaix"), times: { drive: 6 }, map: { x: 76, y: 68 } },
  { id: "bakery", category: "bakery", titleKey: "stayLineAroundBakeryTitle", detailKey: "stayLineAroundBakeryAddress", icon: "Assets/Icon/bakery.png", href: googleMapsLink("Au Pain Gourmand 198 Rue d'Alger 59100 Roubaix"), times: { walk: 7, drive: 3 }, map: { x: 78, y: 50 } },
  { id: "bike", category: "transport", titleKey: "stayLineAroundBikeTitle", detailKey: "stayLineAroundBikeText", icon: "Assets/Icon/bicycle.png", href: googleMapsLink("V'Lille De la Vigne Roubaix"), times: { walk: 7 }, map: { x: 36, y: 80 } },
  { id: "aldi", category: "groceries", titleKey: "stayLineAroundAldiTitle", detailKey: "stayLineAroundAldiAddress", icon: "Assets/Icon/logo-aldi.png", href: googleMapsLink("ALDI 6 bis Boulevard de Metz 59100 Roubaix"), times: { walk: 9, drive: 3, transit: 9 }, map: { x: 31, y: 23 } },
  { id: "lidl", category: "groceries", titleKey: "stayLineAroundLidlTitle", detailKey: "stayLineAroundLidlAddress", icon: "Assets/Icon/logo-lidl.png", href: googleMapsLink("Lidl 43 Rue Jules Guesde 59100 Roubaix"), times: { walk: 13, drive: 4, transit: 11 }, map: { x: 46, y: 24 }, listOnly: true },
  { id: "metro", category: "transport", titleKey: "stayLineAroundMetroTitle", detailKey: "stayLineAroundMetroText", icon: "Assets/Icon/metro.png", href: googleMapsLink("Métro Alsace ligne 2 Roubaix"), times: { walk: 13 }, map: { x: 14, y: 68 } },
  { id: "marie", category: "bakery", titleKey: "stayLineAroundMarieTitle", detailKey: "stayLineAroundMarieAddress", icon: "Assets/Icon/logo-marie-blachere.png", href: googleMapsLink("Marie Blachère 4A Rue Albert Premier 59150 Wattrelos"), times: { walk: 19, drive: 6, transit: 16 }, map: { x: 68, y: 22 }, listOnly: true },
  { id: "leclerc", category: "groceries", titleKey: "stayLineAroundLeclercTitle", detailKey: "stayLineAroundLeclercAddress", icon: "Assets/Icon/logo-leclerc.png", href: googleMapsLink("E.Leclerc 21 Bis Grande Rue 59100 Roubaix"), times: { walk: 21, drive: 6, transit: 16 }, map: { x: 67, y: 76 }, listOnly: true },
  { id: "carrefour", category: "groceries", titleKey: "stayLineAroundCarrefourTitle", detailKey: "stayLineAroundCarrefourAddress", icon: "Assets/Icon/logo-carrefour-city.png", href: googleMapsLink("Carrefour City 77 Boulevard de Gaulle 59100 Roubaix"), times: { walk: 21, drive: 6, transit: 16 }, map: { x: 52, y: 74 }, listOnly: true },
  { id: "train", category: "transport", titleKey: "stayLineAroundTrainTitle", detailKey: "stayLineAroundTrainText", icon: "Assets/Icon/train (1).png", href: googleMapsLink("Gare de Roubaix"), times: { transit: 21 }, map: { x: 83, y: 24 }, listOnly: true },
  { id: "charge", category: "other", titleKey: "stayLineAroundChargeTitle", detailKey: "stayLineAroundChargeAddress", icon: "Assets/Icon/charging-station.png", href: googleMapsLink("Iléwatt Charging Station 207 Rue Lacroix 59100 Roubaix"), times: { drive: 4 }, map: { x: 84, y: 40 }, listOnly: true },
  { id: "auchan", category: "groceries", titleKey: "stayLineAroundAuchanTitle", detailKey: "stayLineAroundAuchanAddress", icon: "Assets/Icon/logo-auchan.png", href: googleMapsLink("Auchan Rue Fidèle Lehoucq 59200 Tourcoing"), times: { walk: 46, drive: 11, transit: 26 }, map: { x: 58, y: 84 }, listOnly: true }
];

let activeAroundMode = "walk";
let activeAroundFilter = "all";

let activePage = "welcome";
let activeEquipmentIndex = 7;
let activeEquipmentKey = null;
let activeStayIndex = 0;
let equipmentAutoTimer;
let stayAutoTimer;
let stayScrollAnimation;
let eventsNearbyPayload = null;
let eventsNearbyRefreshTimer;
let eventsHeroTimer;
let eventsHeroSlideTimer;
let activeEventHeroIndex = 0;
let equipmentWheelLock = false;
let discoverPageScrollLock = false;
const stayDefaultDuration = 5600;
const staySlideDurations = {};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const runtimeNavigator = window.navigator || {};
const leanDevice = Boolean(
  reducedMotion.matches
  || window.matchMedia("(max-width: 900px)").matches
  || (runtimeNavigator.deviceMemory && runtimeNavigator.deviceMemory <= 4)
  || (runtimeNavigator.hardwareConcurrency && runtimeNavigator.hardwareConcurrency <= 4)
  || window.matchMedia("(pointer: coarse)").matches
);
root.classList.toggle("is-lean-device", leanDevice);

const locations = {
  Lille: { country: "FR", label: { fr: "Lille", en: "Lille" }, latitude: 50.6292, longitude: 3.0573 },
  Roubaix: { country: "FR", label: { fr: "Roubaix", en: "Roubaix" }, latitude: 50.6927, longitude: 3.1778 },
  "Villeneuve-dAscq": { country: "FR", label: { fr: "Villeneuve-d'Ascq", en: "Villeneuve-d'Ascq" }, latitude: 50.6233, longitude: 3.1443 },
  Dunkerque: { country: "FR", label: { fr: "Dunkerque", en: "Dunkerque" }, latitude: 51.0344, longitude: 2.3768 },
  Bergues: { country: "FR", label: { fr: "Bergues", en: "Bergues" }, latitude: 50.9688, longitude: 2.4324 },
  Bruges: { country: "BE", label: { fr: "Bruges", en: "Brugge" }, latitude: 51.2093, longitude: 3.2247 },
  Gand: { country: "BE", label: { fr: "Gand", en: "Gent" }, latitude: 51.0543, longitude: 3.7174 },
  Bruxelles: { country: "BE", label: { fr: "Bruxelles", en: "Brussel" }, latitude: 50.8503, longitude: 4.3517 },
  Courtrai: { country: "BE", label: { fr: "Courtrai", en: "Kortrijk" }, latitude: 50.8280, longitude: 3.2649 },
  Tournai: { country: "BE", label: { fr: "Tournai", en: "Tournai" }, latitude: 50.6056, longitude: 3.3880 }
};

const discoverCityGuides = {
  Lille: {
    title: "Lille",
    kicker: "Culture · Flemish architecture · Food & nightlife",
    tags: ["Culture", "Flemish architecture", "Food & nightlife"],
    focusSubtitle: "Culture · Old town · Nightlife",
    focusTags: [
      "💕 Romantic stroll",
      "🍻 Night out",
      "🥘 Northern food",
      "📸 Flemish streets"
    ],
    badges: ["Old town", "Museums", "Craft beer", "Easy walk"],
    mustSee: [
      ["Grand'Place & Vieille Bourse", "The heart of Lille: Flemish architecture, cafes and one of the city's most iconic buildings."],
      ["Palais des Beaux-Arts", "One of France's major fine-art museums, right on Place de la Republique."],
      ["Vieux-Lille & Hospice Comtesse", "Cobblestone streets, colourful facades, boutiques and centuries of local history."]
    ],
    food: [
      ["Dinner", "La Petite Table - Estaminet Vieux Lille", "Traditional northern/Flemish atmosphere, cosy and a good introduction to local cuisine."],
      ["Bar", "La Capsule Lille", "Excellent craft-beer bar in Vieux-Lille; relaxed rather than nightclub-style."],
      ["Quick bite", "Bioburger Lille", "Easy mixed-group choice with vegetarian/vegan options."]
    ],
    combo: "Palais des Beaux-Arts → Grand'Place → Vieux-Lille → La Capsule → dinner"
  },
  Roubaix: {
    title: "Roubaix",
    kicker: "Art · Textile heritage · Creative city",
    tags: ["Art", "Textile heritage", "Creative city"],
    focusSubtitle: "Art · Industrial heritage",
    focusTags: [
      "🎨 Art day",
      "🏭 Industrial past",
      "🌿 Quiet escape",
      "☕ Museum & coffee"
    ],
    badges: ["La Piscine", "Brunch stop", "Textile story", "City walk"],
    mustSee: [
      ["La Piscine", "The essential Roubaix visit: an art museum inside a spectacular former Art Deco swimming pool."],
      ["La Manufacture", "Discover how textile production shaped Roubaix and the entire region."],
      ["Parc Barbieux", "A large landscaped park, perfect for a walk between cultural visits."]
    ],
    food: [
      ["Dinner", "La Nonna Ristorante Roubaix", "Cosy Italian dinner; a straightforward choice for mixed groups."],
      ["Bar", "Mercado negro", "Cocktails, tapas and rooftop atmosphere, with vegetarian choices."],
      ["Quick bite", "GARDEN FOOD ROUBAIX", "Poke, salads and quick food; particularly easy for vegetarian guests."]
    ],
    combo: "La Piscine → city centre → Mercado Negro"
  },
  "Villeneuve-dAscq": {
    title: "Villeneuve-d'Ascq",
    kicker: "Modern art · Science · Nature",
    tags: ["Modern art", "Science", "Nature"],
    focusSubtitle: "Modern art · Nature",
    focusTags: [
      "🌿 Nature",
      "🎨 Modern art",
      "👨‍👩‍👧 Family day",
      "🚶 Lake walk"
    ],
    badges: ["Family friendly", "LaM", "Lake walk", "Calm day"],
    mustSee: [
      ["LaM", "Modern, contemporary and outsider art in one of the area's major museums."],
      ["Forum departemental des Sciences", "Interactive science centre, particularly good for families."],
      ["Parc du Heron", "Lake, walking paths and nature right beside the cultural district."]
    ],
    food: [
      ["Dinner", "Rosso & Bianco", "Warm Italian setting, large menu, dinner service and explicit vegetarian options."],
      ["Bar", "Ninkasi Lille - Lezennes", "Beer, cocktails, live music and a casual atmosphere."],
      ["Quick bite", "Dubble Lille Pilaterie", "Bowls and healthy quick meals with veggie-friendly options."]
    ],
    combo: "LaM → Parc du Heron → dinner"
  },
  Dunkerque: {
    title: "Dunkirk",
    kicker: "Sea · WWII history · Flemish coast",
    tags: ["Sea", "WWII history", "Flemish coast"],
    focusSubtitle: "Sea · History",
    focusTags: [
      "🌅 Sea sunset",
      "🌊 Fresh air",
      "⚓ Maritime history",
      "🏖️ Beach day"
    ],
    badges: ["Beach", "Harbour", "Sunset", "Sea air"],
    mustSee: [
      ["Beffroi Saint-Eloi", "The city's landmark tower with panoramic views."],
      ["Musee Maritime & Portuaire", "The best place to understand Dunkirk's deep relationship with its harbour and maritime history."],
      ["Malo-les-Bains", "Beach, promenade and distinctive Belle Epoque seaside villas."]
    ],
    food: [
      ["Dinner", "LE TAJ MAHAL", "Cosy Indian restaurant with a broad menu and clearly identified vegetarian dishes."],
      ["Bar", "Kilimanjaro", "Cocktails, beer, live music and a relaxed waterfront vibe."],
      ["Quick bite", "Crepe Touch Dunkerque", "Customisable galettes, crepes and salads with dedicated vegetarian recipes."]
    ],
    combo: "Beffroi → harbour → Malo-les-Bains → sunset drink"
  },
  Bruges: {
    title: "Bruges",
    kicker: "Medieval · Canals · Romantic",
    tags: ["Medieval", "Canals", "Romantic"],
    focusSubtitle: "Medieval · Romantic",
    focusTags: [
      "💕 Romantic day",
      "🚤 Canals",
      "📸 Postcard view",
      "🕯️ Medieval escape"
    ],
    badges: ["History lovers", "Couples", "Photographers", "Slow travel"],
    mustSee: [
      ["Markt & Belfry", "The iconic postcard view of Bruges; climb the 366 steps if you want the panorama."],
      ["Canals & Rozenhoedkaai", "Walk or take a boat through the medieval centre. Rozenhoedkaai is the classic Bruges photo spot."],
      ["Groeninge Museum", "A major collection of Belgian art and Flemish Primitives, including Van Eyck."]
    ],
    food: [
      ["Dinner", "Den Amand", "Tiny pedestrian square near Markt, cosy setting, and seasonal vegetarian, fish and meat dishes."],
      ["Bar", "NOBLE Bruges", "Cosy cocktail and wine bar in the historic centre."],
      ["Quick bite", "Bohemian Burgers", "Beef, chicken, fish plus five vegetarian alternatives and vegan options."]
    ],
    combo: "Markt → Belfry → canals → Den Amand"
  },
  Bruxelles: {
    title: "Brussels",
    kicker: "Grand architecture · Surrealism · Big-city energy",
    tags: ["Architecture", "Surrealism", "Big-city energy"],
    focusSubtitle: "Capital · Culture",
    focusTags: [
      "🤩 Iconic stop",
      "🍸 City night",
      "🎨 Culture fix",
      "🌍 Big-city buzz"
    ],
    badges: ["Grand-Place", "Magritte", "Jazz bar", "Big city"],
    mustSee: [
      ["Grand-Place & Royal Galleries", "The obvious first stop and the most spectacular historic part of central Brussels."],
      ["Atomium", "The city's unmistakable landmark, created for Expo 58."],
      ["Magritte Museum", "The world's largest collection devoted to Rene Magritte."]
    ],
    food: [
      ["Dinner", "Le Conteur", "Mediterranean/Middle Eastern sharing plates, meat and fish plus lots of vegetarian and vegan dishes."],
      ["Bar", "L'Archiduc", "Historic Art Deco cocktail and jazz bar, memorable for tourists."],
      ["Quick bite", "Pois Chiche", "Falafel, hummus, mezze and plant-based Middle Eastern street food."]
    ],
    combo: "Grand-Place → Royal Galleries → cocktail → dinner"
  },
  Courtrai: {
    title: "Kortrijk / Courtrai",
    kicker: "Easy Belgian escape · Heritage · Shopping",
    tags: ["Heritage", "Shopping", "Belgian escape"],
    focusSubtitle: "Easy Belgian escape",
    focusTags: [
      "🇧🇪 Belgian escape",
      "☕ Cosy afternoon",
      "🛍️ Shopping walk",
      "🏰 History taste"
    ],
    badges: ["UNESCO feel", "Short escape", "Cocktails", "Underrated"],
    mustSee: [
      ["Broel Towers", "The twin medieval towers are the city's best-known landmark."],
      ["Beguinage", "A peaceful UNESCO-listed collection of historic houses with an interpretation centre."],
      ["Grote Markt, Belfry & City Hall", "The historic heart of the city and another UNESCO connection."]
    ],
    food: [
      ["Dinner", "Nude Kortrijk", "Middle Eastern-inspired sharing food, cocktails and vegetarian/vegan choices."],
      ["Bar", "Bar Memoir", "Small, cosy cocktail stop."],
      ["Quick bite", "Paul's Boutique", "Good burger stop with several listed vegetarian options."]
    ],
    combo: "Broel Towers → Beguinage → Grote Markt → dinner"
  },
  Gand: {
    title: "Ghent / Gand",
    kicker: "Medieval · Waterfront · Lively",
    tags: ["Medieval", "Waterfront", "Lively"],
    focusSubtitle: "Medieval · Lively",
    focusTags: [
      "🏰 Medieval mood",
      "🍷 Waterfront",
      "🌙 Night out",
      "🚶 Wander freely"
    ],
    badges: ["Castle", "Waterfront", "Wine bar", "Walkable"],
    mustSee: [
      ["Gravensteen", "A proper medieval castle in the middle of the city."],
      ["St Bavo's Cathedral & Ghent Altarpiece", "Home of Van Eyck's world-famous Adoration of the Mystic Lamb."],
      ["Graslei & Korenlei", "Historic guild houses lining the water; one of the city's best places to wander and sit."]
    ],
    food: [
      ["Dinner", "Royal India Restaurant", "Strong vegetarian, vegan and non-vegetarian choice for mixed groups."],
      ["Bar", "Ona", "Cosy wine bar, much more intimate than a big nightlife venue."],
      ["Quick bite", "Greenway Ghent", "Fast, casual vegan/vegetarian food."]
    ],
    combo: "Gravensteen → Graslei/Korenlei → St Bavo → wine bar"
  },
  Tournai: {
    title: "Tournai",
    kicker: "UNESCO heritage · Architecture · Relaxed",
    tags: ["UNESCO heritage", "Architecture", "Relaxed"],
    focusSubtitle: "Heritage · Relaxed",
    focusTags: [
      "😌 Slow down",
      "🏛️ Architecture",
      "🍷 Wine evening",
      "💕 Quiet date"
    ],
    badges: ["Cathedral", "Belfry", "Wine bar", "Riverside"],
    mustSee: [
      ["Notre-Dame Cathedral & Belfry", "The two UNESCO landmarks that define Tournai's skyline."],
      ["Musee des Beaux-Arts", "Victor Horta architecture with works by Manet, Monet, Seurat and others."],
      ["Pont des Trous & Grand-Place", "Walk along the Scheldt to the medieval water gate, then return to the lively triangular Grand-Place."]
    ],
    food: [
      ["Dinner", "Cannelle et safran", "Cosy, romantic dinner setting with vegetarian choices."],
      ["Bar", "Le Greco - OenoBar", "Vaulted wine-bar atmosphere, Greek wines, cocktails and small plates."],
      ["Quick bite", "Black & White Burger Tournai", "Straightforward fast-food option with vegetarian burgers available."]
    ],
    combo: "Cathedral → Grand-Place → Pont des Trous → OenoBar"
  },
  Bergues: {
    title: "Bergues",
    kicker: "Ramparts · Flemish charm · Bienvenue chez les Ch'tis",
    tags: ["Ramparts", "Flemish charm", "Seasonal gem"],
    focusSubtitle: "Ch'tis · Ramparts · Best spring–autumn",
    focusTags: [
      "🎬 Movie mood",
      "🍟 Ch'ti stop",
      "🌿 Country escape",
      "🚶 Ramparts walk"
    ],
    badges: ["Best spring → autumn", "Ramparts", "Friterie", "Film streets"],
    mustSee: [
      ["Ramparts", "The best year-round activity: walk Vauban's fortifications around the old town."],
      ["Grand-Place & Belfry", "The city's recognisable centre and one of its defining landmarks."],
      ["Ch'tis film locations", "A fun reason to explore the streets if guests know Bienvenue chez les Ch'tis."]
    ],
    food: [
      ["Dinner", "La Taverne Vauban", "Traditional setting in the old guard room; vegetarian preparations are possible on request."],
      ["Cafe", "Cafe de la Poste", "Perfectly suited to the town-centre/Beffroi atmosphere."],
      ["Quick bite", "Snack Friterie Bergues", "Simple northern friterie food, with vegetarian choices."]
    ],
    combo: "Ramparts → Grand-Place → Belfry → frites"
  }
};

const discoverCityGuidesFr = {
  Lille: {
    title: "Lille",
    kicker: "Culture · architecture flamande · cuisine & soirées",
    tags: ["Culture", "Architecture flamande", "Cuisine & soirées"],
    focusSubtitle: "Culture · vieille ville · soirées",
    focusTags: ["💕 Balade romantique", "🍻 Soirée dehors", "🥘 Cuisine du Nord", "📸 Rues flamandes"],
    badges: ["Vieille ville", "Musées", "Bières artisanales", "Balade facile"],
    mustSee: [
      ["Grand'Place & Vieille Bourse", "Le coeur de Lille : architecture flamande, cafés et l'un des bâtiments les plus iconiques de la ville."],
      ["Palais des Beaux-Arts", "L'un des grands musées des beaux-arts en France, directement sur la place de la République."],
      ["Vieux-Lille & Hospice Comtesse", "Rues pavées, façades colorées, boutiques et plusieurs siècles d'histoire locale."]
    ],
    food: [
      ["Dîner", "La Petite Table - Estaminet Vieux Lille", "Ambiance flamande et nordiste traditionnelle, cosy et parfaite pour découvrir la cuisine locale."],
      ["Bar", "La Capsule Lille", "Très bon bar à bières artisanales dans le Vieux-Lille, détendu plutôt que club."],
      ["Sur le pouce", "Bioburger Lille", "Choix simple pour un groupe mixte, avec options végétariennes et vegan."]
    ],
    combo: "Palais des Beaux-Arts → Grand'Place → Vieux-Lille → La Capsule → dîner"
  },
  Roubaix: {
    title: "Roubaix",
    kicker: "Art · patrimoine textile · ville créative",
    tags: ["Art", "Patrimoine textile", "Ville créative"],
    focusSubtitle: "Art · patrimoine industriel",
    focusTags: ["🎨 Journée art", "🏭 Passé industriel", "🌿 Pause calme", "☕ Musée & café"],
    badges: ["La Piscine", "Pause brunch", "Histoire textile", "Balade urbaine"],
    mustSee: [
      ["La Piscine", "La visite incontournable de Roubaix : un musée d'art dans une ancienne piscine Art déco spectaculaire."],
      ["La Manufacture", "Pour comprendre comment le textile a façonné Roubaix et toute la région."],
      ["Parc Barbieux", "Un grand parc paysager, parfait pour marcher entre deux visites culturelles."]
    ],
    food: [
      ["Dîner", "La Nonna Ristorante Roubaix", "Dîner italien chaleureux, simple et pratique pour un groupe mixte."],
      ["Bar", "Mercado negro", "Cocktails, tapas et ambiance rooftop, avec des choix végétariens."],
      ["Sur le pouce", "GARDEN FOOD ROUBAIX", "Poke, salades et repas rapides, très pratique pour les voyageurs végétariens."]
    ],
    combo: "La Piscine → centre-ville → Mercado Negro"
  },
  "Villeneuve-dAscq": {
    title: "Villeneuve-d'Ascq",
    kicker: "Art moderne · sciences · nature",
    tags: ["Art moderne", "Sciences", "Nature"],
    focusSubtitle: "Art moderne · nature",
    focusTags: ["🌿 Nature", "🎨 Art moderne", "👨‍👩‍👧 Journée famille", "🚶 Balade au lac"],
    badges: ["Famille", "LaM", "Balade au lac", "Journée calme"],
    mustSee: [
      ["LaM", "Art moderne, contemporain et brut dans l'un des grands musées de la métropole."],
      ["Forum départemental des Sciences", "Centre de sciences interactif, particulièrement adapté aux familles."],
      ["Parc du Héron", "Lac, chemins de balade et nature juste à côté du quartier culturel."]
    ],
    food: [
      ["Dîner", "Rosso & Bianco", "Cadre italien chaleureux, grande carte et options végétariennes explicites."],
      ["Bar", "Ninkasi Lille - Lezennes", "Bières, cocktails, musique live et ambiance décontractée."],
      ["Sur le pouce", "Dubble Lille Pilaterie", "Bowls et repas rapides équilibrés, avec options veggie."]
    ],
    combo: "LaM → Parc du Héron → dîner"
  },
  Dunkerque: {
    title: "Dunkerque",
    kicker: "Mer · histoire WWII · côte flamande",
    tags: ["Mer", "Histoire WWII", "Côte flamande"],
    focusSubtitle: "Mer · histoire",
    focusTags: ["🌅 Coucher de soleil", "🌊 Grand air", "⚓ Histoire maritime", "🏖️ Journée plage"],
    badges: ["Plage", "Port", "Coucher de soleil", "Air marin"],
    mustSee: [
      ["Beffroi Saint-Éloi", "La tour emblématique de la ville, avec vue panoramique."],
      ["Musée Maritime & Portuaire", "Le meilleur endroit pour comprendre le lien profond entre Dunkerque, son port et la mer."],
      ["Malo-les-Bains", "Plage, promenade et villas balnéaires Belle Époque."]
    ],
    food: [
      ["Dîner", "LE TAJ MAHAL", "Restaurant indien cosy, grande carte et plats végétariens clairement identifiés."],
      ["Bar", "Kilimanjaro", "Cocktails, bière, musique live et ambiance détendue côté front de mer."],
      ["Sur le pouce", "Crêpe Touch Dunkerque", "Galettes, crêpes et salades personnalisables, avec recettes végétariennes dédiées."]
    ],
    combo: "Beffroi → port → Malo-les-Bains → verre au coucher du soleil"
  },
  Bruges: {
    title: "Bruges",
    kicker: "Médiéval · canaux · romantique",
    tags: ["Médiéval", "Canaux", "Romantique"],
    focusSubtitle: "Médiéval · romantique",
    focusTags: ["💕 Journée romantique", "🚤 Canaux", "📸 Vue carte postale", "🕯️ Parenthèse médiévale"],
    badges: ["Histoire", "Couples", "Photos", "Voyage lent"],
    mustSee: [
      ["Markt & Beffroi", "La vue iconique de Bruges ; grimpez les 366 marches si vous voulez le panorama."],
      ["Canaux & Rozenhoedkaai", "Marchez ou prenez un bateau dans le centre médiéval. Rozenhoedkaai est le spot photo classique."],
      ["Groeninge Museum", "Grande collection d'art belge et de primitifs flamands, dont Van Eyck."]
    ],
    food: [
      ["Dîner", "Den Amand", "Petite place piétonne près du Markt, cadre cosy et plats de saison végétariens, poisson ou viande."],
      ["Bar", "NOBLE Bruges", "Bar à cocktails et vins cosy dans le centre historique."],
      ["Sur le pouce", "Bohemian Burgers", "Boeuf, poulet, poisson, cinq alternatives végétariennes et options vegan."]
    ],
    combo: "Markt → Beffroi → canaux → Den Amand"
  },
  Bruxelles: {
    title: "Bruxelles",
    kicker: "Grande architecture · surréalisme · énergie de capitale",
    tags: ["Architecture", "Surréalisme", "Énergie de capitale"],
    focusSubtitle: "Capitale · culture",
    focusTags: ["🤩 Incontournable", "🍸 Soirée en ville", "🎨 Dose de culture", "🌍 Énergie urbaine"],
    badges: ["Grand-Place", "Magritte", "Bar jazz", "Grande ville"],
    mustSee: [
      ["Grand-Place & Galeries Royales", "Le premier arrêt évident et le coeur historique le plus spectaculaire de Bruxelles."],
      ["Atomium", "Le monument immédiatement reconnaissable de la ville, créé pour l'Expo 58."],
      ["Musée Magritte", "La plus grande collection au monde consacrée à René Magritte."]
    ],
    food: [
      ["Dîner", "Le Conteur", "Plats méditerranéens et moyen-orientaux à partager, avec beaucoup de choix végétariens et vegan."],
      ["Bar", "L'Archiduc", "Bar à cocktails et jazz Art déco historique, mémorable pour les visiteurs."],
      ["Sur le pouce", "Pois Chiche", "Falafels, houmous, mezzés et street food moyen-orientale végétale."]
    ],
    combo: "Grand-Place → Galeries Royales → cocktail → dîner"
  },
  Courtrai: {
    title: "Courtrai / Kortrijk",
    kicker: "Escapade belge facile · patrimoine · shopping",
    tags: ["Patrimoine", "Shopping", "Escapade belge"],
    focusSubtitle: "Escapade belge facile",
    focusTags: ["🇧🇪 Escapade belge", "☕ Après-midi cosy", "🛍️ Balade shopping", "🏰 Touche d'histoire"],
    badges: ["Ambiance UNESCO", "Courte escapade", "Cocktails", "Sous-cotée"],
    mustSee: [
      ["Tours du Broel", "Les deux tours médiévales sont le monument le plus connu de la ville."],
      ["Béguinage", "Ensemble paisible de maisons historiques classées UNESCO, avec centre d'interprétation."],
      ["Grote Markt, Beffroi & Hôtel de Ville", "Le coeur historique de la ville et une autre connexion UNESCO."]
    ],
    food: [
      ["Dîner", "Nude Kortrijk", "Cuisine d'inspiration moyen-orientale à partager, cocktails et choix végétariens/vegan."],
      ["Bar", "Bar Memoir", "Petit bar à cocktails cosy."],
      ["Sur le pouce", "Paul's Boutique", "Bonne adresse burgers avec plusieurs options végétariennes."]
    ],
    combo: "Tours du Broel → Béguinage → Grote Markt → dîner"
  },
  Gand: {
    title: "Gand",
    kicker: "Médiéval · quais · vivant",
    tags: ["Médiéval", "Quais", "Vivant"],
    focusSubtitle: "Médiéval · vivant",
    focusTags: ["🏰 Ambiance médiévale", "🍷 Quais", "🌙 Soirée belge", "🚶 Balade libre"],
    badges: ["Château", "Bord de l'eau", "Bar à vin", "À pied"],
    mustSee: [
      ["Gravensteen", "Un vrai château médiéval au milieu de la ville."],
      ["Cathédrale Saint-Bavon & Agneau mystique", "La cathédrale abrite le chef-d'oeuvre mondialement connu de Van Eyck."],
      ["Graslei & Korenlei", "Maisons de guildes historiques au bord de l'eau ; l'un des meilleurs endroits pour flâner."]
    ],
    food: [
      ["Dîner", "Royal India Restaurant", "Large choix végétarien, vegan et non végétarien, pratique pour un groupe mixte."],
      ["Bar", "Ona", "Bar à vin cosy, plus intime qu'un grand lieu de sortie."],
      ["Sur le pouce", "Greenway Ghent", "Cuisine rapide végétarienne et vegan."]
    ],
    combo: "Gravensteen → Graslei/Korenlei → Saint-Bavon → bar à vin"
  },
  Tournai: {
    title: "Tournai",
    kicker: "Patrimoine UNESCO · architecture · détente",
    tags: ["Patrimoine UNESCO", "Architecture", "Détente"],
    focusSubtitle: "Patrimoine · détente",
    focusTags: ["😌 Ralentir", "🏛️ Architecture", "🍷 Soirée vin", "💕 Rendez-vous calme"],
    badges: ["Cathédrale", "Beffroi", "Bar à vin", "Bord d'Escaut"],
    mustSee: [
      ["Cathédrale Notre-Dame & Beffroi", "Les deux monuments UNESCO qui dessinent la silhouette de Tournai."],
      ["Musée des Beaux-Arts", "Architecture de Victor Horta, avec des oeuvres de Manet, Monet, Seurat et d'autres."],
      ["Pont des Trous & Grand-Place", "Marchez le long de l'Escaut jusqu'à la porte d'eau médiévale, puis revenez vers la Grand-Place."]
    ],
    food: [
      ["Dîner", "Cannelle et safran", "Cadre cosy et romantique, avec choix végétariens."],
      ["Bar", "Le Greco - OenoBar", "Ambiance cave voûtée, vins grecs, cocktails et petites assiettes."],
      ["Sur le pouce", "Black & White Burger Tournai", "Option rapide simple, avec burgers végétariens disponibles."]
    ],
    combo: "Cathédrale → Grand-Place → Pont des Trous → OenoBar"
  },
  Bergues: {
    title: "Bergues",
    kicker: "Remparts · charme flamand · Bienvenue chez les Ch'tis",
    tags: ["Remparts", "Charme flamand", "Belle saison"],
    focusSubtitle: "Ch'tis · remparts · idéal printemps-automne",
    focusTags: ["🎬 Ambiance cinéma", "🍟 Pause ch'ti", "🌿 Escapade campagne", "🚶 Tour des remparts"],
    badges: ["Idéal printemps → automne", "Remparts", "Friterie", "Rues du film"],
    mustSee: [
      ["Remparts", "La meilleure activité en toute saison : marcher sur les fortifications Vauban autour de la vieille ville."],
      ["Grand-Place & Beffroi", "Le centre reconnaissable de la ville et l'un de ses repères principaux."],
      ["Lieux de tournage des Ch'tis", "Une raison amusante d'explorer les rues si les voyageurs connaissent Bienvenue chez les Ch'tis."]
    ],
    food: [
      ["Dîner", "La Taverne Vauban", "Cadre traditionnel dans l'ancien corps de garde ; préparations végétariennes possibles sur demande."],
      ["Café", "Café de la Poste", "Très adapté à l'ambiance centre-ville/Beffroi."],
      ["Sur le pouce", "Snack Friterie Bergues", "Friterie du Nord simple, avec choix végétariens."]
    ],
    combo: "Remparts → Grand-Place → Beffroi → frites"
  }
};

const routeVisuals = {
  city: "Assets/Image/Lille.webp",
  park: "Assets/Image/Discover/Routes/parc-barbieux.jpg",
  canal: "Assets/Image/Discover/Routes/canal-de-roubaix.webp",
  nature: "Assets/Image/Discover/Routes/val-de-marque.jpg",
  coast: "Assets/Image/Discover/Routes/val-de-marque.jpg"
};

const routeImages = {
  lilleWalk: "Assets/Image/Discover/Routes/route-lille-vieux-lille.jpg",
  lilleBike: "Assets/Image/Discover/Routes/route-lille-deule-bike.webp",
  lilleHike: "Assets/Image/Discover/Routes/route-lille-citadelle.jpg",
  roubaixWalk: "Assets/Image/Discover/Routes/route-roubaix-parc-barbieux.jpg",
  roubaixBike: "Assets/Image/Discover/Routes/route-roubaix-canal.jpg",
  roubaixHike: "Assets/Image/Discover/Routes/route-val-de-marque.jpg",
  villeneuveWalk: "Assets/Image/Discover/Routes/route-villeneuve-lac-heron.jpg",
  villeneuveBike: "Assets/Image/Discover/Routes/route-villeneuve-marque-bike.webp",
  villeneuveHike: "Assets/Image/Discover/Routes/route-villeneuve-val-marque.jpg",
  berguesWalk: "Assets/Image/Discover/Routes/route-bergues-remparts.jpg",
  berguesBike: "Assets/Image/Discover/Routes/route-bergues-flanders-bike.jpg",
  berguesHike: "Assets/Image/Discover/Routes/route-bergues-canal-bois.jpg",
  dunkerqueWalk: "Assets/Image/Discover/Routes/route-dunkerque-malo.jpg",
  dunkerqueBike: "Assets/Image/Discover/Routes/route-dunkerque-velomaritime.jpg",
  dunkerqueHike: "Assets/Image/Discover/Routes/route-dunkerque-dunes.jpg",
  brugesWalk: "Assets/Image/Discover/Routes/route-bruges-ramparts-windmill.jpg",
  brugesBike: "Assets/Image/Discover/Routes/route-bruges-castles-bike.png",
  brugesHike: "Assets/Image/Discover/Routes/route-bruges-castles-walk.webp",
  bruxellesWalk: "Assets/Image/Discover/Routes/route-brussels-galleries.jpg",
  bruxellesBike: "Assets/Image/Discover/Routes/route-brussels-promenade-verte.jpg",
  bruxellesHike: "Assets/Image/Discover/Routes/route-brussels-sonian-forest.jpg",
  courtraiWalk: "Assets/Image/Discover/Routes/route-kortrijk-broel.jpg",
  courtraiBike: "Assets/Image/Discover/Routes/route-kortrijk-bike.jpg",
  courtraiHike: "Assets/Image/Discover/Routes/route-kortrijk-preshoekbos.jpg",
  gandWalk: "Assets/Image/Discover/Routes/route-ghent-gravensteen.jpg",
  gandBike: "Assets/Image/Discover/Routes/route-ghent-cycling.jpg",
  gandHike: "Assets/Image/Discover/Routes/route-ghent-bourgoyen.jpg",
  tournaiWalk: "Assets/Image/Discover/Routes/route-tournai-escaut.jpg",
  tournaiBike: "Assets/Image/Discover/Routes/route-tournai-bike.jpg",
  tournaiHike: "Assets/Image/Discover/Routes/route-tournai-mont-saint-aubert.jpg"
};

const discoverRouteGuides = {
  Lille: [
    { mode: "walk", title: "Vieux-Lille City Walk", place: "Lille", text: "Cobbled streets, colourful facades and hidden squares through Lille's most charming neighbourhood.", distance: "4 km", time: "1-1.5 h", level: "Easy", format: "Loop", bestFor: "Architecture · First visit · City vibes", image: routeImages.lilleWalk },
    { mode: "bike", title: "Tour du Grand Lille", place: "Lille", text: "A full metropolitan loop mixing the Deule, parks, neighbourhoods, countryside and urban heritage.", distance: "50 km", time: "3-4 h", level: "Easy-Moderate", format: "Loop", bestFor: "Full day · Variety · Active travellers", image: routeImages.lilleBike },
    { mode: "hike", title: "Citadelle & Deule", place: "Lille", text: "Leave the busy streets behind for woodland paths, riverside views and the green surroundings of Lille's Citadel.", distance: "6-8 km", time: "1.5-2 h", level: "Easy", format: "Loop", bestFor: "Nature · Relaxed pace · Couples", image: routeImages.lilleHike }
  ],
  Roubaix: [
    { mode: "walk", title: "Parc Barbieux", place: "Roubaix", text: "A peaceful walk through landscaped gardens, lakes, lawns and remarkable trees.", distance: "4-5 km", time: "1-1.5 h", level: "Easy", format: "Loop", bestFor: "Gardens · Couples · Relaxed", image: routeImages.roubaixWalk },
    { mode: "bike", title: "Canal de Roubaix", place: "Roubaix", text: "Follow the towpath through greenery, waterways and Roubaix's industrial heritage. Turn back whenever you like.", distance: "10-20 km", time: "1-2 h", level: "Easy", format: "Out & back", bestFor: "Waterside · Heritage · Easy ride", image: routeImages.roubaixBike },
    { mode: "hike", title: "Val de Marque", place: "Roubaix", text: "A greener escape through wetlands, woodland and wildlife along the Marque valley.", distance: "8-12 km", time: "2-3 h", level: "Easy-Moderate", format: "Nature walk", bestFor: "Wildlife · Quiet · Nature", image: routeImages.roubaixHike }
  ],
  "Villeneuve-dAscq": [
    { mode: "walk", title: "Chain of Lakes", place: "Villeneuve-d'Ascq", text: "Follow the lakes around the Heron area through one of the greenest parts of the Lille metropolitan area.", distance: "6-8 km", time: "1.5-2 h", level: "Easy", format: "Loop", bestFor: "Lakes · Birds · Families", image: routeImages.villeneuveWalk },
    { mode: "bike", title: "Heron → Marque → Roubaix", place: "Villeneuve-d'Ascq", text: "Ride from the Lac du Heron along the Marque before joining the Canal de Roubaix and its greenways.", distance: "15-20 km", time: "2 h", level: "Easy", format: "One way", bestFor: "Water · Nature · Easy cycling", image: routeImages.villeneuveBike },
    { mode: "hike", title: "Val de Marque", place: "Villeneuve-d'Ascq", text: "Woodland, wetlands, birds and peaceful trails just outside the urban centre.", distance: "8-12 km", time: "2-3 h", level: "Easy-Moderate", format: "Nature walk", bestFor: "Wildlife · Photography · Escape", image: routeImages.roubaixHike }
  ],
  Bergues: [
    { mode: "walk", title: "Bergues Ramparts", place: "Bergues", text: "Circle the fortified town along remarkably preserved medieval and Vauban ramparts.", distance: "5.3 km", time: "1-1.5 h", level: "Easy", format: "Loop", bestFor: "History · Views · First visit", image: routeImages.berguesWalk },
    { mode: "bike", title: "Bergues → Dunkirk", place: "Bergues", text: "Leave the fortified town and ride towards Dunkirk through canals, countryside and the Flanders cycling network.", distance: "20 km return", time: "1.5-2 h", level: "Easy", format: "Out & back", bestFor: "Countryside · Canal · Easy ride", image: routeImages.berguesBike },
    { mode: "hike", title: "Canal & Bois des Forts", place: "Bergues", text: "Extend your escape beyond the ramparts towards peaceful waterways and the wooded landscapes around Bergues.", distance: "10-12 km", time: "2.5-3 h", level: "Easy-Moderate", format: "Nature walk", bestFor: "Quiet · Countryside · Nature", image: routeImages.berguesHike }
  ],
  Dunkerque: [
    { mode: "walk", title: "Malo-les-Bains Seafront", place: "Dunkirk", text: "Walk along the beach and promenade between colourful seaside villas, cafes and endless North Sea views.", distance: "5 km", time: "1-1.5 h", level: "Easy", format: "Out & back", bestFor: "Sea · Sunset · Relaxed", image: routeImages.dunkerqueWalk },
    { mode: "bike", title: "Dunes & History", place: "Dunkirk", text: "Ride between Dunkirk, the coast and the Dunes de Flandre through maritime landscapes and WWII heritage.", distance: "11-14 km", time: "1-1.5 h", level: "Easy", format: "Loop", bestFor: "Coast · History · Families", image: routeImages.dunkerqueBike },
    { mode: "hike", title: "Dunes de Flandre", place: "Dunkirk", text: "Leave the city for sand dunes, wild beaches and protected coastal landscapes towards Zuydcoote and Bray-Dunes.", distance: "8-12 km", time: "2-3 h", level: "Moderate", format: "Hike", bestFor: "Sea · Wild nature · Fresh air", image: routeImages.dunkerqueHike }
  ],
  Bruges: [
    { mode: "walk", title: "City Ramparts", place: "Bruges", text: "Circle Bruges through its green belt of medieval gates, windmills, canals and more than 3,000 trees.", distance: "7 km", time: "1.5 h", level: "Easy", format: "Loop", bestFor: "History · Greenery · Photography", image: routeImages.brugesWalk },
    { mode: "bike", title: "Green Belt Bruges", place: "Bruges", text: "Escape the tourist centre through forests, castle parks, canals, villages and open Flemish countryside.", distance: "53 km", time: "3-4 h", level: "Moderate", format: "Loop", bestFor: "Full day · Countryside · Castles", image: routeImages.brugesBike },
    { mode: "hike", title: "Three Castles Walk", place: "Bruges", text: "Explore the quieter hinterland of Bruges through woodland, estates and historic castle landscapes.", distance: "2-3 h", time: "2-3 h", level: "Easy-Moderate", format: "Loop", bestFor: "Forest · Castles · Slow travel", image: routeImages.brugesHike }
  ],
  Bruxelles: [
    { mode: "walk", title: "Historic Brussels", place: "Brussels", text: "Link Grand-Place, the Royal Galleries, Mont des Arts and the Royal Quarter on foot.", distance: "4-5 km", time: "1.5 h", level: "Easy", format: "Loop", bestFor: "Architecture · First visit · Culture", image: routeImages.bruxellesWalk },
    { mode: "bike", title: "Promenade Verte", place: "Brussels", text: "Brussels' huge green loop is divided into sections, so simply choose the part that matches your energy.", distance: "5-12 km", time: "45-90 min", level: "Easy", format: "Flexible", bestFor: "Parks · Local Brussels · Flexible ride", image: routeImages.bruxellesBike },
    { mode: "hike", title: "Sonian Forest", place: "Brussels", text: "Swap the European capital for ancient woodland, long forest paths and remarkable beech trees.", distance: "8-12 km", time: "2-3 h", level: "Easy-Moderate", format: "Forest", bestFor: "Forest · Silence · Full escape", image: routeImages.bruxellesHike }
  ],
  Courtrai: [
    { mode: "walk", title: "Leie & Historic Centre", place: "Kortrijk", text: "Walk from the Broel Towers along the lowered riverbanks towards the Beguinage and Grote Markt.", distance: "4 km", time: "1 h", level: "Easy", format: "Loop", bestFor: "Heritage · River · First visit", image: routeImages.courtraiWalk },
    { mode: "bike", title: "Kortrijk Icons Route", place: "Kortrijk", text: "A curated ride connecting the architectural and cultural icons of Kortrijk and its surroundings.", distance: "37.5 km", time: "2.5-3 h", level: "Easy-Moderate", format: "Loop", bestFor: "Architecture · City + countryside · Full ride", image: routeImages.courtraiBike },
    { mode: "hike", title: "Preshoekbos", place: "Kortrijk", text: "Over 140 hectares of forest with peaceful walking paths, wildlife and more adventurous trails.", distance: "6-10 km", time: "1.5-2.5 h", level: "Easy-Moderate", format: "Nature walk", bestFor: "Forest · Wildlife · Quiet", image: routeImages.courtraiHike }
  ],
  Gand: [
    { mode: "walk", title: "Ghent's Quirky Charm", place: "Ghent", text: "See the Castle of the Counts, Graslei, Korenlei, the three towers and Patershol in one compact city walk.", distance: "4.2 km", time: "1-1.5 h", level: "Easy", format: "Loop", bestFor: "First visit · Medieval Ghent · Photography", image: routeImages.gandWalk },
    { mode: "bike", title: "Gentse Fietsen Route", place: "Ghent", text: "Discover Ghent beyond the historic centre through neighbourhoods, waterways, parks and local favourites.", distance: "37 km", time: "2.5-3 h", level: "Moderate", format: "Loop", bestFor: "Local Ghent · Full ride · Variety", image: routeImages.gandBike },
    { mode: "hike", title: "Bourgoyen-Ossemeersen", place: "Ghent", text: "Wetlands, birdlife and peaceful pedestrian trails just outside Ghent's historic centre.", distance: "5-8 km", time: "1.5-2 h", level: "Easy", format: "Nature walk", bestFor: "Birds · Nature · Quiet", image: routeImages.gandHike }
  ],
  Tournai: [
    { mode: "walk", title: "Along the Escaut", place: "Tournai", text: "Follow Tournai's riverside audio walk through the city's history, architecture and changing relationship with the Escaut.", distance: "3-5 km", time: "1-1.5 h", level: "Easy", format: "Riverside", bestFor: "Riverside · History · Slow walk", image: routeImages.tournaiWalk },
    { mode: "bike", title: "Tournai en Roues Libres", place: "Tournai", text: "Use Tournai's official cycle-node network to leave the historic centre for villages, countryside and the RAVeL.", distance: "15-30 km", time: "1.5-3 h", level: "Easy-Moderate", format: "Flexible", bestFor: "Countryside · Flexible ride · Belgian villages", image: routeImages.tournaiBike },
    { mode: "hike", title: "Mont-Saint-Aubert", place: "Tournai", text: "Climb into the hills above Tournai for woodland paths, countryside and panoramic views across the Escaut valley.", distance: "8-12 km", time: "2-3 h", level: "Moderate", format: "Hike", bestFor: "Views · Hills · Real hike", image: routeImages.tournaiHike }
  ]
};

const discoverRouteGuidesFr = {
  Lille: [
    { mode: "walk", title: "Balade dans le Vieux-Lille", place: "Lille", text: "Rues pavées, façades colorées et places cachées dans le quartier le plus charmant de Lille.", distance: "4 km", time: "1-1,5 h", level: "Facile", format: "Boucle", bestFor: "Architecture · Première visite · Ambiance ville", image: routeImages.lilleWalk },
    { mode: "bike", title: "Tour du Grand Lille", place: "Lille", text: "Grande boucle métropolitaine mêlant Deûle, parcs, quartiers, campagne et patrimoine urbain.", distance: "50 km", time: "3-4 h", level: "Facile-modéré", format: "Boucle", bestFor: "Journée complète · Variété · Voyageurs actifs", image: routeImages.lilleBike },
    { mode: "hike", title: "Citadelle & Deûle", place: "Lille", text: "Quittez les rues animées pour les chemins boisés, les vues au bord de l'eau et les abords verts de la Citadelle.", distance: "6-8 km", time: "1,5-2 h", level: "Facile", format: "Boucle", bestFor: "Nature · Rythme doux · Couples", image: routeImages.lilleHike }
  ],
  Roubaix: [
    { mode: "walk", title: "Parc Barbieux", place: "Roubaix", text: "Une balade paisible entre jardins paysagers, lacs, pelouses et arbres remarquables.", distance: "4-5 km", time: "1-1,5 h", level: "Facile", format: "Boucle", bestFor: "Jardins · Couples · Détente", image: routeImages.roubaixWalk },
    { mode: "bike", title: "Canal de Roubaix", place: "Roubaix", text: "Suivez le chemin de halage entre verdure, canaux et patrimoine industriel de Roubaix. Demi-tour quand vous voulez.", distance: "10-20 km", time: "1-2 h", level: "Facile", format: "Aller-retour", bestFor: "Bord de l'eau · Patrimoine · Vélo facile", image: routeImages.roubaixBike },
    { mode: "hike", title: "Val de Marque", place: "Roubaix", text: "Une échappée verte entre zones humides, bois et faune le long de la vallée de la Marque.", distance: "8-12 km", time: "2-3 h", level: "Facile-modéré", format: "Balade nature", bestFor: "Faune · Calme · Nature", image: routeImages.roubaixHike }
  ],
  "Villeneuve-dAscq": [
    { mode: "walk", title: "Chaîne des lacs", place: "Villeneuve-d'Ascq", text: "Suivez les lacs autour du Héron dans l'un des coins les plus verts de la métropole lilloise.", distance: "6-8 km", time: "1,5-2 h", level: "Facile", format: "Boucle", bestFor: "Lacs · Oiseaux · Familles", image: routeImages.villeneuveWalk },
    { mode: "bike", title: "Héron → Marque → Roubaix", place: "Villeneuve-d'Ascq", text: "Partez du lac du Héron, longez la Marque puis rejoignez le Canal de Roubaix et ses voies vertes.", distance: "15-20 km", time: "2 h", level: "Facile", format: "Aller simple", bestFor: "Eau · Nature · Vélo facile", image: routeImages.villeneuveBike },
    { mode: "hike", title: "Val de Marque", place: "Villeneuve-d'Ascq", text: "Bois, zones humides, oiseaux et chemins calmes juste hors du centre urbain.", distance: "8-12 km", time: "2-3 h", level: "Facile-modéré", format: "Balade nature", bestFor: "Faune · Photo · Évasion", image: routeImages.roubaixHike }
  ],
  Bergues: [
    { mode: "walk", title: "Remparts de Bergues", place: "Bergues", text: "Faites le tour de la ville fortifiée le long de remparts médiévaux et Vauban remarquablement conservés.", distance: "5,3 km", time: "1-1,5 h", level: "Facile", format: "Boucle", bestFor: "Histoire · Vues · Première visite", image: routeImages.berguesWalk },
    { mode: "bike", title: "Bergues → Dunkerque", place: "Bergues", text: "Quittez la ville fortifiée vers Dunkerque par les canaux, la campagne et le réseau cyclable des Flandres.", distance: "20 km aller-retour", time: "1,5-2 h", level: "Facile", format: "Aller-retour", bestFor: "Campagne · Canal · Vélo facile", image: routeImages.berguesBike },
    { mode: "hike", title: "Canal & Bois des Forts", place: "Bergues", text: "Prolongez l'échappée au-delà des remparts vers des voies d'eau calmes et les paysages boisés autour de Bergues.", distance: "10-12 km", time: "2,5-3 h", level: "Facile-modéré", format: "Balade nature", bestFor: "Calme · Campagne · Nature", image: routeImages.berguesHike }
  ],
  Dunkerque: [
    { mode: "walk", title: "Front de mer de Malo-les-Bains", place: "Dunkerque", text: "Marchez le long de la plage et de la promenade entre villas colorées, cafés et vues sur la mer du Nord.", distance: "5 km", time: "1-1,5 h", level: "Facile", format: "Aller-retour", bestFor: "Mer · Coucher de soleil · Détente", image: routeImages.dunkerqueWalk },
    { mode: "bike", title: "Dunes & histoire", place: "Dunkerque", text: "Roulez entre Dunkerque, la côte et les Dunes de Flandre, entre paysages maritimes et mémoire WWII.", distance: "11-14 km", time: "1-1,5 h", level: "Facile", format: "Boucle", bestFor: "Côte · Histoire · Familles", image: routeImages.dunkerqueBike },
    { mode: "hike", title: "Dunes de Flandre", place: "Dunkerque", text: "Quittez la ville pour les dunes, plages sauvages et paysages côtiers protégés vers Zuydcoote et Bray-Dunes.", distance: "8-12 km", time: "2-3 h", level: "Modéré", format: "Randonnée", bestFor: "Mer · Nature sauvage · Grand air", image: routeImages.dunkerqueHike }
  ],
  Bruges: [
    { mode: "walk", title: "Remparts de Bruges", place: "Bruges", text: "Faites le tour de Bruges par sa ceinture verte : portes médiévales, moulins, canaux et milliers d'arbres.", distance: "7 km", time: "1,5 h", level: "Facile", format: "Boucle", bestFor: "Histoire · Verdure · Photo", image: routeImages.brugesWalk },
    { mode: "bike", title: "Ceinture verte de Bruges", place: "Bruges", text: "Échappez au centre touristique par forêts, parcs de châteaux, canaux, villages et campagne flamande.", distance: "53 km", time: "3-4 h", level: "Modéré", format: "Boucle", bestFor: "Journée complète · Campagne · Châteaux", image: routeImages.brugesBike },
    { mode: "hike", title: "Balade des trois châteaux", place: "Bruges", text: "Explorez l'arrière-pays plus calme de Bruges entre bois, domaines et paysages de châteaux.", distance: "8-10 km", time: "2-3 h", level: "Facile-modéré", format: "Boucle", bestFor: "Forêt · Châteaux · Voyage lent", image: routeImages.brugesHike }
  ],
  Bruxelles: [
    { mode: "walk", title: "Bruxelles historique", place: "Bruxelles", text: "Reliez à pied la Grand-Place, les Galeries Royales, le Mont des Arts et le Quartier Royal.", distance: "4-5 km", time: "1,5 h", level: "Facile", format: "Boucle", bestFor: "Architecture · Première visite · Culture", image: routeImages.bruxellesWalk },
    { mode: "bike", title: "Promenade Verte", place: "Bruxelles", text: "La grande boucle verte de Bruxelles est découpée en sections : choisissez simplement celle qui correspond à votre énergie.", distance: "5-12 km", time: "45-90 min", level: "Facile", format: "Flexible", bestFor: "Parcs · Bruxelles locale · Sortie flexible", image: routeImages.bruxellesBike },
    { mode: "hike", title: "Forêt de Soignes", place: "Bruxelles", text: "Échangez la capitale européenne contre une forêt ancienne, de longs chemins et de remarquables hêtres.", distance: "8-12 km", time: "2-3 h", level: "Facile-modéré", format: "Forêt", bestFor: "Forêt · Silence · Grande évasion", image: routeImages.bruxellesHike }
  ],
  Courtrai: [
    { mode: "walk", title: "Lys & centre historique", place: "Courtrai", text: "Marchez des Tours du Broel aux berges abaissées de la Lys, puis vers le Béguinage et le Grote Markt.", distance: "4 km", time: "1 h", level: "Facile", format: "Boucle", bestFor: "Patrimoine · Rivière · Première visite", image: routeImages.courtraiWalk },
    { mode: "bike", title: "Route des icônes de Courtrai", place: "Courtrai", text: "Une sortie vélo qui relie les icônes architecturales et culturelles de Courtrai et de ses environs.", distance: "37,5 km", time: "2,5-3 h", level: "Facile-modéré", format: "Boucle", bestFor: "Architecture · Ville + campagne · Grande sortie", image: routeImages.courtraiBike },
    { mode: "hike", title: "Preshoekbos", place: "Courtrai", text: "Plus de 140 hectares de forêt avec chemins paisibles, faune et sentiers plus aventureux.", distance: "6-10 km", time: "1,5-2,5 h", level: "Facile-modéré", format: "Balade nature", bestFor: "Forêt · Faune · Calme", image: routeImages.courtraiHike }
  ],
  Gand: [
    { mode: "walk", title: "Charme singulier de Gand", place: "Gand", text: "Voyez le Château des Comtes, Graslei, Korenlei, les trois tours et Patershol dans une balade compacte.", distance: "4,2 km", time: "1-1,5 h", level: "Facile", format: "Boucle", bestFor: "Première visite · Gand médiéval · Photo", image: routeImages.gandWalk },
    { mode: "bike", title: "Gentse Fietsen Route", place: "Gand", text: "Découvrez Gand au-delà du centre historique, entre quartiers, canaux, parcs et adresses locales.", distance: "37 km", time: "2,5-3 h", level: "Modéré", format: "Boucle", bestFor: "Gand local · Grande sortie · Variété", image: routeImages.gandBike },
    { mode: "hike", title: "Bourgoyen-Ossemeersen", place: "Gand", text: "Zones humides, oiseaux et chemins piétons paisibles juste à l'extérieur du centre historique.", distance: "5-8 km", time: "1,5-2 h", level: "Facile", format: "Balade nature", bestFor: "Oiseaux · Nature · Calme", image: routeImages.gandHike }
  ],
  Tournai: [
    { mode: "walk", title: "Le long de l'Escaut", place: "Tournai", text: "Suivez la balade audio au bord de l'Escaut à travers l'histoire, l'architecture et la ville qui change.", distance: "3-5 km", time: "1-1,5 h", level: "Facile", format: "Bord d'eau", bestFor: "Rivière · Histoire · Balade lente", image: routeImages.tournaiWalk },
    { mode: "bike", title: "Tournai en Roues Libres", place: "Tournai", text: "Utilisez le réseau officiel de points-noeuds pour quitter le centre historique vers les villages, la campagne et le RAVeL.", distance: "15-30 km", time: "1,5-3 h", level: "Facile-modéré", format: "Flexible", bestFor: "Campagne · Sortie flexible · Villages belges", image: routeImages.tournaiBike },
    { mode: "hike", title: "Mont-Saint-Aubert", place: "Tournai", text: "Montez dans les collines au-dessus de Tournai pour des bois, de la campagne et des vues sur la vallée de l'Escaut.", distance: "8-12 km", time: "2-3 h", level: "Modéré", format: "Randonnée", bestFor: "Vues · Collines · Vraie rando", image: routeImages.tournaiHike }
  ]
};

const weatherLabels = {
  fr: {
    clear: "Ciel clair",
    mainlyClear: "Peu nuageux",
    cloudy: "Nuageux",
    fog: "Brume",
    drizzle: "Bruine",
    rain: "Pluie",
    snow: "Neige",
    storm: "Orage"
  },
  en: {
    clear: "Clear sky",
    mainlyClear: "Partly cloudy",
    cloudy: "Cloudy",
    fog: "Fog",
    drizzle: "Drizzle",
    rain: "Rain",
    snow: "Snow",
    storm: "Thunderstorm"
  }
};

let typeTimer;
let weatherRefreshTimer;
let selectedLocation = "Roubaix";

function readStoredPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function storePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Storage can be blocked in private or restricted browser contexts.
  }
}

function setTheme(theme, persist = true) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;
  themeIcon.src = isDark ? "Assets/Icon/Sun.png" : "Assets/Icon/Moon.png";
  themeToggle.setAttribute("aria-label", isDark ? "Passer en theme clair" : "Passer en theme sombre");
  if (persist) storePreference(storageKeys.theme, theme);
}

function updateStaticCopy(lang) {
  const state = copy[lang];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (state[key]) node.textContent = state[key];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (state[key]) node.setAttribute("aria-label", state[key]);
  });
  wishClose.setAttribute("aria-label", state.close);
  departureChecklistClose?.setAttribute("aria-label", state.close);
  renderSideNav(activePage, lang);
  renderAroundExplorer();
}

function getAroundModeIcon(mode) {
  if (mode === "drive") return "Assets/Icon/around-car.png";
  if (mode === "transit") return "Assets/Icon/around-train.png";
  return "Assets/Icon/around-footprint.png";
}

function getAroundTime(place, mode) {
  return Number.isFinite(place.times[mode]) ? place.times[mode] : null;
}

function getAroundSortTime(place, mode) {
  const selectedTime = getAroundTime(place, mode);
  if (selectedTime !== null) return selectedTime;
  return Math.min(...Object.values(place.times).filter(Number.isFinite));
}

function formatAroundTime(place, mode, state) {
  const minutes = getAroundTime(place, mode);
  return minutes === null ? state.stayLineAroundUnavailable : `${minutes} min`;
}

function renderAroundExplorer() {
  if (!stayAroundExplorer || !stayAroundMap || !stayAroundList) return;
  const lang = root.dataset.lang || "fr";
  const state = copy[lang] || copy.fr;
  const filteredPlaces = aroundPlaces
    .filter((place) => activeAroundFilter === "all" || place.category === activeAroundFilter)
    .sort((a, b) => {
      const aSelected = getAroundTime(a, activeAroundMode) === null ? 1 : 0;
      const bSelected = getAroundTime(b, activeAroundMode) === null ? 1 : 0;
      return aSelected - bSelected || getAroundSortTime(a, activeAroundMode) - getAroundSortTime(b, activeAroundMode);
    });

  stayAroundModeButtons.forEach((button) => {
    const isActive = button.dataset.aroundMode === activeAroundMode;
    button.classList.toggle("is-active", isActive);
    button.toggleAttribute("aria-current", isActive);
  });
  stayAroundFilterButtons.forEach((button) => {
    const isActive = button.dataset.aroundFilter === activeAroundFilter;
    button.classList.toggle("is-active", isActive);
    button.toggleAttribute("aria-current", isActive);
  });

  stayAroundMap.querySelectorAll(".map-pin").forEach((pin) => pin.remove());
  filteredPlaces
    .filter((place) => !place.listOnly)
    .forEach((place) => {
      const pin = document.createElement("a");
      pin.className = `map-pin pin-${place.id}`;
      pin.href = place.href;
      pin.target = "_blank";
      pin.rel = "noopener noreferrer";
      pin.dataset.aroundMarker = place.id;
      pin.dataset.category = place.category;
      pin.style.left = `${place.map.x}%`;
      pin.style.top = `${place.map.y}%`;
      pin.classList.toggle("is-muted", getAroundTime(place, activeAroundMode) === null);
      pin.innerHTML = `<img src="${place.icon}" alt=""><span>${escapeHtml(state[place.titleKey] || "")} <b>${escapeHtml(formatAroundTime(place, activeAroundMode, state))}</b></span>`;
      stayAroundMap.appendChild(pin);
    });

  stayAroundList.innerHTML = filteredPlaces.map((place) => {
    const isUnavailable = getAroundTime(place, activeAroundMode) === null;
    return `
      <a class="stay-around-item${isUnavailable ? " is-muted" : ""}" href="${place.href}" target="_blank" rel="noopener noreferrer" data-around-item="${place.id}" data-category="${place.category}">
        <img src="${place.icon}" alt="">
        <span>
          <strong>${escapeHtml(state[place.titleKey] || "")}</strong>
          <small>${escapeHtml(state[place.detailKey] || "")}</small>
        </span>
        <em><i style="background-image:url('${getAroundModeIcon(activeAroundMode)}')"></i><b>${escapeHtml(formatAroundTime(place, activeAroundMode, state))}</b></em>
      </a>
    `;
  }).join("");
}

function typeLoop(text) {
  clearTimeout(typeTimer);
  let index = 0;
  let deleting = false;

  function tick() {
    welcomeText.textContent = text.slice(0, index);

    if (!deleting && index < text.length) {
      index += 1;
      typeTimer = setTimeout(tick, 156);
      return;
    }

    if (!deleting) {
      deleting = true;
      typeTimer = setTimeout(tick, 1900);
      return;
    }

    if (index > 0) {
      index -= 1;
      typeTimer = setTimeout(tick, 84);
      return;
    }

    deleting = false;
    typeTimer = setTimeout(tick, 720);
  }

  tick();
}

function setLanguage(lang, persist = true) {
  const state = copy[lang];
  root.lang = state.lang;
  root.dataset.lang = state.lang;
  langIcon.textContent = state.icon;
  langToggle.setAttribute("aria-label", state.label);
  weatherStatus.textContent = state.loading;
  updateStaticCopy(lang);
  updateLocationLabels(lang);
  renderCityGuide();
  if (activeEquipmentKey && equipmentModal.classList.contains("is-open")) {
    updateEquipmentModal(activeEquipmentKey, { updateMedia: false });
  }
  if (eventsNearbyPayload) renderEventsNearby(eventsNearbyPayload);
  typeLoop(state.welcome);
  if (persist) storePreference(storageKeys.lang, lang);
  updateWeather();
}

function getLocationLabel(key, lang = root.dataset.lang || "en") {
  const place = locations[key] || locations.Roubaix;
  return `${place.country} · ${place.label[lang] || place.label.en}`;
}

function updateLocationLabels(lang = root.dataset.lang || "en") {
  const options = [...weatherMenu.querySelectorAll("[data-location]")].sort((a, b) => {
    const placeA = locations[a.dataset.location];
    const placeB = locations[b.dataset.location];
    if (placeA.country !== placeB.country) return placeA.country === "FR" ? -1 : 1;
    return placeA.label[lang].localeCompare(placeB.label[lang], lang === "fr" ? "fr-FR" : "en-US");
  });

  options.forEach((option) => {
    option.textContent = getLocationLabel(option.dataset.location, lang);
    weatherMenu.appendChild(option);
  });
  weatherSelected.textContent = getLocationLabel(selectedLocation, lang);
  renderEventsLocationOptions(lang);
}

function renderEventsLocationOptions(lang = root.dataset.lang || "en") {
  if (!eventsLocationMenu || !eventsSelectedLocation) return;
  const entries = Object.entries(locations).sort(([, placeA], [, placeB]) => {
    if (placeA.country !== placeB.country) return placeA.country === "FR" ? -1 : 1;
    return placeA.label[lang].localeCompare(placeB.label[lang], lang === "fr" ? "fr-FR" : "en-US");
  });

  eventsLocationMenu.innerHTML = entries.map(([key, place]) => `
    <button type="button" role="option" data-events-location="${key}" aria-selected="${String(key === selectedLocation)}">
      <span>${place.country}</span>
      <strong>${place.label[lang] || place.label.en}</strong>
    </button>
  `).join("");
  eventsSelectedLocation.textContent = getLocationLabel(selectedLocation, lang);
}

function syncLocationSelection() {
  const lang = root.dataset.lang || "en";
  weatherSelected.textContent = getLocationLabel(selectedLocation, lang);
  weatherMenu.querySelectorAll("[role='option']").forEach((item) => {
    item.setAttribute("aria-selected", String(item.dataset.location === selectedLocation));
  });
  if (eventsSelectedLocation) eventsSelectedLocation.textContent = getLocationLabel(selectedLocation, lang);
  eventsLocationMenu?.querySelectorAll("[role='option']").forEach((item) => {
    item.setAttribute("aria-selected", String(item.dataset.eventsLocation === selectedLocation));
  });
}

function cityGuideBadgeIcon(badge) {
  const normalized = badge.toLowerCase();
  if (normalized.includes("history") || normalized.includes("heritage") || normalized.includes("unesco")) return "Assets/Icon/Héritage.png";
  if (normalized.includes("couple") || normalized.includes("romantic")) return "Assets/Icon/heart.png";
  if (normalized.includes("family")) return "Assets/Icon/group friendly.png";
  if (normalized.includes("walk") || normalized.includes("street") || normalized.includes("rampart")) return "Assets/Icon/walk.png";
  if (normalized.includes("food") || normalized.includes("brunch") || normalized.includes("friterie")) return "Assets/Icon/food.png";
  if (normalized.includes("bar") || normalized.includes("beer") || normalized.includes("wine") || normalized.includes("cocktail")) return "Assets/Icon/drink.png";
  if (normalized.includes("art") || normalized.includes("museum")) return "Assets/Icon/art.png";
  if (normalized.includes("nature") || normalized.includes("lake") || normalized.includes("calm")) return "Assets/Icon/leaf.png";
  return "Assets/Icon/compass.png";
}

function cityGuideFoodIcon(type) {
  const normalized = type.toLowerCase();
  if (normalized.includes("bar") || normalized.includes("cafe")) return "Assets/Icon/bar.png";
  if (normalized.includes("quick")) return "Assets/Icon/icon_quick_bite.png";
  return "Assets/Icon/icon_dinner.png";
}

function cityGuideMustSeeIcon(index) {
  return ["Assets/Icon/citypart1.png", "Assets/Icon/citypart2.png", "Assets/Icon/citypart3.png"][index % 3];
}

function fitDiscoverFocusTitle() {
  if (!discoverFocusTitle) return;
  discoverFocusTitle.style.removeProperty("--discover-focus-title-size");

  let size = Math.min(68, Math.max(38, Math.round(window.innerWidth * 0.045)));
  const minSize = 18;
  discoverFocusTitle.style.setProperty("--discover-focus-title-size", `${size}px`);
  const parentStyle = window.getComputedStyle(discoverFocusTitle.parentElement);
  const parentPadding = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight);
  const targetWidth = (discoverFocusTitle.parentElement?.clientWidth || discoverFocusTitle.clientWidth || 0) - parentPadding;

  while (targetWidth && size > minSize && discoverFocusTitle.scrollWidth > targetWidth + 1) {
    size -= 1;
    discoverFocusTitle.style.setProperty("--discover-focus-title-size", `${size}px`);
  }
}

function guidePlaceNote(index, lang) {
  const notes = {
    fr: ["Vaut le detour", "Moment carte postale", "A voir aussi"],
    en: ["Worth the stop", "Postcard moment", "Lives here too"]
  };
  return notes[lang]?.[index] || notes.en[index] || "";
}

function guideFoodNote(type, lang) {
  const normalized = type.toLowerCase();
  if (lang === "fr") {
    if (normalized.includes("bar")) return "Bon verre";
    if (normalized.includes("quick")) return "Simple & bon";
    return "Valeur sure";
  }
  if (normalized.includes("bar")) return "Great drinks";
  if (normalized.includes("quick")) return "Simple & delicious";
  return "Local favourite";
}

function guideFoodType(type, lang) {
  if (lang !== "fr") return type;
  const normalized = type.toLowerCase();
  if (normalized.includes("quick")) return "Sur le pouce";
  if (normalized.includes("dinner")) return "Diner";
  return type;
}

function guideMoodLine(locationKey, lang) {
  const lines = {
    Lille: {
      fr: "Facades flamandes, terrasses et soiree douce",
      en: "Flemish facades, terraces and a soft evening"
    },
    Roubaix: {
      fr: "Art deco, textile et pause inspiree",
      en: "Art deco, textile stories and an inspired pause"
    },
    "Villeneuve-dAscq": {
      fr: "Musee, lac et respiration verte",
      en: "Museum, lake paths and a green breather"
    },
    Dunkerque: {
      fr: "Air marin, beffroi et lumiere du large",
      en: "Sea air, belfry views and coastal light"
    },
    Bergues: {
      fr: "Remparts, briques flamandes et charme ch'ti",
      en: "Ramparts, Flemish brick and Ch'ti charm"
    },
    Bruges: {
      fr: "Canaux lents et romance medievale",
      en: "Slow canals and medieval romance"
    },
    Gand: {
      fr: "Chateau, quais vivants et nuit belge",
      en: "Castle walls, lively quays and Belgian nights"
    },
    Bruxelles: {
      fr: "Grand decor, galeries et energie capitale",
      en: "Grand scenery, galleries and capital energy"
    },
    Courtrai: {
      fr: "Tours, beguinage et escapade facile",
      en: "Twin towers, beguinage and an easy escape"
    },
    Tournai: {
      fr: "Pierres UNESCO et verre tranquille",
      en: "UNESCO stonework and a quiet glass"
    }
  };
  return lines[locationKey]?.[lang] || lines.Roubaix[lang] || lines.Roubaix.en;
}

function routeModeMeta(mode) {
  const meta = {
    walk: { key: "discoverRoutesWalk", icon: "Assets/Image/Discover/Routes/marche.png" },
    bike: { key: "discoverRoutesBike", icon: "Assets/Image/Discover/Routes/velo-de-piste.png" },
    hike: { key: "discoverRoutesHike", icon: "Assets/Image/Discover/Routes/empreintes.png" }
  };
  return meta[mode] || meta.walk;
}

function routeMapLink(route) {
  const query = encodeURIComponent(`${route.title} ${route.place}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getDiscoverCityGuide(locationKey, lang) {
  return (lang === "fr" ? discoverCityGuidesFr[locationKey] : discoverCityGuides[locationKey])
    || discoverCityGuides[locationKey]
    || discoverCityGuides.Roubaix;
}

const discoverCityHeroImages = {
  Lille: "Assets/Image/Lille.webp",
  Bergues: "Assets/Image/discover-bergues.png",
  Dunkerque: "Assets/Image/discover-dunkerque.png",
  Roubaix: "Assets/Image/discover-roubaix.png",
  "Villeneuve-dAscq": "Assets/Image/discover-villeneuve-dascq.png",
  Bruges: "Assets/Image/discover-bruges.png",
  Gand: "Assets/Image/discover-gand.png",
  Bruxelles: "Assets/Image/discover-bruxelles.png",
  Courtrai: "Assets/Image/discover-courtrai.png",
  Tournai: "Assets/Image/discover-tournai.png"
};

function discoverCityHeroImage(locationKey) {
  return discoverCityHeroImages[locationKey] || discoverCityHeroImages.Lille;
}

const discoverPlaceImageBase = "Assets/Image/Discover/Places";
const discoverPlaceImageSlugs = {
  Lille: "lille",
  Bergues: "bergues",
  Dunkerque: "dunkerque",
  Roubaix: "roubaix",
  "Villeneuve-dAscq": "villeneuve",
  Bruges: "bruges",
  Gand: "gand",
  Bruxelles: "bruxelles",
  Courtrai: "courtrai",
  Tournai: "tournai"
};

const guideItemImagePositions = {
  mustSee: ["50% 44%", "42% 50%", "62% 54%"],
  food: ["54% 54%", "38% 46%", "68% 52%"]
};

function guidePlacePhotoUrl(locationKey, kind, index, fallback) {
  const slug = discoverPlaceImageSlugs[locationKey];
  const group = kind === "food" ? "food" : "must";
  if (!slug) return fallback;
  return `${discoverPlaceImageBase}/${slug}-${group}-${index + 1}.jpg`;
}

function guideItemImagePosition(kind, index) {
  const positions = guideItemImagePositions[kind] || guideItemImagePositions.mustSee;
  return positions[index % positions.length] || "50% 50%";
}

function guideGoogleLink(title, locationKey) {
  const lang = root.dataset.lang || "en";
  const city = locations[locationKey]?.label?.[lang] || locations[locationKey]?.label?.fr || locationKey;
  const query = title.toLowerCase().includes(city.toLowerCase()) ? title : `${title} ${city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getDiscoverRoutes(locationKey, lang) {
  return (lang === "fr" ? discoverRouteGuidesFr[locationKey] : discoverRouteGuides[locationKey])
    || discoverRouteGuides[locationKey]
    || discoverRouteGuides.Roubaix;
}

function renderRoutesOutdoors() {
  if (!routesOutdoorsGrid) return;
  const lang = root.dataset.lang || "en";
  const state = copy[lang] || copy.en;
  const selectedPlace = locations[selectedLocation];
  const routes = getDiscoverRoutes(selectedLocation, lang);
  routesOutdoorsGrid.setAttribute("aria-label", `${selectedPlace?.label?.[lang] || "Roubaix"} outdoor routes`);
  routesOutdoorsGrid.innerHTML = routes.map((route) => {
    const mode = routeModeMeta(route.mode);
    return `
      <article class="route-card">
        <div class="route-card-type">
          <img src="${mode.icon}" alt="">
          <span>${escapeHtml(state[mode.key] || route.mode)}</span>
        </div>
        <figure>
          <img src="${escapeHtml(route.image || routeVisuals.nature)}" alt="${escapeHtml(route.title)}">
        </figure>
        <h3>${escapeHtml(route.title)}</h3>
        <small>${escapeHtml(route.place)}</small>
        <p>${escapeHtml(route.text)}</p>
        <dl>
          <div><dt>${escapeHtml(state.discoverRoutesDistance)}</dt><dd>${escapeHtml(route.distance)}</dd></div>
          <div><dt>${escapeHtml(state.discoverRoutesTime)}</dt><dd>${escapeHtml(route.time)}</dd></div>
          <div><dt>${escapeHtml(state.discoverRoutesLevel)}</dt><dd>${escapeHtml(route.level)}</dd></div>
          <div><dt>${escapeHtml(state.discoverRoutesFormat)}</dt><dd>${escapeHtml(route.format)}</dd></div>
        </dl>
        <p class="route-card-best">${escapeHtml(state.discoverRoutesBestFor)}: ${escapeHtml(route.bestFor)}</p>
        <a href="${routeMapLink(route)}" target="_blank" rel="noopener">${escapeHtml(state.discoverRoutesCta)}</a>
      </article>
    `;
  }).join("");
}

function renderCityGuide() {
  const lang = root.dataset.lang || "en";
  const guide = getDiscoverCityGuide(selectedLocation, lang);
  if (!guide) return;

  const selectedPlace = locations[selectedLocation];
  if (discoverHeroImage) {
    discoverHeroImage.src = discoverCityHeroImage(selectedLocation);
    discoverHeroImage.alt = selectedPlace?.label?.[lang] || guide.title;
  }
  if (discoverFocusTitle) discoverFocusTitle.textContent = (selectedPlace?.label?.[lang] || guide.title).toUpperCase();
  fitDiscoverFocusTitle();
  if (discoverFocusSubtitle) discoverFocusSubtitle.textContent = guide.focusSubtitle || guide.kicker;
  if (discoverFocusNote) discoverFocusNote.textContent = guideMoodLine(selectedLocation, lang);
  if (discoverFocusTags) {
    const focusTags = guide.focusTags || guide.badges;
    discoverFocusTags.innerHTML = focusTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  }

  if (cityGuideKicker && cityGuideTitle && cityGuideTags && cityGuideBadges && cityGuideMustSee && cityGuideFood && cityGuideCombo) {
    cityGuideKicker.textContent = guide.kicker;
    cityGuideTitle.textContent = guide.title;
    cityGuideTags.textContent = guide.tags.join(" · ");
    cityGuideBadges.innerHTML = guide.badges.map((badge) => `
      <span>
        <img src="${cityGuideBadgeIcon(badge)}" alt="">
        ${escapeHtml(badge)}
      </span>
    `).join("");
    cityGuideMustSee.innerHTML = guide.mustSee.map(([title, text], index) => `
      <a class="city-guide-item" href="${guideGoogleLink(title, selectedLocation)}" target="_blank" rel="noopener">
        <figure class="city-guide-thumb">
          <img src="${guidePlacePhotoUrl(selectedLocation, "mustSee", index, cityGuideMustSeeIcon(index))}" alt="" style="--item-image-position: ${guideItemImagePosition("mustSee", index)}">
        </figure>
        <span>${index + 1}</span>
        <div>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(text)}</p>
          <small>${guidePlaceNote(index, lang)}</small>
        </div>
      </a>
    `).join("");
    cityGuideFood.innerHTML = guide.food.map(([type, title, text], index) => `
      <a class="city-guide-item is-food" href="${guideGoogleLink(title, selectedLocation)}" target="_blank" rel="noopener">
        <figure class="city-guide-thumb">
          <img src="${guidePlacePhotoUrl(selectedLocation, "food", index, cityGuideFoodIcon(type))}" alt="" style="--item-image-position: ${guideItemImagePosition("food", index)}">
        </figure>
        <span>${escapeHtml(guideFoodType(type, lang))}</span>
        <div>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(text)}</p>
          <small>${guideFoodNote(type, lang)}</small>
        </div>
      </a>
    `).join("");
    cityGuideCombo.innerHTML = guide.combo.split(/\s*→\s*/).map((step, index, steps) => `
      <span>${escapeHtml(step)}</span>
      ${index < steps.length - 1 ? '<img src="Assets/Icon/arrow.png" alt="">' : ""}
    `).join("");
  }

  if (discoverBlankMustSee) {
    discoverBlankMustSee.innerHTML = guide.mustSee.map(([title, text], index) => `
      <a class="discover-simple-item" href="${guideGoogleLink(title, selectedLocation)}" target="_blank" rel="noopener" aria-label="${escapeHtml(title)} Google">
        <figure>
          <img src="${guidePlacePhotoUrl(selectedLocation, "mustSee", index, cityGuideMustSeeIcon(index))}" alt="" style="--item-image-position: ${guideItemImagePosition("mustSee", index)}">
        </figure>
        <div>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(text)}</p>
        </div>
        <small>${guidePlaceNote(index, lang)}</small>
        <span aria-hidden="true">→</span>
      </a>
    `).join("");
  }

  if (discoverBlankFood) {
    discoverBlankFood.innerHTML = guide.food.map(([type, title, text], index) => `
      <a class="discover-simple-item" href="${guideGoogleLink(title, selectedLocation)}" target="_blank" rel="noopener" aria-label="${escapeHtml(title)} Google">
        <figure>
          <img src="${guidePlacePhotoUrl(selectedLocation, "food", index, cityGuideFoodIcon(type))}" alt="" style="--item-image-position: ${guideItemImagePosition("food", index)}">
        </figure>
        <div>
          <small>${escapeHtml(guideFoodType(type, lang))}</small>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(text)}</p>
        </div>
        <span aria-hidden="true">→</span>
      </a>
    `).join("");
  }

  if (discoverBlankCombo) {
    discoverBlankCombo.innerHTML = guide.combo.split(/\s*→\s*/).map((step, index, steps) => `
      <span>${escapeHtml(step)}</span>
      ${index < steps.length - 1 ? "<i></i>" : ""}
    `).join("");
  }
  renderRoutesOutdoors();
}

function setSharedLocation(locationKey) {
  if (!locations[locationKey]) return;
  selectedLocation = locationKey;
  syncLocationSelection();
  storePreference(storageKeys.location, selectedLocation);
  renderCityGuide();
  updateWeather();
  updateEventsNearby();
}

function restoreFrameScroll(scrollTop) {
  if (!frameScroll) return;
  const restore = () => { frameScroll.scrollTop = scrollTop; };
  window.requestAnimationFrame(restore);
  window.setTimeout(restore, 0);
  window.setTimeout(restore, 180);
}

function goToDiscoverCityGuide() {
  if (!frameScroll || !discoverBlankSection || root.dataset.page !== "discover") return;
  const targetTop = discoverBlankSection.offsetTop;
  frameScroll.scrollTo({ top: targetTop, behavior: "smooth" });
  window.setTimeout(() => {
    setActiveSection("discover-blank");
  }, 360);
}

function goToDiscoverEvents() {
  if (!frameScroll || !eventsNearbySection || root.dataset.page !== "discover") return;
  frameScroll.scrollTo({ top: eventsNearbySection.offsetTop, behavior: "smooth" });
  window.setTimeout(() => {
    setActiveSection("discover-events");
  }, 360);
}

function discoverSections() {
  return pageSections.discover
    .map((section) => document.querySelector(`#${section.id}`))
    .filter(Boolean);
}

function goToDiscoverSection(index) {
  const sections = discoverSections();
  if (!frameScroll || root.dataset.page !== "discover" || !sections.length) return;
  const boundedIndex = Math.max(0, Math.min(index, sections.length - 1));
  const target = sections[boundedIndex];
  frameScroll.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  window.setTimeout(() => {
    setActiveSection(target.id);
  }, 360);
}

function currentDiscoverSectionIndex() {
  const sections = discoverSections();
  if (!sections.length) return 0;
  const marker = frameScroll.scrollTop + frameScroll.clientHeight * 0.45;
  return sections.reduce((match, section, index) => section.offsetTop <= marker ? index : match, 0);
}

function closeLocationMenus() {
  weatherMenu.classList.remove("is-open");
  weatherSelect.setAttribute("aria-expanded", "false");
  eventsLocationMenu?.classList.remove("is-open");
  eventsLocationSelect?.setAttribute("aria-expanded", "false");
}

function renderSideNav(page, lang = root.dataset.lang || "en") {
  const sections = pageSections[page] || pageSections.welcome;
  sideNav.hidden = sections.length === 0;
  if (!sections.length) {
    sideNav.innerHTML = "";
    return;
  }
  sideNav.innerHTML = sections.map((section, index) => `
    <button class="${index === 0 ? "is-active" : ""}" type="button" data-scroll-target="${section.id}"${Number.isInteger(section.stayStep) ? ` data-stay-step="${section.stayStep}"` : ""} aria-label="${copy[lang][section.key]}">
      <img src="${section.icon}" alt="">
    </button>
  `).join("");
}

function setActiveSection(sectionId) {
  sideNav.querySelectorAll("[data-scroll-target]").forEach((button) => {
    if (activePage === "stay" && button.dataset.stayStep !== undefined) {
      button.classList.toggle("is-active", Number(button.dataset.stayStep) === activeStayIndex);
      return;
    }
    button.classList.toggle("is-active", button.dataset.scrollTarget === sectionId);
  });
}

function setStayJourneyStep(index) {
  if (!stayJourney || !stayJourneyPages.length) return;
  const boundedIndex = Math.max(0, Math.min(index, stayJourneyPages.length - 1));
  activeStayIndex = boundedIndex;
  stayJourney.style.setProperty("--stay-active-step", String(boundedIndex));
  stayJourneySteps.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === boundedIndex;
    button.classList.toggle("is-active", isActive);
    button.toggleAttribute("aria-current", isActive);
  });
  stayJourneyPages.forEach((page, pageIndex) => {
    const isActivePage = pageIndex === boundedIndex;
    page.classList.toggle("is-active", isActivePage);
  });
  sideNav.querySelectorAll("[data-stay-step]").forEach((button) => {
    const isActive = Number(button.dataset.stayStep) === boundedIndex;
    button.classList.toggle("is-active", isActive);
    button.toggleAttribute("aria-current", isActive);
  });
  updateStayJourneyLine();
  window.setTimeout(updateStayJourneyLine, 780);
}

function updateStayJourneyLine() {
  if (!stayJourney || !stayJourneySteps.length) return;
  const activeStep = stayJourneySteps.find((button) => button.classList.contains("is-active")) || stayJourneySteps[0];
  const firstRect = stayJourneySteps[0].getBoundingClientRect();
  const activeRect = activeStep.getBoundingClientRect();
  const lineHeight = Math.max(0, activeRect.top + activeRect.height / 2 - (firstRect.top + firstRect.height / 2));
  stayJourney.style.setProperty("--stay-line-height", `${lineHeight}px`);
}

function updateStayJourneyFromScroll() {
  if (activePage !== "stay" || !stayJourneyPages.length) return;
  const marker = frameScroll.scrollTop + frameScroll.clientHeight * 0.5;
  const current = stayJourneyPages.reduce((match, page, index) => {
    return page.offsetTop <= marker ? index : match;
  }, 0);
  setStayJourneyStep(current);
}

function updateNavIndicator() {
  const activeItem = bottomNav.querySelector(".nav-item.is-active");
  if (!activeItem) return;

  const navRect = bottomNav.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  bottomNav.style.setProperty("--active-x", `${itemRect.left + itemRect.width / 2 - navRect.left}px`);
}

function setActivePage(page) {
  const targetPage = document.querySelector(`.page-content[data-page="${page}"]`) ? page : "welcome";
  activePage = targetPage;
  root.dataset.page = targetPage;

  document.querySelectorAll(".page-content").forEach((panel) => {
    const isActive = panel.dataset.page === targetPage;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  const navItems = [...bottomNav.querySelectorAll(".nav-item")];
  navItems.forEach((item, index) => {
    const isActive = item.dataset.pageTarget === page;
    item.classList.toggle("is-active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });

  renderSideNav(targetPage);
  updateNavIndicator();
  frameScroll.scrollTo({ top: 0, behavior: "smooth" });
  if (targetPage === "stay") {
    setStayJourneyStep(0);
    setStayFrame(activeStayIndex);
    startStayAutoplay();
  } else {
    stopStayAutoplay();
  }
  if (targetPage === "discover") {
    setEventsHero(activeEventHeroIndex);
    requestAnimationFrame(fitDiscoverFocusTitle);
    startEventsHeroAutoplay();
  } else {
    stopEventsHeroAutoplay();
  }
}

bottomNav.addEventListener("click", (event) => {
  const item = event.target.closest("[data-page-target]");
  if (!item) return;
  setActivePage(item.dataset.pageTarget);
});

document.querySelectorAll(".section-action[data-page-target]").forEach((button) => {
  button.addEventListener("click", () => setActivePage(button.dataset.pageTarget));
});

sideNav.addEventListener("click", (event) => {
  const item = event.target.closest("[data-scroll-target]");
  if (!item) return;

  if (activePage === "stay" && item.dataset.stayStep !== undefined) {
    const index = Number(item.dataset.stayStep);
    const targetPage = stayJourneyPages[index];
    if (!targetPage) return;
    frameScroll.style.scrollSnapType = "none";
    frameScroll.scrollTo({ top: targetPage.offsetTop, behavior: "smooth" });
    setStayJourneyStep(index);
    setTimeout(() => {
      frameScroll.style.scrollSnapType = "";
    }, 360);
    return;
  }

  const target = document.querySelector(`#${item.dataset.scrollTarget}`);
  if (!target) return;

  const targetTop = target.offsetTop;
  frameScroll.style.scrollSnapType = "none";
  frameScroll.scrollTop = targetTop;
  setTimeout(() => {
    frameScroll.scrollTop = targetTop;
    frameScroll.style.scrollSnapType = "";
  }, 50);
  setActiveSection(item.dataset.scrollTarget);
});

frameScroll.addEventListener("scroll", () => {
  const activePanel = document.querySelector(`.page-content[data-page="${activePage}"]`);
  if (!activePanel) return;

  const sections = [...activePanel.querySelectorAll("[data-section]")];
  const scrollTop = frameScroll.scrollTop;
  const current = sections.reduce((match, section) => {
    return section.offsetTop <= scrollTop + frameScroll.clientHeight * 0.38 ? section : match;
  }, sections[0]);

  if (current) setActiveSection(current.id);
  updateStayJourneyFromScroll();
});

frameScroll.addEventListener("wheel", (event) => {
  if (activePage !== "discover" || !eventsNearbySection) return;
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

  event.preventDefault();
  if (discoverPageScrollLock) return;

  discoverPageScrollLock = true;
  const direction = event.deltaY > 0 ? 1 : -1;
  goToDiscoverSection(currentDiscoverSectionIndex() + direction);
  window.setTimeout(() => {
    discoverPageScrollLock = false;
  }, 780);
}, { passive: false });

window.addEventListener("resize", () => {
  updateNavIndicator();
  if (root.dataset.page === "discover") requestAnimationFrame(fitDiscoverFocusTitle);
});

function getWeatherMeta(code) {
  if (code === 0) return { icon: "☀", key: "clear" };
  if ([1, 2].includes(code)) return { icon: "⛅", key: "mainlyClear" };
  if (code === 3) return { icon: "☁", key: "cloudy" };
  if ([45, 48].includes(code)) return { icon: "≋", key: "fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "☂", key: "drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "☔", key: "rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "❄", key: "snow" };
  if ([95, 96, 99].includes(code)) return { icon: "⚡", key: "storm" };
  return { icon: "☁", key: "cloudy" };
}

function weekdayLabel(date, lang) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", { weekday: "short" }).format(new Date(date));
}

function renderForecast(data) {
  const lang = root.dataset.lang || "en";
  const current = data.current;
  const daily = data.daily;
  const todayHigh = Math.round(daily.temperature_2m_max[0]);
  const todayLow = Math.round(daily.temperature_2m_min[0]);
  const meta = getWeatherMeta(current.weather_code);
  const labels = weatherLabels[lang];

  weatherIcon.textContent = meta.icon;
  weatherTemp.textContent = `${Math.round(current.temperature_2m)}°`;
  weatherRange.textContent = `${copy[lang].rangeHigh}: ${todayHigh}°  ${copy[lang].rangeLow}: ${todayLow}°`;
  weatherStatus.textContent = labels[meta.key];

  weatherDays.innerHTML = daily.time.slice(1, 6).map((day, index) => {
    const dayMeta = getWeatherMeta(daily.weather_code[index + 1]);
    const temp = Math.round(daily.temperature_2m_min[index + 1]);
    return `<div class="weather-day"><small>${weekdayLabel(day, lang)}</small><span>${dayMeta.icon}</span><strong>${temp}°</strong></div>`;
  }).join("");
}

function discoverRefreshSlot(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = date.getHours();
  const activeHour = discoverRefreshHours.filter((value) => value <= hour).pop() ?? discoverRefreshHours[discoverRefreshHours.length - 1];
  const slotDate = new Date(date);
  if (hour < discoverRefreshHours[0]) slotDate.setDate(slotDate.getDate() - 1);
  const slotYear = slotDate.getFullYear();
  const slotMonth = String(slotDate.getMonth() + 1).padStart(2, "0");
  const slotDay = String(slotDate.getDate()).padStart(2, "0");
  return {
    key: `${slotYear}-${slotMonth}-${slotDay}T${String(activeHour).padStart(2, "0")}:00`,
    isRefreshHour: discoverRefreshHours.includes(hour),
    todayKey: `${year}-${month}-${day}`
  };
}

function msUntilNextDiscoverRefresh(date = new Date()) {
  const next = new Date(date);
  const hour = date.getHours();
  const nextHour = discoverRefreshHours.find((value) => value > hour);
  if (nextHour === undefined) {
    next.setDate(next.getDate() + 1);
    next.setHours(discoverRefreshHours[0], 2, 0, 0);
  } else {
    next.setHours(nextHour, 2, 0, 0);
  }
  return Math.max(next.getTime() - date.getTime(), 60 * 1000);
}

function readWeatherCache(locationKey) {
  try {
    const allCache = JSON.parse(localStorage.getItem(storageKeys.weatherCache) || "{}");
    return allCache[locationKey] || null;
  } catch {
    return null;
  }
}

function writeWeatherCache(locationKey, payload) {
  try {
    const allCache = JSON.parse(localStorage.getItem(storageKeys.weatherCache) || "{}");
    allCache[locationKey] = payload;
    localStorage.setItem(storageKeys.weatherCache, JSON.stringify(allCache));
  } catch {
    // Ignore storage failures in restricted browsing contexts.
  }
}

async function updateWeather() {
  const lang = root.dataset.lang || "en";
  const place = locations[selectedLocation] || locations.Roubaix;
  const slot = discoverRefreshSlot();
  const cached = readWeatherCache(selectedLocation);
  if (cached?.slotKey === slot.key && cached?.data) {
    renderForecast(cached.data);
    clearTimeout(weatherRefreshTimer);
    weatherRefreshTimer = setTimeout(updateWeather, msUntilNextDiscoverRefresh());
    return;
  }
  if (!slot.isRefreshHour) {
    if (cached?.data) {
      renderForecast(cached.data);
      weatherStatus.textContent = copy[lang].eventsCached;
    } else {
      weatherIcon.textContent = "☁";
      weatherTemp.textContent = "--°";
      weatherRange.textContent = `${copy[lang].rangeHigh}: --°  ${copy[lang].rangeLow}: --°`;
      weatherStatus.textContent = copy[lang].eventsCached;
      weatherDays.innerHTML = "";
    }
    clearTimeout(weatherRefreshTimer);
    weatherRefreshTimer = setTimeout(updateWeather, msUntilNextDiscoverRefresh());
    return;
  }
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "Europe/Paris",
    forecast_days: "6"
  });

  weatherStatus.textContent = copy[lang].loading;

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) throw new Error("Weather request failed");
    const data = await response.json();
    writeWeatherCache(selectedLocation, { slotKey: slot.key, updatedAt: new Date().toISOString(), data });
    renderForecast(data);
  } catch (error) {
    weatherIcon.textContent = "☁";
    weatherTemp.textContent = "--°";
    weatherRange.textContent = `${copy[lang].rangeHigh}: --°  ${copy[lang].rangeLow}: --°`;
    weatherStatus.textContent = copy[lang].fallback;
    weatherDays.innerHTML = "";
  }

  clearTimeout(weatherRefreshTimer);
  weatherRefreshTimer = setTimeout(updateWeather, msUntilNextDiscoverRefresh());
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function eventDateLabel(value, lang) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function eventPlaceLabel(event) {
  return [event.city, event.venue].filter(Boolean).join(" · ");
}

function eventsFromPayload(payload) {
  const lille = (payload?.events?.lille || []).map((event) => ({ event, group: "lille" }));
  const belgium = (payload?.events?.belgium || []).map((event) => ({ event, group: "belgium" }));
  const preferred = [...lille.slice(0, 2), ...belgium.slice(0, 1)];
  const fallback = [...lille.slice(2), ...belgium.slice(1)];
  return [...preferred, ...fallback].slice(0, 3);
}

function activeEvents() {
  return eventsFromPayload(eventsNearbyPayload);
}

function setEventsHero(index = 0, userInitiated = false) {
  const cards = activeEvents();
  if (!eventsNearbySection || !cards.length) {
    if (eventsHeroTitle) eventsHeroTitle.textContent = copy[root.dataset.lang || "en"].eventsTitle;
    if (eventsHeroMeta) eventsHeroMeta.textContent = copy[root.dataset.lang || "en"].eventsKicker;
    if (eventsSpotlight) {
      eventsSpotlight.hidden = true;
      eventsSpotlight.removeAttribute("href");
    }
    if (eventsHeroCta) {
      eventsHeroCta.hidden = true;
      eventsHeroCta.removeAttribute("href");
    }
    eventsNearbySection?.style.removeProperty("--events-hero-image");
    if (eventsHeroImageCurrent) eventsHeroImageCurrent.removeAttribute("src");
    if (eventsHeroImageNext) eventsHeroImageNext.removeAttribute("src");
    return;
  }

  const lang = root.dataset.lang || "en";
  const previousHeroIndex = activeEventHeroIndex;
  activeEventHeroIndex = (index + cards.length) % cards.length;
  const { event, group } = cards[activeEventHeroIndex];

  const meta = [
    event.badge,
    eventDateLabel(event.date, lang),
    event.city
  ].filter(Boolean).join(" · ");

  const nextImage = event.image;
  eventsNearbySection.style.setProperty("--events-hero-image", `url("${nextImage.replace(/"/g, "%22")}")`);
  eventsNearbySection.dataset.heroGroup = group;
  eventsNearbySection.dataset.heroSource = event.source || "ticketmaster";
  if (eventsHeroImageCurrent && eventsHeroImageNext) {
    const hasCurrentImage = Boolean(eventsHeroImageCurrent.getAttribute("src"));
    const shouldSlide = hasCurrentImage && (previousHeroIndex !== activeEventHeroIndex || userInitiated);
    clearTimeout(eventsHeroSlideTimer);
    if (shouldSlide) {
      eventsHeroImageNext.src = nextImage;
      eventsNearbySection.classList.remove("is-changing");
      void eventsNearbySection.offsetWidth;
      eventsNearbySection.classList.add("is-changing");
      eventsHeroSlideTimer = window.setTimeout(() => {
        eventsHeroImageCurrent.src = nextImage;
        eventsNearbySection.classList.remove("is-changing");
        eventsHeroImageNext.removeAttribute("src");
      }, 900);
    } else {
      eventsHeroImageCurrent.src = nextImage;
      eventsHeroImageNext.removeAttribute("src");
      eventsNearbySection.classList.remove("is-changing");
    }
  }
  if (eventsHeroMeta) eventsHeroMeta.textContent = meta;
  if (eventsHeroTitle) eventsHeroTitle.textContent = event.title;
  if (eventsHeroCta) {
    eventsHeroCta.hidden = false;
    eventsHeroCta.href = event.url;
    eventsHeroCta.textContent = copy[lang].eventsDiscover;
  }
  if (eventsSpotlight && eventsSpotlightMeta && eventsSpotlightTitle) {
    eventsSpotlight.hidden = false;
    eventsSpotlight.href = event.url;
    eventsSpotlightMeta.textContent = meta;
    eventsSpotlightTitle.textContent = eventPlaceLabel(event) || event.title;
  }

  eventsNearbyList?.querySelectorAll(".event-card").forEach((card) => {
    const isActive = Number(card.dataset.eventIndex) === activeEventHeroIndex;
    card.classList.toggle("is-active", isActive);
    card.toggleAttribute("aria-current", isActive);
  });

  if (userInitiated) startEventsHeroAutoplay();
}

function renderEventCard(event, group, index) {
  const lang = root.dataset.lang || "en";
  const title = escapeHtml(event.title);
  const badge = escapeHtml(event.badge || (group === "belgium" ? "Belgium" : "Lille & Around"));
  const place = escapeHtml(eventPlaceLabel(event));
  const dateLabel = escapeHtml(eventDateLabel(event.date, lang));
  const number = String(index + 1).padStart(2, "0");

  return `
    <button class="event-card" type="button" data-event-group="${group}" data-event-index="${index}" aria-label="${title}">
      <span class="event-card-number">${number}</span>
      <span class="event-card-copy">
        <time datetime="${escapeHtml(event.date)}">${dateLabel}</time>
        <strong>${title}</strong>
        <small>${place}</small>
        <em>${badge}</em>
      </span>
    </button>
  `;
}

function renderEventsNearby(payload) {
  if (!eventsNearbySection || !eventsNearbyList || !eventsNearbyStatus) return;
  const lang = root.dataset.lang || "en";
  const state = copy[lang];
  const previousPayload = eventsNearbyPayload;
  eventsNearbyPayload = payload;
  const cards = activeEvents();
  if (!cards.length && eventsFromPayload(previousPayload).length) {
    eventsNearbyPayload = previousPayload;
    return;
  }

  eventsNearbySection.classList.toggle("has-no-events", !cards.length);
  eventsNearbyList.innerHTML = cards.map(({ event, group }, index) => renderEventCard(event, group, index)).join("");
  setEventsHero(Math.min(activeEventHeroIndex, Math.max(cards.length - 1, 0)));
  startEventsHeroAutoplay();
  eventsNearbyStatus.textContent = cards.length
    ? (payload.fromCache ? state.eventsCached : state.eventsUpdated)
    : state.eventsUnavailable;
}

function stopEventsHeroAutoplay() {
  clearTimeout(eventsHeroTimer);
}

function startEventsHeroAutoplay() {
  stopEventsHeroAutoplay();
  const cards = activeEvents();
  if (root.dataset.page !== "discover" || reducedMotion.matches || cards.length < 2) return;
  eventsHeroTimer = setTimeout(() => {
    setEventsHero(activeEventHeroIndex + 1);
    startEventsHeroAutoplay();
  }, 15000);
}

async function updateEventsNearby() {
  if (!eventsNearbySection || !eventsNearbyList || !eventsNearbyStatus) return;
  const lang = root.dataset.lang || "en";
  eventsNearbyStatus.textContent = copy[lang].eventsLoading;

  try {
    const response = await fetch("/api/events-nearby", { cache: "no-store" });
    if (!response.ok) throw new Error("Events request failed");
    eventsNearbyPayload = await response.json();
    renderEventsNearby(eventsNearbyPayload);
  } catch (error) {
    if (eventsNearbyPayload) {
      renderEventsNearby({ ...eventsNearbyPayload, fromCache: true });
    } else {
      eventsNearbyList.innerHTML = "";
      eventsNearbySection.classList.add("has-no-events");
      eventsNearbyStatus.textContent = copy[lang].eventsUnavailable;
    }
  }

  clearTimeout(eventsNearbyRefreshTimer);
  eventsNearbyRefreshTimer = setTimeout(updateEventsNearby, msUntilNextDiscoverRefresh());
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

langToggle.addEventListener("click", () => {
  setLanguage(root.dataset.lang === "en" ? "fr" : "en");
});

weatherSelect.addEventListener("click", () => {
  const isOpen = weatherMenu.classList.toggle("is-open");
  weatherSelect.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    weatherMenu.dataset.openScrollTop = String(frameScroll?.scrollTop ?? 0);
    eventsLocationMenu?.classList.remove("is-open");
    eventsLocationSelect?.setAttribute("aria-expanded", "false");
  }
});

weatherMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-location]");
  if (!option) return;

  const scrollTop = Number(weatherMenu.dataset.openScrollTop ?? frameScroll?.scrollTop ?? 0);
  setSharedLocation(option.dataset.location);
  weatherMenu.classList.remove("is-open");
  weatherSelect.setAttribute("aria-expanded", "false");
  restoreFrameScroll(scrollTop);
});

eventsLocationSelect?.addEventListener("click", () => {
  const isOpen = eventsLocationMenu.classList.toggle("is-open");
  eventsLocationSelect.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    weatherMenu.classList.remove("is-open");
    weatherSelect.setAttribute("aria-expanded", "false");
  }
});

eventsLocationMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-events-location]");
  if (!option) return;

  setSharedLocation(option.dataset.eventsLocation);
  eventsLocationMenu.classList.remove("is-open");
  eventsLocationSelect?.setAttribute("aria-expanded", "false");
  goToDiscoverCityGuide();
});

eventsNearbyList?.addEventListener("click", (event) => {
  const card = event.target.closest(".event-card");
  if (!card) return;
  setEventsHero(Number(card.dataset.eventIndex), true);
});

eventsNearbySection?.addEventListener("pointermove", (event) => {
  const rect = eventsNearbySection.getBoundingClientRect();
  eventsNearbySection.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
  eventsNearbySection.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".weather-location")) return;
  if (event.target.closest(".events-location-picker")) return;
  closeLocationMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLocationMenus();
});

function openWishModal() {
  if (!wishModal) return;
  wishModal.classList.add("is-open");
  wishModal.setAttribute("aria-hidden", "false");
  if (wishThanks) wishThanks.textContent = "";
  document.querySelector("#wishFirstName")?.focus();
}

function closeWishModal() {
  if (!wishModal) return;
  wishModal.classList.remove("is-open");
  wishModal.setAttribute("aria-hidden", "true");
}

wishOpen?.addEventListener("click", openWishModal);
wishClose?.addEventListener("click", closeWishModal);

wishModal?.addEventListener("click", (event) => {
  if (event.target === wishModal) closeWishModal();
});

function openDepartureChecklist() {
  if (!departureModal) return;
  departureModal.classList.add("is-open");
  departureModal.setAttribute("aria-hidden", "false");
  departureChecklistClose?.focus();
}

function closeDepartureChecklist() {
  if (!departureModal) return;
  departureModal.classList.remove("is-open");
  departureModal.setAttribute("aria-hidden", "true");
  departureChecklistOpen?.focus();
}

departureChecklistOpen?.addEventListener("click", openDepartureChecklist);
departureChecklistClose?.addEventListener("click", closeDepartureChecklist);

departureModal?.addEventListener("click", (event) => {
  if (event.target === departureModal) closeDepartureChecklist();
});

function setDisabledResource(link, label) {
  link.href = "#";
  link.setAttribute("aria-disabled", "true");
  link.removeAttribute("target");
  link.removeAttribute("rel");
  const status = link.querySelector("span");
  if (status) status.textContent = label;
}

function setEnabledResource(link, href, label) {
  link.href = href;
  link.setAttribute("aria-disabled", "false");
  link.target = "_blank";
  link.rel = "noopener";
  const status = link.querySelector("span");
  if (status) status.textContent = label;
}

function getYoutubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1&mute=1` : "";
  } catch (error) {
    return "";
  }
}

function rotateEquipment(direction = 1) {
  const cards = [...document.querySelectorAll(".equipment-card")];
  if (!cards.length) return;
  activeEquipmentIndex = (activeEquipmentIndex + direction + cards.length) % cards.length;
  updateEquipmentCarousel();
}

function updateEquipmentCarousel() {
  const cards = [...document.querySelectorAll(".equipment-card")];
  const total = cards.length;
  cards.forEach((card, index) => {
    let slot = index - activeEquipmentIndex;
    if (slot > total / 2) slot -= total;
    if (slot < total / -2) slot += total;
    if (slot > 3) slot = 4;
    if (slot < -3) slot = -4;
    card.dataset.slot = String(slot);
    card.classList.toggle("is-featured", slot === 0);
    card.setAttribute("aria-current", String(slot === 0));
  });
}

function stopEquipmentAutoplay() {
  clearInterval(equipmentAutoTimer);
}

function startEquipmentAutoplay() {
  stopEquipmentAutoplay();
  return;
}

function setStayFrame(index) {
  if (!stayFrames.length && stayPages.length) {
    activeStayIndex = (index + stayPages.length) % stayPages.length;
    stayPages.forEach((page, pageIndex) => {
      const isActive = pageIndex === activeStayIndex;
      page.classList.toggle("is-active", isActive);
      page.hidden = !isActive;
    });
    stayStepNumbers.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === activeStayIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", String(isActive));
    });
    resetStayInternalScroll();
    return;
  }
  if (!stayFrames.length) return;
  activeStayIndex = (index + stayFrames.length) % stayFrames.length;
  const total = stayFrames.length;

  stayFrames.forEach((frame, frameIndex) => {
    let slot = frameIndex - activeStayIndex;
    if (slot > total / 2) slot -= total;
    if (slot < total / -2) slot += total;
    if (slot > 2) slot = 3;
    if (slot < -2) slot = -3;
    frame.dataset.slot = String(slot);
    frame.classList.toggle("is-active", slot === 0);
    frame.setAttribute("aria-current", String(slot === 0));
  });

  stayStepNumbers.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeStayIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", String(isActive));
  });

  if (stayGallery) {
    stayGallery.style.setProperty("--stay-progress", `${activeStayIndex / Math.max(total - 1, 1)}`);
  }

  resetStayInternalScroll();
}

function rotateStayFrame(direction = 1) {
  setStayFrame(activeStayIndex + direction);
}

function stopStayAutoplay() {
  clearTimeout(stayAutoTimer);
  stopStayInternalScroll();
}

function startStayAutoplay() {
  stopStayAutoplay();
  if (activePage !== "stay" || reducedMotion.matches || (!stayFrames.length && !stayPages.length)) return;
  startStayInternalScroll();
  stayAutoTimer = setTimeout(() => {
    rotateStayFrame(1);
    startStayAutoplay();
  }, getStaySlideDuration(activeStayIndex));
}

function getStaySlideDuration(index) {
  return staySlideDurations[index] || stayDefaultDuration;
}

function getActiveStayScrollCard() {
  return stayFrames[activeStayIndex]?.querySelector("[data-stay-scroll]")
    || stayPages[activeStayIndex]?.querySelector("[data-stay-scroll]")
    || null;
}

function resetStayInternalScroll() {
  stayScrollableCards.forEach((card) => {
    card.scrollTop = 0;
  });
}

function stopStayInternalScroll() {
  if (stayScrollAnimation) {
    cancelAnimationFrame(stayScrollAnimation);
    stayScrollAnimation = null;
  }
}

function startStayInternalScroll() {
  stopStayInternalScroll();
  const card = getActiveStayScrollCard();
  if (!card) return;

  const panels = [...card.querySelectorAll(".stay-scroll-panel")];
  const targets = panels.map((panel) => Math.min(panel.offsetTop - card.offsetTop, card.scrollHeight - card.clientHeight));
  if (targets.length < 2) return;

  const slideDuration = getStaySlideDuration(activeStayIndex);
  const transitionDuration = 1800;
  const holdDuration = Math.min(15000, Math.max((slideDuration - 10000) / targets.length, 9000));
  let lastTime = performance.now();
  let activeElapsed = 0;
  card.scrollTop = 0;

  function tick(now) {
    const delta = now - lastTime;
    lastTime = now;
    if (!isStayInternalScrollPaused(card)) {
      activeElapsed += delta;
    }

    const cycleDuration = holdDuration + transitionDuration;
    const index = Math.min(Math.floor(activeElapsed / cycleDuration), targets.length - 1);
    const nextIndex = Math.min(index + 1, targets.length - 1);
    const cycleElapsed = activeElapsed - index * cycleDuration;
    const transitionProgress = Math.max(0, Math.min((cycleElapsed - holdDuration) / transitionDuration, 1));
    const eased = transitionProgress < 0.5 ? 2 * transitionProgress * transitionProgress : 1 - Math.pow(-2 * transitionProgress + 2, 2) / 2;

    card.scrollTop = targets[index] + (targets[nextIndex] - targets[index]) * eased;

    if (index === targets.length - 1 && cycleElapsed >= holdDuration) {
      stayScrollAnimation = null;
      return;
    }
    stayScrollAnimation = requestAnimationFrame(tick);
  }

  stayScrollAnimation = requestAnimationFrame(tick);
}

function isStayInternalScrollPaused(card) {
  return card.matches(":hover") || card.contains(document.activeElement);
}

function updateEquipmentModal(key, options = {}) {
  const { updateMedia = true } = options;
  const lang = root.dataset.lang || "en";
  const state = copy[lang];
  const item = equipmentCatalog[key];
  if (!item) return false;

  equipmentModalIcon.src = item.icon;
  equipmentModalTitle.textContent = state[item.key] || "";
  equipmentModalText.textContent = item.notesKey ? (state[item.notesKey] || "") : state.equipmentModalIntro;
  if (!item.notesKey && item.video) equipmentModalText.textContent = "";

  if (updateMedia) {
    const isDirectVideo = item.videoType === "mp4";
    const embedUrl = item.video && !isDirectVideo ? getYoutubeEmbedUrl(item.video) : "";
    const hasVideo = Boolean(embedUrl || (isDirectVideo && item.video));
    equipmentVideoBox.hidden = !hasVideo;
    equipmentVideoFrame.hidden = !embedUrl;
    equipmentVideoFrame.src = embedUrl;
    equipmentVideoPlayer.hidden = !isDirectVideo;
    equipmentVideoPlayer.src = isDirectVideo ? item.video : "";
  }

  if (item.pdf) {
    setEnabledResource(equipmentPdfLink, item.pdf, state.equipmentPdfReady);
  } else {
    setDisabledResource(equipmentPdfLink, state.equipmentToConfigure);
  }

  equipmentAppLogo.src = item.appLogo || "";
  equipmentAppLogo.hidden = !item.appLogo;
  equipmentAppLink.hidden = !item.app;
  if (item.app) {
    setEnabledResource(equipmentAppLink, item.app, state.equipmentAppReady);
  } else {
    setDisabledResource(equipmentAppLink, state.equipmentAppFallback);
  }

  return true;
}

function openEquipmentModal(key) {
  if (!updateEquipmentModal(key)) return;
  activeEquipmentKey = key;
  equipmentModal.classList.add("is-open");
  equipmentModal.setAttribute("aria-hidden", "false");
  equipmentClose.focus();
}

function closeEquipmentModal() {
  activeEquipmentKey = null;
  equipmentModal.classList.remove("is-open");
  equipmentModal.setAttribute("aria-hidden", "true");
  equipmentVideoFrame.src = "";
  equipmentVideoPlayer.pause();
  equipmentVideoPlayer.removeAttribute("src");
  equipmentVideoPlayer.load();
}

document.querySelectorAll(".equipment-card").forEach((button) => {
  button.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".equipment-card")];
    const index = cards.indexOf(button);
    if (index === activeEquipmentIndex) {
      openEquipmentModal(button.dataset.equipment);
      return;
    }
    activeEquipmentIndex = index;
    updateEquipmentCarousel();
    startEquipmentAutoplay();
  });
});

equipmentPrev.addEventListener("click", () => {
  rotateEquipment(-1);
  startEquipmentAutoplay();
});

equipmentNext.addEventListener("click", () => {
  rotateEquipment(1);
  startEquipmentAutoplay();
});

equipmentGrid.addEventListener("mouseenter", stopEquipmentAutoplay);
equipmentGrid.addEventListener("mouseleave", startEquipmentAutoplay);

equipmentGrid.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (equipmentWheelLock) return;
  equipmentWheelLock = true;
  rotateEquipment(event.deltaY > 0 || event.deltaX > 0 ? 1 : -1);
  startEquipmentAutoplay();
  setTimeout(() => {
    equipmentWheelLock = false;
  }, 260);
}, { passive: false });

stayFrames.forEach((frame, index) => {
  frame.addEventListener("click", () => {
    setStayFrame(index);
    if (activePage === "stay") startStayAutoplay();
  });
});

stayStepNumbers.forEach((button, index) => {
  button.addEventListener("click", () => {
    setStayFrame(index);
    if (activePage === "stay") startStayAutoplay();
  });
});

stayGallery?.addEventListener("mouseenter", stopStayAutoplay);
stayGallery?.addEventListener("mouseleave", () => {
  if (activePage === "stay") startStayAutoplay();
});
stayGallery?.addEventListener("focusin", stopStayAutoplay);
stayGallery?.addEventListener("focusout", () => {
  if (activePage === "stay" && !stayGallery.contains(document.activeElement)) startStayAutoplay();
});

stayJourneySteps.forEach((button, index) => {
  button.addEventListener("click", () => {
    const target = stayJourneyPages[index];
    if (!target) return;
    frameScroll.style.scrollSnapType = "none";
    frameScroll.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    setStayJourneyStep(index);
    setTimeout(() => {
      frameScroll.style.scrollSnapType = "";
    }, 360);
  });
});

equipmentClose.addEventListener("click", closeEquipmentModal);

equipmentModal.addEventListener("click", (event) => {
  if (event.target === equipmentModal) closeEquipmentModal();
});

document.querySelectorAll(".equipment-links a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("aria-disabled") === "true") event.preventDefault();
  });
});

document.querySelectorAll(".stay-reveal").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".stay-secret-row");
    const secret = row?.querySelector(".stay-secret");
    if (!secret) return;
    const isVisible = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isVisible));
    secret.textContent = isVisible ? secret.dataset.mask : secret.dataset.secret;
    const icon = button.querySelector("img");
    if (icon) icon.src = isVisible ? "Assets/Icon/eye.svg" : "Assets/Icon/eye-crossed.svg";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wishModal?.classList.contains("is-open")) {
    closeWishModal();
  }
  if (event.key === "Escape" && departureModal?.classList.contains("is-open")) {
    closeDepartureChecklist();
  }
  if (event.key === "Escape" && equipmentModal.classList.contains("is-open")) {
    closeEquipmentModal();
  }
});

wishForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(wishForm);
  const firstName = String(data.get("firstName") || "").trim();
  const lastName = String(data.get("lastName") || "").trim();
  const wish = String(data.get("wish") || "").trim();
  const lang = root.dataset.lang || "en";
  const state = copy[lang];
  const subject = `${state.mailSubject} - ${firstName} ${lastName}`.trim();
  const body = [
    `${state.mailFirstName}: ${firstName}`,
    `${state.mailLastName}: ${lastName}`,
    "",
    `${state.mailWish}:`,
    wish
  ].join("\n");

  if (wishRecipientEmail) {
    window.location.href = `mailto:${encodeURIComponent(wishRecipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  wishThanks.textContent = state.thanks;
  wishForm.reset();
});

stayAroundModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeAroundMode = button.dataset.aroundMode || "walk";
    renderAroundExplorer();
  });
});

stayAroundFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeAroundFilter = button.dataset.aroundFilter || "all";
    renderAroundExplorer();
  });
});

stayAroundList?.addEventListener("pointerover", (event) => {
  const item = event.target.closest("[data-around-item]");
  if (!item) return;
  stayAroundMap?.querySelector(`[data-around-marker="${item.dataset.aroundItem}"]`)?.classList.add("is-linked");
});

stayAroundList?.addEventListener("pointerout", (event) => {
  const item = event.target.closest("[data-around-item]");
  if (!item) return;
  stayAroundMap?.querySelector(`[data-around-marker="${item.dataset.aroundItem}"]`)?.classList.remove("is-linked");
});

const storedTheme = readStoredPreference(storageKeys.theme);
const storedLang = readStoredPreference(storageKeys.lang);
const storedLocation = readStoredPreference(storageKeys.location);

selectedLocation = locations[storedLocation] ? storedLocation : "Roubaix";
const selectedOption = weatherMenu.querySelector(`[data-location="${selectedLocation}"]`);
if (selectedOption) {
  weatherMenu.querySelectorAll("[role='option']").forEach((item) => {
    item.setAttribute("aria-selected", String(item === selectedOption));
  });
}

setTheme(storedTheme === "dark" ? "dark" : "light", false);
setLanguage(copy[storedLang] ? storedLang : "fr", false);
renderCityGuide();
updateEquipmentCarousel();
setStayFrame(0);
startEquipmentAutoplay();
updateEventsNearby();
updateNavIndicator();
requestAnimationFrame(updateNavIndicator);



