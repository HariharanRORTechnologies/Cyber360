import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { SHAREPOINT_CONFIG } from '@/utils/constants';
import type { Assessment, Finding, User } from '@/types';

class SharePointService {
  private api: AxiosInstance;
  private siteUrl: string;

  constructor() {
    this.siteUrl = SHAREPOINT_CONFIG.SITE_URL;

    this.api = axios.create({
      baseURL: this.siteUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests (will be implemented with proper auth)
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('sharepoint_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Assessments
  async getAssessments(): Promise<Assessment[]> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Assessments')/items`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching assessments:', error);
      throw error;
    }
  }

  async getAssessmentById(id: string): Promise<Assessment> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Assessments')/items(${id})`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw error;
    }
  }

  async createAssessment(assessment: Partial<Assessment>): Promise<Assessment> {
    try {
      const response = await this.api.post(
        `/_api/web/lists/getbytitle('Assessments')/items`,
        assessment
      );
      return response.data;
    } catch (error) {
      console.error('Error creating assessment:', error);
      throw error;
    }
  }

  async updateAssessment(id: string, assessment: Partial<Assessment>): Promise<Assessment> {
    try {
      const response = await this.api.patch(
        `/_api/web/lists/getbytitle('Assessments')/items(${id})`,
        assessment
      );
      return response.data;
    } catch (error) {
      console.error('Error updating assessment:', error);
      throw error;
    }
  }

  // Findings
  async getFindings(): Promise<Finding[]> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Findings')/items?$expand=Author,Editor`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching findings:', error);
      throw error;
    }
  }

  async getFindingsByAssessment(assessmentId: string): Promise<Finding[]> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Findings')/items?$filter=AssessmentId eq '${assessmentId}'`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching findings for assessment:', error);
      throw error;
    }
  }

  async getFindingById(id: string): Promise<Finding> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Findings')/items(${id})`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching finding:', error);
      throw error;
    }
  }

  async createFinding(finding: Partial<Finding>): Promise<Finding> {
    try {
      const response = await this.api.post(
        `/_api/web/lists/getbytitle('Findings')/items`,
        finding
      );
      return response.data;
    } catch (error) {
      console.error('Error creating finding:', error);
      throw error;
    }
  }

  async updateFinding(id: string, finding: Partial<Finding>): Promise<Finding> {
    try {
      const response = await this.api.patch(
        `/_api/web/lists/getbytitle('Findings')/items(${id})`,
        finding
      );
      return response.data;
    } catch (error) {
      console.error('Error updating finding:', error);
      throw error;
    }
  }

  async getFindingsByStatus(status: string): Promise<Finding[]> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Findings')/items?$filter=Status eq '${status}'`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching findings by status:', error);
      throw error;
    }
  }

  // Users
  async getUsers(): Promise<User[]> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Users')/items`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('Users')/items(${id})`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // SLA Configuration
  async getSLAConfig(): Promise<any> {
    try {
      const response = await this.api.get(
        `/_api/web/lists/getbytitle('SLAConfiguration')/items`
      );
      return response.data.value || [];
    } catch (error) {
      console.error('Error fetching SLA config:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.api.get('/_api/web/title');
      return true;
    } catch (error) {
      console.error('SharePoint health check failed:', error);
      return false;
    }
  }
}

export const sharepointService = new SharePointService();
