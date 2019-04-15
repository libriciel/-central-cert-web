# Atteste

Application de gestion des certificats électroniques
Sujet de stage

## **Analyse de l'existant**

Très peu de logiciels ou applications permettent actuellement la gestion et la visualisation de plusieurs certificats électroniques.

Parmi les entreprises qui proposent ce type de produits :

* ### **GlobalSign :**

  L'entreprise "**GlobalSign**" vend ce service. Cette entreprise est une autorité de certification et un fournisseur de services d'identité. Parmi leurs produits on peut trouver la création de certificats SSL et la gestion de plateformes PKI. Le service qui nous intéresse est appelé "portail AEG" (Auto Enrolment Gateway). Ce portail AEG permet une automatisation et gestion simplifiée des certificats électroniques. Permettant d'avoir une vision globale des certificats fournis par GlobalSign et par d'autres sources.

  Le service proposé par GlobalSign est relativement complexe comme il propose un système de renouvellement automatique des certificats.

  Ci dessous, le schéma de l'AEG de GlobalSign :

  ![Schéma de l'AEG de GlobalSign](markdown_ressources/img/AEG_Schema.png)

  L'un des objectifs de cette plateforme est de libérer les entreprises des Autorités de Certifications (AC) Windows, jugées trop lourdes et coûteuses à entretenir.

  GlobalSign soulève un problème en 2017 :

  > Les entreprises utilisent les infrastructures à clé publique (PKI, Public Key Infrastructure) pour communiquer et échanger des données en toute sécurité. Mais, face à une véritable prolifération de terminaux divers et variés, elles s’interrogent sur la capacité des infrastructures PKI à prendre en charge ces nouveaux écosystèmes sans pour autant devenir un fardeau.

  > <cite> Communiqué de presse GLobalSign - 2017

  Le portail AEG est leur solution à ce problème.

  La solution proposée par GlobalSign est très appréciée et semble performante, mais elle reste payante et non Open Source.

* ### **Thawte :**

  L'entreprise "**Thawte**" qui vend des certificats SSL évoque dans un document la notion de "Parc de certificats", dont le but est de centraliser les certificats utilisés dans une entreprise dans un seul et même espace.

  * Le parc de certificats selon Thawte:

    Ils distinguent 5 étapes à la gestion des certificats :

    1. Effectuez un audit de tous vos domaines et certificats.

    2. Consolidez tous vos certificats au sein d’un compte géré et centralisé.

    3. Définissez un processus administratif applicable à toute l’entreprise.

    4. Programmez des alertes et produisez des rapports réguliers sur la situation du parc et les renouvellements imminents.

    5. Révoquez et remplacez les certificats en cas de besoin.

  Ainsi, l'idée principale est de regrouper tous les certificats utilisés dans un espace (ici une entreprise), de les référencer dans un compte commun à l'entreprise et enfin de mettre en place un système d'alerte afin de prévenir une fin de validité par exemple.

  Thawte vend ce service de gestion des certificats, mais il est utilisable uniquement pour les certificats SSL vendus par leur entreprise. On perd ainsi l'intérêt de rassembler tous les certificats d'une entreprise.

* ### **Quest :**

  L'entreprise "**Quest**" est une entreprise de gestion informatique qui propose diverse services comme de la gestion de base de données, de la protection des données et de la gestion de plateformes. Parmi leurs produits on trouve "Active Administrator for Certificate Management", un outil de gestion du cycle de vie des certificats numériques.

  L'application est un module d'un logiciel également vendu par Quest; "Active Administrator", qui est un logiciel de gestion des logiciels Microsoft® Active Directory® (AD) censé combler les lacunes de ces outils.

  Quest présente son application comme une "console unique" qui permet de gérer l'intégralité du cycle de vie des certificats numériques d'un milieu (principalement pour une entreprise).

  *Ci-dessous une partie de l'interface proposée par Quest.*

  ![interface application quest](markdown_ressources/img/quest_interface.jpg)

  Diverses fonctionnalités viennent avec cette application :

  * #### Détection des certificats :

    Avec la "console" de l'application, il est possible de détecter la totalité des certificats présents dans une entreprise indépendamment de l'autorité de certification du certificat.

  * #### Expiration des certificats :

    Des alertes sont envoyés à l'expiration des certificats et il est possible de générer des rapports à propos des certificats bientôt expirés afin d'avoir une vision globale de la situation.

  * #### Restauration de certificats :

    Des certificats peuvent êtres restaurés et il est possible d'effectuer des sauvegardes quotidiennes.

  * #### Déploiement de certificats :

    Il est possible de copier les certificats d'un serveur vers un autre.

  Quest nous propose ici un service extrêmement complet autorisant la gestion de plusieurs certificats. Promettant une sauvegarde de l'intégrité des données ainsi qu'un système d'alertes complet permettant de visualiser facilement la situation globale.

***

## **Synthèse :**

  La solution amenée par GlobalSign est relativement complète, l'entreprise propose une plateforme de gestion complète et ouverte à tous les certificats (même ceux achetés en dehors de GlobalSign).

  D'un autre côté, la solution amenée par Thawte est bien moins intéressante. Elle limite la capacité de gestion aux certificats proposés par leur entreprise, on a néanmoins une gestion générale assez convaincante.

  Et finalement, la solution de Quest. Celle-ci semble parfaite. Un espace de gestion dédié aux certificats avec de nombreuses fonctionnalités intéressantes, en plus de cela, la capacité de réaliser des sauvegarde est un atout de choix.

  Mais malgré cette solution assez intéressante, il n'existe aucune solution open source.

  Ainsi, la mise en place d'une application de gestion centralisée des certificats électroniques est complètement justifiée. Les applications concurrentes ne sont pas placées sur le même marché et ne font que peu d'ombre à un tel projet.

***

## **Sources :**

* *Informations sur GlobalSign :*

  https://www.globalsign.fr/fr/entreprise/actualites-et-evenements/globalsign-etoffe-sa-plateforme-de-gestion-de-certificats/

  https://www.globalsign.fr/fr/aeg-pour-active-directory/

  https://www.globalsign.fr/fr/blog/3-raisons-d-utiliser-un-service-de-gestion-de-certificats/

* *Informations sur Thawte :*

  https://www.thawte.fr/assets/documents/guides/pdf/simplify-ssl-management.pdf

  https://www.thawte.fr/ssl/enterprise-ssl-certificates/

* *Informations sur Quest :*

  https://www.quest.com/fr-fr/products/active-administrator/

  https://www.quest.com/fr-fr/products/active-administrator-for-certificate-management/




## Spécifications


* ### **Ajout de certificats :**

  Le cœur de l'application réside dans la possibilité de récupérer les certificats à gérer de tous les moyens possible. Il est ainsi nécessaire de rendre facile d'accès l'ajout de ces certificats. Pour ce faire, différentes techniques sont possibles :

  * #### *Ajout via Token (magasin Windows) :*

    Le magasin de certificats Windows recense les certificats installés sur le système d'exploitation. Ainsi on souhaite pouvoir récupérer l'entièreté de ces certificats et les ajouter sur l'application.

  * #### *Ajout via URL :*

    Les pages WEB possèdent pour la majorité un certificat. Il est important de pouvoir simplement récupérer les certificats de ces pages WEB en entrant une URL dans l'application afin d'avoir une gestion plus simple de la validité des sites WEB à gérer.

  * #### *Ajout depuis une autre instance de l'application :*

    Dans l'idée ou plusieurs instances doivent êtres réunies, on peut souhaiter pouvoir directement importer une base de certificats.

***

* ### **Gestion des certificats :**

  Une fois les certificats ajoutés dans l'application, plusieurs actions sont possibles sur eux, allant d'un simple tri, à des alertes automatiques.

  * #### *Gestion des contacts :*

    Les deux points précédents impliquent la présence d'un destinataire à qui envoyer des notifications.

    Dans le cas ou la personne renseignée dans le certificat n'est pas la personne à contacter, il doit être possible d'ajouter des personnes à contacter pour chaque certificat.

  * #### *Groupage de certificats :*

    Certains certificats peuvent tous être en rapport avec un même sujet. La mise en place d'un système de regroupement de ces certificats facilitera la visualisation des    informations les concernant.

  * #### *Classification personnalisée :*

    Certains certificats doivent êtres mis en avant plus que d'autres. Un certificat primordial pour l'entreprise ou un groupe de certificats portant sur des logiciels phares.

    Afin de les mettre en avant, il sera possible d'organiser simplement la classification des certificats.

    Cela sera réalisable par une mise en favoris ou l'ajout d'un attribut d'importance, comme un "rang".

  * #### *Vérification de l'autorisation :*

    Afin de prévenir des problèmes futurs on souhaite vérifier si l'AC respective au certificat a toujours le droit de diffuser des certificats, relativement à un référentiel (RGS, eIDAS). Ainsi, il est possible de prévenir un changement d'AC.

  * #### *Sauvegarde des données :*

    Afin de fournir une application pratique et fiable, une sauvegarde sera possible. Donnant ainsi accès à une interface de gestion des "versions" avec la possibilité de restaurer ces versions antécédentes

***

* ### **Gestion des comptes :**

  Deux types de comptes composeront les accès à l'application, les comptes Utilisateur et les comptes Administrateur.

  * #### *Compte Utilisateur :*

    Chaque compte utilisateur est préservé par un login (ou adresse mail) et un mot de passe.

    Un compte utilisateur permettra l'ajout, la gestion et la visualisation des certificats du compte.

  * #### *Compte Administrateur :*

    Un compte administrateur est aussi préservé par un login et un mot de passe.

    Un compte administrateur permet de créer des comptes utilisateurs et de les gérer par la suite.

    Un compte utilisateur peut envoyer des demandes à des comptes utilisateurs afin de pouvoir les superviser.

    Un compte administrateur permet l'ajout, la gestion et la visualisation des certificats des comptes qu'il gère.

***

* ### **Visualisation des certificats :**

  La totalité des certificats doit pouvoir être visible d'un coup d’œil. Il est important de pouvoir avoir une vision globale de l'état des certificats. Chaque certificat sera facilement identifiable selon différents critères importants et entièrement paramétrables car chaque personne peut apporter une importance différente à une même information.

  Pour cela, différents codes visuels seront attribués dans la présentation des certificats. Allant des codes couleurs aux icônes.

  * #### *Identification des certificats :*

    Afin de faciliter l'identification d'un certificat en stade critique (bientôt expiré), il faut mettre en valeur le stade d'avancement des certificats. tous doivent avoir un indicateur de ce stade.

    Il s'agit d'une fonctionnalité semblant basique, mais elle reste très importante. Par exemple, en présence d'un grand nombre de certificats, on doit pouvoir rapidement identifier lesquels sont presque expirés.

  * #### *Tri des certificats :*

    Chaque certificat possède des caractéristiques différentes, et il peut être nécessaire de ne vouloir afficher que les certificats comportant certaines caractéristiques.

    On peut ainsi imaginer un système de tri :

    * ***Par date de création.***

    * ***Par date d'expiration.***

    * ***Par organisme de délivrance.***

    * ***Par propriétaire.***

    * ***Et par groupe.***

    Une barre de recherche pourra aussi être implémentée afin d'effectuer une recherche rapide parmi les certificats présents dans l'application.

  * #### *Système d'alertes :*

    Le précédent point implique la présence de plusieurs stades pour chaque certificat. L'implantation d'un système d'alertes pourra permettre de prévenir l'avancement dans le temps des certificats.

    Ces alertes peuvent autant être une notification interne à l'application, un envoi de mail ou un message directement envoyé à un destinataire.

  * #### *Mailing automatique :*

    Afin de pouvoir facilement prévenir de l'expiration et de l'avancement d'un certificat, il est nécessaire d'implémenter un système de mailing automatique.
***

* ***Représentation simplifiée des spécifications via un diagramme de cas d'utilisations :***

![](markdown_ressources/img/app_use_case.png)
