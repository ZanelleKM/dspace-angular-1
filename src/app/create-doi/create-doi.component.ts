import { Component } from '@angular/core';
import { showMoreFlatNode } from '../community-list-page/community-list-service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './create-doi.component.html',
  styleUrls: ['./create-doi.component.scss']
})
export class CreateDoiComponent {

  //Dropdown values
  secondaryOptionValues: string[] = [];

  secondaryOptions = {
    option1: ["Continuum Images",
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
    option2: ["Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"],
    option3: [ "Single dish",
    "Radio continuum",
    "Spectroscopy",
    "VLBI"]
  };
  updateSecondaryOptions(primaryOption: string) {
    this.secondaryOptionValues = this.secondaryOptions[primaryOption] || [];
  }

  //Control to show  Fill in author table
  showFiles: string = '';

  enableGenerate1(answer: string) {
    console.log(answer);
    console.log(typeof(answer))
    console.log(answer.length)
    if (answer === '2') {
      this.showFiles = '2';
    } else if(answer === '3'){
      this.showFiles = '3';
      
    } else {
      this.showFiles = '';
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
    this.enableGenerate1("");
  }
  
  rows: any[] = [];
  selectedRows: any[] = [];

  addAuthor() {
    const newRow = {
      firstName: '',
      lastName: '',
      initials: '',
      affiliation: '',
      email: '',
      orchid: ''
    };
    this.rows.push(newRow);
  }

  deleteAuthor() {
    this.selectedRows.forEach(row => {
      const index = this.rows.indexOf(row);
      if (index !== -1) {
        this.rows.splice(index, 1); // Remove the selected row from the rows array
      }
    });

    this.selectedRows = []; // Clear the selectedRows array
  }

  selectRow(row: any) {
    if (this.selectedRows.includes(row)) {
      const index = this.selectedRows.indexOf(row);
      if (index !== -1) {
        this.selectedRows.splice(index, 1); // Deselect the row
      }
    } else {
      this.selectedRows.push(row); // Select the row
    }
  }

  // Reports buttons
  dataTableRows: any[] = [];

  addRow(): void {
    this.dataTableRows.push({ download: '', description: '' });
  }

  deleteRow () {
    this.selectedRows.forEach(row => {
      const index = this.rows.indexOf(row);
      if (index !== -1) {
        this.rows.splice(index, 1); // Remove the selected row from the rows array
      }
    });

    this.selectedRows = [];
  }

  // Form Validation
  frname: string;
  email: string;
  validateForm(): boolean {
  
    if (!this.frname || !this.email) {
      alert('Please fill out all required fields.');
      return false;
    }
  
    if (!this.validateEmail(this.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    return true;
  }
  
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
