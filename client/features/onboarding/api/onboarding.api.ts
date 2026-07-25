import { apiClient } from '@/services'
import { CreateOrganizationRequest, CreateOrganizationResponse, CurrentOrganizationResponse } from '../onboarding.types'



export const onboardingApi = {
  createOrganization: (payload: CreateOrganizationRequest) =>
    apiClient.post<CreateOrganizationResponse, CreateOrganizationRequest>(
      '/api/organizations',
      payload,
    ),

    getCurrentOrganization: ()=>
    apiClient.get<CurrentOrganizationResponse>('/api/organizations/current'),
}
