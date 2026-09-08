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
const frameScroll = document.querySelector(".frame-scroll");
const sideNav = document.querySelector("#sideNav");
const bottomNav = document.querySelector(".bottom-nav");

const wishRecipientEmail = "";

const storageKeys = {
  theme: "airbnbWelcome.theme",
  lang: "airbnbWelcome.lang",
  location: "airbnbWelcome.weatherLocation"
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
    navWelcome: "Bienvenu",
    navHome: "Le logement",
    navStay: "Votre séjour",
    navDiscover: "A Découvrir",
    navHelp: "Besoin d'aide ?",
    qrKicker: "Tu veux l'avoir dehors ?",
    qrTitle: "Scanne le QR Code",
    wishTitleInline: "Fais un vœu pour ton prochain séjour",
    wishSubtitle: "Si tu reviens ici, qu'est-ce que tu aimerais avoir en plus ou en moins ?",
    wishButton: "Faire un vœu",
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
    equipmentTitleStrong: "Guide",
    equipmentTitleMuted: "équipement",
    equipmentIntro: "Choisissez un équipement pour retrouver sa fiche, ses étapes et les accès utiles depuis la tablette.",
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
    stayStepHouse: "Maison",
    stayStepComfort: "Confort",
    stayStepTogether: "Bien vivre",
    stayStepLastWord: "Dernier mot",
    stayStepDeparture: "Départ",
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
    sideStayFraming: "Framing",
    sideWelcomeHero: "Accueil",
    sideWelcomeExplore: "Explorer",
    sideWelcomeQr: "QR code",
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
    qrKicker: "Want to have this outside ?",
    qrTitle: "Scan the QR Code",
    wishTitleInline: "Make one wish for your next stay",
    wishSubtitle: "If you come back here, what would you like to have more or less of?",
    wishButton: "Make a wish",
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
    equipmentTitleStrong: "Equipment",
    equipmentTitleMuted: "guide",
    equipmentIntro: "Choose an appliance to find its PDF sheet, steps and useful tablet access.",
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
    stayStepHouse: "Home",
    stayStepComfort: "Comfort",
    stayStepTogether: "Living well",
    stayStepLastWord: "Last word",
    stayStepDeparture: "Departure",
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
    sideStayFraming: "Framing",
    sideWelcomeHero: "Welcome",
    sideWelcomeExplore: "Explore",
    sideWelcomeQr: "QR code",
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
    { id: "welcome-explore", key: "sideWelcomeExplore", icon: "Assets/Icon/Shortcut.svg" },
    { id: "welcome-qr", key: "sideWelcomeQr", icon: "Assets/Icon/qr.svg" }
  ],
  home: [
    { id: "home-blank", key: "sideHomeCover", icon: "Assets/Icon/La maison.svg" },
    { id: "home-equipment", key: "sideHomeEquipment", icon: "Assets/Icon/snap.svg" }
  ],
  stay: [
    { id: "stay-blank", key: "sideStayFraming", icon: "Assets/Icon/Your stay.svg" }
  ],
  discover: [
    { id: "discover-blank", key: "navDiscover", icon: "Assets/Icon/A découvrir.png" }
  ],
  help: [
    { id: "help-blank", key: "navHelp", icon: "Assets/Icon/Help.svg" }
  ]
};

let activePage = "welcome";
let activeEquipmentIndex = 0;
let activeEquipmentKey = null;
let activeStayIndex = 0;
let equipmentAutoTimer;
let stayAutoTimer;
let stayScrollAnimation;
let equipmentWheelLock = false;
const stayDefaultDuration = 5600;
const staySlideDurations = {};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const locations = {
  Roubaix: { country: "FR", label: { fr: "Roubaix", en: "Roubaix" }, latitude: 50.6927, longitude: 3.1778 },
  Lille: { country: "FR", label: { fr: "Lille", en: "Lille" }, latitude: 50.6292, longitude: 3.0573 },
  Tourcoing: { country: "FR", label: { fr: "Tourcoing", en: "Tourcoing" }, latitude: 50.7239, longitude: 3.1612 },
  "Villeneuve-dAscq": { country: "FR", label: { fr: "Villeneuve-d'Ascq", en: "Villeneuve-d'Ascq" }, latitude: 50.6233, longitude: 3.1443 },
  Wattrelos: { country: "FR", label: { fr: "Wattrelos", en: "Wattrelos" }, latitude: 50.7012, longitude: 3.2181 },
  Dunkerque: { country: "FR", label: { fr: "Dunkerque", en: "Dunkerque" }, latitude: 51.0344, longitude: 2.3768 },
  Bergues: { country: "FR", label: { fr: "Bergues", en: "Bergues" }, latitude: 50.9688, longitude: 2.4324 },
  Douai: { country: "FR", label: { fr: "Douai", en: "Douai" }, latitude: 50.3674, longitude: 3.0800 },
  Valenciennes: { country: "FR", label: { fr: "Valenciennes", en: "Valenciennes" }, latitude: 50.3571, longitude: 3.5233 },
  Cambrai: { country: "FR", label: { fr: "Cambrai", en: "Cambrai" }, latitude: 50.1758, longitude: 3.2347 },
  Tournai: { country: "BE", label: { fr: "Tournai", en: "Tournai" }, latitude: 50.6056, longitude: 3.3880 },
  Courtrai: { country: "BE", label: { fr: "Courtrai", en: "Kortrijk" }, latitude: 50.8280, longitude: 3.2649 },
  Bruges: { country: "BE", label: { fr: "Bruges", en: "Brugge" }, latitude: 51.2093, longitude: 3.2247 },
  Gand: { country: "BE", label: { fr: "Gand", en: "Gent" }, latitude: 51.0543, longitude: 3.7174 },
  Bruxelles: { country: "BE", label: { fr: "Bruxelles", en: "Brussel" }, latitude: 50.8503, longitude: 4.3517 }
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
  wishClose.setAttribute("aria-label", state.close);
  departureChecklistClose?.setAttribute("aria-label", state.close);
  renderSideNav(activePage, lang);
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
  if (activeEquipmentKey && equipmentModal.classList.contains("is-open")) {
    updateEquipmentModal(activeEquipmentKey, { updateMedia: false });
  }
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
}

function renderSideNav(page, lang = root.dataset.lang || "en") {
  const sections = pageSections[page] || pageSections.welcome;
  sideNav.innerHTML = sections.map((section, index) => `
    <button class="${index === 0 ? "is-active" : ""}" type="button" data-scroll-target="${section.id}" aria-label="${copy[lang][section.key]}">
      <img src="${section.icon}" alt="">
    </button>
  `).join("");
}

function setActiveSection(sectionId) {
  sideNav.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scrollTarget === sectionId);
  });
}

function updateNavIndicator() {
  const activeItem = bottomNav.querySelector(".nav-item.is-active");
  if (!activeItem) return;

  const navRect = bottomNav.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  bottomNav.style.setProperty("--active-x", `${itemRect.left + itemRect.width / 2 - navRect.left}px`);
}

function setActivePage(page) {
  const targetPage = document.querySelector(`.page-content[data-page="${page}"]`) ? page : "home";
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
    setStayFrame(activeStayIndex);
    startStayAutoplay();
  } else {
    stopStayAutoplay();
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
});

window.addEventListener("resize", updateNavIndicator);

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

async function updateWeather() {
  const lang = root.dataset.lang || "en";
  const place = locations[selectedLocation] || locations.Roubaix;
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
    renderForecast(await response.json());
  } catch (error) {
    weatherIcon.textContent = "☁";
    weatherTemp.textContent = "--°";
    weatherRange.textContent = `${copy[lang].rangeHigh}: --°  ${copy[lang].rangeLow}: --°`;
    weatherStatus.textContent = copy[lang].fallback;
    weatherDays.innerHTML = "";
  }

  clearTimeout(weatherRefreshTimer);
  weatherRefreshTimer = setTimeout(updateWeather, 20 * 60 * 1000);
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
});

weatherMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-location]");
  if (!option) return;

  selectedLocation = option.dataset.location;
  weatherSelected.textContent = getLocationLabel(selectedLocation, root.dataset.lang);
  storePreference(storageKeys.location, selectedLocation);
  weatherMenu.querySelectorAll("[role='option']").forEach((item) => {
    item.setAttribute("aria-selected", String(item === option));
  });
  weatherMenu.classList.remove("is-open");
  weatherSelect.setAttribute("aria-expanded", "false");
  updateWeather();
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".weather-location")) return;
  weatherMenu.classList.remove("is-open");
  weatherSelect.setAttribute("aria-expanded", "false");
});

function openWishModal() {
  wishModal.classList.add("is-open");
  wishModal.setAttribute("aria-hidden", "false");
  wishThanks.textContent = "";
  document.querySelector("#wishFirstName").focus();
}

function closeWishModal() {
  wishModal.classList.remove("is-open");
  wishModal.setAttribute("aria-hidden", "true");
}

wishOpen.addEventListener("click", openWishModal);
wishClose.addEventListener("click", closeWishModal);

wishModal.addEventListener("click", (event) => {
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
    if (slot > 2) slot = 3;
    if (slot < -2) slot = -3;
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
  equipmentAutoTimer = setInterval(() => rotateEquipment(1), 4200);
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
  if (event.key === "Escape" && wishModal.classList.contains("is-open")) {
    closeWishModal();
  }
  if (event.key === "Escape" && departureModal?.classList.contains("is-open")) {
    closeDepartureChecklist();
  }
  if (event.key === "Escape" && equipmentModal.classList.contains("is-open")) {
    closeEquipmentModal();
  }
});

wishForm.addEventListener("submit", (event) => {
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
updateEquipmentCarousel();
setStayFrame(0);
startEquipmentAutoplay();
updateNavIndicator();
requestAnimationFrame(updateNavIndicator);



