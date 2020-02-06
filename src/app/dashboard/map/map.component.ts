import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;
import { StorageService } from '../shared/services/storage.service';
import { MapService } from './shared/map.service';
import { MapMarkerService } from './shared/mapMarker.service';
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'db-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public readonly DEFAULT_LATITUDE = 49.547348;
  public readonly DEFAULT_LONGITUDE = 11.016253;

  public isFullscreen: boolean = this.router.url.indexOf('/map') !== -1;
  public mapType = 'roadmap';
  public zoom = 14;

  // @ts-ignore
  public results$: Observable<PlaceResult[]> = new Observable<PlaceResult[]>();

  constructor(
    private storageService: StorageService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService,
    private mapMarkerService: MapMarkerService
  ) {}

  public ngOnInit(): void {
    this.results$ = this.mapMarkerService.nextMarker$;
    this.mapsAPILoader.load().then(() => {
      this.setLocationToGeolocation();
    });
  }

  public onToggleFullscreen(): void {
    if (this.router.url.indexOf('/map') > -1) {
      this.router.navigate(['dashboard']);
      this.isFullscreen = false;
    } else {
      this.router.navigate(['map']);
      this.isFullscreen = true;
    }
  }

  private setLocationToGeolocation(): void {
    console.log('setLocationToGeolocation');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.mapService.latitude = position.coords.latitude;
        this.mapService.longitude = position.coords.longitude;
      });
    } else {
      this.mapService.longitude = this.DEFAULT_LONGITUDE;
      this.mapService.latitude = this.DEFAULT_LATITUDE;
    }
  }

  // @ts-ignore
  public onMapReady(map: HTMLDivElement | Map<Element>): void {
    this.mapService.initMap(map);
  }

  public toggleFavorite(result: PlaceResult): void {
    this.storageService.toggleFavorite(result);
    // @ts-ignore
    result.isFavorite = !result.isFavorite;
  }

  public onCenterChange(event: LatLngLiteral): void {
    this.mapService.latitude = event.lat;
    this.mapService.longitude = event.lng;
  }
}
