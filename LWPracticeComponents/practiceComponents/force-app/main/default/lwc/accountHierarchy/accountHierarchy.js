import { LightningElement, api, track } from 'lwc';
import getAccountHierarchy from '@salesforce/apex/AccountHierarchyController.getAccountHierarchy';

export default class AccountHierarchy extends LightningElement {
  @api recordId; // Case record ID from the Case page
  @track hierarchy = [];
  @track error;

  connectedCallback() {
    this.loadHierarchy();
  }

  async loadHierarchy() {
    try {
      const hierarchyData = await getAccountHierarchy({ caseId: this.recordId });
      this.hierarchy = hierarchyData;
    } catch (error) {
      this.error = error.body.message || 'An error occurred while fetching hierarchy';
    }
  }
}
