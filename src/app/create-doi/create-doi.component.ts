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
    "Ancillary Data"],
    HartRAO_15m_telescope: ["Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"],
    HartRAO_26m_telescope: [ "Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"]
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

    console.log(formData)
    var currentHostname = window.location.hostname;
    var action_url = '';
    this.validateForm()
    if (currentHostname === 'dspace.sdp.kat.ac.za') {
      action_url = 'http://dspace.sdp.kat.ac.za:8069';
    } else {
  // default 
      alert('currentHostname')
      action_url = 'http://127.0.0.1:8000';
    }
   
    this.http.post(action_url, formData)
      .subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          this.authors = this.authors.filter(author => !this.selectedRows.includes(author.id));
          this.release = this.release.filter(entry => !this.selectedRelease.includes(entry.id));
          // Handle success response
        },
        error => {
          console.error('Error submitting form:', error);
          this.myForm.reset()
          // Handle error response
        }
      )
      this.authors = this.authors.filter(author => this.selectedRows.includes(author.id));
      this.release = this.release.filter(entry => this.selectedRelease.includes(entry.id));
      this.selectedRelease = [];
      this.selectedRows = [];
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
      console.log(this.authors)
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
  deleteAuthor() {
    console.log(this.selectedRows)
    this.authors = this.authors.filter(author => !this.selectedRows.includes(author.id));
    console.log(this.authors)
    this.selectedRows = [];
  }

  deleteRow () {
    console.log(this.selectedRelease)
    this.release = this.release.filter(entry => !this.selectedRelease.includes(entry.id));
    console.log(this.release)
    //clear list after deleting
    this.selectedRelease = [];
  }
  // Reports buttons
  dataTableRows: any[] = [];

  updateChecked(event: any, id: string): void {
    console.log('id',event, id)
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
    console.log('Selected',this.selectedRows)
  }
  updateSelected(event: any, id: string): void {
    console.log('id',event, id)
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
    console.log('Selected',this.selectedRelease)
  }
  addRow() {
      this.release.push({ ...this.releaseData });
      this.clearRow();
      this.releaseData = {
        download:'',
        description:'',
        checked: false,
        id : Date.now().toString(),
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

  validateForm(): boolean {

    if (!this.myForm.valid) {
      alert('Form is not valid')
      return;
    }
    // if (!this.firstName || !this.email) {
    //   alert('Please fill out all required fields.');
    //   return false;
    // }
  
    // if (!this.validateEmail(this.email)) {
    //   alert('Please enter a valid email address.');
    //   return false;
    // }
  
    return true;1
  }
  
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
