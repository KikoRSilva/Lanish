import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import * as L from 'leaflet';

const shopsCoordinates = [
  {
    name: 'Amoreiras',
    lat: 38.723056,
    lon: -9.161944,
    info: 'Nothing here!',
    open: true,
  },
  {
    name: 'Marquês de Pombal',
    lat: 38.72545,
    lon: -9.1499,
    info: 'Benfica Shirts!',
    open: false,
  },
  {
    name: 'Centro Comercial Colombo',
    lat: 38.7558,
    lon: -9.1885,
    info: 'Nothing here!',
    open: true,
  },
  {
    name: 'Centro Comercial Vasco da Gama',
    lat: 38.767716,
    lon: -9.0977,
    info: 'NErf!',
    open: false,
  },
  {
    name: 'MINI MERCADO',
    lat: 38.735468,
    lon: -9.127545,
    info: 'Jola!',
    open: false,
  },
  {
    name: 'Minimercado and BD.Cafe late night shop',
    lat: 38.721599,
    lon: -9.164585,
    info: 'Tabaco!',
    open: true,
  },
  {
    name: 'LOJA DE CONVENIÊNCIA',
    lat: 38.704514,
    lon: -9.176085,
    info: 'Vodka!',
    open: true,
  },
  {
    name: 'GOGO store',
    lat: 38.73098,
    lon: -9.13691,
    info: 'Talhas!',
    open: false,
  },
  {
    name: 'Late Night Shop',
    lat: 38.74515,
    lon: -9.15644,
    info: 'Brocas!',
    open: true,
  },
  {
    name: 'Late Night Shop',
    lat: 38.72441,
    lon: -9.13191,
    info: 'Nothing here!',
    open: false,
  },
];

// image of the pin
const iconUrl = '/assets/pin2.png';
const currLocUrl = '/assets/pin1.png';

// properties of the icon
var PinIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [32, 48],
});

var LocIcon = L.icon({
  iconUrl: currLocUrl,
  iconSize: [32, 48],
});

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {
  map: L.Map;
  username: string = 'Kiko';
  shopsInfo: any[] = [];
  currentPosition: number[] = [];

  constructor(private menu: MenuController, private geolocation: Geolocation) {}

  ngOnInit() {
    this.map = L.map('map', {
      center: [38.736946, -9.142685],
      zoom: 13,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    let watchOptions = {
      frequency: 1000,
      timeout: 3000,
      enableHighAccuracy: false, // may cause errors if true
    };

    let watch = this.geolocation.watchPosition(watchOptions).subscribe(
      (position: Geoposition) => {
        console.log(position);
        L.marker([position.coords.latitude, position.coords.longitude], {
          icon: LocIcon,
        })
          .addTo(this.map)
          .bindPopup('Current Location');
      },
      (error) => {
        console.error(error);
      }
    );

    // set the pin icons of every shop
    this.populatePins();

    this.map.on('zoomend', () => {
      let bounds = this.map.getBounds();
      let swLon: number = bounds.getSouthWest().lng;
      let swLat: number = bounds.getSouthWest().lat;
      let neLon: number = bounds.getNorthEast().lng;
      let neLat: number = bounds.getNorthEast().lat;

      this.shopsInfo = this.getShopsInfo(swLon, swLat, neLon, neLat);

      console.log('ShopsInfo: ', this.shopsInfo);
    });
  }

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  populatePins() {
    // get all the shops coordinates
    shopsCoordinates.forEach((shop) => {
      if (shop.open)
        L.marker([shop.lat, shop.lon], { icon: PinIcon }).addTo(this.map);
      else
        L.marker([shop.lat, shop.lon], { icon: PinIcon })
          .addTo(this.map)
          .bindPopup('<h3><strong>Closed</strong></h3>');
    });
  }

  getShopsInfo(
    swLon: number,
    swLat: number,
    neLon: number,
    neLat: number
  ): any[] {
    let shops = [];
    shopsCoordinates.forEach((shop) => {
      if (
        shop.lat < neLat &&
        shop.lat > swLat &&
        shop.lon > swLon &&
        shop.lon < neLon
      ) {
        shops.push(shop);
      }
    });

    return shops;
  }
}
