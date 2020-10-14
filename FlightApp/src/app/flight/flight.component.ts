import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FlightService } from '../shared/flight.service';
import { Flight } from '../shared/flight.model';

declare var M: any;

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
  providers: [FlightService]
})
export class FlightComponent implements OnInit {

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshFlightList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.flightService.selectedFlight = {
      _id: "",
      flightname: "",
      origin: "",
      destination: "",
      flightnumber: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.flightService.postFlight(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlightList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.flightService.putFlight(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlightList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshFlightList() {
    this.flightService.getFlightList().subscribe((res) => {
      this.flightService.flights = res as Flight[];
    });
  }


  onEdit(flt: Flight) {
    this.flightService.selectedFlight = flt;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.flightService.deleteFlight(_id).subscribe((res) => {
        this.refreshFlightList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
