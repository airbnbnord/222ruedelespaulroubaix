# 222ruedelespaulroubaix
Site Web

## APIs evenements sur GitHub Pages

GitHub Pages sert uniquement des fichiers statiques. Le fichier `server.js` fonctionne en local, mais il ne tourne pas sur GitHub Pages; la route dynamique `api/events-nearby` est donc remplacee par des fichiers JSON generes dans `api/`.

Pour activer les donnees live sans exposer les cles dans le code :

1. Ouvrir `Settings` > `Secrets and variables` > `Actions` dans ce depot GitHub.
2. Ajouter les secrets `TICKETMASTER_API_KEY` et `OPENAGENDA_API_KEY`.
3. Aller dans `Actions` > `Update events cache` > `Run workflow`.

Le workflow mettra ensuite a jour `api/*.json` automatiquement trois fois par jour.
