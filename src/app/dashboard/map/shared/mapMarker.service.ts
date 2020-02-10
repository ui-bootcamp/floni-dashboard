import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {
  private nextMarker$$ = new Subject<PlaceResult[]>();
  public nextMarker$: Observable<PlaceResult[]> = this.nextMarker$$;

  constructor() {}

  public addNewMarker(placeResults: PlaceResult[]): void {
    this.nextMarker$$.next(placeResults);
  }
}
