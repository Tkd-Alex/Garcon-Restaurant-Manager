## Backend (nodeJS):
Per realizzare il backend ho deciso di utilizzare nodeJS e mongoDB in quanto non avendo mai avuto l'occasione di smanettarci su, ho ben pensato di sfruttare Garçon.
Ovviamente il server è basato su [express](https://github.com/expressjs/express) e la gestione dei dati è stata affidata a [mongoose](https://github.com/Automattic/mongoose).

### Schema:
- *User*

| Attributo | Tipo |
| :------- | :------- |
| fullname | String |
| email | String |
| password | String |
| create | Date |
| age | Number
| sex | String |
| admin | Boolean |
| push_token | String |
| preferences | Object |
| preferences.defaultRestaurant | ObjectId (Restaurant) |
| preferences.newOrderNotification | Boolean |

- *Ingredient*

| Attributo | Tipo |
| :------- | :------- |
| name | String |

- *Product*

| Attributo | Tipo |
| :------- | :------- |
| name | String |
| price | Number |
| ingredients | Array of ObjectId (Ingredient) |
| category | String |

- *Order*

| Attributo | Tipo |
| :------- | :------- |
| tableNumber | String |
| date | Date |
| listProduct | Array of Object |
| listProduct.totalPrice | Number |
| listProduct.quantity | Number |
| listProduct.product | Mongoose schema (Product) |
| totalPrice | Number |
| paid | Boolean |
| complete | Boolean |
| waiter | ObjectId (User) |

- *Restaurant*

| Attributo | Tipo |
| :------- | :------- |
| name | String |
| address | Object |
| address.city | String |
| address.cap | String |
| address.street | String |
| orders | Array of Mongoose schema (Order) |
| menu | Array of Mongoose schema (Product) |
| owner | ObjectId (User) |
| waiter | Array of ObjectId (User) |

### Middleware:
- *requireLogin* necessita di username e password.
- *requireAuth* necessita del JWT Token come header *Authorization*.
- *roleAuthorization* controlla che l'utente sia un admin.
- *ownerAuthorization* controlla che l'utente sia il proprietario del locale passato come parametro.
- *waiterAuthorization* controlla che l'utente sia cameriere presso il locale passato come parametro.

### Endpoint:
- *Auth:* **/api/auth**

| Enpoint | Meotodo | Middleware | Body (Parametri) | Descrizione |  
| :------- | :------- | :------- | :------- | :------- |
| **/register** | *POST* | | fullname, email, password, age, sex | Registrazione di un nuovo utente |
| **/login** | *POST* | requireLogin | email, password | Api di login |
| **/set-token** | *PUT* | requireAuth | token | Modifica del token di expo per l'utente loggato |  
| **/set-token** | *DELETE* | requireAuth | token | Rimozione del token di expo per l'utente loggato |  
| **/update** | *PUT* | requireAuth | defaultRestaurant, newOrderNotification | Modifica preferenze dell'utente |
| **/user** | *GET* | requireAuth | | Viene rinnovato il token dell'utente |

- *Restaurant:* **/api/restaurant**

| Enpoint | Meotodo | Middleware | Body (Parametri) | Descrizione |  
| :------- | :------- | :------- | :------- | :------- |
| **/** | *POST* | requireAuth, roleAuthorization | name, address(city, cap, street) | Aggiunta di un nuovo ristorante |

- *Waiter:* **/api/restaurant**

| Enpoint | Meotodo | Middleware | Body (Parametri) | Descrizione |  
| :------- | :------- | :------- | :------- | :------- |
| **/:restaurant/waiter/:id** | *POST*  | requireAuth, roleAuthorization, ownerAuthorization | | Aggiungi un cameriere al ristorante tramite ID |
| **/:restaurant/waiter** | *POST* | requireAuth, roleAuthorization, ownerAuthorization | mail | Aggiungi un cameriere al ristorante tramite mail |
| **/:restaurant/waiter/:id** | *DELETE* | requireAuth, roleAuthorization, ownerAuthorization | | Remove un cameriere al ristorante tramite ID |
| **/:restaurant/waiter/** | *GET* | requireAuth, roleAuthorization, ownerAuthorization | | Visualizza i camerieri di un ristorante |
| **/:restaurant/waiter/:id** | *GET* | requireAuth, roleAuthorization, ownerAuthorization | | Visualizza il cameriere tramite l'ID |

- *Product:* **/api/restaurant**

| Enpoint | Meotodo | Middleware | Body (Parametri) | Descrizione |  
| :------- | :------- | :------- | :------- | :------- |
| **/:restaurant/product** | *POST* | requireAuth, waiterAuthorization | name, price, category, listProduct[ObjectID] | Aggiungi un nuovo prodotto al menu |
| **/:restaurant/product/:id** | *DELETE* | requireAuth, waiterAuthorization | | Rimuovi il prodotto tramite l'ID |
| **/:restaurant/product/:id** | *PUT* | requireAuth, waiterAuthorization | name, price, category, listProduct[ObjectID] | Aggiorna il prodotto tramite il prodotto |
| **/:restaurant/product/:id** | *GET* | requireAuth, waiterAuthorization | | Visualizza il prodotto tramite l'ID |
| **/:restaurant/product** | *GET* | requireAuth, waiterAuthorization | | Visualizza tutti il menu del locale |
| **/:restaurant/product/category/:category** | *GET* | requireAuth, waiterAuthorization | | Visualizza il menu per categoria |

- *Order*

| Enpoint | Meotodo | Middleware | Body (Parametri) | Descrizione |  
| :------- | :------- | :------- | :------- | :------- |
| **/:restaurant/order** | *POST* | requireAuth, waiterAuthorization | tableNumber, listProduct[Product Schema], totalPrice | Aggiunta di un nuovo ordine |
| **/:restaurant/order/:id** | *DELETE* | requireAuth, waiterAuthorization | | Cancellazione dell'ordine by ID |
| **/:restaurant/order/:id** | *GET* | requireAuth, waiterAuthorization | | Visualizzazione dell'ordine tramite l'ID |
| **/:restaurant/order** | *GET* | requireAuth, waiterAuthorization | | Visualizzazione di tutti gli ordini |
| **/:restaurant/order/complete/:id** | *PUT* | requireAuth, waiterAuthorization | | Segna l'ordine come completo |
| **/:restaurant/order/pay/:id** | *PUT* | requireAuth, waiterAuthorization | | Segna l'ordine come pagato |

> Le api avente route preceduta dai due punti devono essere sostituite con l'ObjectId dell'entità:  
> - */api/resturant/**:restaurant**/product/**:id***
> - */api/resturant/**ade454gbyty6**/product/**123cvvfvt***
