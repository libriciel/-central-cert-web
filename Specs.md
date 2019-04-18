# Spécifications

***

## Spécifications techniques

### Récupération des certificats

Une page dédiée à l'ajout de certificats à la base de donénes offrira différentes manières de les ajouter.

* **Par URL :**

  * L'utilisateur a accès à un formulaire.

  * L'utilisateur peut entrer une URL dans un champ prévu à cet effet.

  * En validant le formulaire :

  * Il pourra visualiser une liste des certificats présent dans l'URL.

    * Pour chaque certificat de la liste, l'utilisateur peut décocher ou cocher une case (cochée de base) qui permettra de choisir si oui ou non on décide d'enregistrer le certificat.

    * Une vois les certificats choisis, un bouton permet de définitivement enregistrer les certificat.

    * Après avoir enregistré les certificats, on obtient un visuel des certificats enregistré ainsi que le choix de continuer à entrer des URL, ou de visualiser la liste des certificats enregistrés.

  * Si aucun certificat n'est présent ou que l'URL est incorrecte, un message d'erreur apparaît en réponse.

* **Par le magasin Windows :**

  ***TODO***

* **Par token :**

  * L'utilisateur à accès à un formulaire.

  * L'utilisateur peut rechercher un fichier grâce à un champ prévu à cet effet.

  * L'utilisateur peut ainsi importer son certificat.

  * Une fois le certificat choisit, l'utilisateur peut valider le formulaire.

  * En validant me formulaire :

    * Soit le formulaire est valide et le certificat est enregistré.

      * Le certificat est importé dans la liste et l'utilisateur a un visuel du certificat effectivement enregistré.

    * Dans le cas ou le certificat est invalide, une erreur est renvoyée.

### Gestion des certificats

#### Liste des certificats

* ***Informations visibles pour chaque certificat de la liste :***

  1. **Sujet du certificat.**

  2. **Autorité de certification.**

  3. **Date d'expiration / temps restant du certificat.**

  4. **Couleur**

      a. Une couleur est présente pour chaque certificat de la liste.

      b. Elle représente l'état du certificat dans le temps.

      c. Vert / Orange / Rouge en fonction du temps.

* ***Actions possible sur la liste :***


  1. **Bouton / icône "supprimer" :**

      a. Pour chaque certificat de la liste, un bouton "supprimer" est présent.

      b. Il permet de supprimer un certificat de la base de données.

      c. Une fois ce bouton activé, on demande à l'utilisateur s'il veut vraiment supprimer ce certificat.

      d. S'il décide de le supprimer, le certificat est supprimé de la base de données.

      e. Sinon rien ne se passe.

  2. **Bouton / icône "supprimer tout" :**

      a. Un bouton "supprimer tout" est présent dans la liste.

      b. Il permet de supprimer tous les certificats de la base de données.

      c. Une fois ce bouton activé, on demande à l'utilisateur s'il veut vraiment supprimer tous les certificats.

      d. S'il décide de les supprimer, les certificat sont supprimés de la base de données.

      e. Sinon rien ne se passe.

  3. **Bouton/ icône "Ajouter aux favoris :"**

      a. Pour chaque certificat dans la liste, un bouton "ajouter aux favoris" est présent.

      b. Cliquer dessus ajoute / retire le certificat des favoris.

      c. Un certificat ajouté aux favoris sera en haut de la liste.

      d. Pour chaque ajout / retrait d'un favoris, on envoi une notification à l'utilisateur. Cette notification prévient d'un ajout ou d'un retrait des favoris.

  4. **Sélection des certificats :**

      a. Pour chaque certificat de la liste, une case à cocher est présente.

      b. Il est possible de cocher / décocher ces cases afin de sélectionner les certificats et effectuer des actions de groupes décrites plus tard.

  5. **Bouton sélectionner tout :"**

      a. Un bouton "tout sélectionner" est présent en haut de la liste.

      b. en appuyant sur ce bouton, on sélectionne / dé-sélectionne tous les certificats de la liste.

  6. **Action de groupe : supprimer :**

      a. Un bouton "Supprimer les éléments sélectionnés" est présent en haut de la liste.

      b. En appuyant sur ce bouton :

      c. Si des certificats sont sélectionnés :

          a. On demande une validation à l'utilisateur.

          b. si l'utilisateur valide les certificats sélectionnés sont supprimés.

          c. Sinon rien ne se passe.

      d. Si aucun certificat n'est sélectionné :

          a. On envoi un message disant qu'aucun certificat n'est sélectionné.

  7. **Action de groupe : Ajouter aux favoris :**

      a. Un bouton "ajouter les éléments sélectionnés aux favoris" est présent en haut de la liste.

      b. En appuyant sur ce bouton :

      c. Si des certificats sont sélectionnés :

          a. Les certificats sélectionnés sont ajoutés aux favoris.

      d. Si aucun certificat n'est sélectionné :

          a. On envoi un message disant qu'aucun certificat n'est sélectionné.

    8. **Tri des certificats :**

        a. En cliquant sur le haut des colonnes de chaque attribut des certificats, il est possible de les trier en fonction de ces attributs.

            a. Tri par sujet.

            b. Tri par AC.

            c. tri par date.

    9. **Recherche des certificats :**

        a. Une barre de recherche est située en haut de la liste.

        b. Il est possible d'entrer des recherches et d'afficher uniquement les certificats concernés.

***

#### Détail d'un certificat

Le détail d'un certificat est accessible en cliquant sur celui-ci dans la liste.

* ***Informations visibles dans le détail d'un certificat :***

    1. Not before.

    2. Not After.

    3. Temps restant.

    4. Intitulé (Common Name).

    5. Organisation.

    6. Unité d'Organisation (Organizational Unit).

    7. Localité.

    8. Pays.

    9. Titre.

    10. Domain Component.

    11. Rue.

    12. Code postal / Zip code.

    13. adresse mail du certificat.

    14. Adresse additionnelles.

* ***Actions possibles dans le détail d'un certificat :***

    1. **Ajout de mails :**

        a. Un formulaire est présent dans le détail du certificat.

        b. Le formulaire est composé d'un champ permettant d'entrer une adresse mail et d'un bouton permettant de valider le formulaire.

        c. En validant le formulaire :

        d. Si une adresse mail valide est présente dans le champ :

            a. L'adresse mail est ajoutée aux adresses additionnelles du certificat.

        d. Si une adresse mail invalide est présente dans le champ :

            a. On envoi un message d'erreur à l'utilisateur.

        e. Si aucune adresse n'est présente dans le champ :

            a. On envoi un message d'erreur à l'utilisateur.

    2. **Suppression de mails :**

        a. Pour chaque adresse additionnelle présente dans le détail du certificat, un bouton "Supprimer l'adresse" est disponible.

        b. Une fois activé, ce bouton supprime l'adresse du certificat.

    2. **Bouton "Supprimer" :**

        a. Un bouton "supprimer le certificat" est présent dans le détail du certificat.

        b. Il permet de supprimer le certificat de la base de données.

        c. Une fois ce bouton activé, on demande à l'utilisateur s'il veut vraiment supprimer ce certificat.

        d. S'il décide de le supprimer, le certificat est supprimé de la base de données et l'utilisateur quitte le détail.

        e. Sinon rien ne se passe.

    3. **Bouton "Ajouter aux favoris" :**


        a. Un bouton "ajouter aux favoris" est présent dans le détail du certificat.

        b. Cliquer dessus ajoute / retire le certificat des favoris.


    4. **Gestion des notifications :**

        1. Gestion des adresses à notifier :

            a. Pour chaque adresse additionnelle, une case à cocher est présente.

            b. Si la case est cochée, le mailing automatique est activé pour cette adresse du certificat.

            c. Si la case est décochée, le mailing automatique est désactivé pour cette adresse du certificat.

        2. Gestion de l'activation des notification personnalisées :

            a. Une case à cocher permet d'activer ou de désactiver (désactivé de base) les notifications personnalisées à ce certificat.

            b. En cas d'activation des notifications personnalisées, un formulaire permettant de modifier ces notifications apparaît dans le détail du certificat (point numéro 5).

    5. **Gestion du contenu de la notification :**

        a. Dans le détail du certificat, un formulaire permettra de modifier l'objet et le message de la notification de ce certificat.

        b. En validant le formulaire, une notification personnalisée à ce certificat est créée.

        c. Il est possible de modifier tous les types de notifications.
***

#### Notifications et mailing automatique

Les notifications décrites plus bas seront à la fois visibles dans l'application et envoyée aux adresses mails présentes dans les certificats.

Un certificat peut avoir une notification personnalisée qui est modifiable dans le détail des certificats. Mais dans le cas ou cette notification est désactivée, c'est la notification de base qui est envoyée.

Si les notifications personnalisées sont modifiables dans le détail des certificats, les notifications de base sont modifiables dans les options de l'application.

* ***Informations présentes dans une notification :***

    1. Objet :

        L'objet d'une notification comporte une indication sur le but de celle-ci. Par exemple lorsque qu'un certificat arrive à son terme, l'objet de la notification pourrait être : "Certificat bientôt périmé".

    2. Certificat concerné :

        Des informations sur le certificat concerné par la notification seront communiquées avec la notification.

    3. Message :

        Un message permettra de compléter la notification en donnant des spécifications sur celle-ci.

* ***Déclenchement d'une notification :***

    1. Différents stages sont identifiables dans le temps pour les certificats. On souhaite donc déclencher des notifications lorsque un certificats entre dans l'un de ces stades. Par exemple lorsque le certificat va expirer dans un ans, un mois ou une semaine.

* ***Gestion des notifications:***

    1. **Modification du sujet :**

        Afin d'altérer le sujet de la notification, un champ est présent dans le formulaire de modification et permet d'entrer un nouveau sujet.

    2. **Modification du message :**

        Afin d'altérer le message de la notification, un champ est présent dans le formulaire de modification et permet d'entrer un nouveau message.
