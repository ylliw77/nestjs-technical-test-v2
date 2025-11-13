import { Company, Role } from "src/database/schema";

export interface JwtPayload {
  id: string,
  username: string,
  roles: Role[],
  companies: Company[],
}