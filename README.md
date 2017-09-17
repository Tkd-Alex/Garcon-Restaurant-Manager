![GarconLogo](/garcon-documentation/logoGarcon_small.png) ![QRCode](/garcon-documentation/expoqrcode.png)

### Garçon-Restaurant-Manager - Manager application for restaurant. <br />
**Autore**: [Alessandro Maggio](https://www.linkedin.com/in/aalessandromaggio/) // *Mat: X81000134* // [@Tkd-Alex](https://github.com/Tkd-Alex)

L'applicazione permette di facilitare le prenotazioni all'interno di un ristorante. Fornendo un'interfaccia semplice e intutiva, offrendo una visione a 360° degli ordini in corso a tutti gli enti presenti, Garçon si dimostra un'ottimo sostituto a carta e penna.

## Frontend (ReactNative):
La documentazione relativa al lavoro svolto su react native è presente nel [README.md](/garcon-react-native/README.md) posto nella cartella *garcon-react-native*.

## Backend (nodeJS):
La documentazione relativa al lavoro svolto su nodeJS e mongoDB è presente nel [README.md](/garcon-backend/README.md) posto nella cartella *garcon-backend*.

## Test e demo:
L'applicazione è raggiungibile tramite [Expo](https://expo.io/@tkd-alex/garcon-react-native) e contiene già un preset di dati.

### Utenti demo:

| Mail | Password | Admin | Ristorante | Ruolo |
| :-------- | :-------- | :-------- | :-------- | :-------- |
| mariorossi@gmail.com | mariorossi | Y | Delizie del Palato | Proprietario |
| bianchi@gmail.com | bianchi | Y | RistoranteVeneto | Proprietario |
| mariafloramo@gmail.com | maria | N | RistoranteVeneto | Cameriere |
| francesco@gmail.com | ciccio | N | Delizie del Palato | Cameriere |
| gabriele@gmail.com | gabriele | N | Delizie del Palato, RistoranteVeneto | Cameriere |

## Test effettuati:
| Device | Sistema Operativo | Problemi riscontrati |
| :-------- | :-------- | :-------- |
| Meizu U20 | Android 6.0.1 | Lentezza in alcune operazioni |
| iPhone 5S | iOS 10.2.1 | |
| Nexus 7 (Genymotion) | Android 6.0.1 | |
| Samsung Galaxy S6 | Android 7.0.0  | |
| Wiko Ridge 4G | Android 5.0.2 | Il logo non viene caricato. Lentezza in alcune operazioni |
| Moto G 3th | Android 6.0.1 | Il logo non viene caricato. Lentezza in alcune operazioni |

L'applicazione è disponibile per qualunque test, qualora si volesse utilizzare qualche funzionalità non ancora implementata è possibile utilizzare direttamente le api raggiungibili all'indirizzo [http://188.213.170.165:3000/api](http://188.213.170.165:3000/api)
