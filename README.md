### Mon Gestionnaire d'évènements

## Application cliente développée en React.js, Typescript, Bootstrap.

### Réalisé en 2022

Cette application cliente est réalisée en React.js. Les librairies suivantes ont été utilisées : Formik pour la gestion des formulaires, React-bootstrap, React-table et React-tooltip pour l'interface utilisateur, React-router-dom pour la navigation.

L'application serveur est réalisée en Typescript, exécutée par Node.js, et utilise le framework Express, ainsi que les librairies suivantes : Bcrypt et Jsonwebtoken pour l'authentification, Mongoose et Mongoose-unique-validator pour la gestion de la base de données.

Les données de l'applications sont sauvegardées en base de donnes orientée documents MongoDb.

L'application permet de créer et partager des évènements qui seront visibles par les autres utilisateurs.

L'application repose sur le système d'authentification proposé par react-router-dom, basé sur l'échange de tokens d'identification générés par le serveur.

Les pages de l'application ne sont accessibles qu'aux utilisateurs authentifiés. Les évènements ne sont modifiables ou supprimables que par leur auteur. Par contre les évènements peuvent être signalés par tous les autres utilisateurs.

Le formulaire de création des évènement utilise la librairie Formik pour le traitement de la validation des champs du formulaire.

Bootstrap et React-Bootstrap ont été utilisé pour l'UI de l'application et pour certains composants : la tables des évènements, la barre de navigation, la mise en forme des formulaires, etc...

Le tableau des évènements propose des filtres dynamiques selon les catégories, la ville et le prix de l'évènement (filtrage du dataset à afficher) et un mécanisme "responsive" permet de masquer certaines colonnes en fonctions de la résolution horizontale de l'écran.

La librairie react-tooltip a été utilisée pour ajouter des tooltips d'aide à l'utilisation de l'application sur de nombreux composants.

[Visiter l'application Gestionnaire d'évènements](https://mongestionnairedevenements.netlify.app/)

### Licence

Projet sous licence MIT (cf. fichier Licence.txt)
