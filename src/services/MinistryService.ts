export interface Ministry {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserMinistry {
  id: string;
  joinedAt: string;
  ministry: Ministry;
  ministryId: string;
  role: string;
  userId: string;
}
