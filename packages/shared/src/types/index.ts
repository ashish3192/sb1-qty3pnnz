export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  ownershipType: 'owned' | 'leased' | 'rented';
  insuranceExpiry: Date;
  status: 'active' | 'inactive';
  currentDriver?: Driver;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: 'on-duty' | 'off-duty';
  profilePicture?: string;
  currentVehicle?: Vehicle;
}

export interface MaintenanceRecord {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  cost: number;
  issuePhotos: string[];
  vehicle: Vehicle;
  reportedBy: Driver;
  vendorId?: string;
  createdAt: Date;
}