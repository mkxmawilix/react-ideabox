# Ideabox

Ce projet est un simple projet (front) de "Boite à idées" réalisé en ReactJS.

Il a pour but de me faire découvrir le framework ReactJS et de me familiariser avec.

N'ayant pas de partie "Back", les logiques de connexion, création/modification/suppression d'idées, de vote sont totalement fictives et les données non persistantes.

La partie "Back" n'est pas encore disponible mais sera réalisée en NodeJS (ExpressJS) et MongoDB par la suite.

Pour le moment un simple fichier JSON est utilisé pour simuler une base de données.

## Fonctionnalités

TODO :

#### Frontend
- [x] Création d'une idée (titre, description) une fois connecté
- [x] Modification d'une idée une fois connecté
- [x] Suppression d'une idée une fois connecté
- [x] Affichage des idées
- [x] Affichage d'une idée au clic sur la liste
- [x] Affichage "Top" des idées : 3 idées les plus votées, 3 idées les plus récentes, 3 idées dernièrement cloturées
- [x] Tri des idées par date, titre, nombre de votes
- [ ] Pouvoir voter pour une idée une fois connecté
- [x] Pouvoir s'inscrire
- [x] Pouvoir se connecter
- [x] Pouvoir se déconnecter
- [x] Pouvoir modifier son profil
- [ ] Pouvoir mettre une photo de profil (upload)
- [ ] Pouvoir supprimer son profil
- [ ] Pouvoir supprimer son compte
- [ ] Pouvoir récupérer son mot de passe
- [x] Pouvoir modifier son mot de passe
- [x] Pouvoir commenter un message sur une idées une fois connecté
- [x] Pouvoir consulter les commentaires pour une idée
- [ ] Pouvoir voter pour un message sur une idées une fois connecté
- [ ] Mettre en place la règle de calcul des points pour les idées (en fonction de l'ancienneté, du nombre de votes, du nombre de commentaires et d'idées postées cloturées ?)
- [ ] Suppression du compte utilisateur
- [ ] Amélioration de la règle de mot de passe


#### Backend
- [x] Enregistrement des utilisateurs
- [x] Connexion des utilisateurs
- [ ] Déconnexion des utilisateurs
- [ ] Contrôle des tokens bloqués
- [x] Modification des utilisateurs
- [ ] Suppression des utilisateurs
- [x] Enregistrement des idées
- [x] Modification des idées
- [x] Suppression des idées
- [ ] Enregistrement des commentaires
- [ ] Modification des commentaires
- [ ] Suppression des commentaires
- [ ] Enregistrement des votes
- [ ] Modification des votes
- [ ] Suppression des votes