import { ApiResponse } from "../auth"

export interface Organization {
  _id: string
  name: string
  logoUrl: string | null
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrganizationRequest {
  name: string
  logoUrl?: string | null
}

export type CreateOrganizationResponse = ApiResponse<{
  organization: Organization
}>

export type CurrentOrganizationResponse = ApiResponse<{
  user: {
    id: string
    fullName: string
    email: string
  }
  organization: Organization
}>
