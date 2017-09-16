![GarconLogo](https://raw.githubusercontent.com/Tkd-Alex/Garcon-Restaurant-Manager/master/garcon-documentation/logoGarcon_small.png)

### Garçon-Restaurant-Manager - Manager application for restaurant. <br />
**Autore**: [Alessandro Maggio](https://www.linkedin.com/in/aalessandromaggio/) // *Mat: X81000134* // [@Tkd-Alex](https://github.com/Tkd-Alex)

L'applicazione permette di facilitare le prenotazioni all'interno di un ristorante. Fornendo un'interfaccia semplice e intutiva, offrendo una visione a 360° degli ordini in corso a tutti gli enti presenti, Garçon si dimostra un'ottimo sostituto a carta e penna.

## Frontend (ReactNative):
### Componenti e librerie utilizzate:
- La maggior parte dei componenti utilizzati per l'user interface appartengono a [NativeBase](https://github.com/GeekyAnts/NativeBase), la versione utilizzata per il progetto non è tra le più recenti, per tanto alcuni componenti introdotti nelle versioni successivi non sono stati utilizzati all'interno di Garçon i quali avrebbero potuto dare un tocco in più all'applicazione.
- [react-native-prompt](https://github.com/jaysoo/react-native-prompt) è stato utilizzato per chiedere all'utente (cameriere) il numero del tavolo prima di confermare la comanda.
- [React Navigation Add-ons](https://github.com/satya164/react-navigation-addons) è stato realizzato come supporto a [React Navigation](https://github.com/react-community/react-navigation), difatti, tramite il metodo *addListener* mi ha permesso di 'fetchare' i dati ogni qualvolta che si verifchi l'evento *on focus* nelle relative schermate.
- Ovviamente anche [ExpoSDK](https://github.com/expo/expo-sdk) mi è stato di molto aiuto, grazie ad esso ho potuto gestire il caricamento dei font e la gestione delle notifiche.

### Custom components:
- *ProductListItem*

![ProductListItem](https://raw.githubusercontent.com/Tkd-Alex/Garcon-Restaurant-Manager/master/garcon-documentation/screen/productListItem_resize.jpg)

ProductListItem è stato uno dei primi problemi che ho riscontrato con react native. Durante la creazione delle pagine *Drink* & *Food* avevo la necessità di visualizzare in una sola riga *Nome, Ingredienti e due pulsanti situati a destra* i quali però utilizzando gli elementi di NativeBase non avevano intenzione allinearsi come era mia intezioni. Dopo aver perso i primi due giorni per questa piccolezza grafica notai che il componente *ListItem* e ciò che c'era al suo interno si comportavano in maniera differente, pertanto decisi di creare un componente custom il quale a seconda dei dispositivo ritorna diverse disposizioni.   

| Props | Tipo | Utilità | 
| :-------- | :-------- | :-------- |
| product | object | L'array di prodotti viene iterato dal componente padre e il singolo oggetto viene passato al componente in modo tale da poter visualizzare *Nome, Ingredienti* | 
| navigation | object | Il navigation viene passato per permette al pulsante di modifica prodotto di richiamare la funzione *navigate*.
| incrementCallback | funzione | È una funziona di callback la quale viene associata all *onPress* del pulsante verde [+]. |
- *OrderCardItem*

![OrderCardItem](https://raw.githubusercontent.com/Tkd-Alex/Garcon-Restaurant-Manager/master/garcon-documentation/screen/orderCardItem_resize.jpg)

OrderCardItem ha il semplice compito di estendere il componente *CardItem* mostrando il singolo prodotto e i suoi attributi (*Nome, Ingredienti, Prezzo totale, Quantità*). L'unica props che viene passata a questo componente non è nient'altro che il prodtto da mostrare.


### Reducer:
- *authReducer* ha il compito di gestire l'utente loggato ed eventuali interazioni con il backend riguardanti l'utenza.

| Azione | Evento | Descrizione | 
| :---------- | :---------- | :---------- |
| registerUser | SIGNUP_USER_START | Registrazione nuovo utente. |
| registerUserSuccess | SIGNUP_USER_SUCCESS | Registrazione avvenuta con successo. |
| registerUserFail | SIGNUP_USER_FAIL | Registrazione fallita. |
| newToken | LOGIN_USER_START | Ottenimento nuovo token. |
| loginUser | LOGIN_USER_START | Login utente. |
| loginUserSuccess | LOGIN_USER_SUCCESS | Login effettuato con successo. |
| loginUserFail | LOGIN_USER_FAIL | Eventuali errori con login (es. credenziali errate). |
| changeDefaultRestaurant | UPDATE_USER_START | Cambio del ristorante predefinito. |
| changeNotificationNewOrder | UPDATE_USER_START | Cambio impostazioni relative alle notifiche. |
| updateUserSuccess | UPDATE_USER_SUCCESS | Aggiornamenti avvenuti con successo. |
| updateUserFail | UPDATE_USER_FAIL | Aggiornamenti falliti. |
| addWaiter | UPDATE_USER_START | Aggiunta di un nuovo cameriere. |
| addWaiterSuccess | ADD_WAITER_SUCCESS | Aggiunta di un nuovo camiere fallita. |

 `(L'aggiunta di un nuovo cameriere è stata inserita solo per facilitare i test dell'applicazione)`

- *ingredientReducer* si comporta banalmente come *drinkReducer* & *foodReducer* in quanto il suo compito è semplicemente quello di ottenere la lista degli ingredienti dal server.

| Azione | Evento | Descrizione | 
| :---------- | :---------- | :---------- | 
| fetchIngredient | INGREDIENT_FETCH_START | Fetch degli ingredienti dal il backend. |
| fetchIngredientSuccess | INGREDIENT_FETCH_ERROR | Fetch dei dati concluso con succeso. |
| fetchIngredientFail | INGREDIENT_FETCH_SUCCESS | Fetch non riuscito. |

- *drinkReducer* & *foodReducer* gestiscono il fetch con i dati dei vari prodotti. Entrambi i reducer funzionano alla stessa maniera, difatti condivono persino le stesse azioni. Per comoodità l'ex *productReducer* è stato 'splittato'.

| Azione | Evento *Drink* | Evento *Food* | Descrizione | 
| :---------- | :---------- | :---------- | :---------- | 
| fetchProduct | DRINK_FETCH_START | FOOD_FETCH_START | Fetch dei prodotti dal il backend. |
| fetchProductSuccess | DRINK_FETCH_ERROR | FOOD_FETCH_ERROR | Fetch dei dati concluso con succeso. |
| fetchProductFail | DRINK_FETCH_SUCCESS | FOOD_FETCH_SUCCESS | Fetch non riuscito. |

- *orderReducer* è forse il cuore dell'applicazione in quanto gestisce tutte le modifiche relative agli ordini e di conseguenza anche creazione e fetch dei dati.

| Azione | Evento | Descrizione | 
| :---------- | :---------- | :---------- | 
| fetchOrder | ORDER_FETCH_START | Ricezione degli ordini dal backend. |
| fetchOrderSuccess | ORDER_FETCH_SUCCESS | Ricezione completato con successo. |
| fetchOrderFail | ORDER_FETCH_ERROR | Problemi con la ricezione. |
| newOrder | ORDER_NEW_START | Inizio creazione nuovo ordine. |
| newOrderSuccess | ORDER_NEW_SUCCESS | Il backend ha dato risposta positiva, pertato il nuovo ordine è stato creato. |
| newOrderFail | ORDER_NEW_ERROR | Problema con la creazione di un nuovo ordine- |
| updateOrder | ORDER_UPDATE_START | L'ordine ha bisogno di essere aggiornato (completato/pagato). |
| updateOrderSuccess | ORDER_UPDATE_SUCCESS | Ordine aggiornato con successo. |
| updateOrderFail | ORDER_UPDATE_ERROR | Problemi con l'aggiornamento dell'ordine. |
| editProduct | EDIT_PRODUCT | Modifica di un prodotto (aggiunta/rimozioni ingredienti). |
| addProduct | ADD_PRODUCT | Aggiunta di un prodotto all'ordine (comanda). |
| removeProduct | REMOVE_PRODUCT | Rimozione di un prodotto all'ordine (comanda). |
| incrementProduct | INRECREMENT_PRODUCT | Incremento del prodotto nella comanda. |
| decrementProduct | DECREMENT_PRODUCT | Decremento del prodotto nella comanda. |
| editOrder | ORDER_EDIT_START | L'ordine viene cancellato nel backend e reso nuovamente disponibile per la modifica. |
| editOrderSuccess | ORDER_EDIT_SUCCESS | Ordine pronto alla modifica (cancellato sul server). |
| editOrderFail | ORDER_EDIT_ERROR | Errore durante la cancellazione dell'ordine. |

`(*orderReducer* contiene 'tracce' di prodotti in quanto la modifica del prodotto è fine alla creazione del nuovo ordine)`

## Backend (nodeJS):


