import { Injectable } from '@angular/core';
import { MapMarkerService } from './mapMarker.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private mapMarkerService: MapMarkerService) {}

  // @ts-ignore
  private map: HTMLDivElement | Map<Element>;
  public longitude = 0;
  public latitude = 0;
  public searchRadius = 1000;

  // @ts-ignore
  public initMap(map: HTMLDivElement | Map<Element>): void {
    this.map = map;
  }

  public findNearbyLocations(searchString: string): void {
    console.log(this.latitude);
    const request = {
      name: searchString,
      radius: this.searchRadius,
      location: new google.maps.LatLng(this.latitude, this.longitude)
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.mapMarkerService.addNewMarker(results);
      }
    });
  }

  public centerMap(result: google.maps.places.PlaceResult): void {
    if (result.geometry) {
      this.map.panTo(result.geometry.location);
    }
  }
}
