import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './create-doi.component.html',
  styleUrls: ['./create-doi.component.scss']
})
export class CreateDoiComponent {
  constructor(private http: HttpClient) { }
  //Dropdown values
  secondaryOptionValues: string[] = [];
  
  authors: any[] = [];
  authorData = {
    firstName: '',
    lastName: '',
    initials: '',
    affiliation: '',
    email: '',
    orchid: '',
    id : Date.now().toString(),
    checked: false
  };

  release: any[] = [];
  releaseData = {
    download:'',
    description:'',
    id : Date.now().toString(),
    checked: false
  };

  community: string;
  link: string;
  location2: string;
  title: string;
  abstract: string;
  collection: string;
  date: string;
  resource: string;
  doi: string;
  upgrade1: string;

  secondaryOptions = {
    MeerKAT: ["Continuum Images",
    "Visibility Data",
    "Calibration Tables",
    "Reports on Image Quality",
    "Spectral Line Cubes",
    "Beam-formed modes",
    "Pulsar Timing Data",
    "Rapid Timing Transients",
    "Automated Images",
    "Sensor Data",
    "Serendipitous Discovery Data",
    "Ancillary Data"
    ],
    HartRAO_15m_telescope: ["Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"],
    HartRAO_26m_telescope: [ "Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"],

    DORIS_Doppler_satellite_racking_system:[],
    GNSS_Reference_stations:["Beidou",
    "Galileo",
    "Global Orbiting Navigation Satellite System (GLONASS)",
    "Global Positioning Systems (GPS)",
    "Precipitable Water Vapor (PWV) system",
    "Total Electron Content (TEC) system"
    ],
    Meteorology_instrumentation:[],
    Moblas_6_Satellite_Laser_Ranger:[],
    ROSCOSMOS_Satellite_Laser_Ranger:[],
    Seismology_and_gravimetry_instrumentation:[],
    Tide_Gauges:[],
    Total_station_instrumentation:[],
  };

  updateCollection(e){
    this.collection = e.target.value
  }
  updateSecondaryOptions(primaryOption: string) {
    this.secondaryOptionValues = this.secondaryOptions[primaryOption] || [];

  }

  //Control to show  Fill in author table
  showFiles: string = '';
  isUpgradeHidden = true;

  enableGenerate1(value: string) {
    if (value === '1') {
      this.isUpgradeHidden = false;
    } else {
      this.isUpgradeHidden = true;
    }
  }
  enableGenerate(answer: string) {
    if (answer === '2') {
      this.showFiles = '2';
    } else if(answer === '3'){
      this.showFiles = '3';
      
    } else {
      this.showFiles = '';
    }
  }
  

  submitForm() {
    const formData = {
      title: this.title,
      community: this.community,
      collection: this.collection,
      resource: this.resource,
      DOI: this.doi,
      authors: this.authors,
      abstract: this.abstract,
      Published_date: this.date,
      Location: this.location2,
      paperLink: this.link,
      release:this.release,
      upgrade: this.upgrade1
    };
    console.log('Form Data on Submit', formData)
    var currentHostname = window.location.hostname;
    var action_url = '';
    console.log('Form Data', formData)
    if(this.validateForm(formData)){
      if (currentHostname === 'dspace.sdp.kat.ac.za') {
        action_url = 'http://dspace.sdp.kat.ac.za:8069';
      } else {
        action_url = 'https://httpbin.org/post';
      }
     
      this.http.post(action_url, formData)
        .subscribe(
          response => {
            console.log('Form submitted successfully!', response);
            // Handle success response
          },
          error => {
            console.error('Error submitting form:', error);
            console.error('Error submitting form:', error.status);
          }
        )
        this.authors = this.authors.filter(author => this.selectedRows.includes(author.id));
        this.release = this.release.filter(entry => this.selectedRelease.includes(entry.id));
        this.myForm.reset()
        this.selectedRelease = [];
        this.selectedRows = [];
    } else {
      alert('Please fill in all required fields')
    }    
  }
  isStringEmpty(str: string): boolean {
    return str.length === 0;
  }
  selectedOption: string = '';
  // Other component code

  onChangeSelect(option: string) {
    this.selectedOption = option;
    if (option === '3') {
      this.showFiles = '3';
    } else if (option === '2') {
      this.showFiles = '2';
    } else {
      this.showFiles = '';
    }
  }
  ngOnInit() {
    // Set the initial value to ""
    this.enableGenerate("");
  }
  
  rows: any[] = [];
  selectedRows: string[] = [];
  selectedRelease: string[] = [];

  addAuthor() {
      if(this.validateAuthor(this.authorData)){
        this.authors.push({ ...this.authorData });
        this.clearForm();
        this.authorData = {
          firstName: '',
          lastName: '',
          initials: '',
          affiliation: '',
          email: '',
          orchid: '',
          id: Date.now().toString(),
          checked: false
        }
      }
  }
  clearForm() {
    this.authorData = {
      firstName: '',
      lastName: '',
      initials: '',
      affiliation: '',
      email: '',
      orchid: '',
      id: Date.now().toString(),
      checked: false
    };
  }
  validateAuthor(obj: any): boolean {
    // Check if the object has the 'email' and 'name' properties
    const email = obj['email'];
    const name = obj['firstName'];
    if ((name === null || name === undefined || name === '') && (email === null || email === undefined || email === '')) {
      alert("Firstname and Email are required")
      return false;
    }
    else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
      alert("Please fill in valid email address")
      return false;
      }
    }
  
    // All validations passed
    return true;
  }
  validateRelease(obj: any): boolean {
    // Check if the object has the 'download' and 'description' properties
    const download = obj['download'];
    const description = obj['description'];
    if ((description === null || description === undefined || description === '') || (download === null || download === undefined || download === '')) {
      alert("Download and Description are required")
      return false;
    }
    // All validations passed
    return true;
  }
  deleteAuthor() {
    this.authors = this.authors.filter(author => !this.selectedRows.includes(author.id));
    this.selectedRows = [];
  }

  deleteRow () {
    this.release = this.release.filter(entry => !this.selectedRelease.includes(entry.id));
    //clear list after deleting
    this.selectedRelease = [];
  }
  // Reports buttons
  dataTableRows: any[] = [];

  updateChecked(event: any, id: string): void {

    if (event.target.checked) {
      // If the checkbox is checked, add the author's ID to the selected authors
      this.selectedRows.push(id);
    } else {
      // If the checkbox is unchecked, remove the author's ID from the selected authors
      const index = this.selectedRows.indexOf(id);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    }
  }
  updateSelected(event: any, id: string): void {
    if (event.target.checked) {
      // If the checkbox is checked, add the author's ID to the selected authors
      this.selectedRelease.push(id);
    } else {
      // If the checkbox is unchecked, remove the author's ID from the selected authors
      const index = this.selectedRelease.indexOf(id);
      if (index > -1) {
        this.selectedRelease.splice(index, 1);
      }
    }
  }
  addRow() {
    if(this.validateRelease(this.releaseData)){
      this.release.push({ ...this.releaseData });
      this.clearRow();
      this.releaseData = {
        download:'',
        description:'',
        checked: false,
        id : Date.now().toString(),
      }
    }
  }
  clearRow() {
    this.releaseData = {
      download: '',
      description: '',
      checked: false,
      id : Date.now().toString(),
    };
  }

  

  // Form Validation
  firstName: string;
  email: string;
  @ViewChild('myForm') myForm!: NgForm;

  validateForm(obj): boolean {
    console.log('Object', obj)
    for (const key in obj) {
      console.log('Key', key)
      if (key === "upgrade") {
        continue; // Skip the specific key to ignore
      }
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value === null || value === undefined || value === '') {
          return false;
        }
      }
    }
    return true;
  }
  
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
