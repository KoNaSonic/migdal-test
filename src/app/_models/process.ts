export interface IProcess {
  superClaim: {
    superClaimNum: number;
    superClaimStatus: {
      code: number;
      value: string;
    };
  };
  insured: {
    address: {
      cityName: string;
      streetName: string;
    };
    identity: number;
    identityType: number;
    firstName: string;
    lastName: string;
    age: number;
  };
  contactPersons: [{
    id: number;
    deliveryFlag: boolean;
    type: {
      code: number;
      value: string;
    }
    name: string;
    phoneNumber: number;
    email: string;
    address: string;
  }];
}
